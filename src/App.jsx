import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import ToolsSection from './sections/ToolsSection';
import StatementSection from './sections/StatementSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

import BottomBlur from './components/BottomBlur';

function App() {
  useSmoothScroll();

  return (
    <div className="bg-white text-black min-h-screen selection:bg-black selection:text-white relative">
      <BottomBlur />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ToolsSection />
        <StatementSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
