import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react';
import { Button } from '../components/ui/button';

export function CancellationConfirm() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/trip/cancel/reason');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <header className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center gap-3 sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800 h-[72px]">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2 w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-300"
        >
            <ArrowLeft className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Tem certeza?</h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mb-12 text-lg font-medium">
            O cancelamento desta viagem pode gerar penalidades conforme contrato.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 space-y-3 pb-12">
        <Button 
          onClick={handleConfirm}
          className="w-full h-14 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-600/10 transition-all active:scale-[0.99]"
        >
          Confirmar cancelamento
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate(-1)}
          className="w-full h-14 text-lg text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold rounded-2xl transition-all active:scale-[0.99] hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
