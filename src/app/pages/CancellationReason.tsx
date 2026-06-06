import React, { useState } from 'react';
// Re-saving to fix proxy issue
import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../components/ui/utils';

export function CancellationReason() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const reasons = [
    "Não posso realizar a viagem",
    "Problema no veículo",
    "Valor não compensa",
    "Problema pessoal",
    "Outro"
  ];

  const handleContinue = () => {
    if (!selected) return;
    navigate('/trip/cancel/details', { 
        state: { 
            reason: selected
        } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <header className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center gap-3 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800 h-[72px] shadow-sm">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2 w-10 h-10 flex items-center justify-center p-0 text-slate-700 dark:text-slate-300"
        >
            <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-[#0f172b] dark:text-white">Reportar Ocorrência</h1>
      </header>

      <div className="flex-1 p-6 space-y-6 max-w-lg mx-auto w-full">
        <div className="space-y-1">
          <h2 className="text-[24px] font-bold text-[#0f172b] dark:text-white tracking-tight">Motivo do cancelamento</h2>
          <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium">
            Selecione a opção que melhor descreve o motivo do cancelamento.
          </p>
        </div>

        <div className="space-y-3">
          {reasons.map((reason) => (
            <div 
              key={reason}
              onClick={() => setSelected(reason)}
              className={cn(
                "p-5 rounded-[20px] transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] border-2",
                selected === reason 
                  ? "bg-white dark:bg-[#1e293b] border-orange-500 shadow-md shadow-orange-500/5" 
                  : "bg-white dark:bg-[#1e293b] border-transparent dark:border-slate-800/50 shadow-sm"
              )}
            >
              <span className={cn(
                "text-base font-bold",
                selected === reason ? "text-orange-600 dark:text-orange-400" : "text-slate-700 dark:text-slate-300"
              )}>
                {reason}
              </span>
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                selected === reason ? "bg-orange-500 border-orange-500" : "border-slate-200 dark:border-slate-700"
              )}>
                {selected === reason && <Check className="w-4 h-4 text-white stroke-[4]" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 z-20 pb-12 flex justify-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <Button 
          disabled={!selected}
          onClick={handleContinue}
          className={cn(
            "w-full h-14 text-lg font-bold rounded-2xl transition-all",
            selected 
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20" 
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
          )}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}
