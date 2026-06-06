import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { 
  ArrowLeft, 
  Box, 
  Truck, 
  Snowflake, 
  Weight, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  CreditCard 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { MOCK_OFFERS } from '../data/mocks';
import { cn } from '../components/ui/utils';

export function ContractAcceptance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [accepted, setAccepted] = useState(false);
  const offer = MOCK_OFFERS.find(o => o.id === id);

  const { negotiationAdjustment } = location.state || {};

  if (!offer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-[#0f172a]">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Oferta não encontrada</h1>
        <Button onClick={() => navigate('/marketplace')} variant="outline" className="dark:border-slate-800 dark:text-slate-300">Voltar para ofertas</Button>
      </div>
    );
  }

  // Extended mock calculations
  const seed = parseInt(offer.id || '1', 10);
  const activeVehicle = { weight: 25, volume: 90 };
  const weightPercent = (offer.weightVal / activeVehicle.weight) * 100;
  const volumePercent = offer.volume ? (offer.volume / activeVehicle.volume) * 100 : 0;
  const occupation = Math.round(Math.max(weightPercent, volumePercent));
  const distance = offer.distance || (350 + (seed * 50)); 

  // Parse Date/Time
  const [dateStr, timeStr] = offer.date.includes(',') 
    ? offer.date.split(',').map(s => s.trim()) 
    : [offer.date, '08:00']; // Fallback time if not present

  const getIcon = (type: string) => {
    switch (type) {
      case 'Refrigerada': return Snowflake;
      case 'Graneleiro': return Truck;
      default: return Box;
    }
  };
  const TypeIcon = getIcon(offer.type);

  // Price Calculations
  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
  };
  
  const basePriceVal = parsePrice(offer.price);
  const finalPriceVal = basePriceVal + (negotiationAdjustment || 0);
  
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    
  const basePriceStr = formatCurrency(basePriceVal);
  const adjustmentStr = formatCurrency(negotiationAdjustment || 0);
  const finalPriceStr = formatCurrency(finalPriceVal);

  const isNegotiation = offer.isNegotiable;

  // Mock Driver & Vehicle Data (Since not in offer object)
  const DRIVER = {
      name: "Carlos Antônio Silva",
      status: "Cadastro verificado e ativo"
  };

  const VEHICLE = {
      model: "Scania R450 - Toco",
      plate: "ABC-1234"
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] pb-32 transition-colors duration-300">
      {/* 1. Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Aceite da Contratação</h1>
      </div>

      <div className="p-4 space-y-6 max-w-lg mx-auto w-full">
        
        {/* 2. Resumo da Oferta */}
        <section className="bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/50 px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resumo da Oferta</h2>
            </div>
            
            <div className="p-5 space-y-6">
                {/* Route */}
                <div className="flex flex-col relative pl-2">
                    {/* Origin */}
                    <div className="flex gap-4 relative z-10 mb-6">
                        <div className="relative shrink-0 mt-1 flex flex-col items-center w-3.5">
                            <div className="w-3.5 h-3.5 rounded-full border-[3px] border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] z-10" />
                            <div className="absolute top-3.5 w-[2px] bg-slate-100 dark:bg-slate-800 h-[calc(100%+24px)] left-1/2 -translate-x-1/2" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">Origem</p>
                            <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">{offer.origin}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{offer.originState}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="relative shrink-0 mt-1 z-10">
                            <div className="w-3.5 h-3.5 rounded-full border-[3px] border-orange-200 dark:border-orange-900/50 bg-orange-500 shrink-0" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">Destino</p>
                            <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">{offer.destination}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{offer.destinationState}</p>
                        </div>
                    </div>
                </div>

                {/* Detailed Specs Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {/* Tipo de Carga */}
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Tipo de Carga</span>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <TypeIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold">{offer.type}</span>
                        </div>
                    </div>

                     {/* Distância */}
                     <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Distância</span>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold">{distance} km</span>
                        </div>
                    </div>

                    {/* Data de Coleta */}
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Data de Coleta</span>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold">{dateStr}</span>
                        </div>
                    </div>

                    {/* Horário Previsto */}
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Horário Previsto</span>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold">{timeStr}</span>
                        </div>
                    </div>

                    {/* Peso Líquido */}
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Peso Líquido</span>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <Weight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold">{offer.weight}</span>
                        </div>
                    </div>

                    {/* Volume */}
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Volume</span>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <Box className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold">{offer.volume} m³</span>
                        </div>
                    </div>

                    {/* Ocupação */}
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Ocupação</span>
                        <div className="flex items-center gap-1.5">
                            <Box className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className={cn("text-sm font-bold", occupation > 90 ? "text-orange-600 dark:text-orange-400" : "text-slate-900 dark:text-white")}>
                                {occupation}%
                            </span>
                        </div>
                    </div>

                    {/* Valor do Frete Breakdown OR Standard */}
                    {isNegotiation ? (
                         <div className="space-y-1 col-span-2 border-t border-slate-100 dark:border-slate-800 pt-3 mt-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white mb-2 block">Detalhes do Frete</span>
                            <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-slate-500 dark:text-slate-400">Valor Base</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">{basePriceStr}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Adicional Negociado</span>
                                <span className={cn(
                                    "font-medium",
                                    (negotiationAdjustment || 0) > 0 ? "text-green-600 dark:text-green-400" : "text-slate-700 dark:text-slate-300"
                                )}>
                                    {(negotiationAdjustment || 0) > 0 ? "+" : ""}{adjustmentStr}
                                </span>
                            </div>
                         </div>
                    ) : (
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Valor do Frete</span>
                            <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                                <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                <span className="text-sm font-bold">{offer.price}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Total Price */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800 flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-green-800 dark:text-green-400 uppercase tracking-wide">Valor final do frete</span>
                    <span className="text-xl font-bold text-green-700 dark:text-green-300">{finalPriceStr}</span>
                </div>
            </div>
        </section>

        {/* 3. Confirmações Operacionais */}
        <section className="space-y-3">
             <h2 className="text-sm font-bold text-slate-900 dark:text-white">Confirmações Operacionais</h2>
             
             {/* Driver & Vehicle Details */}
             <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 space-y-4">
                    {/* Driver */}
                    <div className="flex items-start gap-3">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full shrink-0">
                            <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Motorista Responsável</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{DRIVER.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-green-700 dark:text-green-400 font-medium">{DRIVER.status}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    {/* Vehicle */}
                    <div className="flex items-start gap-3">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full shrink-0">
                            <Truck className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Veículo Selecionado</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{VEHICLE.model}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">{VEHICLE.plate}</p>
                        </div>
                    </div>
                </div>

                {/* Validation Message */}
                <div className="bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800 p-3 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-green-800 dark:text-green-300">Operação validada</p>
                        <p className="text-xs text-green-700 dark:text-green-400/80 leading-relaxed mt-0.5">
                            O motorista e o veículo selecionados estão aptos para realizar esta viagem conforme os requisitos da carga.
                        </p>
                    </div>
                </div>
             </div>
        </section>

        {/* 4. Aceite Final */}
        <section className="pt-2">
            <div 
                className={cn(
                    "flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer",
                    accepted 
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 shadow-sm" 
                      : "bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-800"
                )}
                onClick={() => setAccepted(!accepted)}
            >
                <Checkbox 
                    id="final-accept" 
                    checked={accepted}
                    onCheckedChange={(checked) => setAccepted(checked === true)}
                    className="mt-0.5 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                />
                <label htmlFor="final-accept" className="text-sm font-medium text-slate-900 dark:text-slate-300 cursor-pointer select-none leading-relaxed">
                    Declaro que as informações estão corretas e aceito realizar o transporte desta carga conforme os dados apresentados.
                </label>
            </div>
        </section>

      </div>

      {/* 5. Ação Principal */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-lg mx-auto w-full">
            <Button
                disabled={!accepted}
                onClick={() => navigate(`/offer/${id}/hiring/success`)}
                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
            >
                {isNegotiation ? "CONFIRMAR NEGOCIAÇÃO" : "CONFIRMAR CONTRATAÇÃO"}
            </Button>
        </div>
      </div>
    </div>
  );
}