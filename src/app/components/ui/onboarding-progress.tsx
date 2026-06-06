import React from 'react';
import { motion } from 'motion/react';
import { cn } from './utils';

interface OnboardingProgressProps {
  step: number;
  totalSteps?: number;
  title: string;
  className?: string;
  trackClassName?: string;
}

export function OnboardingProgress({ 
  step, 
  totalSteps = 7, 
  title,
  className,
  trackClassName
}: OnboardingProgressProps) {
  const progressPercentage = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className={cn("w-full px-6 text-slate-900 dark:text-white transition-colors duration-300", className)}>
      <div className="flex justify-between items-end mb-1.5">
        <h2 className="text-xs font-bold tracking-wide uppercase text-inherit opacity-80">
          {title}
        </h2>
      </div>
      <div className={cn("h-1 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden transition-colors duration-300", trackClassName)}>
        <motion.div 
          className="h-full bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
