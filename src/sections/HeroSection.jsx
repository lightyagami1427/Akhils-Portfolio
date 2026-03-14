import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import thumbImg from '../assets/Frame 10.png';
// Importing all rectangle assets for more variety
import img1 from '../assets/hero1.jpg';
import img2 from '../assets/hero2.jpg';
import img3 from '../assets/hero3.jpg';
import img4 from '../assets/hero4.jpg';
import img5 from '../assets/hero5.jpg';
import img7 from '../assets/hero7.jpg';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Creating a larger pool of images
  const archProjects = [img1, img2, img3, img4, img5, img7, img1, img2, img3, img4, img5, img7];

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-white overflow-hidden pt-6 px-10">

      {/* Top Navigation */}
      <div className="w-full flex justify-between items-start z-30 max-w-[1500px]">
        <div className="flex gap-8 sm:gap-20 md:gap-40 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-black text-black uppercase tracking-tight">INDIA BASED</span>
            <span className="text-[13px] text-zinc-400 font-medium tracking-tight">Working Globally</span>
          </div>
          <div className="hidden sm:flex flex-col gap-1">
            <span className="text-[13px] font-black text-black uppercase tracking-tight">DESIGNING AT</span>
            <span className="text-[13px] text-zinc-400 font-medium tracking-tight">Oddsmaster</span>
          </div>
          <div className="hidden md:flex flex-col gap-1">
            <span className="text-[13px] font-black text-black uppercase tracking-tight">FREELANCE AVAILABILITY</span>
            <span className="text-[13px] text-zinc-400 font-medium tracking-tight">Yes</span>
          </div>
        </div>
        <motion.a
          href="mailto:akhilnishtala14@gmail.com"
          whileHover={{ scale: 1.05, backgroundColor: "#333333" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1A1A1A] text-white px-6 sm:px-10 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-black/20 tracking-tight transition-colors duration-300"
        >
          Get in Touch
        </motion.a>
      </div>

      {/* Rotating Project Arch */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[1600px] h-[1450px] pointer-events-none z-10 flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="relative w-full h-full"
        >
          {archProjects.map((img, index) => {
            const totalItems = archProjects.length;
            const angle = (index * 360) / totalItems;
            const radius = 580;

            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 w-[185px] aspect-[10/14] rounded-[1.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.1)] border border-zinc-200 origin-center bg-white"
                style={{
                  marginLeft: '-92px',
                  marginTop: '-130px',
                  transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`
                }}
              >
                <img
                  src={img}
                  alt="Arch project"
                  className="w-full h-full object-cover object-top scale-[1.15]"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center mt-auto mb-16 w-full max-w-[1500px]">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-5xl font-serif italic mb-4 text-[#101010] text-center leading-[1.1] tracking-[-0.03em]"
        >
          Seriously a good designer
        </motion.h1>

        {/* The Signature Pill Card with Floating Menu */}
        <div className="relative">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-4 bg-[#1A1A1A] rounded-[20px] p-2 min-w-[180px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-50 overflow-hidden"
              >
                <a
                  href="https://www.linkedin.com/in/nishtala-venkata-akhil-8086a5225/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition-colors rounded-[14px] group"
                >
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[12px]">
                    <FaLinkedinIn className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[14px] font-bold uppercase tracking-wide">Linkedin</span>
                </a>
                <div className="h-[1px] bg-white/5 mx-2 my-1" />
                <a
                  href="https://drive.google.com/file/d/1_U4P4x5MTGIJlp2rCh--KleK5QEioKKl/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition-colors rounded-[14px] group"
                >
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[14px]">
                    <HiOutlineDownload className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[14px] font-bold uppercase tracking-wide">Download CV</span>
                </a>
              </motion.div>
            )}

          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#1A1A1A] rounded-[12px] p-3 pr-6 sm:pr-8 flex items-center justify-between gap-3 sm:gap-5 w-auto min-w-[300px] sm:min-w-[340px] md:min-w-[420px] shadow-[0_30px_70px_rgba(0,0,0,0.3)] cursor-default"
          >
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#222222] p-1 shadow-inner">
                <img src={thumbImg} alt="Avatar" className="w-full h-full object-cover rounded-md" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-black text-white tracking-[0.02em] uppercase leading-none mb-1">AKHIL NISHTALA</h3>
                <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold tracking-[0.02em] uppercase opacity-80 truncate">
                  PRODUCT DESIGNER, CREATIVE DESIGNER, UI UX DES...
                </p>
              </div>
            </div>

            <div className="flex items-center pl-4 sm:pl-6 border-l border-white/10 py-1">
              {/* Interactive Menu Icon */}
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5 cursor-pointer group"
              >
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-[2.5px] bg-white rounded-full transition-colors group-hover:bg-zinc-400"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-[2.5px] bg-white rounded-full transition-colors group-hover:bg-zinc-400"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-[2.5px] bg-white rounded-full transition-colors group-hover:bg-zinc-400"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-between w-full max-w-[550px] mt-8 px-2">
          <div className="flex items-center gap-3 text-[12px] font-black text-black cursor-pointer uppercase tracking-tight hover:translate-y-1 transition-transform">
            <span className="text-lg">↓</span> SCROLL
          </div>
          <div className="flex items-center gap-3 text-[12px] font-black text-black cursor-pointer uppercase tracking-tight hover:translate-y-1 transition-transform">
            COOL STUFF <span className="text-lg">↓</span>
          </div>
        </div>
      </div>

      {/* Fade the very bottom overlap */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
