import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function PixCopyPaste() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleProcess = () => {
    if (!code) {
        toast.error('Cole um código válido');
        return;
    }
    navigate('/digital-account/pix/transfer', { 
        state: { mode: 'copy-paste', code } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="bg-slate-900 text-white px-4 py-4 flex items-center gap-3 sticky top-0 z-20">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-white/10 text-white -ml-2"
        >
            <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold">Pix Copia e Cola</h1>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col">
            <label className="text-sm font-bold text-slate-900 mb-2 block">Cole o código aqui</label>
            <textarea 
                className="flex-1 w-full p-4 bg-slate-50 rounded-xl border border-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono text-sm"
                placeholder="00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
        </div>
        
        <Button 
            className="w-full bg-slate-900 text-white h-14 text-base font-bold rounded-xl"
            onClick={async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    setCode(text);
                    toast.success('Código colado da área de transferência');
                } catch (err) {
                    toast.error('Erro ao acessar área de transferência');
                }
            }}
        >
            <Copy className="w-5 h-5 mr-2" />
            Colar da Área de Transferência
        </Button>

        <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-base font-bold rounded-xl shadow-lg shadow-emerald-600/20"
            onClick={handleProcess}
        >
            Continuar
        </Button>
      </div>
    </div>
  );
}