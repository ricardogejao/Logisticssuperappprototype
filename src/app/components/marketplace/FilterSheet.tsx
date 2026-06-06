import React, { useState, useEffect, useMemo } from 'react';
import { X, Snowflake, Truck, Box, Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerFooter, 
  DrawerClose 
} from '../ui/drawer';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { cn } from '../ui/utils';
import { filterOffers, FilterState } from '../../utils/marketplace';

// --- Types ---
// FilterState imported from utils to avoid circular dependency

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
  offers?: any[]; // For calculating count dynamically
}

// --- Components ---

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn("text-lg font-bold text-slate-900 dark:text-white mb-4", className)}>{children}</h3>
);

const Pill = ({ 
  selected, 
  onClick, 
  children, 
  icon: Icon 
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode; 
  icon?: React.ElementType; 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2.5 rounded-full text-sm font-medium border transition-all flex items-center gap-2",
      selected 
        ? "bg-slate-900 dark:bg-orange-500 text-white border-slate-900 dark:border-orange-500" 
        : "bg-white dark:bg-[#1e293b] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
    )}
  >
    {Icon && <Icon className={cn("w-4 h-4", selected ? "text-white" : "text-slate-500 dark:text-slate-400")} />}
    {children}
  </button>
);

const Histogram = () => (
  <div className="flex items-end gap-1 h-12 mb-2 px-1 opacity-50">
    {[20, 45, 30, 60, 75, 50, 80, 40, 55, 35, 65, 45, 25, 10, 30, 20].map((h, i) => (
      <div 
        key={i} 
        className="flex-1 bg-slate-300 dark:bg-slate-700 rounded-t-sm" 
        style={{ height: `${h}%` }} 
      />
    ))}
  </div>
);

export function FilterSheet({ open, onOpenChange, onApply, initialFilters, offers = [] }: FilterSheetProps) {
  // State
  const [searchRadius, setSearchRadius] = useState(50);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [distanceRange, setDistanceRange] = useState([0, 2000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('any'); 
  
  // New State for Weight/Volume
  const [weightLimit, setWeightLimit] = useState(25); // Default max weight (tons)
  const [volumeLimit, setVolumeLimit] = useState(90); // Default max volume (m3)

  // Advanced Filters Visibility
  const [isAdvancedOpen, setAdvancedOpen] = useState(false);

  // Mock Active Vehicle Capacity
  const vehicleCapacity = {
     weight: 25, // tons
     volume: 90  // m3
  };

  // Sync state with initialFilters when opening
  useEffect(() => {
    if (open && initialFilters) {
      if (initialFilters.searchRadius) setSearchRadius(initialFilters.searchRadius);
      setPriceRange(initialFilters.priceRange);
      setDistanceRange(initialFilters.distanceRange);
      setSelectedTypes(initialFilters.selectedTypes);
      setSelectedDate(initialFilters.selectedDate);
      
      if (initialFilters.weightLimit) setWeightLimit(initialFilters.weightLimit);
      if (initialFilters.volumeLimit) setVolumeLimit(initialFilters.volumeLimit);
    }
  }, [open, initialFilters]);

  // Derived state for predicted count
  const predictedCount = useMemo(() => {
    const filters: FilterState = {
      searchRadius,
      priceRange,
      distanceRange,
      selectedTypes,
      selectedDate,
      weightLimit,
      volumeLimit
    };
    return filterOffers(offers, filters).length;
  }, [offers, searchRadius, priceRange, distanceRange, selectedTypes, selectedDate, weightLimit, volumeLimit]);

  const toggleSelection = (list: string[], item: string, setList: (l: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClear = () => {
    setSearchRadius(50);
    setPriceRange([0, 10000]);
    setDistanceRange([0, 2000]);
    setSelectedTypes([]);
    setSelectedDate('any');
    setWeightLimit(vehicleCapacity.weight);
    setVolumeLimit(vehicleCapacity.volume);
    setAdvancedOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] flex flex-col rounded-t-[20px] bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full -ml-2 hover:bg-slate-50 dark:hover:bg-slate-800">
              <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="text-base font-bold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2">
            Filtros
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Opções de filtro para buscar ofertas de frete
          </DrawerDescription>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          
          {/* 1. Raio de busca (New Chip Selector) */}
          <section id="filter-radius">
            <SectionTitle>Raio de busca</SectionTitle>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[25, 50, 100, 200].map((radius) => {
                const isSelected = searchRadius === radius;
                return (
                  <button
                    key={radius}
                    onClick={() => setSearchRadius(radius)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-sm font-bold border transition-all whitespace-nowrap",
                      isSelected
                        ? "bg-[#ff6900] text-white border-[#ff6900] shadow-sm"
                        : "bg-transparent text-slate-400 border-slate-200 dark:border-slate-800"
                    )}
                  >
                    {radius} km
                  </button>
                );
              })}
            </div>
            <div className="mt-8 h-px bg-slate-100 dark:bg-slate-800 w-full" />
          </section>

          {/* 2. Load Type */}
          <section>
            <SectionTitle>Tipo de carga</SectionTitle>
            <div className="flex flex-wrap gap-2.5">
              <Pill 
                selected={selectedTypes.includes('refrigerada')} 
                onClick={() => toggleSelection(selectedTypes, 'refrigerada', setSelectedTypes)}
                icon={Snowflake}
              >
                Refrigerada
              </Pill>
              <Pill 
                selected={selectedTypes.includes('seca')} 
                onClick={() => toggleSelection(selectedTypes, 'seca', setSelectedTypes)}
                icon={Box}
              >
                Carga Seca
              </Pill>
              <Pill 
                selected={selectedTypes.includes('granel')} 
                onClick={() => toggleSelection(selectedTypes, 'granel', setSelectedTypes)}
                icon={Truck}
              >
                Granel
              </Pill>
            </div>
            <div className="mt-8 h-px bg-slate-100 dark:bg-slate-800 w-full" />
          </section>

          {/* 3. Date */}
          <section>
            <SectionTitle>Data de coleta</SectionTitle>
            <div className="flex flex-wrap gap-2.5">
              {['Hoje', 'Amanhã', 'Próximos dias'].map(d => (
                <Pill 
                  key={d}
                  selected={selectedDate === d} 
                  onClick={() => setSelectedDate(d)}
                >
                  {d}
                </Pill>
              ))}
              <Pill 
                selected={selectedDate === 'specific'} 
                onClick={() => setSelectedDate('specific')}
                icon={CalendarIcon}
              >
                Data específica
              </Pill>
            </div>
            <div className="mt-8 h-px bg-slate-100 dark:bg-slate-800 w-full" />
          </section>

          {/* 4. Advanced Filters */}
          <section>
             <button 
                onClick={() => setAdvancedOpen(!isAdvancedOpen)}
                className="flex items-center justify-between w-full text-left group select-none"
             >
                <div className="text-lg font-bold text-slate-900 dark:text-white">Filtros Avançados</div>
                {isAdvancedOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                )}
             </button>

             {isAdvancedOpen && (
                 <div className="space-y-8 pt-6 animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Freight Value */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Valor do frete</h4>
                        <div className="pt-2 pb-6 relative">
                            <Histogram />
                            <Slider
                                value={priceRange}
                                min={0}
                                max={10000}
                                step={100}
                                onValueChange={setPriceRange}
                                className="relative z-10"
                            />
                            <div className="flex justify-between mt-4">
                                <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 w-[45%]">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Mínimo</span>
                                <span className="text-sm font-semibold dark:text-white">R$ {priceRange[0]}</span>
                                </div>
                                <div className="flex items-center text-slate-300 dark:text-slate-700">-</div>
                                <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 w-[45%]">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Máximo</span>
                                <span className="text-sm font-semibold dark:text-white">R$ {priceRange[1]}+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Distance (Trip) */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Distância da viagem</h4>
                        <div className="py-2">
                        <Slider
                            value={distanceRange}
                            min={0}
                            max={2000}
                            step={50}
                            onValueChange={setDistanceRange}
                        />
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {distanceRange[0]}–{distanceRange[1]} km
                            </span>
                        </div>
                        </div>
                    </div>

                    {/* Weight */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Peso máximo</h4>
                        <div className="py-2">
                            <Slider
                                value={[weightLimit]}
                                min={0}
                                max={vehicleCapacity.weight}
                                step={0.5}
                                onValueChange={(val) => setWeightLimit(val[0])}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Até {weightLimit} ton
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Volume */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Volume máximo</h4>
                        <div className="py-2">
                            <Slider
                                value={[volumeLimit]}
                                min={0}
                                max={vehicleCapacity.volume}
                                step={1}
                                onValueChange={(val) => setVolumeLimit(val[0])}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Até {volumeLimit} m³
                                </span>
                            </div>
                        </div>
                    </div>

                 </div>
             )}
          </section>

          {/* Spacer for bottom actions */}
          <div className="h-4" />
        </div>

        {/* Sticky Footer */}
        <DrawerFooter className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b] px-5 py-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Button 
            className="w-full h-12 rounded-xl text-base font-bold bg-slate-900 dark:bg-[#ff6900] hover:bg-slate-800 dark:hover:bg-[#e65e00] text-white disabled:opacity-50"
            disabled={predictedCount === 0}
            onClick={() => onApply({ searchRadius, priceRange, distanceRange, selectedTypes, selectedDate, weightLimit, volumeLimit })}
          >
            {predictedCount === 0 ? "Nenhuma oferta encontrada" : `Mostrar ${predictedCount} ofertas`}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full h-10 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 underline hover:text-slate-900 dark:hover:text-white hover:bg-transparent"
            onClick={handleClear}
          >
            Limpar tudo
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
