import React from 'react';
import { motion } from 'framer-motion';

const StatementSection = () => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative max-w-6xl mx-auto py-24 px-16">
          
          {/* Top-Left Corner Border */}
          <div className="absolute top-0 left-0 w-32 h-32">
            <div className="absolute top-0 left-0 w-full h-full border-t-[3px] border-l-[3px] border-black rounded-tl-[100px]"></div>
          </div>

          {/* Bottom-Right Corner Border */}
          <div className="absolute bottom-0 right-0 w-32 h-32">
            <div className="absolute bottom-0 right-0 w-full h-full border-b-[3px] border-r-[3px] border-black rounded-br-[100px]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.2] text-[#A1A1A1] tracking-tight">
              Passionate about <span className="text-black">crafting intuitive</span> and engaging digital experiences. I design <span className="text-black">user-centered products</span> that balance creativity, usability, and meaningful impact.
            </h2>
            
            {/* Signature Badge / Cursor */}
            <div className="mt-16 flex justify-center md:justify-end md:mr-24 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                {/* Mouse Cursor Icon */}
                <div className="absolute -top-6 -left-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                    <path d="M5.662 2.621l14.462 14.461-7.231 2.41-2.41 7.231-4.821-24.102z" />
                  </svg>
                </div>
                
                {/* Pill Badge */}
                <div className="bg-[#333333] text-white px-8 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-xl border border-white/10">
                  Akhil Nishtala
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatementSection;
