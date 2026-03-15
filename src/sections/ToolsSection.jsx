import React from 'react';
import { motion } from 'framer-motion';
import { tools } from '../data/portfolio';
import avatar from '../assets/avatar.png';

const ToolsSection = () => {
  return (
    <section className="py-4 bg-background transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Icons Grid Area */}
          <div className="flex-[1.5]">
            <div className="flex items-center gap-3 mb-16">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <h2 className="text-xs font-black tracking-[0em] uppercase text-primary">
                TOOLS THAT WILL SEE MY FACE DAILY
              </h2>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-7 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="w-20 h-20 flex items-center justify-center transition-all duration-300 group bg-card rounded-2xl border border-primary/5 hover:border-primary/20"
                >
                  <motion.img
                    src={tool.iconImg}
                    alt={tool.name}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Large Avatar on Right */}
          <div className="flex-1 w-full flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-[500px]"
            >
              <motion.img
                src={avatar}
                alt="Avatar with headphones"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
