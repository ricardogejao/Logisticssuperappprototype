import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Weight, 
  Truck, 
  Snowflake, 
  Box, 
  X,
  ArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay, 
  isBefore, 
  startOfDay,
  isToday
} from "date-fns";
import { ptBR } from "date-fns/locale";
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
import { Input } from '../ui/input';
import { cn } from '../ui/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { MOCK_OFFERS } from '../../data/mocks';

export interface SearchCriteria {
  origin: string;
  destination: string;
  type: string[];
  weight: string;
  date: string;
}

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: SearchCriteria;
  onSearch: (criteria: SearchCriteria) => void;
  onOpenFilters?: () => void;
}

const Chip = ({ 
  label, 
  selected, 
  onClick,
  icon: Icon
}: { 
  label: string; 
  selected: boolean; 
  onClick: () => void;
  icon?: React.ElementType;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2.5 rounded-full text-sm font-medium border transition-all flex items-center gap-2",
      selected 
        ? "bg-slate-900 dark:bg-orange-500 text-white border-slate-900 dark:border-orange-500 shadow-md transform scale-[1.02]" 
        : "bg-white dark:bg-[#1e293b] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
    )}
  >
    {Icon && <Icon className={cn("w-4 h-4", selected ? "text-white" : "text-slate-500 dark:text-slate-400")} />}
    {label}
  </button>
);

export function SearchSheet({ open, onOpenChange, initialValues, onSearch, onOpenFilters }: SearchSheetProps) {
  const [values, setValues] = useState<SearchCriteria>(initialValues);
  
  // Mock Active Vehicle (matches Home/FilterSheet)
  const vehicleCapacity = {
      weight: 25, // tons
      volume: 90  // m3
  };

  const compatibleOffers = React.useMemo(() => {
      return MOCK_OFFERS.filter(o => o.weightVal <= vehicleCapacity.weight && o.volume <= vehicleCapacity.volume);
  }, []);

  // Unique Locations from Compatible Offers
  const availableOrigins = React.useMemo(() => 
    Array.from(new Set(compatibleOffers.map(o => `${o.origin}, ${o.originState}`))), 
  [compatibleOffers]);

  const availableDestinations = React.useMemo(() => 
    Array.from(new Set(compatibleOffers.map(o => `${o.destination}, ${o.destinationState}`))), 
  [compatibleOffers]);

  // ... rest of component ...

  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(new Date());

  // Sync state when opening
  useEffect(() => {
    if (open) {
      setValues(initialValues);
      setCalendarDate(undefined);
      setCalendarOpen(false);
      setDisplayMonth(new Date());
    }
  }, [open, initialValues]);

  const handleSubmit = () => {
    onSearch(values);
    onOpenChange(false);
  };

  const toggleType = (type: string) => {
    setValues(prev => {
      const types = prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type];
      return { ...prev, type: types };
    });
  };

  const handleDateSelect = (date: Date) => {
    setCalendarDate(date);
    if (date) {
      const formatted = format(date, "dd 'de' MMMM", { locale: ptBR });
      // Capitalize Month name
      const parts = formatted.split(' ');
      if (parts.length >= 3) {
         parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
      }
      setValues(prev => ({ ...prev, date: parts.join(' ') }));
    }
  };

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(displayMonth)),
    end: endOfWeek(endOfMonth(displayMonth))
  });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh] flex flex-col rounded-t-[20px] bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full -ml-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
              <X className="w-5 h-5" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="text-base font-bold text-slate-900 dark:text-white absolute left-1/2 -translate-x-1/2">
            Editar busca
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Ajuste os filtros de origem, destino, tipo e data.
          </DrawerDescription>
          <div className="w-6" /> 
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          
          {/* 1. Route Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Rota</h3>
            <div className="flex flex-col gap-3 relative">
              {/* Connector Line */}
              <div className="absolute left-[19px] top-[20px] bottom-[20px] w-[2px] bg-slate-100 dark:bg-slate-800 z-0" />
              
              {/* Origin */}
              <div className="relative z-10 group">
                <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors z-20 pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full border-[3px] border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b]" />
                </div>
                <Select 
                    value={values.origin} 
                    onValueChange={(val) => setValues({...values, origin: val})}
                >
                    <SelectTrigger className="pl-10 h-12 text-base font-medium border-slate-200 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-orange-500 rounded-xl bg-transparent dark:text-white">
                        <SelectValue placeholder="Cidade de origem" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                        {availableOrigins.map(city => (
                            <SelectItem key={city} value={city} className="dark:text-white dark:focus:bg-slate-800">{city}</SelectItem>
                        ))}
                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                        <div 
                          className="px-2 py-2 text-sm font-bold text-[#ff6900] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenChange(false);
                            setTimeout(() => onOpenFilters?.(), 300);
                          }}
                        >
                          Ampliar raio de busca →
                        </div>
                    </SelectContent>
                </Select>
              </div>

              {/* Destination */}
              <div className="relative z-10 group">
                 <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-orange-500 transition-colors z-20 pointer-events-none">
                  <MapPin className="w-4 h-4 fill-orange-500 stroke-white dark:stroke-[#0f172a]" />
                </div>
                <Select 
                    value={values.destination} 
                    onValueChange={(val) => setValues({...values, destination: val})}
                >
                    <SelectTrigger className="pl-10 h-12 text-base font-medium border-slate-200 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-orange-500 rounded-xl bg-transparent dark:text-white">
                        <SelectValue placeholder="Cidade de destino" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                        {availableDestinations.map(city => (
                            <SelectItem key={city} value={city} className="dark:text-white dark:focus:bg-slate-800">{city}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 2. Type Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Tipo de carga</h3>
            <div className="flex flex-wrap gap-2.5">
              <Chip 
                label="Refrigerada" 
                icon={Snowflake}
                selected={values.type.includes('Refrigerada')}
                onClick={() => toggleType('Refrigerada')}
              />
              <Chip 
                label="Carga Seca" 
                icon={Box}
                selected={values.type.includes('Carga Seca')}
                onClick={() => toggleType('Carga Seca')}
              />
              <Chip 
                label="Graneleiro" 
                icon={Truck}
                selected={values.type.includes('Graneleiro')}
                onClick={() => toggleType('Graneleiro')}
              />
               <Chip 
                label="Diversos" 
                icon={Box}
                selected={values.type.includes('Diversos')}
                onClick={() => toggleType('Diversos')}
              />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 3. Details Section */}
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Peso</h3>
              <div className="relative">
                <Weight className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <Input 
                  value={values.weight}
                  onChange={(e) => setValues({...values, weight: e.target.value})}
                  className="pl-9 h-12 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-orange-500 rounded-xl font-medium bg-transparent dark:text-white"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Data</h3>
              <div className="relative">
                <div 
                  className={cn(
                    "relative cursor-pointer transition-all",
                    isCalendarOpen ? "ring-2 ring-slate-900 dark:ring-orange-500 rounded-xl" : ""
                  )}
                  onClick={() => setCalendarOpen(!isCalendarOpen)}
                >
                  <CalendarIcon className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <Input 
                    value={values.date}
                    readOnly
                    className={cn(
                      "pl-9 h-12 border-slate-200 dark:border-slate-800 rounded-xl font-medium cursor-pointer pr-8 bg-transparent dark:text-white",
                      isCalendarOpen ? "border-transparent focus-visible:ring-0" : "focus-visible:ring-slate-900 dark:focus-visible:ring-orange-500"
                    )}
                  />
                  <div className="absolute right-3 top-3.5 text-slate-400 dark:text-slate-500">
                    {isCalendarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calendar Collapsible Section */}
          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-[#1e293b] border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                   {/* Custom Calendar Header */}
                   <div className="flex items-center justify-between mb-6 px-1">
                      <span className="text-base font-bold text-slate-900 dark:text-white capitalize">
                        {format(displayMonth, "MMMM yyyy", { locale: ptBR })}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => setDisplayMonth(subMonths(displayMonth, 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                   </div>

                   {/* Week Days */}
                   <div className="grid grid-cols-7 mb-2">
                      {weekDays.map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {day}
                        </div>
                      ))}
                   </div>

                   {/* Days Grid */}
                   <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                      {calendarDays.map((day, idx) => {
                        const isSelected = calendarDate && isSameDay(day, calendarDate);
                        const isCurrentMonth = isSameMonth(day, displayMonth);
                        const isPast = isBefore(day, startOfDay(new Date()));
                        const isTodayDate = isToday(day);

                        return (
                          <button
                            key={day.toISOString()}
                            onClick={() => !isPast && handleDateSelect(day)}
                            disabled={isPast}
                            className={cn(
                              "h-10 w-10 flex items-center justify-center rounded-full text-sm transition-all relative",
                              !isCurrentMonth && "text-slate-300 dark:text-slate-600 opacity-50",
                              isPast && "text-slate-300 dark:text-slate-700 opacity-30 cursor-not-allowed",
                              !isPast && isCurrentMonth && "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                              
                              isSelected && "bg-slate-900 dark:bg-orange-500 text-white font-semibold shadow-md scale-105 z-10 hover:bg-slate-800 dark:hover:bg-orange-600 hover:text-white",
                              !isSelected && isTodayDate && "border-[1.5px] border-slate-900 dark:border-orange-500 font-bold text-slate-900 dark:text-orange-500"
                            )}
                          >
                            {format(day, 'd')}
                          </button>
                        );
                      })}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-8" />
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b] px-5 py-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Button 
            className="w-full h-12 rounded-xl text-base font-bold bg-slate-900 dark:bg-[#ff6900] hover:bg-slate-800 dark:hover:bg-[#e65e00] text-white"
            onClick={handleSubmit}
          >
            Atualizar busca
          </Button>
          <DrawerClose asChild>
            <Button 
              variant="ghost" 
              className="w-full h-10 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
