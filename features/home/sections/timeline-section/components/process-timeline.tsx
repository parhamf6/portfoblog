// Timeline.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '@/hooks/useCountUp';

interface TimelineStat {
  label: string;
  value: number;
  suffix?: string;
}

interface TimelineStep {
  title: string;
  description: string;
  stats?: TimelineStat[];
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ steps, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 md:left-1/2"></div>
      
      {steps.map((step, index) => (
        <TimelineItem key={index} step={step} index={index} totalSteps={steps.length} />
      ))}
    </div>
  );
};

interface TimelineItemProps {
  step: TimelineStep;
  index: number;
  totalSteps: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, index, totalSteps }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const isLeft = index % 2 === 0;
  const isLast = index === totalSteps - 1;

  return (
    <div 
      ref={ref}
      className={`relative mb-12 md:mb-16 ${isLast ? 'mb-0' : ''}`}
    >
      {/* Timeline marker */}
      <div className="absolute left-4 transform -translate-x-1/2 md:left-1/2 z-10">
        <motion.div
          className="w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15,
            delay: 0.2
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-accent"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10,
              delay: 0.4
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className={`ml-16 md:ml-0 md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-2 text-accent">{step.title}</h3>
        <p className="text-muted-foreground mb-4">{step.description}</p>
        
        {step.stats && (
          <div className={`flex flex-wrap gap-4 ${isLeft ? 'md:justify-end' : ''}`}>
            {step.stats.map((stat, statIndex) => (
              <StatItem key={statIndex} stat={stat} inView={inView} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

interface StatItemProps {
  stat: TimelineStat;
  inView: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ stat, inView }) => {
  const count = useCountUp(stat.value, inView);

  return (
    <div className="bg-muted px-3 py-2 rounded-lg border border-border">
      <div className="text-accent font-bold text-lg">
        {count}{stat.suffix}
      </div>
      <div className="text-sm">{stat.label}</div>
    </div>
  );
};

export default Timeline;