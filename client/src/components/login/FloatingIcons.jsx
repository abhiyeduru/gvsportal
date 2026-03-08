import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, School, User, Monitor } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: BookOpen, x: 15, y: 20, delay: 0 },
    { Icon: GraduationCap, x: 85, y: 15, delay: 1 },
    { Icon: School, x: 10, y: 70, delay: 2 },
    { Icon: User, x: 90, y: 75, delay: 3 },
    { Icon: Monitor, x: 20, y: 45, delay: 4 },
  ];

  return (
    <div className="absolute inset-0">
      {icons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            scale: [0, 1.2, 1],
            rotate: [0, 10, -10, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            delay: delay * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;