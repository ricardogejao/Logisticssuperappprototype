import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function PixScan() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans">
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex items-center justify-between text-white bg-gradient-to-b from-black/80 to-transparent pb-12">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-white/10 text-white -ml-2"
        >
            <ArrowLeft className="w-6 h-6" />
        </Button>
        <span className="font-bold">Escanear QR Code</span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Scanner Overlay */}
        <div className="w-64 h-64 border-2 border-white rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
            
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl -mt-[2px] -ml-[2px]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl -mt-[2px] -mr-[2px]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl -mb-[2px] -ml-[2px]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-500 rounded-br-xl -mb-[2px] -mr-[2px]" />
        </div>
        <p className="text-white/70 mt-8 text-sm font-medium">Aponte a câmera para o QR Code</p>
      </div>

      <div className="p-6 bg-white rounded-t-3xl pb-8">
         <Button 
            variant="outline"
            className="w-full h-12 rounded-xl border-slate-200 text-slate-700 font-bold"
            onClick={() => {
                toast.info('Abrindo galeria...');
                setTimeout(() => navigate('/digital-account/pix/transfer', { state: { mode: 'copy-paste', code: 'qr-code-data' } }), 1000);
            }}
        >
            <Upload className="w-4 h-4 mr-2" />
            Buscar na Galeria
        </Button>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}