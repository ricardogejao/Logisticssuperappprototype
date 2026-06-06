import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, AlertCircle, Clock, CheckCircle2, MessageSquare, Camera, History, FileText, MapPin, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../components/ui/utils';

export function OccurrenceDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Simulation of states: analysis | treatment | resolved
  const state = (searchParams.get('status') || 'analysis') as 'analysis' | 'treatment' | 'resolved';

  const statusConfigs = {
    analysis: {
      title: "Em análise",
      text: "Aguarde instruções da central de monitoramento.",
      color: "border-orange-500 shadow-orange-500/10 dark:border-orange-500/50",
      icon: <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      badge: "Análise",
      badgeColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
    },
    treatment: {
      title: "Em tratamento",
      text: "Siga as instruções para resolver a pendência.",
      color: "border-blue-500 shadow-blue-500/10 dark:border-blue-500/50",
      icon: <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      badge: "Tratamento",
      badgeColor: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
    },
    resolved: {
      title: "Resolvida",
      text: "Ocorrência encerrada. Você pode seguir viagem.",
      color: "border-green-500 shadow-green-500/10 dark:border-green-500/50",
      icon: <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />,
      iconBg: "bg-green-50 dark:bg-green-900/20",
      badge: "Resolvida",
      badgeColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
    }
  };

  const config = statusConfigs[state];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans pb-40 transition-colors duration-300">
      {/* Top Header - Registration Pattern */}
      <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10"
            >
                <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-slate-300" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/30 rounded-full w-10 h-10 transition-colors"
            >
                <Phone className="w-5 h-5" />
            </Button>
        </div>
      </div>

      <div className="flex-1 px-8 pt-4 space-y-8 max-w-lg mx-auto w-full">
        {/* Page Title - Registration Pattern */}
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Detalhes da Ocorrência</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-light">
                OCE #8932 <span className="mx-1">•</span> Campinas → Rio de Janeiro
            </p>
        </div>
        
        {/* Status Card - Patterned after ProfileSelection.tsx ProfileOption */}
        <div className={cn(
            "p-5 rounded-2xl border-2 bg-white dark:bg-[#1e293b] flex items-center gap-5 transition-all duration-300 shadow-lg",
            config.color
        )}>
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", config.iconBg)}>
                {config.icon}
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight">{config.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light leading-relaxed">
                    {config.text}
                </p>
            </div>
        </div>

        {/* General Info - Clean Registration Style */}
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-1 bg-orange-500 rounded-full" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Informações</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Tipo</p>
                    <p className="text-base font-medium text-slate-900 dark:text-white">Problema com a carga</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Data e hora</p>
                    <p className="text-base font-medium text-slate-900 dark:text-white">Hoje, 14:20</p>
                </div>
                <div className="col-span-2">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-2">Sua descrição</p>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed italic">
                            "O lacre da carga principal apresenta sinais de violação. Aguardando orientações sobre como proceder."
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Instructions Card - Clean Alert Style (Registration Pattern) */}
        <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-1 bg-blue-500 rounded-full" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Instrução da Central</h3>
            </div>
            
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-4 flex-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200 leading-relaxed">
                        {state === 'analysis' 
                            ? "Aguardando posicionamento da equipe de segurança. Não rompa o lacre sob nenhuma hipótese." 
                            : state === 'treatment'
                            ? "Dirija-se ao posto de apoio no KM 42 para conferência assistida com a equipe local."
                            : "Conferência realizada e autorizada. Pode seguir com a entrega normalmente."}
                    </p>
                    
                    {state === 'treatment' && (
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-md transition-transform active:scale-95">
                            <MapPin className="w-4 h-4 mr-2" />
                            Ver rota no mapa
                        </Button>
                    )}
                </div>
            </div>
        </section>

        {/* Evidences - Minimal Style */}
        <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest px-1">Evidências enviadas</h3>
            <div className="grid grid-cols-3 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <Camera className="w-6 h-6 text-slate-300 dark:text-slate-500 group-hover:text-slate-400 dark:group-hover:text-slate-400" />
                    </div>
                ))}
            </div>
        </section>

        {/* Timeline - Registration Style */}
        <section className="space-y-4 pb-10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest px-1">Histórico</h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100 dark:before:bg-slate-800">
                <HistoryItem title="Ocorrência criada" time="14:20" active />
                <HistoryItem title="Em análise pela central" time="14:25" active />
                
                {/* Steps completed or future based on state */}
                {(state === 'treatment' || state === 'resolved') ? (
                    <HistoryItem title="Instrução enviada" time="14:40" active />
                ) : (
                    <HistoryItem title="Instrução da central" time="Pendente" active={false} />
                )}

                {state === 'resolved' ? (
                    <HistoryItem title="Resolvida" time="15:10" active color="green" />
                ) : (
                    <HistoryItem title="Finalização" time="Pendente" active={false} />
                )}
            </div>
        </section>
      </div>

      {/* Footer CTA - Registration Pattern Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 z-30 flex flex-col gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Button 
          onClick={() => {
            if (state === 'resolved') {
              localStorage.setItem('PROTOTYPE_OCCURRENCE_ACTIVE', 'false');
            }
            navigate('/trip/details');
          }}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300"
        >
          {state === 'resolved' ? 'Resolver e Encerrar' : 'Voltar para viagem'}
        </Button>
        {state !== 'resolved' && (
            <Button 
                variant="ghost"
                onClick={() => {
                  localStorage.setItem('PROTOTYPE_OCCURRENCE_ACTIVE', 'false');
                  navigate('/trip/details');
                }}
                className="w-full h-10 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/20 text-sm"
            >
                Cancelar registro de ocorrência
            </Button>
        )}
        {state === 'treatment' && (
            <Button 
                variant="ghost"
                onClick={() => navigate('/trip/cancel/confirm')}
                className="w-full h-10 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 text-sm"
            >
                Solicitar cancelamento da operação
            </Button>
        )}
      </div>
    </div>
  );
}

function HistoryItem({ title, time, active, color = "blue" }: { title: string, time: string, active?: boolean, color?: "blue" | "green" }) {
    return (
        <div className="relative flex flex-col gap-1 pl-10">
            <div className={cn(
                "absolute left-0 top-1 w-[22px] h-[22px] rounded-full border-2 bg-white dark:bg-[#0f172a] flex items-center justify-center transition-all duration-500 z-10",
                active ? (color === 'green' ? "border-green-500" : "border-orange-500") : "border-slate-200 dark:border-slate-800"
            )}>
                <div className={cn(
                    "w-2 h-2 rounded-full",
                    active ? (color === 'green' ? "bg-green-500" : "bg-orange-500") : "bg-slate-200 dark:bg-slate-800"
                )} />
            </div>
            <p className={cn(
                "text-sm font-semibold tracking-tight",
                active ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"
            )}>
                {title}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{time}</p>
        </div>
    );
}
