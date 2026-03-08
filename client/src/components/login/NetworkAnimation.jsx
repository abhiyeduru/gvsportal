import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, School, Users, BookOpen, GraduationCap } from 'lucide-react';

const NetworkAnimation = () => {
  const [connections, setConnections] = useState([]);
  const [activeNodes, setActiveNodes] = useState(new Set());

  const nodes = [
    { id: 'teacher1', Icon: User, x: 25, y: 35, type: 'teacher', label: 'Teacher' },
    { id: 'teacher2', Icon: GraduationCap, x: 75, y: 30, type: 'teacher', label: 'Professor' },
    { id: 'school1', Icon: School, x: 50, y: 50, type: 'school', label: 'School' },
    { id: 'students1', Icon: Users, x: 30, y: 70, type: 'students', label: 'Students' },
    { id: 'students2', Icon: BookOpen, x: 70, y: 75, type: 'students', label: 'Classes' },
  ];

  const nodeConnections = [
    { from: 'teacher1', to: 'school1' },
    { from: 'teacher2', to: 'school1' },
    { from: 'school1', to: 'students1' },
    { from: 'school1', to: 'students2' },
    { from: 'teacher1', to: 'students1' },
    { from: 'teacher2', to: 'students2' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prev => {
        const newConnections = [...prev];
        const randomConnection = nodeConnections[Math.floor(Math.random() * nodeConnections.length)];
        
        // Add new connection
        if (!newConnections.find(conn => 
          conn.from === randomConnection.from && conn.to === randomConnection.to
        )) {
          newConnections.push({ 
            ...randomConnection, 
            id: Date.now(),
            timestamp: Date.now()
          });
        }
        
        // Remove old connections (keep last 4)
        return newConnections
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 4);
      });

      // Activate nodes randomly
      setActiveNodes(prev => {
        const newActive = new Set(prev);
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        newActive.add(randomNode.id);
        
        // Keep only recent active nodes
        if (newActive.size > 3) {
          const nodeArray = Array.from(newActive);
          newActive.clear();
          nodeArray.slice(-3).forEach(id => newActive.add(id));
        }
        
        return newActive;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (type, isActive) => {
    const baseColors = {
      teacher: isActive ? 'fill-blue-300' : 'fill-blue-400/80',
      school: isActive ? 'fill-purple-300' : 'fill-purple-400/80',
      students: isActive ? 'fill-green-300' : 'fill-green-400/80',
    };
    return baseColors[type] || 'fill-white/80';
  };

  const getConnectionPath = (from, to) => {
    const fromNode = nodes.find(n => n.id === from);
    const toNode = nodes.find(n => n.id === to);
    
    if (!fromNode || !toNode) return '';
    
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2 - 8;
    
    return `M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-96 h-96" viewBox="0 0 100 100">
        {/* Connection Lines */}
        {connections.map((connection, index) => (
          <motion.path
            key={connection.id}
            d={getConnectionPath(connection.from, connection.to)}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="2,2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 0.6],
              strokeDashoffset: [0, -4]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 3 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node, index) => {
          const isActive = activeNodes.has(node.id);
          return (
            <motion.g key={node.id}>
              {/* Node Background */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                className={getNodeColor(node.type, isActive)}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isActive ? [1, 1.4, 1.2] : [1, 1.1, 1],
                  opacity: isActive ? [0.8, 1, 0.9] : [0.7, 0.8, 0.7]
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Pulse Effect */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill="rgba(255, 255, 255, 0.3)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 3, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Icon */}
              <foreignObject
                x={node.x - 2}
                y={node.y - 2}
                width="4"
                height="4"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <node.Icon className="w-2 h-2 text-white" />
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
        
        {/* Central Hub Glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="rgba(255, 255, 255, 0.1)"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};

export default NetworkAnimation;