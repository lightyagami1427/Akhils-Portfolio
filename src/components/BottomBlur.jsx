import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomBlur = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we are at or very near the bottom of the page
      const scrollPosition = Math.ceil(window.innerHeight + window.scrollY);
      const threshold = document.body.offsetHeight - 50; // trigger 50px before end

      if (scrollPosition >= threshold) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-40 backdrop-blur-[5px] bg-gradient-to-t from-black/10 to-transparent"
          style={{
            WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)",
            maskImage: "linear-gradient(to top, black 50%, transparent 100%)"
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default BottomBlur;
