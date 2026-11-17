import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { projects } from '../data/portfolio';
import { caseStudies } from '../case-studies';
import { resultsOf } from '../case-studies/highlights';

// "UI DESIGN" -> "UI design"
const formatTag = (tag) => {
  const text = tag.toLowerCase().replace(/\b(ui|ux)\b/g, (match) => match.toUpperCase());
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const ProjectFrame = ({ project }) => {
  const reduceMotion = useReducedMotion();
  const study = caseStudies[project.caseStudy];
  const result = study ? resultsOf(study.slug)[0] : null;
  const [active, setActive] = useState(0);
  const total = project.images.length;

  const go = (step) => setActive((prev) => (prev + step + total) % total);

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-7">
      {/* Screens */}
      <div className="lg:col-span-8">
        {/* Frame label, like the name above a frame in a design file */}
        <div className="flex items-center justify-between mb-2 text-[13px] font-medium text-secondary">
          <span>{project.title}</span>
          <span aria-live="polite">
            Screen {active + 1} of {total}
          </span>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface border border-line">
          <AnimatePresence initial={false}>
            <motion.img
              key={active}
              src={project.images[active]}
              alt={`${project.title}, screen ${active + 1} of ${total}`}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>

          {total > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              <button
                onClick={() => go(-1)}
                aria-label={`Previous ${project.title} screen`}
                className="h-10 w-10 rounded-lg bg-black text-white border border-white/25 flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <FiArrowLeft size={17} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label={`Next ${project.title} screen`}
                className="h-10 w-10 rounded-lg bg-black text-white border border-white/25 flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <FiArrowRight size={17} />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar p-0.5 -m-0.5">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Show ${project.title} screen ${index + 1}`}
                aria-pressed={index === active}
                className={`relative shrink-0 w-[88px] sm:w-[112px] aspect-[16/10] overflow-hidden rounded-md border bg-surface transition-opacity ${
                  index === active ? 'border-accent ring-1 ring-accent opacity-100' : 'border-line opacity-55 hover:opacity-100'
                }`}
              >
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Write-up */}
      <div className="lg:col-span-4 lg:pt-7">
        <div className="lg:sticky lg:top-10">
          <h3 className="heading text-[2.5rem] sm:text-[3rem] text-primary">{project.title}</h3>
          <p className="mt-3 text-[19px] leading-snug font-medium text-primary">{project.shortDescription}</p>
          <p className="mt-2 text-[14px] text-secondary">
            {project.industry} · {project.year} · {project.tags.map(formatTag).join(', ')}
          </p>

          {study ? (
            <dl className="mt-6 border-t border-line">
              <div className="py-3.5 border-b border-line">
                <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-stamp">Problem</dt>
                <dd className="mt-1.5 text-[16px] font-medium">{study.card.problem}</dd>
              </div>
              <div className="py-3.5 border-b border-line">
                <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-secondary">What I did</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.card.did.map((label) => (
                    <span key={label} className="rounded-md border border-line bg-surface px-2.5 py-1 text-[13.5px] font-medium">
                      {label}
                    </span>
                  ))}
                </dd>
              </div>
              {result && (
                <div className="py-3.5 border-b border-line">
                  <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-secondary">Result</dt>
                  <dd className="mt-2 flex items-baseline gap-2.5">
                    <span className="display text-[2.4rem] leading-none">{result.value}</span>
                    <span className="text-[15px] font-semibold">{result.label}</span>
                  </dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="mt-4 text-[15.5px] leading-relaxed text-secondary max-w-[34rem]">{project.description}</p>
          )}

          {project.caseStudy && (
            <a
              href={`#case-${project.caseStudy}`}
              onClick={(event) => {
                event.preventDefault();
                window.location.hash = `case-${project.caseStudy}`;
              }}
              className="mt-6 h-12 px-6 rounded-xl bg-primary text-background text-[15px] font-semibold inline-flex items-center gap-2 hover:opacity-85 transition-opacity"
            >
              Read the case study <FiArrowRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const ProjectsSection = () => {
  return (
    <section id="work" data-annotate="work: screens crossfade 0.3s, write-up is sticky" className="bg-background text-primary py-20 sm:py-28 transition-colors duration-300">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 mb-12 sm:mb-16">
          <h2 data-spec="Heading" className="heading text-[clamp(2.75rem,7vw,5.5rem)]">Selected work</h2>
          <p className="text-[15.5px] text-secondary pb-2">{projects.length} projects. Flip through the screens of each one.</p>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28">
          {projects.map((project) => (
            <ProjectFrame key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
