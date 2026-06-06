import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../components/ui/utils';
import svgPaths from "../../imports/LogisticsSuperAppPrototype/svg-7hew6hrz7x";

export function ReportProblemDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<{ id: string, type: 'image' | 'file', preview: string }[]>([]);
  
  const handleSend = () => {
    if (!description.trim()) {
      toast.error("Por favor, descreva o problema.");
      return;
    }
    
    // In a real app, we would send the data to a server
    localStorage.setItem('PROTOTYPE_OCCURRENCE_ACTIVE', 'true');
    navigate('/trip/report-problem/success');
  };

  const handleAddAttachment = (type: 'camera' | 'file' | 'digital') => {
    // Mock adding attachment
    const newAttachment = {
      id: Math.random().toString(36).substr(2, 9),
      type: type === 'camera' ? 'image' as const : 'file' as const,
      preview: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'
    };
    setAttachments(prev => [...prev, newAttachment]);
    toast.success("Evidência adicionada com sucesso!");
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans text-[#0f172b] dark:text-white transition-colors duration-300">
      {/* Header following Figma */}
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
              Detalhes do problema
          </h1>
        </div>
      </header>

      <div className="flex-1 px-6 pt-6 pb-32 w-full max-w-lg mx-auto overflow-y-auto">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-8"
        >
          {/* Main Title Section */}
          <div className="space-y-2">
            <h1 className="text-[24px] font-bold leading-[32px] tracking-[0.07px] text-slate-900 dark:text-white">Conte o que aconteceu</h1>
            <p className="text-[16px] font-medium leading-[24px] tracking-[-0.31px] text-slate-600 dark:text-slate-400">
              Para ajudarmos da melhor forma, descreva o problema com clareza e envie evidências se possível.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 1. Description Field */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-[14px] font-bold tracking-[-0.15px] text-slate-700 dark:text-slate-300">Descrição do problema</Label>
              </div>
              <div className="bg-white dark:bg-[#1e293b] rounded-[16px] border border-[#e2e8f0] dark:border-slate-800 focus-within:border-orange-500/30 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all min-h-[160px] shadow-sm">
                <textarea 
                  rows={5}
                  placeholder="Ex: Pneu furado no KM 200, aguardando socorro..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-transparent text-[16px] font-medium leading-[24px] tracking-[-0.31px] text-[#0f172b] dark:text-white focus:outline-none resize-none placeholder:text-[#90a1b9] dark:placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* 2. Evidence Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-[14px] font-bold tracking-[-0.15px] text-slate-700 dark:text-slate-300">Evidências (Fotos/Arquivos)</Label>
              </div>

              {/* Attachments Display */}
              <AnimatePresence>
                {attachments.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {attachments.map((file) => (
                      <motion.div 
                        key={file.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="aspect-square relative group rounded-[12px] overflow-hidden border border-[#e2e8f0] dark:border-slate-800"
                      >
                        <img src={file.preview} alt="Evidence preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => removeAttachment(file.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Upload Card according to Figma */}
              <div className="bg-orange-50/50 dark:bg-orange-900/10 border-[1.8px] border-orange-200 dark:border-orange-900/20 rounded-[20px] p-6 flex flex-col items-center gap-4">
                <span className="text-[14px] font-bold text-slate-700 dark:text-slate-300 tracking-[-0.15px]">Escolha como enviar:</span>
                
                <div className="flex justify-between w-full max-w-[300px]">
                  {/* Photograph */}
                  <button 
                    onClick={() => handleAddAttachment('camera')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="size-12 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-500 transition-all">
                      <svg className="size-6" fill="none" viewBox="0 0 20 20">
                        <path d="M13.3333 15.8337H6.66667C4.82572 15.8337 3.33334 14.3413 3.33334 12.5003V7.50033C3.33334 5.65938 4.82572 4.16699 6.66667 4.16699H13.3333C15.1743 4.16699 16.6667 5.65938 16.6667 7.50033V12.5003C16.6667 14.3413 15.1743 15.8337 13.3333 15.8337Z" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.11px]">Fotografar</span>
                  </button>

                  {/* Send File */}
                  <button 
                    onClick={() => handleAddAttachment('file')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="size-12 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-500 transition-all">
                      <svg className="size-6" fill="none" viewBox="0 0 20 20">
                        <path d="M10 12.5V3.33333M10 3.33333L6.66667 6.66667M10 3.33333L13.3333 6.66667M16.6667 12.5V13.3333C16.6667 15.1743 15.1743 16.6667 13.3333 16.6667H6.66667C4.82572 16.6667 3.33334 15.1743 3.33334 13.3333V12.5" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.11px]">Arquivo</span>
                  </button>

                  {/* Import Digital */}
                  <button 
                    onClick={() => handleAddAttachment('digital')}
                    className="flex flex-col items-center gap-2 group text-center"
                  >
                    <div className="size-12 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-500 transition-all">
                      <svg className="size-6" fill="none" viewBox="0 0 20 20">
                        <path d="M15.8333 10V13.3333C15.8333 14.714 14.714 15.8333 13.3333 15.8333H6.66667C5.28595 15.8333 4.16666 14.714 4.16666 13.3333V6.66667C4.16666 5.28595 5.28595 4.16667 6.66667 4.16667H10" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                        <path d="M13.3333 4.16667V7.5M13.3333 7.5V10.8333M13.3333 7.5H16.6667M13.3333 7.5H10" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.11px] w-[50px] leading-[12.5px]">Digital</span>
                  </button>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-[16px] p-4 flex gap-3 relative">
                <p className="text-[12px] font-bold leading-[18px] text-blue-700 dark:text-blue-400">
                  Fotos nítidas da carga, do local ou de documentos ajudam nossa equipe a analisar sua ocorrência com mais agilidade.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] space-y-4">
        {/* Support shortcut */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="size-4 text-green-600 dark:text-green-500" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Dúvidas?</span>
          </div>
          <button 
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            className="text-xs font-bold text-green-600 dark:text-green-500 hover:underline flex items-center gap-1"
          >
            Chamar no WhatsApp
          </button>
        </div>
        
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
