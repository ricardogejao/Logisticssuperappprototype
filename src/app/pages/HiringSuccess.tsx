import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CheckCircle2, MapPin, Calendar, ArrowRight, Home, Plus, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { MOCK_OFFERS } from '../data/mocks';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import goodyearProductsImg from 'figma:asset/2e52c76fba273b14321fa4c14aafcbc421511df9.png';
import goodyearDealerImg from 'figma:asset/9cadb0362cb5303f55d8c3a20464041c00f2df14.png';
import goodyearLogo from '../../imports/Goodyear_Tire_and_Rubber_Company-Logo.wine-1.svg';
import trackerThingsLogo from '../../imports/_versao-branca-sem-fundo_-TrackerThings-1.png';
import trackerDeviceImg from 'figma:asset/ea554afe6a3b099537a402fc3936e4a5d86faf3c.png';
import trackerSecurityImg from '../../imports/image-11.png';
import trackerActivationImg from '../../imports/image-12.png';
import trackerCardImg1 from '../../imports/image-9.png';
import upperCarouselImg1 from '../../imports/banner-carga-24hPrancheta-1-copiar-1.png';
import upperCarouselImg2 from '../../imports/banner-carga-24hPrancheta-1.png';
import upperCarouselImg3 from '../../imports/banner-carga-24hPrancheta-2.png';
import { useBannerMode } from '../hooks/useBannerMode';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function HiringSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = MOCK_OFFERS.find(o => o.id === id);
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { bannerMode } = useBannerMode();

  const upperImg = React.useMemo(() => {
    const imgs = [upperCarouselImg1, upperCarouselImg2, upperCarouselImg3];
    return imgs[Math.floor(Math.random() * imgs.length)];
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / (width * 0.8));
    if (newIndex !== activeCard) {
      setActiveCard(newIndex);
    }
  };

  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#f97316']
    });
  }, []);

  const handleFinish = () => {
    localStorage.setItem('PROTOTYPE_TRIP_ACTIVE', 'true');
    localStorage.setItem('PROTOTYPE_TRIP_STATUS', 'Contratada');
    navigate('/home');
  };

  const handleDetails = () => {
    localStorage.setItem('PROTOTYPE_TRIP_ACTIVE', 'true');
    localStorage.setItem('PROTOTYPE_TRIP_STATUS', 'Contratada');
    navigate('/trip/details');
  };

  const handleAddMore = () => {
    if (!offer) return;
    
    // Construct search params to pre-fill the marketplace
    // We use the same origin and destination to find matching routes
    const origin = `${offer.origin}, ${offer.originState}`;
    const destination = `${offer.destination}, ${offer.destinationState}`;
    
    // Navigate to marketplace with pre-filled filters
    navigate(`/marketplace?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
  };

  if (!offer) return null;

  // Calculate Occupation Logic (Item 9.22 requirement)
  const activeVehicle = { weight: 25, volume: 90 };
  const weightPercent = (offer.weightVal / activeVehicle.weight) * 100;
  const volumePercent = offer.volume ? (offer.volume / activeVehicle.volume) * 100 : 0;
  // Occupation is the higher percentage between weight and volume
  const occupation = Math.round(Math.max(weightPercent, volumePercent));
  
  // Show "Add More" button only if occupation is less than 95%
  const showAddMore = occupation < 95;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Contratação Confirmada!</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mb-10">
            Parabéns! Você garantiu este frete. Agora é só se preparar para a viagem.
        </p>

        {/* Institutional Carousel */}
        <div className="w-full max-w-sm">
            <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-4 px-1">
                {bannerMode === 'goodyear' 
                  ? 'Produtos e serviços para quem vive na estrada' 
                  : bannerMode === 'trackerthings' 
                  ? 'Mais controle e segurança para sua viagem'
                  : 'Valorização e confiança na contratação'}
            </h3>

            <div className="relative">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto pb-6 snap-x snap-mandatory gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {bannerMode === 'goodyear' ? (
                        <>
                            {/* Card 1 - Produtos Goodyear */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/marketplace')}
                                className="relative flex-shrink-0 w-full snap-start overflow-hidden rounded-[32px] bg-[#304aa0] text-white shadow-xl border-l-4 border-[#fedd00] cursor-pointer p-6 min-h-[210px] flex flex-col justify-between"
                            >
                                <div className="relative z-10 flex flex-col items-start gap-2">
                                    <div className="flex items-center -mt-6 -mb-6">
                                        <img src={goodyearLogo} alt="Goodyear" className="h-32 w-auto brightness-200 transition-transform hover:scale-105 -ml-[16px]" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold text-[#fedd00] uppercase tracking-[0.2em]">
                                            Produtos
                                        </span>
                                        <h4 className="text-[18px] font-bold leading-tight max-w-[200px]">
                                            Goodyear para quem vive na estrada
                                        </h4>
                                    </div>
                                    <p className="text-[12px] text-white/80 font-medium max-w-[220px] leading-relaxed mt-1">
                                        Conheça pneus desenvolvidos para durabilidade, economia e resistência.
                                    </p>
                                    <div className="mt-4 -mx-8">
                                        <img src={goodyearProductsImg} alt="Pneus Goodyear" className="w-full h-24 object-cover object-center" />
                                    </div>
                                </div>

                                <div className="flex mt-6">
                                    <Button
                                        variant="outline"
                                        className="bg-[#fedd00] border-none text-[#002d72] hover:bg-white hover:text-[#002d72] h-10 px-6 text-[12px] font-bold rounded-full transition-all group"
                                    >
                                        Ver produtos
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fedd00]/5 rounded-full blur-3xl" />
                            </motion.div>

                            {/* Card 2 - Rede de Revendas */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/marketplace')}
                                className="relative flex-shrink-0 w-full snap-start overflow-hidden rounded-[32px] bg-[#304aa0] text-white shadow-xl border-l-4 border-[#fedd00] cursor-pointer p-6 min-h-[210px] flex flex-col justify-between"
                            >
                                <div className="relative z-10 flex flex-col items-start gap-2">
                                    <div className="flex items-center -mt-6 -mb-6">
                                        <img src={goodyearLogo} alt="Goodyear" className="h-32 w-auto brightness-200 transition-transform hover:scale-105 -ml-[16px]" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold text-[#fedd00] uppercase tracking-[0.2em]">
                                            Rede
                                        </span>
                                        <h4 className="text-[18px] font-bold leading-tight max-w-[240px]">
                                            Encontre revendas <span className="whitespace-nowrap">Goodyear perto de você</span>
                                        </h4>
                                    </div>
                                    <p className="text-[12px] text-white/80 font-medium max-w-[220px] leading-relaxed mt-1">
                                        Localize serviços e pontos de venda próximos à sua rota.
                                    </p>
                                    <div className="mt-4 -mx-8">
                                        <img src={goodyearDealerImg} alt="Atendimento Goodyear" className="w-full h-24 object-cover object-center" />
                                    </div>
                                </div>

                                <div className="flex mt-6">
                                    <Button
                                        variant="outline"
                                        className="bg-[#fedd00] border-none text-[#002d72] hover:bg-white hover:text-[#002d72] h-10 px-6 text-[12px] font-bold rounded-full transition-all group"
                                    >
                                        Encontrar revendas
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fedd00]/5 rounded-full blur-3xl" />
                            </motion.div>
                        </>
                    ) : bannerMode === 'trackerthings' ? (
                        <>
                            {/* TrackerThings Card 1 - Rastreamento */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/marketplace')}
                                className="relative flex-shrink-0 w-full snap-start overflow-hidden rounded-[32px] bg-[#071325] dark:bg-[#020617] text-white shadow-xl border-l-4 border-[#04a4f5] cursor-pointer p-6 min-h-[210px] flex flex-col justify-between"
                            >
                                <div className="relative z-10 flex flex-col items-start">
                                    <img 
                                        src={trackerThingsLogo} 
                                        alt="TrackerThings" 
                                        className="h-10 w-auto object-contain -ml-1 mb-6 mt-2 transition-transform hover:scale-105" 
                                    />
                                    
                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-[10px] font-bold text-[#01a3f8] uppercase tracking-[0.2em]">
                                            RASTREAMENTO
                                        </span>
                                        <h4 className="text-[18px] font-bold leading-tight w-full">
                                            Não perca fretes<br />por falta de rastreador
                                        </h4>
                                    </div>
                                    <p className="text-[12px] text-white/80 font-medium w-full leading-relaxed mt-2">
                                        Ative e aumente suas chances<br />de contratação
                                    </p>
                                    <div className="mt-6 -mx-8 w-[calc(100%+64px)]">
                                        <ImageWithFallback src={trackerDeviceImg} alt="TrackerThings Rastreamento" className="w-full h-28 object-cover object-center" />
                                    </div>
                                </div>

                                <div className="flex mt-6 w-full">
                                    <Button
                                        variant="outline"
                                        className="bg-[#01a3f8] border-none text-white hover:bg-white hover:text-[#01a3f8] h-11 px-8 text-[13px] font-bold rounded-full transition-all group shadow-lg shadow-[#01a3f8]/20"
                                    >
                                        Ativar rastreador
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#01a3f8]/10 rounded-full blur-3xl" />
                            </motion.div>

                            {/* TrackerThings Card 2 - Segurança */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/marketplace')}
                                className="relative flex-shrink-0 w-full snap-start overflow-hidden rounded-[32px] bg-[#071325] dark:bg-[#020617] text-white shadow-xl border-l-4 border-[#01a3f8] cursor-pointer p-6 min-h-[210px] flex flex-col justify-between"
                            >
                                <div className="relative z-10 flex flex-col items-start">
                                    <img 
                                        src={trackerThingsLogo} 
                                        alt="TrackerThings" 
                                        className="h-10 w-auto object-contain -ml-1 mb-6 mt-2 transition-transform hover:scale-105" 
                                    />
                                    
                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-[10px] font-bold text-[#01a3f8] uppercase tracking-[0.2em]">
                                            SEGURANÇA
                                        </span>
                                        <h4 className="text-[18px] font-bold leading-tight w-full">
                                            Mais controle<br />na sua operação
                                        </h4>
                                    </div>
                                    <p className="text-[12px] text-white/80 font-medium w-full leading-relaxed mt-2">
                                        Acompanhe seu veículo em tempo real<br />e reduza riscos na viagem
                                    </p>
                                    <div className="mt-6 -mx-8 w-[calc(100%+64px)]">
                                        <ImageWithFallback src={trackerSecurityImg} alt="TrackerThings Segurança" className="w-full h-28 object-cover object-center" />
                                    </div>
                                </div>

                                <div className="flex mt-6 w-full">
                                    <Button
                                        variant="outline"
                                        className="bg-[#01a3f8] border-none text-white hover:bg-white hover:text-[#01a3f8] h-11 px-8 text-[13px] font-bold rounded-full transition-all group shadow-lg shadow-[#01a3f8]/20"
                                    >
                                        Ver como funciona
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#01a3f8]/10 rounded-full blur-3xl" />
                            </motion.div>
                        </>
                    ) : (
                         <>
                            {/* Upper Card 1 - Valorização */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/home')}
                                className="relative flex-shrink-0 w-full snap-start overflow-hidden rounded-[32px] bg-black shadow-xl cursor-pointer min-h-[210px]"
                            >
                                <ImageWithFallback 
                                    src={upperImg} 
                                    alt="Upper Card" 
                                    className="w-full h-full object-cover" 
                                />
                            </motion.div>
                        </>
                    )}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-1.5 mt-1 mb-2">
                    {(bannerMode === 'goodyear' ? [0, 1] : bannerMode === 'trackerthings' ? [0, 1, 2] : [0]).map((idx) => (
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

      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 space-y-3 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {showAddMore ? (
             <Button 
                onClick={handleAddMore}
                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
                <Plus className="w-6 h-6" />
                Mais entregas na mesma rota
            </Button>
        ) : (
             <Button 
                onClick={handleDetails}
                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-transform active:scale-[0.99]"
            >
                Ver detalhes da viagem
            </Button>
        )}
        
        <button 
            onClick={handleFinish}
            className="w-full h-14 bg-gradient-to-r from-[#ff6900] to-[#f54900] drop-shadow-[0px_10px_7.5px_rgba(255,105,0,0.2),0px_4px_3px_rgba(255,105,0,0.2)] flex items-center justify-center gap-[8px] px-[16px] py-[8px] rounded-[16px] transition-all active:scale-[0.98]"
        >
            <div className="relative shrink-0 size-[15.993px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9925 15.9925">
                <g>
                  <path d="M9.99422 13.9935V8.66269C9.99422 8.48596 9.92401 8.31647 9.79905 8.19151C9.67408 8.06654 9.50459 7.99634 9.32786 7.99634H6.66245C6.48572 7.99634 6.31623 8.06654 6.19126 8.19151C6.0663 8.31647 5.99609 8.48596 5.99609 8.66269V13.9935" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33271" />
                  <path d="M2 6.66349C1.99995 6.46963 2.0422 6.27809 2.1238 6.10224C2.2054 5.92638 2.32438 5.77044 2.47245 5.64531L7.13692 1.64785C7.37747 1.44455 7.68224 1.33301 7.99719 1.33301C8.31214 1.33301 8.61691 1.44455 8.85745 1.64785L13.5219 5.64531C13.67 5.77044 13.789 5.92638 13.8706 6.10224C13.9522 6.27809 13.9944 6.46963 13.9944 6.66349V12.6607C13.9944 13.0141 13.854 13.3531 13.604 13.603C13.3541 13.853 13.0151 13.9934 12.6617 13.9934H3.33271C2.97925 13.9934 2.64027 13.853 2.39034 13.603C2.14041 13.3531 2 13.0141 2 12.6607V6.66349Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33271" />
                </g>
              </svg>
            </div>
            <span className="font-bold text-[18px] text-white tracking-[-0.4395px] whitespace-nowrap">
                Voltar para o início
            </span>
        </button>
      </div>
    </div>
  );
}