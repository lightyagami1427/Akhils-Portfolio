import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
            <span className="font-bold tracking-tight text-white">akhil nishtala</span>
            <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">product designer</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-medium text-secondary">
            <a href="#projects" className="hover:text-white transition-colors">Selected work</a>
            <a href="#about" className="hover:text-white transition-colors">My story</a>
          </div>

          <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Hire me
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
