import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Layers, 
  Navigation, 
  List, 
  Pin, 
  AlertTriangle,
  Locate,
  RotateCw,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import mapImage from 'figma:asset/f5919bf83eb5c5f96d24b0c55dfc8ccd71d86c2d.png';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function TripMode() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#0f172a] font-sans relative overflow-hidden transition-colors duration-300">
      
      {/* --- TOP FLOATING HEADER (Pill Style) --- */}
      <div className="absolute top-4 left-4 right-4 z-50">
        <div className="bg-white dark:bg-[#1e293b] rounded-full shadow-lg border border-slate-200 dark:border-slate-800 p-2 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 flex items-center justify-center gap-3 overflow-hidden px-2">
             <div className="flex justify-end shrink-0">
                <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Campinas</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">6 h 37 min</span>
                </div>
             </div>
             
             <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
             
             <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">Rio de Janeiro</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">501 km</span>
             </div>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white shrink-0 border border-slate-200 dark:border-slate-800"
          >
             <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* --- MAP AREA --- */}
      <div className="relative flex-1 bg-slate-100 dark:bg-slate-900 overflow-hidden">
         {/* Map Background */}
         <div 
            className="absolute inset-0 z-0" 
            style={{
                backgroundImage: `url(${mapImage})`,
                backgroundSize: '120%',
                backgroundPosition: 'right top',
                backgroundRepeat: 'no-repeat',
            }}
         />
         {/* Overlay to darken map in dark mode if needed */}
         <div className="absolute inset-0 bg-slate-900/0 dark:bg-slate-950/20 pointer-events-none transition-colors" />

         {/* Map Controls */}
         <div className="absolute top-4 right-4 z-20">
             <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-white dark:bg-[#1e293b] shadow-md border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                 <Layers className="w-5 h-5" />
             </Button>
         </div>

         {/* Street View Preview */}
         <div className="absolute bottom-80 left-4 z-20">
             <div className="w-12 h-12 rounded-lg bg-orange-500 border-2 border-white dark:border-[#1e293b] shadow-lg overflow-hidden relative">
                 <img src={mapImage} className="w-full h-full object-cover opacity-80" />
                 <RotateCw className="w-4 h-4 text-white absolute bottom-1 right-1" />
             </div>
         </div>

         {/* Compass / Location */}
         <div className="absolute bottom-80 right-4 z-20">
             <div className="flex flex-col gap-3">
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-white dark:bg-[#1e293b] shadow-md border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <Locate className="w-6 h-6" />
                </Button>
             </div>
         </div>
      </div>

      {/* --- BOTTOM SHEET --- */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-5px_25px_rgba(0,0,0,0.4)] z-50 animate-in slide-in-from-bottom duration-300 border-t dark:border-slate-800">
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-4 pb-2">
             <div className="w-10 h-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
          </div>

          <div className="px-6 pb-8">
             {/* Time & Distance Header */}
             <div className="flex items-center gap-2 mb-3">
                 <h1 className="text-3xl font-bold text-slate-900 dark:text-white">6 h 37 min</h1>
                 <span className="text-xl text-slate-500 dark:text-slate-400 font-normal">(501 km)</span>
             </div>

             {/* Warnings / Context */}
             <div className="flex items-center gap-2 mb-8">
                 <div className="flex -space-x-1">
                     <AlertTriangle className="w-4 h-4 text-orange-500" />
                 </div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    Rota mais rápida agora, evita via interditada
                 </p>
             </div>

             {/* Action Buttons */}
             <div className="flex flex-col gap-5">
                 <div className="flex items-center gap-3">
                     <Button 
                        variant="outline" 
                        className="flex-1 rounded-full h-12 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-base gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                     >
                        <List className="w-5 h-5" />
                        Etapas
                     </Button>

                     <Button 
                        onClick={() => navigate('/trip/details')}
                        className="flex-1 rounded-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base gap-2 shadow-lg shadow-orange-500/20"
                     >
                        <Navigation className="w-5 h-5 fill-current" />
                        Iniciar
                     </Button>
                 </div>

                 <Button 
                    variant="ghost" 
                    onClick={() => navigate('/trip/details')}
                    className="w-full h-auto py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm hover:bg-transparent"
                 >
                    Ver detalhes da viagem
                 </Button>
             </div>
          </div>
      </div>

    </div>
  );
}
