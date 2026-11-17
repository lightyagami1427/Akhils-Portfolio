import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { Block, Pin, Trio } from '../case-studies/blocks';
import { DraftContext } from '../case-studies/draftContext';
import GlassesIcon from '../components/GlassesIcon';
import { caseStudyOrder } from '../case-studies';

const scrollToSection = (id) => {
  document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Sticky contents list that follows the reader down the page
const Contents = ({ sections }) => {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id.replace('cs-', ''));
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach((section) => {
      const element = document.getElementById(`cs-${section.id}`);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="sticky top-8">
      <ol className="flex flex-col border-l border-line">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={active === section.id ? 'true' : undefined}
              className={`-ml-px block w-full text-left border-l-2 pl-3 py-1.5 text-[13px] transition-colors ${
                active === section.id ? 'border-stamp text-primary font-semibold' : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const CaseStudyPage = ({ study, theme, toggleTheme, glasses, toggleGlasses, goHome }) => {
  const position = caseStudyOrder.findIndex((item) => item.slug === study.slug);
  const next = caseStudyOrder[(position + 1) % caseStudyOrder.length];
  const isEmptyOnceFinal = (section) =>
    section.blocks.every((block) => block.type === 'impact' && block.items.every((item) => !item.value));
  const sections = study.draft ? study.sections : study.sections.filter((section) => !isEmptyOnceFinal(section));

  return (
    <DraftContext.Provider value={study.draft}>
      <div className="bg-background text-primary min-h-svh transition-colors duration-300">
        <header className="shell flex items-center justify-between gap-4 pt-5 sm:pt-7">
          <a
            href="#work"
            onClick={(event) => {
              event.preventDefault();
              goHome('work');
            }}
            className="inline-flex items-center gap-2 h-10 px-3 -ml-3 rounded-lg text-[14.5px] font-semibold hover:bg-card transition-colors"
          >
            <FiArrowLeft size={17} aria-hidden="true" /> All work
          </a>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleGlasses}
              aria-pressed={glasses}
              aria-label={glasses ? 'Take off glasses: hide design specs' : 'Wear glasses: show design specs'}
              className={`h-10 px-2.5 md:px-3 rounded-lg inline-flex items-center gap-2 text-[14px] font-medium transition-colors ${glasses ? 'bg-spec text-black' : 'hover:bg-card'}`}
            >
              <GlassesIcon />
              <span className="hidden md:inline">{glasses ? 'Take off glasses' : 'Wear glasses'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-card transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
          </div>
        </header>

        <main className="shell pt-10 sm:pt-16 pb-24">
          {study.draft && (
            <div className="mb-10 rounded-xl border border-line p-4 sm:p-5 text-[14.5px] leading-relaxed" style={{ backgroundColor: 'color-mix(in srgb, var(--color-spec) 14%, var(--color-surface))' }}>
              <span className="font-semibold">Draft for review.</span> Facts from the brief, Akhil’s notes and the shipped screens are real, and so are the measured charts.
              Anything marked <Pin className="mx-1" /> is reconstructed: confirm it, edit it or cut it, then switch off draft mode.
            </div>
          )}

          {/* Opening */}
          <div className="max-w-[960px]">
            <p className="text-[13px] font-semibold text-secondary">
              Case {study.number} · {study.year}
            </p>
            <h1 data-spec="Display" className="display mt-3 text-[clamp(3.5rem,11vw,8.5rem)]">{study.title}</h1>
            <p className="mt-6 text-[20px] sm:text-[24px] leading-snug font-medium max-w-[44rem]">{study.summary}</p>
            <p className="mt-4 text-[14.5px] text-secondary">
              <span className="rounded bg-accent px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white mr-2">What this shows</span>
              {study.shows}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-primary text-background px-2.5 py-1 text-[12.5px] font-semibold">{tag}</span>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 rounded-xl border border-line overflow-hidden">
              {study.meta.map((item, index) => (
                <div key={item.label} className={`p-4 border-line ${index % 2 ? 'border-l' : ''} ${index > 1 ? 'border-t md:border-t-0' : ''} ${index > 0 ? 'md:border-l' : ''}`}>
                  <dt className="text-[12px] font-semibold uppercase tracking-wide text-secondary">
                    {item.label} {item.confirm && <Pin className="ml-1" />}
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-medium">{item.value}</dd>
                  {item.note && <dd className="text-[12.5px] text-secondary">{item.note}</dd>}
                </div>
              ))}
            </dl>
          </div>

          <figure className="mt-10">
            <div className="mb-2 flex justify-between text-[13px] font-medium text-secondary">
              <span>{study.coverLabel}</span>
              <span>Shipped</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-line bg-black">
              <img src={study.cover} alt={`${study.title} homepage`} className="w-full h-auto" />
            </div>
          </figure>

          <div className="mt-6 max-w-[960px]">
            <Trio trio={study.trio} />
          </div>

          {/* Body */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <aside className="hidden lg:block lg:col-span-2">
              <Contents sections={sections} />
            </aside>

            <div className="lg:col-span-10 xl:col-span-9 min-w-0">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={`cs-${section.id}`}
                  aria-labelledby={`cs-${section.id}-title`}
                  className={`scroll-mt-8 pb-16 ${index > 0 ? 'pt-16 border-t border-dashed border-line' : ''}`}
                >
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-stamp">{section.eyebrow}</p>
                  <h2 id={`cs-${section.id}-title`} className="heading mt-2 text-[clamp(2.1rem,4.5vw,3.25rem)]">
                    {section.title}
                    {section.confirm && <Pin className="ml-3 -translate-y-1" />}
                  </h2>
                  {section.lede && <p className="mt-4 text-[17px] leading-relaxed text-secondary max-w-[44rem]">{section.lede}</p>}
                  <div className="mt-8 flex flex-col gap-5">
                    {section.blocks.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} />
                    ))}
                  </div>
                </section>
              ))}

              <a
                href={`#case-${next.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  window.location.hash = `case-${next.slug}`;
                }}
                className="group mt-4 grid grid-cols-1 sm:grid-cols-[1fr_15rem] items-center gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-7 hover:border-primary transition-colors"
              >
                <span>
                  <span className="text-[13px] font-semibold text-secondary">Next case study · {next.number}</span>
                  <span className="display mt-2 block text-[clamp(2.5rem,6vw,4.5rem)]">{next.title}</span>
                  <span className="mt-3 block text-[15.5px] leading-relaxed text-secondary max-w-[34rem]">{next.summary}</span>
                </span>
                <span className="overflow-hidden rounded-lg border border-line bg-black aspect-[16/10]">
                  <img src={next.cover} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </span>
              </a>

              <a
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  goHome('work');
                }}
                className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-line text-[15px] font-semibold hover:bg-card transition-colors"
              >
                <FiArrowLeft size={16} aria-hidden="true" /> Back to all work
              </a>
            </div>
          </div>
        </main>
      </div>
    </DraftContext.Provider>
  );
};

export default CaseStudyPage;
