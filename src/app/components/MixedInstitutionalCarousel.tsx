import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

import goodyearProductsImg from 'figma:asset/2e52c76fba273b14321fa4c14aafcbc421511df9.png';
import goodyearLogo from '../../imports/Goodyear_Tire_and_Rubber_Company-Logo.wine-1.svg';
import trackerThingsLogo from '../../imports/_versao-branca-sem-fundo_-TrackerThings-1.png';
import trackerDeviceImg from 'figma:asset/ea554afe6a3b099537a402fc3936e4a5d86faf3c.png';
import upperCarouselImg1 from '../../imports/banner-carga-24hPrancheta-1-copiar-1.png';
import upperCarouselImg2 from '../../imports/banner-carga-24hPrancheta-1.png';
import upperCarouselImg3 from '../../imports/banner-carga-24hPrancheta-2.png';

export function MixedInstitutionalCarousel() {
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const upperImg = React.useMemo(() => {
    const imgs = [upperCarouselImg1, upperCarouselImg2, upperCarouselImg3];
    return imgs[Math.floor(Math.random() * imgs.length)];
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / (width * 0.85));
    if (newIndex !== activeCard) {
      setActiveCard(newIndex);
    }
  };

  const cards = [
    {
      id: 'gy-1',
      type: 'goodyear',
      category: 'Produtos',
      title: 'Goodyear para quem vive na estrada',
      description: 'Conheça pneus desenvolvidos para durabilidade, economia e resistência.',
      img: goodyearProductsImg,
      buttonText: 'Ver produtos',
      logo: goodyearLogo,
      action: () => toast.info('Redirecionando para catálogo Goodyear...')
    },
    {
      id: 'tt-1',
      type: 'tracker',
      category: 'RASTREAMENTO',
      title: 'Não perca fretes por falta de rastreador',
      description: 'Ative e aumente suas chances de contratação.',
      img: trackerDeviceImg,
      buttonText: 'Ativar rastreador',
      logo: trackerThingsLogo,
      action: () => toast.info('Ativando rastreador TrackerThings...')
    },
    {
      id: 'up-1',
      type: 'upper',
      category: 'VALORIZAÇÃO',
      title: 'Seja um motorista mais valorizado',
      description: 'Ative seu Perfil Securitário e mostre confiança para quem contrata.',
      img: upperImg,
      buttonText: 'Saber mais',
      logo: null,
      action: () => toast.info('Conhecendo Perfil Securitário Upper...')
    }
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[14px] font-bold text-slate-900 dark:text-white">
          Destaques para sua jornada
        </h3>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.98 }}
              onClick={card.action}
              className={`relative flex-shrink-0 w-[85%] snap-start overflow-hidden rounded-[32px] shadow-xl cursor-pointer min-h-[220px] flex flex-col justify-between ${
                card.type === 'goodyear' 
                  ? 'bg-[#304aa0] text-white border-l-4 border-[#fedd00] p-6' 
                  : card.type === 'upper'
                  ? 'bg-black'
                  : 'bg-[#071325] dark:bg-[#020617] text-white border-l-4 border-[#04a4f5] p-6'
              }`}
            >
              {card.type === 'upper' ? (
                <ImageWithFallback 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <>
                  <div className="relative z-10 flex flex-col items-start">
                    {card.type === 'goodyear' ? (
                      <div className="flex items-center -mt-6 -mb-6">
                        <img src={card.logo!} alt="Logo" className="h-32 w-auto brightness-200 -ml-[16px]" />
                      </div>
                    ) : card.type === 'tracker' ? (
                      <img src={card.logo!} alt="Logo" className="h-10 w-auto object-contain -ml-1 mb-6 mt-2" />
                    ) : (
                      <div className="h-10 mb-6 mt-2" />
                    )}
                    
                    <div className="flex flex-col gap-1 w-full">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                        card.type === 'goodyear' ? 'text-[#fedd00]' : 'text-[#01a3f8]'
                      }`}>
                        {card.category}
                      </span>
                      <h4 className="text-[17px] font-bold leading-tight w-full">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/80 font-medium w-full leading-relaxed mt-2 line-clamp-2">
                      {card.description}
                    </p>
                    <div className="mt-4 -mx-8 w-[calc(100%+64px)]">
                      <ImageWithFallback src={card.img} alt={card.title} className="w-full h-24 object-cover object-center" />
                    </div>
                  </div>

                  <div className="flex mt-6 w-full">
                    <Button
                      variant="outline"
                      className={`border-none h-10 px-6 text-[12px] font-bold rounded-full transition-all group shadow-lg ${
                        card.type === 'goodyear' 
                          ? 'bg-[#fedd00] text-[#002d72] hover:bg-white hover:text-[#002d72]' 
                          : 'bg-[#01a3f8] text-white hover:bg-white hover:text-[#01a3f8] shadow-[#01a3f8]/20'
                      }`}
                    >
                      {card.buttonText}
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl ${
                    card.type === 'goodyear' ? 'bg-white/5' : 'bg-white/5'
                  }`} />
                  <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl ${
                    card.type === 'goodyear' ? 'bg-[#fedd00]/5' : 'bg-[#01a3f8]/10'
                  }`} />
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-1 mb-2">
          {cards.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCard === idx ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
