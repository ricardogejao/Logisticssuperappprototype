import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Share2,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const TRANSACTIONS = [
  { id: 1, title: 'Adiantamento de Frete', entity: 'Transportadora ABC', date: 'Hoje, 10:30', amount: 1250.00, type: 'in', category: 'Frete' },
  { id: 2, title: 'Posto Shell - Abastecimento', entity: 'Posto Shell Ltda', date: 'Ontem, 18:45', amount: -450.00, type: 'out', category: 'Combustível' },
  { id: 3, title: 'Transferência Pix', entity: 'João Silva', date: '24 jan', amount: -120.00, type: 'out', category: 'Transferência' },
  { id: 4, title: 'Pagamento Boleto', entity: 'ENEL Distribuição', date: '22 jan', amount: -150.30, type: 'out', category: 'Contas' },
  { id: 5, title: 'Saldo de Frete', entity: 'Logística Brasil', date: '20 jan', amount: 3000.00, type: 'in', category: 'Frete' },
];

export function Receipts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredTransactions = TRANSACTIONS.filter(t => {
    // Search logic
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.entity.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter logic
    let matchesFilter = true;
    switch (activeFilter) {
        case 'Entradas':
            matchesFilter = t.type === 'in';
            break;
        case 'Saídas':
            matchesFilter = t.type === 'out';
            break;
        case 'Pix':
            matchesFilter = t.title.toLowerCase().includes('pix') || t.category === 'Transferência';
            break;
        case 'Boletos':
            matchesFilter = t.title.toLowerCase().includes('boleto') || t.category === 'Contas';
            break;
        default:
            matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
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
            <h1 className="text-lg font-bold">Comprovantes</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Filter className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* Search */}
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <Input 
                placeholder="Buscar comprovante..." 
                className="pl-10 bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-800 h-12 rounded-xl dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Todos', 'Entradas', 'Saídas', 'Pix', 'Boletos'].map((filter) => (
                <button 
                    key={filter} 
                    onClick={() => handleFilterClick(filter)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                        activeFilter === filter 
                            ? 'bg-slate-900 dark:bg-orange-500 text-white' 
                            : 'bg-white dark:bg-[#1e293b] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>

        {/* List */}
        <div className="space-y-4">
            <div>
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">Recentes</h3>
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                    {filteredTransactions.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => navigate(`/digital-account/transaction/${item.id}`)}
                            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                        item.type === 'in' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                    }`}>
                                        {item.type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.entity}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${item.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                                        {item.type === 'in' ? '+' : ''} R$ {Math.abs(item.amount).toFixed(2).replace('.', ',')}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.date}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-slate-50 dark:border-slate-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700">
                                    <Share2 className="w-3 h-3" />
                                    Compartilhar
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700">
                                    <Download className="w-3 h-3" />
                                    PDF
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {filteredTransactions.length === 0 && (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-600">
                            <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Nenhum comprovante encontrado</p>
                            {activeFilter !== 'Todos' && (
                                <Button 
                                    variant="link" 
                                    className="text-blue-600 dark:text-blue-400 mt-2"
                                    onClick={() => setActiveFilter('Todos')}
                                >
                                    Limpar filtros
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}