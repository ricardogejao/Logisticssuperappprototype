import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  ArrowDownLeft, 
  ArrowUpRight,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function TransactionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - In a real app, fetch based on ID
  const transaction = {
    id: id,
    title: 'Adiantamento de Frete',
    amount: 1250.00,
    type: 'in', // 'in' or 'out'
    sender: 'Transportadora ABC Ltda',
    senderDoc: '12.345.678/0001-90',
    bank: 'Banco do Brasil S.A.',
    date: '01/02/2026',
    time: '10:30:45',
    authCode: 'E902384902384902384902384',
    description: 'Adiantamento referente ao CT-e 123456 - Carga de Soja'
  };

  const handleShare = () => {
    toast.success('Comprovante compartilhado com sucesso!');
  };

  const handleDownload = () => {
    toast.success('Download do PDF iniciado');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 text-slate-700 dark:text-slate-300"
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Comprovante</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" onClick={handleShare}>
            <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden relative">
            {/* Receipt Top Decoration */}
            <div className="h-2 bg-slate-900 dark:bg-orange-500 w-full absolute top-0 left-0" />
            
            <div className="p-6 flex flex-col items-center pt-10">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-1">Transação realizada!</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{transaction.date} às {transaction.time}</p>

                <div className="text-center mb-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">Valor</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                        R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>
                </div>

                <div className="w-full space-y-4">
                    {/* Details List */}
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tipo</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{transaction.title}</p>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Origem / Pagador</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{transaction.sender}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">CNPJ: {transaction.senderDoc}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.bank}</p>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Descrição</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Autenticação</p>
                        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                            <code className="text-xs text-slate-600 dark:text-slate-400 break-all font-mono line-clamp-1">{transaction.authCode}</code>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 ml-2" onClick={() => toast.success('Código copiado')}>
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Zigzag Bottom */}
            <div className="relative h-4 bg-slate-50 dark:bg-slate-900 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-px border-t border-dashed border-slate-300 dark:border-slate-700" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-4 border-t border-slate-100 dark:border-slate-800">
                <Button className="w-full bg-slate-900 dark:bg-orange-500 hover:bg-slate-800 dark:hover:bg-orange-600 text-white gap-2" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                    Salvar Comprovante (PDF)
                </Button>
            </div>
        </div>
        
        <div className="mt-6 text-center">
            <Button variant="link" className="text-slate-500 dark:text-slate-400 text-xs" onClick={() => navigate('/app/help')}>
                Precisa de ajuda com essa transação?
            </Button>
        </div>
      </div>
    </div>
  );
}