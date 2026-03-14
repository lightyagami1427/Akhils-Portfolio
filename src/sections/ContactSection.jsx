import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', url: '#' },
    { name: 'Dribbble', url: '#' },
    { name: 'Twitter (X)', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Read.cv', url: '#' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="contact" className="relative bg-white pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-10">
        
        {/* Main CTA Area */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Available for new projects
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-serif italic text-black leading-[1] tracking-tight mb-12"
          >
            Let's create something <br />
            <span className="text-zinc-300">extraordinary.</span>
          </motion.h2>

          <motion.a
            href="mailto:akhilnishtala14@gmail.com"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative inline-flex items-center gap-4 bg-[#1A1A1A] text-white px-12 py-6 rounded-full text-lg font-bold shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-tighter">Get In Touch</span>
            <motion.span 
              className="relative z-10 text-2xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.a>
        </div>

        {/* Footer Links & Info */}
        <div className="border-t border-zinc-100 pt-16 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="flex flex-col gap-6 max-w-sm">
            <h3 className="text-xl font-black uppercase tracking-tight text-black">AKHIL NISHTALA</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Based in India, working with clients globally to build digital products that feel as good as they look.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-10">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Socials</span>
              <ul className="flex flex-col gap-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://www.linkedin.com/in/nishtala-venkata-akhil-8086a5225/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">LinkedIn</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://dribbble.com/akhilnishtala" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">Dribbble</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://x.com/Akhilnishtala" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">Twitter</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://www.instagram.com/___.___akhil___.___/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">Instagram</a>
                </motion.li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact</span>
              <ul className="flex flex-col gap-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="mailto:akhilnishtala14@gmail.com" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">Email</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://t.me/akhilnishtala" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">Telegram</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://wa.me/7337590891" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">WhatsApp</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="tel:+917337590891" className="text-sm font-bold text-black hover:text-zinc-500 transition-colors">+91 7337 590 891</a>
                </motion.li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Location</span>
              <p className="text-sm font-bold text-black">Hyderabad, India <br /> GMT +5:30</p>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="mt-32 pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
          <p>© {currentYear} ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-8">
            <motion.p whileHover={{ color: '#000' }} className="cursor-pointer">CURATED BY AKHIL</motion.p>
            <motion.p 
              onClick={scrollToTop}
              whileHover={{ color: '#000' }} 
              className="cursor-pointer"
            >
              BACK TO TOP ↑
            </motion.p>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-zinc-50 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
    </footer>
  );
};

export default ContactSection;
