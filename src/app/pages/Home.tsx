import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Search, 
  Wallet, 
  ArrowRight, 
  Truck, 
  Eye, 
  EyeOff,
  HelpCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/ui/bottom-nav';
import { toast } from 'sonner';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { MOCK_OFFERS } from '../data/mocks';

import { PromotionBanner } from '../components/PromotionBanner';
import { MixedInstitutionalCarousel } from '../components/MixedInstitutionalCarousel';
import { FreightSearch } from '../components/FreightSearch';
import goodyearMaxSeriesBanner from 'figma:asset/3bd16b1cf1a0333d27db04c15d197ce1fdcb991b.png';
import trackerThingsBanner from '../../imports/banner_principal.png';
import upperBanner1 from '../../imports/gustavo---24-horas-cargaPrancheta-1.png';
import upperBanner2 from '../../imports/gustavo---24-horas-cargaPrancheta-1-copiar.png';
import upperBanner3 from '../../imports/gustavo---24-horas-cargaPrancheta-1-1.png';
import { useBannerMode } from '../hooks/useBannerMode';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = "João"; // Placeholder
  const { bannerMode, setBannerMode } = useBannerMode();

  const upperBanner = React.useMemo(() => {
    const banners = [upperBanner1, upperBanner2, upperBanner3];
    return banners[Math.floor(Math.random() * banners.length)];
  }, []);
  
  // Banner rotation logic
  useEffect(() => {
    const modes: ('goodyear' | 'trackerthings' | 'upper')[] = ['goodyear', 'trackerthings', 'upper'];
    const interval = setInterval(() => {
      const currentIndex = modes.indexOf(bannerMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      setBannerMode(nextMode);
    }, 6000); // 6 seconds for better readability
    return () => clearInterval(interval);
  }, [bannerMode, setBannerMode]);

  const [origin, setOrigin] = useState("Minha localização atual");
  const [destination, setDestination] = useState("Minha casa");
  const [showBalance, setShowBalance] = useState(true);
  
  // Item 9.4: Enhanced Vehicle Identification
  const [activeVehicle, setActiveVehicle] = useState({
      plate: "ABC-1D23",
      type: "Caminhão Trator",
      bodyType: "Baú",
      trailers: ["DEF-4G56", "GHI-7J89"]
  });
  
  // Mock Active Vehicle Capacity (matches FilterSheet mock)
  const vehicleCapacity = {
     weight: 25, // tons
     volume: 90  // m3
  };

  const compatibleOffers = React.useMemo(() => {
      return MOCK_OFFERS.filter(o => o.weightVal <= vehicleCapacity.weight && o.volume <= vehicleCapacity.volume);
  }, []);

  const availableOrigins = React.useMemo(() => 
    ["Minha localização atual", ...Array.from(new Set(compatibleOffers.map(o => `${o.origin}, ${o.originState}`)))], 
  [compatibleOffers]);

  const availableDestinations = React.useMemo(() => 
    ["Minha casa", ...Array.from(new Set(compatibleOffers.map(o => `${o.destination}, ${o.destinationState}`)))], 
  [compatibleOffers]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (origin) params.append('origin', origin);
    if (destination) params.append('destination', destination);
    navigate(`/marketplace?${params.toString()}`);
  };

  // Mock Active Trip for Home Notification (Hardcoded for prototype)
  const [hasOccurrence, setHasOccurrence] = useState(false);

  useEffect(() => {
    setHasOccurrence(localStorage.getItem('PROTOTYPE_OCCURRENCE_ACTIVE') === 'true');
  }, []);

  const activeTripNotification = {
      id: '8932',
      status: hasOccurrence ? 'Ocorrência' : 'Em trânsito',
      statusColor: hasOccurrence ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      origin: 'Campinas, SP',
      destination: 'Rio de Janeiro, RJ',
      date: 'Amanhã, 08:00',
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      
      {/* Top App Bar */}
      <header className="bg-white dark:bg-[#1e293b] px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-slate-50 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold border border-orange-200 dark:border-orange-800">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Olá,</p>
            <h1 className="text-slate-900 dark:text-white font-bold text-lg leading-none">Bem-vindo, {userName}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-1 shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/help')}
            className="w-12 h-12 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full shrink-0"
          >
            <HelpCircle className="size-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/notifications')}
            className="w-12 h-12 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full relative shrink-0"
          >
            <Bell className="size-6" />
            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-orange-500 rounded-full border-[2px] border-white dark:border-[#1e293b]"></span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-6 pb-24 space-y-6 max-w-lg mx-auto w-full">

        {/* Promotion Banner */}
        <PromotionBanner
          image={
            bannerMode === 'goodyear' 
              ? goodyearMaxSeriesBanner 
              : bannerMode === 'trackerthings' 
              ? trackerThingsBanner 
              : upperBanner
          }
          onClick={() => {
            const messages = {
              goodyear: "Conheça a linha Goodyear MaxSeries!",
              trackerthings: "Conheça TrackerThings!",
              upper: "Seja um motorista mais valorizado com a Upper!"
            };
            toast.info(messages[bannerMode]);
          }}
        />

        {/* Active Trip Notification Card */}
        {activeTripNotification && (
             <motion.div 
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             onClick={() => navigate('/trip/details')}
             className="bg-white dark:bg-[#1e293b] p-4 rounded-[16px] border-[2px] border-blue-200 dark:border-blue-900/50 shadow-[0px_8px_30px_0px_rgba(59,130,246,0.15)] cursor-pointer active:scale-[0.98] transition-all"
           >
               <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                           <Truck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                       </div>
                       <div>
                           <span className="text-sm font-bold text-slate-900 dark:text-white block">Ordem #{activeTripNotification.id}</span>
                           <span className="text-xs text-slate-500 dark:text-slate-400 block">{activeTripNotification.date}</span>
                       </div>
                   </div>
                   <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${activeTripNotification.statusColor}`}>
                       {activeTripNotification.status}
                   </span>
               </div>

               <div className="flex items-center gap-2 px-1">
                   <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{activeTripNotification.origin}</span>
                   <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                   <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{activeTripNotification.destination}</span>
               </div>
           </motion.div>
        )}
        
        {/* Freight Search Component */}
        <FreightSearch 
            onSearch={handleSearch}
            availableOrigins={availableOrigins}
            availableDestinations={availableDestinations}
            activeVehicle={activeVehicle}
        />

        {/* 3. Wallet / Earnings */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           onClick={() => navigate('/digital-account')}
           className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors"
        >
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                   <Wallet className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Saldo disponível</span>
                <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBalance(!showBalance);
                    }}
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none ml-1"
                >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs text-orange-600 font-bold hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-2 -mr-2"
              >
                Conta Digital &gt;&gt;
              </Button>
           </div>
           
           <div className="flex items-baseline gap-1 mb-0">
             <span className="text-sm text-slate-400 font-medium">R$</span>
             <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {showBalance ? '0,00' : '••••'}
             </span>
           </div>
        </motion.div>

        <MixedInstitutionalCarousel />

      </div>

      <BottomNav />
    </div>
  );
}
