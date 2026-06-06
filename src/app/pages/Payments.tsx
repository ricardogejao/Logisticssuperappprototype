import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Barcode, 
  FileText, 
  ScanLine, 
  Search,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function Payments() {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState('');

  const handlePay = () => {
    if (!barcode) {
        toast.error('Digite o código de barras');
        return;
    }
    toast.success('Boleto identificado', {
        description: 'Beneficiário: ENEL DISTRIBUIÇÃO'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-[#1e293b] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-lg">
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/digital-account')}
                className="rounded-full hover:bg-white/10 text-white -ml-2"
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold">Pagamentos</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1">
        
        {/* Scanner Action */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
             
             <div className="relative z-10 flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <ScanLine className="w-8 h-8" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg">Ler código de barras</h3>
                    <p className="text-blue-100 text-xs mt-1">Aponte a câmera para o boleto</p>
                </div>
                <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl mt-2">
                    Abrir Câmera
                </Button>
             </div>
        </div>

        {/* Manual Entry */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Barcode className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                Digitar código de barras
            </h3>
            <div className="flex gap-2">
                <Input 
                    placeholder="0000.0000.0000.0000..." 
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 font-mono text-sm tracking-wide dark:text-white"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                />
                <Button onClick={handlePay} className="bg-slate-900 dark:bg-orange-500 text-white px-6 hover:bg-slate-800 dark:hover:bg-orange-600">
                    Pagar
                </Button>
            </div>
        </section>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-3 p-4 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">Boletos</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Pagar conta</span>
                </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">Impostos</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">DARF, GPS</span>
                </div>
            </button>
        </div>

        {/* Upcoming */}
        <section>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Próximos Vencimentos</h3>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 shadow-sm">
                 <div className="p-4 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                           <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Tudo pago!</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Você não tem contas pendentes</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}