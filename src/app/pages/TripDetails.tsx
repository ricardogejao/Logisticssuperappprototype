import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  Phone, 
  Navigation, 
  AlertCircle, 
  AlertTriangle, 
  XCircle,
  Trash2,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger, 
  DrawerClose,
  DrawerFooter
} from '../components/ui/drawer';
import { toast } from 'sonner';
import { cn } from '../components/ui/utils';
import { motion, AnimatePresence } from 'motion/react';

// SVG paths from Figma import
const SVG_PATHS = {
  dots: "M1.66585 2.49877C2.12586 2.49877 2.49877 2.12586 2.49877 1.66585C2.49877 1.20584 2.12586 0.832924 1.66585 0.832924C1.20584 0.832924 0.832924 1.20584 0.832924 1.66585C0.832924 2.12586 1.20584 2.49877 1.66585 2.49877Z",
  routeArrow: "M5.99505 9.49216L2.49794 5.99505L5.99505 2.49794",
  chevronRight: "M0.832924 10.828L5.83047 5.83047L0.832924 0.832924"
};

interface FreightOffer {
  id: string;
  number: string;
  origin: string;
  destination: string;
  status: string;
  isConfirmed: boolean;
  hasOccurrence?: boolean;
  isCancelled?: boolean;
}

const ItemTypes = {
  OF_CARD: 'of_card',
};

function DragHandleDots() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-[3px] opacity-30">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="size-[3px] rounded-full bg-slate-600 dark:bg-slate-400" />
        ))}
    </div>
  );
}

function SwipeableOFCard({ 
  of, 
  index,
  onDelete, 
  onClick,
  moveCard
}: { 
  of: FreightOffer, 
  index: number,
  onDelete: (id: string) => void, 
  onClick: () => void,
  moveCard: (dragIndex: number, hoverIndex: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.OF_CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.OF_CARD,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drop(ref);

  return (
    <div 
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[14px] h-auto min-h-[65.244px] transition-all duration-200",
        of.isCancelled && "opacity-50 pointer-events-none",
        isDragging && "opacity-60 shadow-xl scale-[1.02] z-50 ring-2 ring-orange-500/20"
      )}
    >
      <div className="absolute inset-0 bg-[#fb2c36] flex items-center justify-end pr-[24px]">
        <Trash2 className="size-5 text-white" />
      </div>

      <motion.div
        drag={of.isCancelled || isDragging ? false : "x"}
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) {
            onDelete(of.id);
          }
        }}
        className={cn(
          "relative bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-slate-800 rounded-[14px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex items-stretch z-10 cursor-pointer overflow-hidden py-3",
          isDragging && "border-orange-500/50"
        )}
        onClick={onClick}
      >
        <div 
          ref={drag as any}
          className="w-[36px] flex items-center justify-center pl-[12px] pr-[4px] shrink-0 cursor-grab active:cursor-grabbing"
        >
          {!of.isCancelled && <DragHandleDots />}
        </div>

        <div className="flex-1 min-w-0 px-[12px] flex flex-col gap-[4px]">
          <div className="flex justify-between items-start">
            <span className="text-[14px] font-bold text-[#0f172b] dark:text-white tracking-[-0.15px] leading-[20px]">
              OF #{of.number}
            </span>
            <div className="flex flex-col items-end gap-1.5">
              {of.isCancelled ? (
                <div className="bg-slate-100 dark:bg-slate-800 px-[8px] py-[2px] rounded-full flex items-center h-[19px] border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.37px] whitespace-nowrap leading-[15px]">
                    Cancelada
                  </span>
                </div>
              ) : (
                <div className={cn(
                  "px-[8px] py-[2px] rounded-full flex items-center h-[19px]",
                  of.hasOccurrence 
                    ? "bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800" 
                    : "bg-[#f0fdf4] dark:bg-green-900/30"
                )}>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.37px] whitespace-nowrap leading-[15px]",
                    of.hasOccurrence
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-[#008236] dark:text-green-400"
                  )}>
                    {of.hasOccurrence ? 'Ocorrência em análise' : of.status}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <span className="text-[12px] text-[#62748e] dark:text-slate-400 truncate leading-[16px]">
              {of.origin.split(',')[0]}
            </span>
            <div className="flex items-center">
              <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                <path d="M6 9.5L2.5 6L6 2.5" stroke="#CAD5E2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 origin-center" />
                <path d="M9.5 6H2.5" stroke="#CAD5E2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[12px] text-[#62748e] dark:text-slate-400 truncate leading-[16px]">
              {of.destination.split(',')[0]}
            </span>
          </div>
        </div>

        <div className="w-[44px] flex items-center justify-center pl-[8px] pr-[16px] shrink-0">
          <svg className="w-[7px] h-[12px]" fill="none" viewBox="0 0 7 12">
            <path d="M1 1L6 6L1 11" stroke="#CAD5E2" strokeWidth="1.66" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export function TripDetails() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Contratada');
  const [hasActiveOccurrence, setHasActiveOccurrence] = useState(true);
  const [cancelReason, setCancelReason] = useState<string | null>(null);

  useEffect(() => {
    const savedOccurrence = localStorage.getItem('PROTOTYPE_OCCURRENCE_ACTIVE');
    if (savedOccurrence !== null) {
      setHasActiveOccurrence(savedOccurrence === 'true');
    } else {
      // Default for prototype if never set
      localStorage.setItem('PROTOTYPE_OCCURRENCE_ACTIVE', 'true');
      setHasActiveOccurrence(true);
    }
    
    const savedStatus = localStorage.getItem('PROTOTYPE_TRIP_STATUS');
    const savedCancelReason = localStorage.getItem('PROTOTYPE_TRIP_CANCEL_REASON');
    
    if (savedStatus) {
      setStatus(savedStatus);
      if (savedStatus === 'Cancelada') {
        setFreightOffers(prev => prev.map(of => ({ ...of, isCancelled: true })));
      }
    }
    if (savedCancelReason) {
        setCancelReason(savedCancelReason);
    }
  }, []);

  const [freightOffers, setFreightOffers] = useState<FreightOffer[]>([
    {
        id: '2',
        number: '4105',
        origin: 'Campinas, SP',
        destination: 'Rio de Janeiro, RJ',
        status: 'Ocorrência em análise',
        isConfirmed: true,
        hasOccurrence: true
    },
    {
        id: '3',
        number: '4110',
        origin: 'Campinas, SP',
        destination: 'Rio de Janeiro, RJ',
        status: 'Contratada',
        isConfirmed: true
    }
  ]);

  const showOccurrenceCard = hasActiveOccurrence || freightOffers.some(of => of.hasOccurrence);

  const handleDelete = (id: string) => {
    toast.error("Processo de distrato iniciado para esta oferta.");
    setFreightOffers(prev => prev.filter(of => of.id !== id));
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setFreightOffers((prevCards) => {
      const newCards = [...prevCards];
      const draggedCard = newCards[dragIndex];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, draggedCard);
      return newCards;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
        
        {/* Header */}
        <header className="bg-white dark:bg-[#1e293b] px-6 py-6 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
              <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/home')}
                  className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2 w-10 h-10 text-slate-800 dark:text-white"
              >
                  <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">OCE #8932</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Campinas, SP <span className="mx-1 text-slate-300 dark:text-slate-700">•</span> Rio de Janeiro, RJ</p>
              </div>
          </div>
          <div className="flex items-center gap-3">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-full w-10 h-10 transition-colors shadow-sm">
                      <Phone className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="px-6 pb-12 pt-2 bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-800">
                  <div className="mx-auto w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-8" />
                  <DrawerHeader className="p-0 mb-8">
                    <DrawerTitle className="text-xl font-bold text-slate-900 dark:text-white text-center">Como deseja entrar em contato?</DrawerTitle>
                  </DrawerHeader>
                  <div className="space-y-4">
                     <Button variant="outline" className="w-full h-20 justify-start gap-4 px-6 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 group" onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>
                        <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900 dark:text-white">Falar pelo WhatsApp</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Resposta em até 5 minutos</p>
                        </div>
                     </Button>
                     <Button variant="outline" className="w-full h-20 justify-start gap-4 px-6 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 group" onClick={() => window.location.href = 'tel:0800000000'}>
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900 dark:text-white">Ligar para o suporte</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Central 24h disponível</p>
                        </div>
                     </Button>
                  </div>
                  <DrawerFooter className="p-0 mt-8">
                     <DrawerClose asChild>
                        <Button variant="ghost" className="w-full h-12 font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">Cancelar</Button>
                     </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-48 px-6 pt-6 space-y-6">
          
          {/* Status da Ocorrência - PRIORIDADE MÁXIMA */}
          {showOccurrenceCard && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-orange-50 dark:bg-orange-900/10 rounded-2xl border-2 border-orange-200 dark:border-orange-800/50 shadow-md shadow-orange-500/5 p-5 flex flex-col gap-4"
            >
                  <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                              <AlertCircle className="w-6 h-6" />
                          </div>
                          <div>
                              <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-widest">Ocorrência em aberto</p>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white">#OC-552</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate max-w-[150px]">Impedimento na OF #4105</p>
                          </div>
                      </div>
                      <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 bg-orange-200 dark:bg-orange-900/40 px-3 py-1.5 rounded-lg uppercase tracking-wider animate-pulse">Em análise</span>
                  </div>
                  <div className="h-px bg-orange-200/50 dark:bg-orange-800/30" />
                  <Button 
                      variant="ghost" 
                      className="w-full h-12 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20 font-bold rounded-xl justify-between px-3" 
                      onClick={() => navigate('/trip/occurrence')}
                  >
                      <span className="text-sm">Ver detalhes e chat de suporte</span>
                      <ChevronRight className="w-5 h-5" />
                  </Button>
            </motion.div>
          )}

          {/* Action Buttons - Always visible */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
                variant="outline"
                className="h-24 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm font-bold text-[13px] flex flex-col items-center justify-center gap-3 transition-all active:scale-95"
                onClick={() => navigate('/trip/report-problem')}
            >
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <AlertTriangle className="size-5 text-amber-500" />
                </div>
                <span>Reportar ocorrência</span>
            </Button>
            <Button 
                variant="outline"
                className="h-24 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm font-bold text-[13px] flex flex-col items-center justify-center gap-3 transition-all active:scale-95"
                onClick={() => navigate('/trip/cancel/confirm')}
            >
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <XCircle className="size-5 text-red-500" />
                </div>
                <span>Cancelar viagem</span>
            </Button>
          </div>

          {/* List of Freight Offers */}
          <section className="space-y-4">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">Ofertas de Frete (OF)</h3>
              <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {freightOffers.map((of, index) => (
                        <motion.div
                          key={of.id}
                          layout
                          initial={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SwipeableOFCard 
                            of={of} 
                            index={index}
                            onDelete={handleDelete} 
                            onClick={() => navigate(`/freight-offer/${of.id}`)}
                            moveCard={moveCard}
                          />
                        </motion.div>
                    ))}
                  </AnimatePresence>
              </div>
          </section>


          {/* Vehicle Info */}
          <section className="space-y-4">
               <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">Veículo ativo</h3>
               <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all hover:border-slate-200/80 dark:hover:border-slate-700">
                  <div className="w-12 h-12 bg-slate-50/50 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100/50 dark:border-slate-800"><Truck className="w-6 h-6 text-slate-400 dark:text-slate-500 stroke-[1.5]" /></div>
                  <div>
                      <p className="text-base font-semibold text-slate-800 dark:text-white leading-tight">Volvo FH 540</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-1 uppercase tracking-tight">Placa: ABC-1234 <span className="mx-1 text-slate-200 dark:text-slate-800">•</span> Carreta Sider</p>
                  </div>
               </div>
          </section>
        </div>

        {/* Footer CTAs */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <Button 
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]" 
            onClick={() => navigate('/trip/mode')}
          >
            <Navigation className="size-5 mr-2" />
            Abrir modo viagem
          </Button>
          <Button 
            variant="outline"
            className="w-full h-12 text-[#314158] dark:text-slate-300 border-[#e2e8f0] dark:border-slate-700 rounded-[14px] hover:bg-slate-50 dark:hover:bg-slate-800 shadow-none font-bold transition-all active:scale-[0.98]" 
            onClick={() => navigate('/offers?origin=Campinas,%20SP&destination=Rio%20de%20Janeiro,%20RJ')}
          >
            <Package className="size-5 mr-2 text-blue-600" />
            Incluir outra entrega na mesma rota
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}
