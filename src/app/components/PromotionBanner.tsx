import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AspectRatio } from './ui/aspect-ratio';

interface PromotionBannerProps {
  onClick?: () => void;
  image?: string;
  className?: string;
}

export function PromotionBanner({ onClick, image, className }: PromotionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className={`w-full cursor-pointer group ${className || ''}`}
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-[0.98]">
        <AspectRatio ratio={3 / 1}>
          <ImageWithFallback
            src={image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"}
            alt="Promoção"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
    </motion.div>
  );
}
