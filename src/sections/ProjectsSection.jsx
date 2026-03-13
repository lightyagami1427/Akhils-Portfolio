import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolio';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 text-black bg-white">
      <div className="container mx-auto px-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-40 group"
          >
            {/* Project Image Area (Full width with side bars effect) */}
            <div className="relative w-full aspect-[21/9] mb-12 overflow-hidden rounded-[2.5rem] bg-[#E5E5E5] flex items-center justify-center border border-zinc-200">
              <motion.img
                src={project.image}
                alt={project.title}
                transition={{ duration: 1 }}
                className="w-full h-full object-cover scale-[1.1]"
              />
            </div>

            {/* Project Info Block (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-2">
              {/* Column 1: Title & Tags */}
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-[1.15]">
                  {project.title} — {project.shortDescription || "Brand and launch website for performance-focused health lab"}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 bg-[#EDEDED] text-black font-black rounded-lg border border-black/5 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 2: Description */}
              <div className="md:col-span-1">
                <p className="text-black/60 text-sm leading-relaxed mb-6 font-medium">
                  The website was designed to capture early demand and build credibility before launch.
                </p>
                <p className="text-black/60 text-sm leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              {/* Column 3: Industry */}
              <div className="md:col-span-1 md:text-right">
                <p className="text-[10px] uppercase font-black tracking-widest text-black/40 mb-2">INDUSTRY</p>
                <p className="text-lg font-bold text-black italic">{project.industry}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
