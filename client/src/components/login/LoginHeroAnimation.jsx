import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import FloatingIcons from './FloatingIcons';
import NetworkAnimation from './NetworkAnimation';

const LoginHeroAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div 
      className="relative w-full h-full flex-col bg-gradient-to-br from-[#5B5FEF] to-[#7A6CFF] p-10 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient Background with Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5B5FEF] via-[#6B63FF] to-[#7A6CFF]" />
      
      {/* Soft Glow Gradients */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '1s' }} />
      
      {/* Glass Effect Circles */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full backdrop-blur-sm"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-32 left-16 w-24 h-24 border border-white/20 rounded-full backdrop-blur-sm"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full backdrop-blur-sm"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Network Animation */}
        <div className="mb-8">
          <NetworkAnimation />
        </div>

        {/* Center Message */}
        <motion.div
          className="text-center max-w-md px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        >
          {/* GravITy Cloud Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <motion.svg 
              width="120" 
              height="120" 
              viewBox="0 0 400 400" 
              className="drop-shadow-2xl"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {/* Tree trunk/stem */}
              <motion.rect 
                x="190" 
                y="280" 
                width="20" 
                height="60" 
                fill="white" 
                opacity="0.9"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              
              {/* Leaves */}
              <motion.ellipse 
                cx="160" 
                cy="200" 
                rx="15" 
                ry="25" 
                fill="white" 
                opacity="0.8" 
                transform="rotate(-30 160 200)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              />
              <motion.ellipse 
                cx="240" 
                cy="200" 
                rx="15" 
                ry="25" 
                fill="white" 
                opacity="0.8" 
                transform="rotate(30 240 200)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              />
              
              {/* Main cloud/tree shape */}
              <motion.ellipse 
                cx="200" 
                cy="180" 
                rx="120" 
                ry="100" 
                fill="white" 
                opacity="0.9"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              
              {/* Grass/roots at bottom */}
              <motion.path 
                d="M 120 320 Q 130 310 140 320 Q 150 310 160 320 Q 170 310 180 320 Q 190 310 200 320 Q 210 310 220 320 Q 230 310 240 320 Q 250 310 260 320 Q 270 310 280 320" 
                stroke="white" 
                strokeWidth="3" 
                fill="none" 
                opacity="0.7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.6 }}
              />
            </motion.svg>
          </motion.div>

          <motion.h1
            className="text-6xl font-bold text-white mb-4 tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            GravIIty
          </motion.h1>
          
          <motion.div
            className="text-xl font-medium text-white/90 mb-6 tracking-wide"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Connect • Hire • Grow
          </motion.div>
          
          <motion.p
            className="text-lg text-white/80 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            The modern platform where schools discover the best teachers
          </motion.p>
        </motion.div>

        {/* Interactive Elements */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Interactive Cursor Effect */}
      <motion.div
        className="absolute w-4 h-4 bg-white/30 rounded-full pointer-events-none z-20"
        style={{
          left: mousePosition.x * 100 + '%',
          top: mousePosition.y * 100 + '%',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default LoginHeroAnimation;