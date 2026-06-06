import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Camera, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { cn } from '../components/ui/utils';

export function CancellationDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reason } = location.state || { reason: 'Outro' };
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);

  const handleSend = () => {
    if (!description.trim()) {
      toast.error("Por favor, descreva o motivo.");
      return;
    }
    
    // In a real app, we would send the data to a server
    localStorage.setItem('PROTOTYPE_TRIP_STATUS', 'Cancelada');
    localStorage.setItem('PROTOTYPE_TRIP_CANCEL_REASON', reason);
    localStorage.setItem('PROTOTYPE_TRIP_CANCEL_DESC', description);
    
    navigate('/trip/cancel/success');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans text-[#0f172b] dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-30 bg-white dark:bg-[#1e293b] shadow-sm border-b border-[#f1f5f9] dark:border-slate-800">
        <div className="px-4 py-4 flex items-center gap-2 h-[72px]">
          <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0 -ml-2 text-slate-700 dark:text-slate-300"
          >
              <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-[18px] font-bold tracking-[-0.44px] text-[#0f172b] dark:text-white">
              Detalhamento
          </h1>
        </div>
      </header>

      <div className="flex-1 px-6 pt-6 pb-32 w-full max-w-lg mx-auto overflow-y-auto">
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <h1 className="text-[24px] font-bold leading-[32px] tracking-[0.07px] text-slate-900 dark:text-white">Descreva o motivo</h1>
            <p className="text-[16px] font-medium leading-[24px] tracking-[-0.31px] text-slate-600 dark:text-slate-400">
              Explique brevemente o que aconteceu para o cancelamento.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[14px] font-bold tracking-[-0.15px] text-slate-700 dark:text-slate-300">Descrição do motivo</Label>
              <div className="bg-white dark:bg-[#1e293b] rounded-[16px] border border-[#e2e8f0] dark:border-slate-800 focus-within:border-orange-500/30 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all min-h-[160px] shadow-sm">
                <textarea 
                  rows={5}
                  placeholder="Conte o que aconteceu..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-transparent text-[16px] font-medium leading-[24px] tracking-[-0.31px] text-[#0f172b] dark:text-white focus:outline-none resize-none placeholder:text-[#90a1b9] dark:placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] font-bold tracking-[-0.15px] text-slate-700 dark:text-slate-300">Anexar foto/evidência (opcional)</Label>
              
              {attachment ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group">
                  <img src={attachment} alt="Evidence" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setAttachment(null)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setAttachment('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')}
                  className="w-full h-32 bg-white dark:bg-[#1e293b] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[20px] flex flex-col items-center justify-center gap-2 hover:border-orange-500 dark:hover:border-orange-500/50 hover:bg-orange-50/30 dark:hover:bg-orange-500/5 transition-all text-slate-400 dark:text-slate-600"
                >
                  <Camera className="size-8" />
                  <span className="text-xs font-bold uppercase tracking-wider">Tirar foto ou anexar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button 
          onClick={handleSend}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.99]"
        >
          Enviar ocorrência
        </Button>
      </div>
    </div>
  );
}
