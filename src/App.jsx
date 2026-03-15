import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import ToolsSection from './sections/ToolsSection';
import StatementSection from './sections/StatementSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

import BottomBlur from './components/BottomBlur';

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

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="bg-background text-primary min-h-screen transition-colors duration-300 relative">
      <BottomBlur />
      <main>
        <HeroSection theme={theme} toggleTheme={toggleTheme} />
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
