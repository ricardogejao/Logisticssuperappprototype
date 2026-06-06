import React from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

function HomeIcon() {
  return (
    <Home className="w-5 h-5 text-white" />
  );
}

export function ReportProblemSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ocorrência enviada</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mb-10 text-lg">
          Nossa equipe foi notificada. Aguarde instruções.
        </p>

        <div className="w-full max-w-xs p-4 bg-slate-50 dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 mb-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Você receberá uma atualização em breve através das notificações do aplicativo.
            </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 pb-12">
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
