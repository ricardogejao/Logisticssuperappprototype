import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Box, Building2, FileText, Loader2, AlertCircle, Snowflake, Weight, Minus, Plus, MapPin, User, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../components/ui/utils';
import { MOCK_OFFERS } from '../data/mocks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export function CargoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const offer = MOCK_OFFERS.find(o => o.id === id);
  
  // Check if tracked from navigation state
  const isTracked = location.state?.isTracked || false;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [hasActiveOccurrence, setHasActiveOccurrence] = useState(false);

  React.useEffect(() => {
    const savedOccurrence = localStorage.getItem('PROTOTYPE_OCCURRENCE_ACTIVE');
    if (savedOccurrence !== null) {
      setHasActiveOccurrence(savedOccurrence === 'true');
    }
  }, []);
  
  // Negotiation State
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);
  const [negotiationAdjustment, setNegotiationAdjustment] = useState(0);

  if (!offer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-[#0f172a]">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Oferta não encontrada</h1>
        <Button onClick={() => navigate(-1)} variant="outline">Voltar</Button>
      </div>
    );
  }

  // --- Mock Extended Data & Calculations ---
  const seed = parseInt(offer.id || '1', 10);
  const collectionHelpers = seed % 3; 
  const hasParking = seed % 2 === 0;
  const deliveryHelpers = (seed + 1) % 3;
  
  const originAddressFull = "Av. Francisco Glicério, 1000 - Centro, Campinas - SP, 13012-100";
  const destinationAddressFull = "Av. Brasil, 5000 - Bonsucesso, Rio de Janeiro - RJ, 21040-360";

  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
  };
  
  const totalFreight = parsePrice(offer.price);
  const tollValue = 150.00; 
  const loadingExtra = 80.00; 
  const unloadingExtra = 80.00; 
  const totalExtras = loadingExtra + unloadingExtra;
  const freightWeightValue = totalFreight - tollValue - totalExtras;

  const currentTotalFreight = totalFreight + negotiationAdjustment;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const activeVehicle = { weight: 25, volume: 90 };
  const weightPercent = (offer.weightVal / activeVehicle.weight) * 100;
  const volumePercent = offer.volume ? (offer.volume / activeVehicle.volume) * 100 : 0;
  const occupation = Math.round(Math.max(weightPercent, volumePercent));

  const submitInterest = () => {
    if (isNegotiationOpen) setIsNegotiationOpen(false);
    navigate(`/offer/${id}/contract-acceptance`, { 
        state: { 
            negotiationAdjustment,
            isNegotiation: true
        } 
    });
  };

  const handleMainAction = () => {
    if (hasApplied) return;
    if (!termsAccepted) return;

    if (offer.isNegotiable) {
        setIsNegotiationOpen(true);
    } else {
        submitInterest();
    }
  };

  const adjustNegotiation = (amount: number) => {
      setNegotiationAdjustment(prev => prev + amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] pb-32 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Detalhes da Oferta #{offer.id.padStart(6, '0')}</h1>
      </div>

      <div className="p-4 space-y-4 max-w-lg mx-auto w-full">
        
        {/* Status da Ocorrência - PRIORIDADE MÁXIMA */}
        {hasActiveOccurrence && (
          <section className="bg-orange-50 dark:bg-orange-900/10 rounded-2xl border-2 border-orange-200 dark:border-orange-800/50 shadow-md shadow-orange-500/5 p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-widest">Atenção</p>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Você possui uma ocorrência ativa</h3>
                    </div>
                </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Resolva as pendências operacionais antes de iniciar novas contratações.
            </p>
            <div className="h-px bg-orange-200/50 dark:bg-orange-800/30" />
            <Button 
                variant="ghost" 
                className="w-full h-10 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20 font-bold rounded-xl justify-between px-3" 
                onClick={() => navigate('/trip/occurrence')}
            >
                <span className="text-sm">Ver detalhes da ocorrência</span>
                <ChevronRight className="w-5 h-5" />
            </Button>
          </section>
        )}

        {/* Block 1: Resumo da Oferta */}
        <div className="relative bg-white dark:bg-[#1e293b] shadow-sm border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#00bc7d]" />
            
            <div className="pl-6 pr-5 py-5">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                         <div className="bg-[#eff6ff] dark:bg-blue-900/20 text-[#1447e6] dark:text-blue-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 self-start w-fit">
                            <Snowflake className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">{offer.type}</span>
                        </div>
                        <div className="flex gap-2">
                            {offer.isReturn && (
                                <div className="bg-[#9810fa] rounded-md px-2.5 py-1 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wide leading-none">Retorno</span>
                                </div>
                            )}
                            {offer.isNegotiable && (
                                <div className="bg-[#fe9a00] rounded-md px-2.5 py-1 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wide leading-none">Pregão</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                        <span className="text-[#90a1b9] dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Valor do Frete</span>
                        <span className="text-[#0f172b] dark:text-white text-2xl font-bold tracking-tight">{offer.price}</span>
                    </div>
                </div>

                <div className="grid grid-cols-[16px_1fr] gap-x-4 mb-8 relative">
                    <div className="absolute top-3 bottom-8 left-[7px] w-[2px] bg-[#f1f5f9] dark:bg-slate-800" />

                    <div className="h-7 flex items-center justify-center relative z-10">
                         <div className="w-3.5 h-3.5 rounded-full border-[2px] border-[#e2e8f0] dark:border-slate-700 bg-white dark:bg-[#1e293b]" />
                    </div>
                    <div className="mb-8">
                        <span className="text-[#90a1b9] dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Origem</span>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold text-[#0f172b] dark:text-white leading-none">{offer.origin},</span>
                                <span className="text-xl font-medium text-[#62748e] dark:text-slate-400 leading-none">{offer.originState}</span>
                            </div>
                            {isTracked && (
                                <div className="flex items-start gap-1.5 mt-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-tight">{originAddressFull}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-7 flex items-center justify-center relative z-10">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#ff6900] border-[2px] border-[#ffedd4] dark:border-orange-900" />
                    </div>
                    <div>
                        <span className="text-[#90a1b9] dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">Destino</span>
                        <div className="flex flex-col gap-1">
                             <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold text-[#0f172b] dark:text-white leading-none">{offer.destination},</span>
                                <span className="text-xl font-medium text-[#62748e] dark:text-slate-400 leading-none">{offer.destinationState}</span>
                            </div>
                            {isTracked && (
                                <div className="flex items-start gap-1.5 mt-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-tight">{destinationAddressFull}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                        <Weight className="w-4 h-4 text-[#90a1b9] dark:text-slate-500" />
                        <span className="text-sm font-bold text-[#314158] dark:text-slate-300">{offer.weight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-[#90a1b9] dark:text-slate-500" />
                        <span className="text-sm font-bold text-[#314158] dark:text-slate-300">{offer.volume} m³</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#90a1b9] dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">Ocupação</span>
                        <span className={cn(
                            "text-sm font-bold",
                            occupation > 90 ? "text-red-600" : "text-[#314158] dark:text-slate-300"
                        )}>
                            {occupation}%
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Block 2: Detalhes da Carga */}
        <div className="bg-white dark:bg-[#1e293b] p-5 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl">
             <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2 mb-6">
                <Box className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Detalhes da Carga
             </h2>
             <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-3 pb-8">
                 <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                 <div>
                     <span className="text-xs font-bold text-slate-900 dark:text-white uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Coleta</span>
                     <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{offer.date}</p>
                 </div>
                 <div className="space-y-1">
                     <p className="text-xs text-slate-500 dark:text-slate-400">Janela de Carregamento:</p>
                     <p className="text-sm text-slate-700 dark:text-slate-300">segunda a sexta, das 8h às 18h</p>
                 </div>
                 {collectionHelpers > 0 && (
                     <div className="space-y-1">
                         <p className="text-xs text-slate-500 dark:text-slate-400">Levar:</p>
                         <p className="text-sm text-slate-700 dark:text-slate-300">{collectionHelpers} ajudante(s)</p>
                     </div>
                 )}
                 <div className="space-y-1">
                     <p className="text-xs text-slate-500 dark:text-slate-400">Estacionamento no Local:</p>
                     <p className="text-sm text-slate-700 dark:text-slate-300">{hasParking ? "Sim" : "Não"}</p>
                 </div>
             </div>
             <div className="relative pl-4 space-y-3">
                 <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-orange-500" />
                 <div>
                     <span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase bg-orange-100 dark:bg-orange-900/20 px-1.5 py-0.5 rounded">Entrega</span>
                     <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{offer.deliveryDate || 'A definir'}</p>
                 </div>
                 {deliveryHelpers > 0 && (
                     <div className="space-y-1">
                         <p className="text-xs text-slate-500 dark:text-slate-400">Levar:</p>
                         <p className="text-sm text-slate-700 dark:text-slate-300">{deliveryHelpers} ajudante(s)</p>
                     </div>
                 )}
             </div>
        </div>

        {/* Block 3: Contratante */}
        <div className="bg-white dark:bg-[#1e293b] p-5 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Contratante
            </h2>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <User className="w-5 h-5" />
                </div>
                <span className="text-base text-slate-900 dark:text-white font-bold">{offer.shipper}</span>
            </div>
        </div>

        {/* Block 4: Observações */}
        <div className="bg-white dark:bg-[#1e293b] p-5 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Observações
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                {offer.observations || <span className="text-slate-400 dark:text-slate-500 italic">Nenhuma observação adicional informada.</span>}
            </div>
        </div>

        {/* Block 5: Detalhes do Frete */}
        <div className="bg-white dark:bg-[#1e293b] p-5 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
             <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-green-600 dark:border-green-500 flex items-center justify-center text-[10px] font-bold text-green-600 dark:text-green-500">$</span>
                Detalhes do Frete
             </h2>
             <div className="space-y-3">
                 <div className="flex justify-between items-center">
                     <span className="text-sm text-slate-600 dark:text-slate-400">Valor do Frete</span>
                     <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(freightWeightValue)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-sm text-slate-600 dark:text-slate-400">Adicional de Carga/Descarga</span>
                     <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(totalExtras)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-sm text-slate-600 dark:text-slate-400">Pedágio</span>
                     <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(tollValue)}</span>
                 </div>
                 <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                 <div className="flex justify-between items-center">
                     <span className="text-base font-bold text-slate-900 dark:text-white">Total do Frete</span>
                     <span className="text-lg font-bold text-green-600 dark:text-green-400">{offer.price}</span>
                 </div>
             </div>
             <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-2">
                Obs.: Valor sujeito a retenções do CIOT (INSS, IR, SEST/SENAT)
             </div>
        </div>

        {/* Confirmação de Leitura */}
        <div className="px-1">
             <div className="flex items-start gap-3">
                 <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    className="mt-0.5 border-slate-300 dark:border-slate-600"
                 />
                 <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-tight cursor-pointer select-none">
                    Li e estou de acordo com as instruções de carregamento <span className="text-blue-600 dark:text-blue-400 font-semibold underline decoration-blue-300 dark:decoration-blue-700 underline-offset-2" onClick={(e) => { e.preventDefault(); navigate(`/offer/${offer.id}/loading-instructions`); }}> (clique aqui para leitura)</span>
                 </label>
             </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-lg mx-auto w-full space-y-3">
            {hasApplied && (
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-xl border border-blue-100 dark:border-blue-800 mb-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">Você já enviou interesse para essa carga.</span>
                </div>
            )}
            {hasApplied ? (
                <Button variant="outline" onClick={() => navigate('/my-applications')} className="w-full h-14 text-lg border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl">
                    Ver minhas candidaturas
                </Button>
            ) : (
                <Button onClick={handleMainAction} disabled={isSubmitting || !termsAccepted} className={cn("w-full h-14 text-lg text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.99]", !termsAccepted ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none" : offer.isNegotiable ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/20" : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20")}>
                    {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Enviando...</> : (offer.isNegotiable ? "Negociar" : "Tenho interesse")}
                </Button>
            )}
        </div>
      </div>

      {/* Negotiation Modal */}
      <Dialog open={isNegotiationOpen} onOpenChange={setIsNegotiationOpen}>
        <DialogContent className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden bg-slate-50 dark:bg-[#0f172a] border-0">
            <DialogHeader className="bg-slate-900 dark:bg-[#1e293b] text-white p-4 flex flex-row items-center justify-between shadow-md z-10 relative">
                <div className="flex flex-col items-start gap-0.5">
                     <DialogTitle className="text-base font-bold text-white leading-none">Negociação de Frete</DialogTitle>
                     <DialogDescription className="text-slate-400 dark:text-slate-500 text-xs font-medium">Negociação se encerra em Hoje, 18:00</DialogDescription>
                </div>
            </DialogHeader>
            <div className="p-5 space-y-6">
                 <div className="flex justify-between items-center bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Valor do Frete</span>
                     <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalFreight)}</span>
                 </div>
                 <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-1 tracking-wider">Adicional do Frete</label>
                     <div className="flex items-center justify-between bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                         <Button variant="ghost" size="icon" onClick={() => adjustNegotiation(-50)} className="h-10 w-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0"><Minus className="w-5 h-5" /></Button>
                         <div className="flex-1 px-4 text-center">
                             <input type="text" value={negotiationAdjustment} onChange={(e) => setNegotiationAdjustment(parseInt(e.target.value.replace(/\D/g, '') || '0', 10))} className={cn("text-lg font-bold text-center w-full bg-transparent border-none outline-none p-0 focus:ring-0", negotiationAdjustment > 0 ? "text-green-600 dark:text-green-400" : negotiationAdjustment < 0 ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white")} />
                             <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-1">{formatCurrency(negotiationAdjustment)}</div>
                         </div>
                         <Button variant="ghost" size="icon" onClick={() => adjustNegotiation(50)} className="h-10 w-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0"><Plus className="w-5 h-5" /></Button>
                     </div>
                 </div>
                 <div className="space-y-3 pt-2">
                     <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">Adicional de Carga</span><span className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(loadingExtra)}</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">Adicional de Descarga</span><span className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(unloadingExtra)}</span></div>
                     <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">Pedágio</span><span className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(tollValue)}</span></div>
                 </div>
                 <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-2">
                     <div className="flex justify-between items-end"><span className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-1 tracking-wide">Total do Frete</span><span className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(currentTotalFreight)}</span></div>
                 </div>
            </div>
            <DialogFooter className="p-4 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800">
                <Button onClick={submitInterest} className="w-full h-12 text-lg font-bold bg-[#00bc7d] hover:bg-[#00a870] text-white rounded-xl shadow-lg shadow-green-600/20 transition-all">CONFIRMAR</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showError} onOpenChange={setShowError}>
        <AlertDialogContent className="rounded-2xl max-w-[90%] w-[400px] dark:bg-[#1e293b] dark:border-slate-800">
            <AlertDialogHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-2"><AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" /></div>
                <AlertDialogTitle className="text-center text-xl dark:text-white">Não foi possível enviar</AlertDialogTitle>
                <AlertDialogDescription className="text-center dark:text-slate-400">Ocorreu um erro ao registrar seu interesse. Tente novamente em alguns instantes.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col gap-2 space-y-2 sm:space-y-0 mt-4">
                <AlertDialogAction onClick={() => setShowError(false)} className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600">Tentar novamente</AlertDialogAction>
                <AlertDialogCancel onClick={() => setShowError(false)} className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-700 dark:text-slate-300 mt-2 sm:mt-0">Voltar para os detalhes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
