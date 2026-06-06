import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Weight, 
  Truck, 
  Snowflake, 
  Box, 
  Navigation,
  Edit2,
  List,
  Map as MapIcon,
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Search,
  AlertCircle,
  RotateCcw,
  Settings2,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import mapImage from 'figma:asset/0abe3f32b212eca193415d2a84b2b0aa5e03e4e4.png';
import { OfferCardSkeleton } from '../components/marketplace/OfferCardSkeleton';
import { FilterSheet } from '../components/marketplace/FilterSheet';
import { SearchSheet, SearchCriteria } from '../components/marketplace/SearchSheet';
import { filterOffers, FilterState } from '../utils/marketplace';
import { MOCK_OFFERS, Offer } from '../data/mocks';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import moppIcon from '../../imports/logo_mopp_losango_v2-1.png';

import { PromotionBanner } from '../components/PromotionBanner';
import walletBanner from 'figma:asset/a660d4af783655321eb4855e5ebb294fc084e5b0.png';
import trackerThingsBanner from '../../imports/banner_principal.png';
import upperBanner1 from '../../imports/gustavo---24-horas-cargaPrancheta-1.png';
import upperBanner2 from '../../imports/gustavo---24-horas-cargaPrancheta-1-copiar.png';
import upperBanner3 from '../../imports/gustavo---24-horas-cargaPrancheta-1-1.png';
import { useBannerMode } from '../hooks/useBannerMode';

// --- Types ---
// Removed locally defined Offer interface to use imported one

// --- Mock Data ---
// Removed locally defined MOCK_OFFERS to use imported one

const DEFAULT_FILTERS: FilterState = {
  searchRadius: 50,
  priceRange: [0, 10000],
  distanceRange: [0, 2000],
  selectedTypes: [],
  selectedDate: 'any',
  weightLimit: 25,
  volumeLimit: 90
};

// --- Components ---

const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm animate-in fade-in zoom-in duration-200">
    {label}
    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full p-0.5">
      <X className="w-3 h-3" />
    </button>
  </div>
);

const OfferCard = ({ offer, className }: { offer: Offer; className?: string }) => {
  const navigate = useNavigate();

  // Mock Active Vehicle (should match FilterSheet mock)
  const activeVehicle = {
      weight: 25, // tons
      volume: 90  // m3
  };

  // Status Logic
  const isOverCapacity = (offer.weightVal > activeVehicle.weight * 0.95) || (offer.volume > activeVehicle.volume * 0.95);
  const statusColor = isOverCapacity ? "bg-red-500" : "bg-[#00bc7d]";

  const getIcon = (type: string) => {
    switch (type) {
      case 'Refrigerada': return Snowflake;
      case 'Graneleiro': return Truck; 
      default: return Box;
    }
  };

  const TypeIcon = getIcon(offer.type);

  // Item 9.7: Calculate Occupation Percentage
  const weightPercent = (offer.weightVal / activeVehicle.weight) * 100;
  const volumePercent = offer.volume ? (offer.volume / activeVehicle.volume) * 100 : 0;
  const occupation = Math.round(Math.max(weightPercent, volumePercent));

  return (
    <div className={cn(
      "bg-white dark:bg-[#1e293b] relative rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-800 overflow-hidden flex",
      className
    )}>
      {/* Left Colored Strip */}
      <div className={cn("w-[6px] shrink-0", statusColor)} />

      <div className="flex-1 p-4 relative">
          {/* Header: Badges & Price */}
          <div className="flex justify-between items-start mb-5">
            {/* Left: Badges */}
            <div className="flex flex-col items-start gap-1.5">
                {/* Main Type Badge with MOPP Icon */}
                <div className="flex items-center gap-2">
                  {offer.isMop && (
                    <div className="h-[48px] w-[48px] flex items-center justify-center shrink-0 -my-2">
                      <ImageWithFallback 
                        src={moppIcon} 
                        alt="MOPP" 
                        className="h-full w-full object-contain" 
                      />
                    </div>
                  )}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-1.5 flex items-center gap-2 border border-blue-100/50 dark:border-blue-800/50 h-[34px]">
                      <TypeIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">{offer.type}</span>
                  </div>
                </div>
                
                {/* Secondary Badges */}
                <div className="flex flex-wrap gap-1.5 items-center">
                    {offer.isReturn && (
                         <div className="bg-purple-600 rounded-md px-2 py-1 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wide leading-none">Retorno</span>
                        </div>
                    )}
                    {offer.isNegotiable && (
                        <div className="bg-amber-500/15 dark:bg-amber-500/20 rounded-md px-2 py-1 flex items-center justify-center border border-amber-500/30">
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide leading-none">Pregão</span>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Right: Price */}
            <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-0.5">Valor do Frete</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none block">{offer.price}</span>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="flex flex-col gap-6 relative mb-5 pl-1">
            {/* Origin */}
            <div className="flex items-start gap-4 z-10 relative">
               {/* Connecting Line */}
               <div className="absolute left-[7px] top-[10px] w-[2px] h-[calc(100%_+_24px)] bg-slate-100 dark:bg-slate-800 -z-10" />

               <div className="w-4 h-4 rounded-full border-[3px] border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b] shrink-0 mt-0.5 shadow-sm" />
               <div>
                 <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-0.5 tracking-wide">Origem</p>
                 <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                   {offer.origin}, <span className="text-slate-500 dark:text-slate-400">{offer.originState}</span>
                 </p>
               </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-4 z-10 relative">
               <div className="w-4 h-4 rounded-full border-[3px] border-orange-100 dark:border-orange-900 bg-orange-500 shrink-0 mt-0.5 shadow-sm" />
               <div>
                 <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-0.5 tracking-wide">Destino</p>
                 <div className="flex items-center gap-2">
                     <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                     {offer.destination}, <span className="text-slate-500 dark:text-slate-400">{offer.destinationState}</span>
                     </p>
                     {offer.distance && (
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                             {offer.distance} km
                          </span>
                     )}
                 </div>
               </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-4" />

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5">
            {/* Row 1 Left: Weight */}
            <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{offer.weight}</span>
            </div>

            {/* Row 1 Right: Volume */}
            {offer.volume && (
                <div className="flex items-center gap-2 justify-end">
                    <Box className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{offer.volume} m³</span>
                </div>
            )}

            {/* Row 2 Left: Date */}
            <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Data da Coleta</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{offer.date}</span>
                </div>
            </div>

            {/* Row 2 Right: Occupation */}
            <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Ocupação</span>
                <span className={cn(
                    "text-sm font-bold",
                    occupation > 90 ? "text-red-600" : "text-slate-700 dark:text-slate-300"
                )}>
                    {occupation}%
                </span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => navigate(`/offer/${offer.id}`)}
            className="w-full h-12 bg-[#ff6900] hover:bg-[#e65e00] text-white font-semibold rounded-xl transition-all active:scale-[0.99] shadow-sm"
          >
            Ver detalhes
          </Button>
      </div>
    </div>
  );
};

// --- Map View Component ---
const MapView = ({ 
  offers, 
  selectedId, 
  onSelect,
  isTrayOpen,
  setTrayOpen
}: { 
  offers: Offer[], 
  selectedId: string | null,
  onSelect: (id: string | null) => void,
  isTrayOpen: boolean,
  setTrayOpen: (open: boolean) => void
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const pinchRef = useRef<{ startDist: number, startZoom: number } | null>(null);

  const remap = (val: string) => {
    const num = parseFloat(val);
    return `${25 + (num * 0.5)}%`;
  };

  const remappedOffers = useMemo(() => offers.map(o => ({
    ...o,
    coordinates: {
      top: remap(o.coordinates.top),
      left: remap(o.coordinates.left)
    }
  })), [offers]);
  
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<number>();

  useEffect(() => {
    if (selectedId && isTrayOpen && scrollContainerRef.current && !isUserScrolling.current) {
      const card = document.getElementById(`map-card-${selectedId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedId, isTrayOpen]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    isUserScrolling.current = true;
    clearTimeout(scrollTimeout.current);

    scrollTimeout.current = window.setTimeout(() => {
      const container = scrollContainerRef.current!;
      const center = container.scrollLeft + container.offsetWidth / 2;
      
      let closestId = null;
      let minDistance = Infinity;

      remappedOffers.forEach(offer => {
        const card = document.getElementById(`map-card-${offer.id}`);
        if (card) {
           const cardCenter = card.offsetLeft + card.offsetWidth / 2;
           const distance = Math.abs(cardCenter - center);
           if (distance < minDistance) {
             minDistance = distance;
             closestId = offer.id;
           }
        }
      });

      if (closestId && closestId !== selectedId) {
         onSelect(closestId);
      }
      
      scrollTimeout.current = window.setTimeout(() => {
        isUserScrolling.current = false;
      }, 150);
    }, 50);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchRef.current = { startDist: dist, startZoom: zoom };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newZoom = pinchRef.current.startZoom * (dist / pinchRef.current.startDist);
      setZoom(Math.min(Math.max(newZoom, 0.5), 3)); 
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));

  return (
    <div className="relative w-full h-full bg-[#f3f4f6] dark:bg-[#0f172a] overflow-hidden touch-none">
      <motion.div 
        ref={mapRef}
        drag
        dragConstraints={{ left: -2000 * zoom, right: 0, top: -2000 * zoom, bottom: 0 }}
        dragElastic={0.1}
        animate={{ scale: zoom }}
        transition={{ duration: 0 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="absolute top-[-150%] left-[-150%] w-[400%] h-[400%] cursor-grab active:cursor-grabbing origin-center"
        style={{
          backgroundColor: '#e5e7eb',
          backgroundImage: `url(${mapImage})`,
          backgroundSize: '50%', 
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/10 dark:bg-slate-900/40 backdrop-contrast-[0.9] pointer-events-none" />

        {remappedOffers.map(offer => {
          const isSelected = selectedId === offer.id;
          return (
            <motion.div
              key={offer.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1 / zoom, opacity: 1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ top: offer.coordinates.top, left: offer.coordinates.left }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(isSelected ? null : offer.id);
                setTrayOpen(true);
              }}
            >
               <div className={cn(
                  "flex flex-col items-center transition-all duration-300",
                  isSelected ? "scale-110 z-30" : "hover:scale-105 z-10"
                )}>
                  <div className={cn(
                    "px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-[13px] font-bold whitespace-nowrap border-[0.5px] transition-colors flex items-center justify-center min-w-[80px]",
                    isSelected 
                      ? "bg-slate-900 dark:bg-orange-500 text-white border-slate-900 dark:border-orange-500 shadow-slate-900/20" 
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:scale-105"
                  )}>
                    {offer.price}
                  </div>
                </div>
            </motion.div>
          );
        })}
        
        <div className="absolute inset-0 z-0" onClick={() => onSelect(null)} />
      </motion.div>

      <div className="absolute top-36 right-4 flex flex-col gap-2 z-30">
        <Button 
          variant="secondary" 
          size="icon"
          onClick={handleZoomIn}
          className="bg-white dark:bg-[#1e293b] shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full w-10 h-10 border border-transparent dark:border-slate-800"
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={handleZoomOut}
          className="bg-white dark:bg-[#1e293b] shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full w-10 h-10 border border-transparent dark:border-slate-800"
        >
          <Minus className="w-5 h-5" />
        </Button>
      </div>

      <AnimatePresence>
        {isTrayOpen && offers.length > 0 && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-20 pb-20 pt-12 pointer-events-auto"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-slate-900/5 to-transparent pointer-events-none" />

             <div className="absolute top-2 right-4 pointer-events-auto">
                 <Button
                    size="icon"
                    className="rounded-full w-8 h-8 bg-white dark:bg-slate-800 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-400 border border-slate-100 dark:border-slate-700"
                    onClick={() => setTrayOpen(false)}
                 >
                    <X className="w-4 h-4" />
                 </Button>
             </div>

             <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto px-6 pb-4 pointer-events-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
                style={{ scrollBehavior: 'smooth' }}
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
             >
                {offers.map(offer => (
                  <div 
                    key={offer.id}
                    id={`map-card-${offer.id}`}
                    className="min-w-[85vw] sm:min-w-[340px] snap-center"
                    onClick={() => onSelect(offer.id)}
                  >
                     <div className={cn(
                       "transition-all duration-300",
                       selectedId === offer.id ? "scale-[1.02] opacity-100" : "opacity-90 scale-100"
                     )}>
                       <OfferCard offer={offer} />
                     </div>
                  </div>
                ))}
                <div className="w-2 shrink-0" />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Floating Toggle Button ---
const FloatingToggle = ({ mode, onClick }: { mode: 'list' | 'map', onClick: () => void }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-semibold text-sm hover:bg-slate-800 transition-colors"
      >
        {mode === 'list' ? (
          <>
            Mapa
            <MapIcon className="w-4 h-4" />
          </>
        ) : (
          <>
            Lista
            <List className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export function Marketplace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { bannerMode } = useBannerMode();

  const upperBanner = useMemo(() => {
    const banners = [upperBanner1, upperBanner2, upperBanner3];
    return banners[Math.floor(Math.random() * banners.length)];
  }, []);

  const mode = searchParams.get('mode');
  const nearHomeParam = searchParams.get('near_home') === 'true'; // Item 9.5
  const originParam = searchParams.get('origin') || 'Guarulhos, SP';
  const destinationParam = searchParams.get('destination') || 'Rio de Janeiro, RJ';
  
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [isTrayOpen, setTrayOpen] = useState(true);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSearchSheetOpen, setSearchSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Data State
  const [rawOffers, setRawOffers] = useState<Offer[]>(MOCK_OFFERS);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    origin: 'Campinas, SP',
    destination: 'Rio de Janeiro, RJ',
    type: ['Refrigerada'],
    weight: '8 ton',
    date: 'Amanhã, 08:00'
  });

  // Load mock data
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    const timer = setTimeout(() => {
      // Simulate random error (10% chance) for demonstration of error state
      const shouldFail = Math.random() < 0.1;
      
      if (shouldFail) {
          setError(true);
          setLoading(false);
          return;
      }

      if (nearHomeParam) {
        setRawOffers([
          {
            id: 'nh1',
            origin: 'Campinas',
            originState: 'SP',
            destination: 'S. B. do Campo',
            destinationState: 'SP',
            price: 'R$ 800',
            weight: '3 ton',
            type: 'Carga Seca',
            date: 'Hoje, 14:00',
            coordinates: { top: '45%', left: '52%' },
            distance: 60,
            isReturn: true,
            weightVal: 3,
            volume: 15,
            allowSharing: true
          },
          {
            id: 'nh2',
            origin: 'Jundiaí',
            originState: 'SP',
            destination: 'Santo André',
            destinationState: 'SP',
            price: 'R$ 950',
            weight: '5 ton',
            type: 'Baú',
            date: 'Amanhã, 10:00',
            coordinates: { top: '48%', left: '55%' },
            distance: 75,
            weightVal: 5,
            volume: 20,
            allowSharing: false
          }
        ]);
      } else if (mode === 'near_me') {
        setRawOffers([
          {
            id: 'nm1',
            origin: 'Campinas',
            originState: 'SP',
            destination: 'Sorocaba',
            destinationState: 'SP',
            price: 'R$ 1.200',
            weight: '4 ton',
            type: 'Diversos',
            date: 'Hoje, 16:00',
            coordinates: { top: '44%', left: '50%' },
            distance: 85
          },
          {
            id: 'nm2',
            origin: 'Valinhos',
            originState: 'SP',
            destination: 'São Paulo',
            destinationState: 'SP',
            price: 'R$ 950',
            weight: '2 ton',
            type: 'Carga Seca',
            date: 'Amanhã, 09:00',
            coordinates: { top: '46%', left: '54%' },
            distance: 90
          },
          {
            id: 'nm3',
            origin: 'Sumaré',
            originState: 'SP',
            destination: 'Santos',
            destinationState: 'SP',
            price: 'R$ 2.500',
            weight: '12 ton',
            type: 'Refrigerada',
            date: 'Hoje, 18:00',
            coordinates: { top: '43%', left: '46%' },
            distance: 140
          },
          {
             id: 'nm4',
             origin: 'Paulínia',
             originState: 'SP',
             destination: 'São José dos Campos',
             destinationState: 'SP',
             price: 'R$ 1.800',
             weight: '6 ton',
             type: 'Graneleiro',
             date: 'Amanhã, 07:00',
             coordinates: { top: '48%', left: '58%' },
             distance: 160
          },
          {
             id: 'nm5',
             origin: 'Campinas',
             originState: 'SP',
             destination: 'Ribeirão Preto',
             destinationState: 'SP',
             price: 'R$ 2.100',
             weight: '8 ton',
             type: 'Carga Seca',
             date: 'Hoje, 14:00',
             coordinates: { top: '42%', left: '42%' },
             distance: 180
          }
        ]);
      } else {
        setRawOffers(MOCK_OFFERS);
      }
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [mode]);

  // Derived State: Filtered Offers
  const filteredOffers = useMemo(() => {
    return filterOffers(rawOffers, filters);
  }, [rawOffers, filters]);

  // Generate Subtitle
  const getSubtitle = () => {
    // If we have active filters that override the search criteria visually, we might want to show them.
    // However, the prompt asks for "Refrigerada · 8 ton · Amanhã, 08:00" which comes from search criteria.
    // The filter chips below the header will handle the "extra" filters.
    const typeStr = searchCriteria.type.length > 0 ? searchCriteria.type.join(', ') : 'Qualquer tipo';
    return `${typeStr} · ${searchCriteria.weight} · ${searchCriteria.date}`;
  };

  const handleSearchUpdate = (newCriteria: SearchCriteria) => {
    setSearchCriteria(newCriteria);
    setLoading(true);
    setError(false);
    // Simulate API reload
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
        setLoading(false);
    }, 1500);
  };

  const hasActiveFilters = 
    filters.searchRadius !== 50 ||
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ||
    filters.distanceRange[0] > 0 || filters.distanceRange[1] < 2000 ||
    filters.selectedTypes.length > 0 || 
    filters.selectedDate !== 'any' ||
    filters.weightLimit < 25 ||
    filters.volumeLimit < 90;

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 dark:bg-[#0f172a] font-sans overflow-hidden transition-colors duration-300">
      
      {/* Floating Header (Airbnb-style) */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none flex flex-col gap-2">
        {/* Search Bar Container */}
        <div className="bg-white dark:bg-[#1e293b] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 p-2 pl-2 pr-2 flex items-center gap-2 pointer-events-auto transition-all">
          
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/home')}
            className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Search Summary (Clickable) */}
          <div 
            className="flex-1 min-w-0 flex items-center justify-between gap-2 px-2 py-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 rounded-lg transition-colors group"
            onClick={() => setSearchSheetOpen(true)}
          >
             <div className="flex flex-col min-w-0 flex-1 justify-center">
             {nearHomeParam ? (
                <>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                    <span className="truncate">Destino próximo de casa</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight truncate mt-0.5">
                    Coleta próxima a você
                  </div>
                </>
             ) : mode === 'near_me' ? (
                <>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                    <span className="truncate">Próximo a Campinas</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight truncate mt-0.5">
                    {getSubtitle()}
                  </div>
                </>
             ) : (
                <>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                    <span className="truncate">{searchCriteria.origin.split(',')[0]}</span>
                    <span className="text-slate-400 dark:text-slate-600 shrink-0">→</span>
                    <span className="truncate">{searchCriteria.destination.split(',')[0]}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight truncate mt-0.5">
                    {getSubtitle()}
                  </div>
                </>
             )}
             </div>
             <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 ml-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
          </div>

          {/* Filter Button */}
          <div className="w-[1px] h-8 bg-slate-100 dark:bg-slate-800 mx-1" /> {/* Vertical Divider */}
          <Button 
             variant="ghost" 
             size="icon"
             onClick={() => setFilterOpen(true)} 
             className={cn(
               "rounded-full w-10 h-10 border hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 shrink-0 relative transition-colors",
               hasActiveFilters 
                 ? "border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                 : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
             )}
          >
             <Settings2 className="w-5 h-5 stroke-[2.25]" />
             {hasActiveFilters && (
               <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#1e293b]" />
             )}
          </Button>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex gap-2 overflow-x-auto pointer-events-auto no-scrollbar pb-2 px-1 mask-linear-fade">
             {/* Price */}
             {(filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) && (
                <FilterChip 
                  label={`R$ ${filters.priceRange[0]} - ${filters.priceRange[1]}`} 
                  onRemove={() => setFilters(prev => ({ ...prev, priceRange: [0, 10000] }))} 
                />
             )}
             {/* Types */}
             {filters.selectedTypes.map(t => (
                <FilterChip 
                  key={t}
                  label={t.charAt(0).toUpperCase() + t.slice(1)} 
                  onRemove={() => setFilters(prev => ({ ...prev, selectedTypes: prev.selectedTypes.filter(x => x !== t) }))} 
                />
             ))}
             {/* Search Radius */}
             {filters.searchRadius !== 50 && (
                <FilterChip 
                  label={`Raio: ${filters.searchRadius} km`} 
                  onRemove={() => setFilters(prev => ({ ...prev, searchRadius: 50 }))} 
                />
             )}
             {/* Weight */}
             {filters.weightLimit < 25 && (
                <FilterChip 
                  label={`Até ${filters.weightLimit} ton`} 
                  onRemove={() => setFilters(prev => ({ ...prev, weightLimit: 25 }))} 
                />
             )}
             {/* Volume */}
             {filters.volumeLimit < 90 && (
                <FilterChip 
                  label={`Até ${filters.volumeLimit} m³`} 
                  onRemove={() => setFilters(prev => ({ ...prev, volumeLimit: 90 }))} 
                />
             )}
             {/* Date */}
             {filters.selectedDate !== 'any' && (
                <FilterChip 
                  label={filters.selectedDate === 'specific' ? 'Data específica' : filters.selectedDate} 
                  onRemove={() => setFilters(prev => ({ ...prev, selectedDate: 'any' }))} 
                />
             )}
             {/* Distance */}
             {(filters.distanceRange[0] > 0 || filters.distanceRange[1] < 2000) && (
                <FilterChip 
                  label={`${filters.distanceRange[0]}-${filters.distanceRange[1]} km`} 
                  onRemove={() => setFilters(prev => ({ ...prev, distanceRange: [0, 2000] }))} 
                />
             )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {loading ? (
          <div className="p-6 pt-32 space-y-4 bg-slate-50 dark:bg-[#0f172a] h-full overflow-hidden flex flex-col items-center">
             <div className="w-full space-y-4">
                 {Array.from({ length: 3 }).map((_, i) => (
                   <OfferCardSkeleton key={i} />
                 ))}
             </div>
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium animate-pulse mt-4">
                Buscando ofertas disponíveis para sua rota…
             </p>
          </div>
        ) : error ? (
           /* Error View */
           <div className="flex flex-col items-center justify-center h-full pt-20 px-6 text-center bg-slate-50 dark:bg-[#0f172a]">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 border border-red-100 dark:border-red-900/50">
                  <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Algo deu errado</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[250px] mx-auto leading-relaxed">
                  Não foi possível carregar as ofertas agora. Verifique sua conexão e tente novamente.
              </p>
              <Button onClick={handleRetry} className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 shadow-sm">
                  Tentar novamente
              </Button>
           </div>
        ) : (
          <div className="h-full relative">
            
            {/* List View */}
            <div 
              className={cn(
                "absolute inset-0 overflow-y-auto bg-slate-50 dark:bg-[#0f172a] transition-transform duration-500 ease-in-out z-10",
                viewMode === 'list' ? "translate-y-0" : "translate-y-full"
              )}
            >
              <div className={cn("px-5 pb-28 space-y-4 transition-all", hasActiveFilters ? "pt-36" : "pt-24")}>
                {filteredOffers.length > 0 ? (
                  filteredOffers.map((offer, index) => (
                    <div key={offer.id} className="flex flex-col gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OfferCard offer={offer} />
                      </motion.div>
                      
                      {/* Promo Banner after the 2nd card (index 1) */}
                      {index === 1 && (
                        <PromotionBanner
                          image={
                            bannerMode === 'goodyear' 
                              ? walletBanner 
                              : bannerMode === 'trackerthings' 
                              ? trackerThingsBanner 
                              : upperBanner
                          }
                          onClick={() => {
                            const messages = {
                              goodyear: "Aproveite os descontos Goodyear MaxSeries!",
                              trackerthings: "Conheça TrackerThings!",
                              upper: "Seja um motorista mais valorizado com a Upper!"
                            };
                            toast.info(messages[bannerMode]);
                          }}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center pt-10 px-6 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                      <Truck className="w-10 h-10 text-slate-400 dark:text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nenhuma oferta encontrada</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-[280px] mx-auto leading-relaxed">
                      Não encontramos ofertas para essa rota no momento. Tente ajustar os filtros ou alterar a data da coleta.
                    </p>
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        <Button 
                          onClick={() => setSearchSheetOpen(true)}
                          className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white h-12 font-semibold"
                        >
                          Editar busca
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => setFilters(DEFAULT_FILTERS)}
                          className="w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 h-12 font-medium"
                        >
                          Limpar filtros
                        </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map View */}
            <div 
              className={cn(
                "absolute inset-0 transition-transform duration-500 ease-in-out z-0",
                viewMode === 'map' ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <MapView 
                offers={filteredOffers} 
                selectedId={selectedOfferId}
                onSelect={setSelectedOfferId}
                isTrayOpen={isTrayOpen}
                setTrayOpen={setTrayOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Toggle Button (Hide on Empty State in List Mode) */}
      {!loading && !error && (filteredOffers.length > 0 || viewMode === 'map') && (
        <FloatingToggle 
          mode={viewMode} 
          onClick={() => {
             setViewMode(prev => prev === 'list' ? 'map' : 'list');
             setTrayOpen(true); 
          }} 
        />
      )}

      {/* Filter Sheet */}
      <FilterSheet 
        open={isFilterOpen} 
        onOpenChange={setFilterOpen}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setFilterOpen(false);
        }}
        initialFilters={filters}
        offers={rawOffers}
      />

      {/* Search Edit Sheet */}
      <SearchSheet
        open={isSearchSheetOpen}
        onOpenChange={setSearchSheetOpen}
        initialValues={searchCriteria}
        onSearch={handleSearchUpdate}
        onOpenFilters={() => setFilterOpen(true)}
      />
    </div>
  );
}
