import React from 'react';
import { motion } from 'motion/react';
import logo from 'figma:asset/2f91b80feed9556632a158b97f45c755e649b888.png';
import truckImage from 'figma:asset/adda87ad29a91dc975a42ba5060bd5058fbe3066.png';

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 font-sans">
      
      {/* Background Noise/Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Main Content Block: Logo + Text - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center px-8 w-full z-10"
      >
        <div className="flex flex-col items-center max-w-xs text-center -mt-32">
            {/* Logo */}
            <div className="w-36 h-auto mb-12 drop-shadow-lg">
                <img 
                    src={logo} 
                    alt="Carga24h" 
                    className="w-full h-auto object-contain"
                />
            </div>
            
            {/* Text Group */}
            <div className="space-y-3">
                <h1 className="text-white text-2xl font-bold tracking-tight">
                    O app amigo do caminhoneiro
                </h1>
                <p className="text-white/90 text-base font-medium leading-relaxed">
                    e parceiro dos Operadores Logísticos
                </p>
            </div>

            {/* Waze-Style GPS Navigation - Gradient Trail & Faster */}
            <div className="mt-8 flex justify-center perspective-500">
                {/* Container - No Shadow, No Pulse */}
                <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden relative bg-white/5 border border-white/5 backdrop-blur-sm">
                    
                    <svg width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                        <defs>
                            <style>
                                {`.map-block { fill: white; fill-opacity: 0.05; stroke: white; stroke-opacity: 0.25; stroke-width: 0.8; }`}
                            </style>
                            
                            {/* Glow Filter for Car and Route */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* The Long Route Path */}
                            <path 
                                id="cityDrivePath" 
                                d="M 50 350 V 150 H 150 V 50 H 50 V -50"
                            />
                        </defs>

                        {/* MOVING WORLD GROUP */}
                        <motion.g
                            initial={{ x: 50, y: -250 }}
                            animate={{ 
                                x: [50, 50, -50, -50, 50, 50],
                                y: [-250, -50, -50, 50, 50, 150]
                            }}
                            transition={{
                                duration: 2.5,
                                ease: "linear",
                                repeat: Infinity,
                                repeatDelay: 0,
                                times: [0, 0.3333, 0.5, 0.6667, 0.8333, 1]
                            }}
                        >
                            {/* --- UNIFORM SQUARE GRID (80x80 blocks) --- */}
                            {/* Column 1 (Left) */}
                            <rect x="-40" y="-140" width="80" height="80" rx="12" className="map-block" />
                            <rect x="-40" y="-40" width="80" height="80" rx="12" className="map-block" />
                            <rect x="-40" y="60" width="80" height="80" rx="12" className="map-block" />
                            <rect x="-40" y="160" width="80" height="80" rx="12" className="map-block" />
                            <rect x="-40" y="260" width="80" height="80" rx="12" className="map-block" />

                            {/* Column 2 (Center) */}
                            <rect x="60" y="-140" width="80" height="80" rx="12" className="map-block" />
                            <rect x="60" y="-40" width="80" height="80" rx="12" className="map-block" />
                            <rect x="60" y="60" width="80" height="80" rx="12" className="map-block" />
                            <rect x="60" y="160" width="80" height="80" rx="12" className="map-block" />
                            <rect x="60" y="260" width="80" height="80" rx="12" className="map-block" />

                            {/* Column 3 (Right) */}
                            <rect x="160" y="-140" width="80" height="80" rx="12" className="map-block" />
                            <rect x="160" y="-40" width="80" height="80" rx="12" className="map-block" />
                            <rect x="160" y="60" width="80" height="80" rx="12" className="map-block" />
                            <rect x="160" y="160" width="80" height="80" rx="12" className="map-block" />
                            <rect x="160" y="260" width="80" height="80" rx="12" className="map-block" />


                            {/* Active Route Line - Solid & Glowing */}
                            <motion.path 
                                d="M 50 350 V 150 H 150 V 50 H 50 V -50"
                                stroke="white" 
                                strokeWidth="6" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ 
                                    duration: 2.5, 
                                    ease: "linear",
                                    repeat: Infinity,
                                    repeatDelay: 0,
                                    times: [0, 0.3333, 0.5, 0.6667, 0.8333, 1]
                                }}
                            />
                            
                             {/* Destination Pin - Larger */}
                            <g transform="translate(50, -50)">
                                <path 
                                    transform="translate(-21, -60) scale(3.5)" 
                                    d="M6 0C2.7 0 0 2.7 0 6C0 10.5 6 17 6 17C6 17 12 10.5 12 6C12 2.7 9.3 0 6 0ZM6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8Z" 
                                    fill="white" 
                                    fillOpacity="0.9"
                                />
                            </g>
                        </motion.g>

                        {/* --- HUD ELEMENTS (Fixed on Screen) --- */}
                        
                        {/* The "Car" Arrow - Larger & Glowing */}
                        <g transform="translate(100, 100)">
                            {/* Radar Scan Effect */}
                            <circle r="20" fill="url(#radarGradient)" className="animate-spin-slow opacity-15" />
                            
                            {/* Car Core - Larger & Glowing */}
                            <circle r="6" fill="white" className="z-10" filter="url(#glow)" />
                            <circle r="14" fill="white" fillOpacity="0.1">
                                <animate attributeName="r" values="8;16;8" dur="1.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        </g>

                        <defs>
                             <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Bottom Section: Truck Illustration */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
         className="absolute bottom-0 left-0 w-full z-10 flex justify-center items-end pb-4"
      >
         <div className="relative w-full max-w-sm">
            {/* Yellow Glow behind truck */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-[90%] bg-amber-400/70 blur-[130px] rounded-full -z-10" />
            
            {/* Strong Concentrated Base Blur */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120%] h-[15%] bg-amber-400 blur-[50px] rounded-[100%] opacity-100 -z-20" />
            
            <img 
              src={truckImage} 
              alt="Logística e Transporte" 
              className="w-full h-auto object-contain drop-shadow-2xl opacity-80 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] scale-110 origin-bottom"
            />
            {/* Ground shadow/blur for integration */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-black/20 blur-3xl rounded-full" />
         </div>
      </motion.div>
    </div>
  );
}
