import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, MapPin, Calendar, Truck, ChevronRight, History, Package, Clock, AlertCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/ui/bottom-nav';
import { cn } from '../components/ui/utils';

export function Trips() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'history' ? 'history' : 'active';
  const [activeTab, setActiveTab] = useState<'active' | 'history'>(initialTab);
  const [hasOccurrence, setHasOccurrence] = useState(false);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') === 'history' ? 'history' : 'active');
    setHasOccurrence(localStorage.getItem('PROTOTYPE_OCCURRENCE_ACTIVE') === 'true');
  }, [searchParams]);

  // Mock Active Data
  const activeTrips = [
    // OCE (Contracted)
    {
      id: '8932',
      type: 'OCE', // Ordem de Coleta e Entrega
      status: 'Em trânsito',
      statusColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      origin: 'Campinas, SP',
      destination: 'Rio de Janeiro, RJ',
      occupation: 92,
      date: 'Amanhã, 08:00', // Data prevista para coleta
    },
    // OF (Negotiation)
    {
      id: '4102',
      type: 'OF', // Oferta de Frete
      status: 'Em negociação',
      statusColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      origin: 'São Paulo, SP',
      destination: 'Curitiba, PR',
      occupation: 45,
      date: '28/01, 14:00',
    }
  ];

  const historyTrips = [
    {
      id: '2932',
      type: 'OCE',
      origin: 'São Paulo, SP',
      destination: 'Curitiba, PR',
      status: 'Concluída',
      statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      date: '02 Dez, 14:30'
    },
    {
      id: '3156',
      type: 'OCE',
      origin: 'Belo Horizonte, MG',
      destination: 'Vitória, ES',
      status: 'Concluída',
      statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      date: '28 Nov, 09:15'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            {activeTab === 'active' ? 'Viagens em andamento' : 'Histórico de viagens'}
        </h1>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
          <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('active')}
                className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                    activeTab === 'active' ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                Em andamento
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                    activeTab === 'history' ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                Histórico
              </button>
          </div>
      </div>

      <div className="flex-1 p-4 pb-24 space-y-4">
        
        {activeTab === 'active' && (
            <div className="space-y-4">
                {activeTrips.map((trip) => (
                    <div 
                        key={`${trip.type}-${trip.id}`}
                        onClick={() => navigate(trip.type === 'OF' ? `/offer/${trip.id}` : '/trip/details')}
                        className={cn(
                            "bg-white dark:bg-[#1e293b] rounded-2xl border shadow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all",
                            trip.type === 'OF' ? "border-amber-200 dark:border-amber-900/50 ring-4 ring-amber-50 dark:ring-amber-900/10" : "border-slate-200 dark:border-slate-800"
                        )}
                    >
                        {/* Header Badge */}
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "w-2 h-2 rounded-full",
                                    trip.type === 'OF' ? "bg-amber-500 animate-pulse" : "bg-blue-500"
                                )}/>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                                    {trip.type === 'OCE' ? `Ordem de Coleta e Entrega nº ${trip.id}` : `Oferta de Frete nº ${trip.id}`}
                                </span>
                                {trip.id === '8932' && hasOccurrence && (
                                    <div className="flex items-center gap-1.5 ml-2 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/50">
                                        <AlertCircle className="size-3 text-amber-600 dark:text-amber-400" />
                                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-tight">Ocorrência</span>
                                    </div>
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap", 
                                (trip.id === '8932' && hasOccurrence) ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" : trip.statusColor
                            )}>
                                {(trip.id === '8932' && hasOccurrence) ? 'Ocorrência' : trip.status}
                            </span>
                        </div>

                        <div className="p-4">
                            {/* Route */}
                            <div className="flex flex-col relative pl-2 mb-4">
                                <div className="flex gap-3 relative z-10 mb-3">
                                    <div className="relative shrink-0 flex flex-col items-center w-3.5 pt-1">
                                        <div className="w-2.5 h-2.5 rounded-full border-[2px] border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] z-10" />
                                        <div className="absolute top-2.5 w-[2px] bg-slate-100 dark:bg-slate-800 h-[calc(100%+12px)] left-1/2 -translate-x-1/2" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5">Origem</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{trip.origin}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="relative shrink-0 z-10 pt-1">
                                         <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5">Destino</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{trip.destination}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Ocupação</p>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{trip.occupation}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                            {trip.status === 'Em trânsito' ? 'Próximo Evento' : 'Previsão Coleta'}
                                        </p>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{trip.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {trip.id === '8932' && hasOccurrence && (
                             <div className="mx-4 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50 flex items-center gap-3">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-lg text-amber-600 dark:text-amber-400">
                                    <AlertTriangle className="size-4" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-amber-900 dark:text-amber-200 leading-tight">Ocorrência em andamento</p>
                                    <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">Aguardando instruções da central</p>
                                </div>
                                <ChevronRight className="size-4 text-amber-300 dark:text-amber-700 ml-auto" />
                             </div>
                        )}

                        {trip.type === 'OF' && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-2 border-t border-amber-100 dark:border-amber-800/50 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Aguardando resposta do contratante</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'history' && (
             <div className="space-y-3">
                {historyTrips.map((trip) => (
                    <div key={trip.id} className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm opacity-75 hover:opacity-100 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                             <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                    <History className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Ordem #{trip.id}</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{trip.date}</span>
                                </div>
                            </div>
                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", trip.statusColor)}>
                                {trip.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mb-1 px-1">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{trip.origin}</span>
                            <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{trip.destination}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
}
