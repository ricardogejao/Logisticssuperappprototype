import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

function HomeIcon() {
  return (
    <Home className="w-5 h-5 text-white" />
  );
}

export function CancellationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        
        {/* Simple Green Check Icon */}
        <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            Cancelamento registrado
        </h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mb-10 text-lg font-medium">
            Sua solicitação foi enviada e está em análise.
        </p>

        <div className="w-full max-w-xs bg-slate-50 dark:bg-[#1e293b] border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col gap-4 text-left">
           <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Status da solicitação</p>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                 <span className="text-sm font-bold text-slate-900 dark:text-white">Em análise técnica</span>
              </div>
           </div>
           <div className="h-px bg-slate-200 dark:bg-slate-800" />
           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
              "O distrato foi registrado. Nossa equipe revisará os detalhes e atualizará o status da viagem em breve."
           </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 pb-12 flex justify-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button 
            onClick={() => navigate('/trip/details')}
            className="w-full h-14 bg-gradient-to-r from-[#ff6900] to-[#f54900] drop-shadow-[0px_10px_7.5px_rgba(255,105,0,0.2),0px_4px_3px_rgba(255,105,0,0.2)] flex items-center justify-center gap-[8px] px-[16px] py-[8px] rounded-[16px] transition-all active:scale-[0.98]"
        >
            <HomeIcon />
            <span className="font-bold text-[18px] text-white tracking-[-0.4395px] whitespace-nowrap">
                Voltar para o início
            </span>
        </button>
      </div>
    </div>
  );
}
