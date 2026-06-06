import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  QrCode, 
  Copy, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Key, 
  Send,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function Pix() {
  const navigate = useNavigate();
  const [pixKey, setPixKey] = useState('');

  const handleCopyPasteInput = () => {
    if (!pixKey) {
        toast.error('Cole o código Pix primeiro');
        return;
    }
    // Simulate parsing the code and navigating to transfer review
    navigate('/digital-account/pix/transfer', { 
      state: { 
        mode: 'copy-paste',
        code: pixKey 
      } 
    });
  };

  const handleRecentContact = (contact: any) => {
    navigate('/digital-account/pix/transfer', { 
      state: { 
        mode: 'contact',
        contact 
      } 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-[#1e293b] text-white px-4 py-4 flex items-center gap-3 sticky top-0 z-20">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/digital-account')}
            className="rounded-full hover:bg-white/10 text-white -ml-2"
        >
            <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold">Área Pix</h1>
      </div>

      <div className="p-4 space-y-6 flex-1">
        
        {/* Main Actions */}
        <div className="grid grid-cols-3 gap-3">
            <button 
                onClick={() => navigate('/digital-account/pix/transfer')}
                className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
            >
                <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-sm">
                    <Send className="w-6 h-6 ml-0.5 mt-0.5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">Transferir</span>
            </button>
            <button 
                onClick={() => navigate('/digital-account/pix/copy-paste')}
                className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
            >
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full flex items-center justify-center">
                    <Copy className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">Copia e Cola</span>
            </button>
            <button 
                onClick={() => navigate('/digital-account/pix/scan')}
                className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
            >
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full flex items-center justify-center">
                    <QrCode className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">Ler QR Code</span>
            </button>
        </div>

        {/* Pix Copy and Paste Input Section */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pix Copia e Cola</h3>
            <div className="flex gap-2">
                <Input 
                    placeholder="Insira o código Pix aqui..." 
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                />
                <Button onClick={handleCopyPasteInput} className="bg-emerald-600 hover:bg-emerald-700 text-white w-12 px-0">
                    <ArrowUpRight className="w-5 h-5" />
                </Button>
            </div>
        </section>

        {/* My Keys */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <button 
                onClick={() => navigate('/digital-account/pix/keys')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <Key className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block text-sm font-bold text-slate-900 dark:text-white">Minhas Chaves Pix</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">CPF, Celular, E-mail</span>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
            </button>
        </section>

        {/* Recent Contacts */}
        <section>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Contatos Recentes</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {[
                    { name: 'Transportadora ABC', char: 'T', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
                    { name: 'Posto Shell', char: 'P', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' },
                    { name: 'João Silva', char: 'J', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
                    { name: 'Maria Souza', char: 'M', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
                ].map((contact, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleRecentContact(contact)}
                        className="flex flex-col items-center gap-2 min-w-[70px] group"
                    >
                        <div className={`w-14 h-14 rounded-full ${contact.color} flex items-center justify-center text-xl font-bold shadow-sm border-2 border-white dark:border-[#1e293b] ring-1 ring-slate-100 dark:ring-slate-800 group-hover:scale-105 transition-transform`}>
                            {contact.char}
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight line-clamp-2 w-full">
                            {contact.name}
                        </span>
                    </button>
                ))}
            </div>
        </section>

        {/* Recent Transactions */}
        <section>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Histórico Pix</h3>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 shadow-sm">
                {[
                    { id: 3, title: "Transferência Enviada", desc: "João Silva", value: -120.00 },
                    { id: 1, title: "Pix Recebido", desc: "Transportadora ABC", value: 1250.00 },
                    { id: 6, title: "Pagamento QR Code", desc: "Lanchonete da Estrada", value: -25.50 },
                ].map((item, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => navigate(`/digital-account/transaction/${item.id}`)}
                        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                item.value > 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                                {item.value > 0 ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-bold ${item.value > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                            {item.value > 0 ? '+' : ''} {Math.abs(item.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </button>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}