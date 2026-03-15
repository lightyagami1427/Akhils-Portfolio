import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Product Designer", "Creative Designer", "UI UX Designer"];

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`mx-auto flex items-center justify-between glass px-8 py-3 rounded-full transition-all duration-300 ${
          scrolled ? 'max-w-4xl opacity-100' : 'max-w-full opacity-90'
        }`}>
          <div className="flex flex-col leading-none">
            <span className="font-bold tracking-tight text-primary">akhil nishtala</span>
            <div className="h-[12px] overflow-hidden mt-1 relative w-[130px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-[10px] uppercase tracking-widest text-secondary absolute left-0 whitespace-nowrap"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-medium text-secondary">
            <a href="#projects" className="hover:text-primary transition-colors">Selected work</a>
            <a href="#about" className="hover:text-primary transition-colors">My story</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary flex items-center justify-center border border-primary/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>
            <a 
              href="mailto:akhilnishtala14@gmail.com"
              className="inline-block bg-primary text-background px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform active:scale-95 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]"
            >
              Hire me
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
