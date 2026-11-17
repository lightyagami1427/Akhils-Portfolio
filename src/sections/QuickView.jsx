import React from 'react';
import { FiArrowUpRight, FiClock, FiMoon, FiSun } from 'react-icons/fi';
import { projects, experience, tools } from '../data/portfolio';
import { caseStudies } from '../case-studies';
import { highlights, resultsOf } from '../case-studies/highlights';
import ResultCard from '../components/ResultCard';
import { openCaseStudy } from '../utils/openCaseStudy';

const EMAIL = 'mailto:akhilnishtala14@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/akhil-n-8086a5225/';
const RESUME_URL = 'https://drive.google.com/file/d/1SccGI_9RuJTLRuAfWZaFL-CjYijlzDCf/view?usp=sharing';

const Block = ({ title, children }) => (
  <section className="pt-10 sm:pt-12">
    <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-stamp">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

/*
  The 60-second version of the site, for recruiters skimming twenty portfolios
  before lunch. Everything here is read from the same data as the full page.
*/
const QuickView = ({ theme, toggleTheme, exit }) => (
  <div className="bg-background text-primary min-h-svh transition-colors duration-300">
    <div className="shell max-w-[1040px] pt-5 sm:pt-7 pb-20">
      <header className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary text-background px-3.5 py-1.5 text-[13px] font-semibold">
          <FiClock size={14} aria-hidden="true" /> The 60-second version
        </span>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={exit}
            className="h-10 px-3 sm:px-4 rounded-lg border border-line text-[14px] font-semibold hover:bg-card transition-colors"
          >
            <span className="sm:hidden">Full site</span>
            <span className="hidden sm:inline">Show me everything</span>
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

      <div className="pt-10 sm:pt-14">
        <h1 className="display text-[clamp(3.25rem,10vw,6.5rem)]">Akhil Nishtala</h1>
        <p className="mt-4 text-[20px] sm:text-[24px] leading-snug font-medium max-w-[40rem]">
          Product designer for AI, Web3 and 0→1 products. Research to handoff, with the numbers to show for it.
        </p>
        <p className="mt-3 text-[15.5px] text-secondary">
          Based in India, working globally · Designing at Flyingduck · Open to freelance
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={EMAIL} className="h-12 px-6 rounded-xl bg-primary text-background text-[15px] font-semibold inline-flex items-center hover:opacity-85 transition-opacity">
            Email Akhil
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-xl border border-line text-[15px] font-semibold inline-flex items-center hover:bg-card transition-colors">
            CV
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-xl border border-line text-[15px] font-semibold inline-flex items-center hover:bg-card transition-colors">
            LinkedIn
          </a>
        </div>
      </div>

      <Block title="Results">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {highlights.map((item) => (
            <ResultCard key={`${item.slug}-${item.label}`} item={item} compact />
          ))}
        </div>
      </Block>

      <Block title="Work">
        <ol className="border-t border-line">
          {projects.map((project) => {
            const study = caseStudies[project.caseStudy];
            const result = study ? resultsOf(study.slug)[0] : null;
            return (
              <li key={project.id} className="border-b border-line">
                <a
                  href={study ? `#case-${study.slug}` : '#work'}
                  onClick={(event) => study && openCaseStudy(event, study.slug)}
                  className="group grid grid-cols-[1fr_auto] sm:grid-cols-[13rem_1fr_9rem_auto] items-center gap-x-5 gap-y-1 py-4"
                >
                  <span className="text-[17px] font-semibold">{project.title}</span>
                  <span className="hidden sm:block text-[15px] text-secondary">{project.shortDescription}</span>
                  <span className="hidden sm:block text-[14.5px] font-semibold">{result ? `${result.value} ${result.label.toLowerCase()}` : project.year}</span>
                  <FiArrowUpRight size={18} className="text-secondary group-hover:text-primary transition-colors" aria-hidden="true" />
                  <span className="sm:hidden col-span-2 text-[14.5px] text-secondary">
                    {project.shortDescription}
                    {result && <span className="block font-semibold text-primary">{result.value} {result.label.toLowerCase()}</span>}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </Block>

      <Block title="Experience">
        <ol className="border-t border-line">
          {experience.map((item) => (
            <li key={`${item.company}-${item.duration}`} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-5 py-3.5 border-b border-line">
              <span>
                <span className="text-[16px] font-semibold">{item.role}</span>
                <span className="text-secondary"> · {item.company}</span>
              </span>
              <span className="text-[14.5px] text-secondary">{item.duration}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Tools">
        {/* Single-letter names are icons still waiting for a proper name in portfolio.js */}
        <p className="text-[15.5px] leading-relaxed">
          {tools
            .map((tool) => tool.name)
            .filter((name) => name.length > 1)
            .join(', ')}
        </p>
      </Block>

      <div className="mt-14 rounded-2xl bg-primary text-background p-6 sm:p-10">
        <p className="heading text-[clamp(2rem,5vw,3.25rem)] max-w-[18ch]">That was 60 seconds. Worth a call?</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={EMAIL} className="h-12 px-6 rounded-xl bg-background text-primary text-[15px] font-semibold inline-flex items-center hover:opacity-85 transition-opacity">
            Email Akhil
          </a>
          <button
            type="button"
            onClick={exit}
            className="h-12 px-6 rounded-xl border border-background/30 text-[15px] font-semibold hover:bg-background/10 transition-colors"
          >
            See the full site
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default QuickView;
