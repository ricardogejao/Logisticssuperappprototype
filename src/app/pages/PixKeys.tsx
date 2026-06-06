import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Copy, Trash2, Key } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function PixKeys() {
  const navigate = useNavigate();

  const keys = [
    { type: 'CPF', value: '123.***.***-00', active: true },
    { type: 'Celular', value: '(11) 9****-1234', active: true },
    { type: 'E-mail', value: 'joa***@gmail.com', active: true },
    { type: 'Chave Aleatória', value: 'a1b2c3d4-e5f6...', active: false },
  ];

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
        <h1 className="text-lg font-bold">Minhas Chaves</h1>
      </div>

      <div className="p-4 space-y-6 flex-1">
        
        {/* Register New Key */}
        <button className="w-full bg-white p-4 rounded-xl border border-dashed border-slate-300 flex items-center justify-center gap-2 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
            <Plus className="w-5 h-5" />
            Cadastrar Nova Chave
        </button>

        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 uppercase ml-1">Chaves Cadastradas</h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                {keys.map((key, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${key.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                <Key className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{key.type}</p>
                                <p className="text-xs text-slate-500">{key.value}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => toast.success('Chave copiada!')}
                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => toast.success('Chave excluída')}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}