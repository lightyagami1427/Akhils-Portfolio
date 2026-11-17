import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import MoreWorkSection from './sections/MoreWorkSection';
import ToolsSection from './sections/ToolsSection';
import StatementSection from './sections/StatementSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import DesignTestSection from './sections/DesignTestSection';
import StickyNote from './components/StickyNote';
import ScrollMeter from './components/ScrollMeter';
import GlassesInspector from './components/GlassesInspector';
import CaseStudyPage from './pages/CaseStudyPage';
import { caseStudies } from './case-studies';
import ResultsSection from './sections/ResultsSection';
import QuickView from './sections/QuickView';
import { FiX } from 'react-icons/fi';

function App() {
  useSmoothScroll();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Simple hash routing: #case-planck opens a case study, anything else is the home page
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const study = route.startsWith('#case-') ? caseStudies[route.slice('#case-'.length)] : null;

  // Open case studies at the top, and land home links on their section
  useEffect(() => {
    if (study) {
      window.scrollTo(0, 0);
      return;
    }
    if (route.length > 1) {
      requestAnimationFrame(() => document.getElementById(route.slice(1))?.scrollIntoView());
    }
  }, [route, study]);

  const goHome = (section) => {
    window.location.hash = section;
  };

  // "In a hurry?" mode: a 60-second version of the whole site
  const [hurry, setHurry] = useState(false);
  const toggleHurry = () => {
    setHurry((previous) => !previous);
    window.scrollTo(0, 0);
  };

  // Inspect mode: shows the grid, spacing and type specs across the page
  const [glasses, setGlasses] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('glasses', glasses);
  }, [glasses]);

  const toggleGlasses = () => setGlasses((previous) => !previous);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="bg-background text-primary min-h-screen transition-colors duration-300 relative">
      {!glasses && !hurry && <ScrollMeter />}
      {glasses && (
        <>
          <GlassesInspector />
          <button
            type="button"
            onClick={toggleGlasses}
            className="fixed z-40 right-3 sm:right-5 bottom-3 sm:bottom-5 h-11 pl-4 pr-3 rounded-full bg-spec text-black text-[14px] font-semibold inline-flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:opacity-90"
          >
            Take off glasses <FiX size={16} aria-hidden="true" />
          </button>
        </>
      )}
      {study ? (
        <>
          <CaseStudyPage
            study={study}
            theme={theme}
            toggleTheme={toggleTheme}
            glasses={glasses}
            toggleGlasses={toggleGlasses}
            goHome={goHome}
          />
          <ContactSection />
        </>
      ) : hurry ? (
        <QuickView theme={theme} toggleTheme={toggleTheme} exit={toggleHurry} />
      ) : (
        <main>
          <HeroSection theme={theme} toggleTheme={toggleTheme} glasses={glasses} toggleGlasses={toggleGlasses} toggleHurry={toggleHurry} />
          <StickyNote color="yellow" tilt={-3} align="right" spacing="mt-14 -mb-4 sm:-my-10">
            They say AI replaces designers. So I turned myself into an AI designer, so I don&rsquo;t get replaced.
          </StickyNote>
          {/* Proof first */}
          <ResultsSection />
          <ProjectsSection />
          <StickyNote color="pink" tilt={2.5} align="left" spacing="-mt-8 mb-12 sm:-mt-12 sm:mb-16">
            Yes, I can make the logo bigger. No, I won&rsquo;t be happy about it.
          </StickyNote>
          <MoreWorkSection />
          <ExperienceSection />
          <StickyNote color="blue" tilt={-2} align="right">
            My love language is auto layout.
          </StickyNote>
          <StatementSection />
          {/* Then the fun */}
          <ToolsSection />
          <DesignTestSection />
          <StickyNote color="green" tilt={3} align="left">
            I can&rsquo;t unsee 7px where 8px should be. It&rsquo;s a gift and a curse.
          </StickyNote>
          <div className="h-10" aria-hidden="true" />
          <StickyNote color="violet" tilt={-2.5} align="center">
            final_v2_FINAL_final(3).fig is a naming habit I&rsquo;ve quit. Mostly.
          </StickyNote>
          <div className="h-16 sm:h-20" aria-hidden="true" />
          <ContactSection />
        </main>
      )}
    </div>
  );
}

export default App;
