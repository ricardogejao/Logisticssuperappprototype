import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Search } from 'lucide-react';
import svgPaths from "../../imports/svg-zg5qnlb7um";
import { MOCK_OFFERS, RADIUS_OPTIONS } from './search-mock-data';

interface FreightSearchProps {
  onSearch: (origin: string, destination: string) => void;
  availableOrigins: string[];
  availableDestinations: string[];
  activeVehicle: {
    type: string;
    bodyType: string;
    plate: string;
    trailers: string[];
  };
}

export function FreightSearch({ onSearch, activeVehicle }: FreightSearchProps) {
  const [activeTab, setActiveTab] = useState<'origin' | 'destination'>('origin');
  const [origin, setOrigin] = useState("Minha localização atual");
  const [destination, setDestination] = useState("Todos");
  const [radius, setRadius] = useState(50);
  const [isRadiusDialogOpen, setIsRadiusDialogOpen] = useState(false);

  // Business Logic: Handle Tab Switching
  useEffect(() => {
    if (activeTab === 'destination') {
      setDestination("Próx. da minha casa");
      setOrigin("Todas");
    } else {
      setOrigin("Minha localização atual");
      setDestination("Todos");
    }
  }, [activeTab]);

  // Derive Available Origins
  const availableOriginsList = useMemo(() => {
    if (activeTab === 'origin') {
      // Logic: Cities with offers within selected radius, sorted by proximity
      const localOrigins = MOCK_OFFERS
        .filter(o => o.distance <= radius)
        .map(o => o.origin);
      
      return [...new Set(localOrigins)].sort((a, b) => {
        const distA = MOCK_OFFERS.find(o => o.origin === a)?.distance || 0;
        const distB = MOCK_OFFERS.find(o => o.origin === b)?.distance || 0;
        return distA - distB;
      });
    } else {
      // Logic: Origins with offers arriving at selected destination
      if (destination === "Todos") {
        return [...new Set(MOCK_OFFERS.map(o => o.origin))];
      }
      return [...new Set(MOCK_OFFERS
        .filter(o => o.destination === destination)
        .map(o => o.origin))];
    }
  }, [activeTab, radius, destination]);

  // Derive Available Destinations
  const availableDestinationsList = useMemo(() => {
    if (activeTab === 'origin') {
      // Logic: Destinations available from selected origin
      if (origin === "Minha localização atual") {
        return [...new Set(MOCK_OFFERS
          .filter(o => o.distance <= radius)
          .map(o => o.destination))];
      }
      return [...new Set(MOCK_OFFERS
        .filter(o => o.origin === origin)
        .map(o => o.destination))];
    } else {
      // Logic: All destinations that have offers arriving to them
      return [...new Set(MOCK_OFFERS.map(o => o.destination))];
    }
  }, [activeTab, origin, radius]);

  const handleSearch = () => {
    onSearch(origin, destination);
  };

  return (
    <div className="space-y-4">
      {/* Main Container */}
      <div className="bg-[#1e293b] flex flex-col items-start p-[20px] relative rounded-[16px] border-[0.66px] border-[#1d293d] shadow-lg">
        
        {/* Vehicle Info Card */}
        <div className="bg-[rgba(15,23,43,0.5)] relative rounded-[14px] w-full border-[0.66px] border-[#1d293d] flex items-center p-[12px] justify-between">
          <div className="flex gap-[12px] items-center">
            <div className="bg-[rgba(255,105,0,0.1)] relative rounded-[10px] size-[32px] flex items-center justify-center border-[0.66px] border-[rgba(255,105,0,0.2)]">
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.p1c52c480} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                <path d="M9.999 12H5.999" stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                <path d={svgPaths.p27ff7f00} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                <path d={svgPaths.p2ae0fbb0} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                <path d={svgPaths.p38f6ed70} stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </div>
            
            <div className="flex flex-col items-start">
              <p className="font-bold leading-tight text-[#90a1b9] text-[10px] tracking-[0.6px] uppercase">
                {activeVehicle.type} – {activeVehicle.bodyType}
              </p>
              <div className="flex items-baseline gap-1 font-bold">
                <span className="text-[14px] text-white">{activeVehicle.plate}</span>
              </div>
            </div>
          </div>
          
          <button className="h-[32px] px-[12px] font-medium text-[#ff8904] text-[12px] hover:bg-[#ff8904]/10 rounded-[8px] transition-colors">
            Trocar
          </button>
        </div>

        {/* Search Base Label - Anchor for the search block */}
        <div className="flex items-center gap-3 mt-[24px] mb-[-8px] ml-1">
          <Search className="w-[18px] h-[18px] text-[#ff6900] stroke-[2.5px]" />
          <label className="text-[13px] text-white font-bold tracking-[0.5px] uppercase">
            Buscar fretes com base em:
          </label>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="mt-[24px] bg-[#0f172b] flex items-center p-[6px] relative rounded-[14px] w-full h-[48px]">
          <div className="relative w-full h-full flex items-center">
            <button
              onClick={() => setActiveTab('origin')}
              className={`relative z-10 flex-1 flex items-center justify-center font-bold text-[14px] transition-colors duration-300 ${activeTab === 'origin' ? 'text-white' : 'text-[#90a1b9]'}`}
            >
              Origem
            </button>
            <button
              onClick={() => setActiveTab('destination')}
              className={`relative z-10 flex-1 flex items-center justify-center font-bold text-[14px] transition-colors duration-300 ${activeTab === 'destination' ? 'text-white' : 'text-[#90a1b9]'}`}
            >
              Destino
            </button>
            <motion.div 
              layoutId="tab-highlight-perfect"
              className="absolute bg-[#ff6900] h-full rounded-[10px]"
              initial={false}
              animate={{ 
                left: activeTab === 'origin' ? '0%' : '50%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>

        {/* Search Base Label - Repositioned: Below Vehicle Card, Above Toggle */}
        {/* Note: In the JSX structure, to put it between them, I'll move it above the Mode Toggle Tabs div */}

        {/* Input Section */}
        <div className="w-full pb-[24px] pt-[20px] flex flex-col relative">
          
          {/* Origin Field */}
          <div className="flex flex-col gap-[8px] items-start w-full mb-[48px]">
            <Select 
              value={origin} 
              onValueChange={(val) => {
                if (val === "OPEN_RADIUS") {
                  setIsRadiusDialogOpen(true);
                } else {
                  setOrigin(val);
                }
              }}
            >
              <SelectTrigger className={`bg-[rgba(38,38,38,0.3)] h-[56px] w-full rounded-[8px] border-[1.17px] focus:ring-0 px-[16px] flex items-center justify-between shadow-none transition-all duration-300 ${activeTab === 'origin' ? 'border-[#ff6900]' : 'border-[#45556c]'} [&>svg]:hidden`}>
                <div className={`text-left font-bold text-[16px] ${origin === "Todas" && activeTab === 'destination' ? 'text-[#45556c]' : 'text-white'}`}>
                  <SelectValue placeholder={activeTab === 'origin' ? "Cidade ou estado" : "Todas"} />
                </div>
                {/* Custom Chevron from SVG path */}
                <div className="shrink-0 size-[16px] opacity-60">
                  <svg className="size-full" fill="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p2aa2f000} stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-[#1d293d] max-h-[300px]">
                {activeTab === 'origin' ? (
                  <>
                    <SelectItem value="Minha localização atual" className="text-white focus:bg-slate-800">
                      Minha localização atual
                    </SelectItem>
                    {availableOriginsList.filter(o => o !== "Minha localização atual").map((city) => (
                      <SelectItem key={city} value={city} className="text-white focus:bg-slate-800">
                        {city}
                      </SelectItem>
                    ))}
                    <div className="h-[1px] bg-[#1d293d] my-1" />
                    <SelectItem value="OPEN_RADIUS" className="text-[#ff6900] font-bold focus:bg-slate-800 focus:text-[#ff6900]">
                      Ampliar raio de busca
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="Todas" className="text-white focus:bg-slate-800">Todas</SelectItem>
                    {availableOriginsList.filter(o => o !== "Todas").map((city) => (
                      <SelectItem key={city} value={city} className="text-white focus:bg-slate-800">
                        {city}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Direction Arrow - Positioned exactly in the middle of the gap */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[76px] z-20 pointer-events-none h-[48px] flex items-center">
             <svg className="size-[18px]" viewBox="0 0 15 19" fill="none">
                <path d={svgPaths.p248233c0} fill="#FF6900" />
             </svg>
          </div>

          {/* Destination Field */}
          <div className="flex flex-col gap-[8px] items-start w-full">
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger className={`bg-[rgba(38,38,38,0.3)] h-[56px] w-full rounded-[8px] border-[1.17px] focus:ring-0 px-[16px] flex items-center justify-between shadow-none transition-all duration-300 ${activeTab === 'destination' ? 'border-[#ff6900]' : 'border-[#45556c]'} [&>svg]:hidden`}>
                <div className={`text-left font-bold text-[16px] ${destination === "Todos" && activeTab === 'origin' ? 'text-[#45556c]' : 'text-white'}`}>
                  <SelectValue placeholder={activeTab === 'destination' ? "Próx. da minha casa" : "Todos"} />
                </div>
                <div className="shrink-0 size-[16px] opacity-60">
                  <svg className="size-full" fill="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p2aa2f000} stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-[#1d293d] max-h-[300px]">
                {activeTab === 'destination' ? (
                  <>
                    <SelectItem value="Próx. da minha casa" className="text-white focus:bg-slate-800">Próx. da minha casa</SelectItem>
                    {availableDestinationsList.filter(d => d !== "Próx. da minha casa").map((city) => (
                      <SelectItem key={city} value={city} className="text-white focus:bg-slate-800">
                        {city}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <>
                    <SelectItem value="Todos" className="text-white focus:bg-slate-800">Todos</SelectItem>
                    {availableDestinationsList.length > 0 ? (
                      availableDestinationsList.filter(d => d !== "Todos").map((city) => (
                        <SelectItem key={city} value={city} className="text-white focus:bg-slate-800">
                          {city}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled className="text-[#90a1b9] italic">
                        Nenhuma oferta disponível nessa rota
                      </SelectItem>
                    )}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="w-full h-[56px] bg-[#ff6900] hover:bg-[#ff6900]/90 text-white font-bold text-[18px] rounded-[14px] shadow-[0px_10px_7.5px_rgba(255,105,0,0.2)] tracking-tight flex items-center justify-center transition-all active:scale-[0.98] mt-2"
        >
          Buscar ofertas
        </button>
      </div>

      {/* Radius Selector Dialog */}
      <Dialog open={isRadiusDialogOpen} onOpenChange={setIsRadiusDialogOpen}>
        <DialogContent className="bg-[#1e293b] border-[#1d293d] text-white p-6 max-w-[340px] rounded-[20px]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-white text-center text-[18px]">Raio de busca</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRadius(r);
                  setIsRadiusDialogOpen(false);
                }}
                className={`flex items-center justify-between p-4 rounded-[12px] border-[1.5px] transition-all ${radius === r ? 'border-[#ff6900] bg-[#ff6900]/10' : 'border-[#45556c] bg-[rgba(38,38,38,0.3)]'}`}
              >
                <div className="flex flex-col items-start">
                  <span className={`font-bold ${radius === r ? 'text-[#ff6900]' : 'text-white'}`}>{r} km</span>
                  <span className="text-[10px] text-[#90a1b9] uppercase tracking-wider">Raio de distância</span>
                </div>
                {radius === r && (
                  <div className="size-[20px] rounded-full bg-[#ff6900] flex items-center justify-center">
                    <div className="size-[8px] rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
