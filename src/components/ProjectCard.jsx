import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2.5rem] cursor-pointer"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover transition-transform"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-sm font-medium text-secondary mb-2 block">{project.category}</span>
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <div className="w-12 h-1 bg-white rounded-full"></div>
        </motion.div>
      </div>

      {/* Fixed Title for mobile or always visible */}
      <div className="mt-6 px-4 pb-8 md:hidden">
        <span className="text-sm text-secondary">{project.category}</span>
        <h3 className="text-xl font-bold mt-1">{project.title}</h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
