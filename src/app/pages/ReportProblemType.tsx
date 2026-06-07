import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  ArrowLeft,
  AlertTriangle,
  XCircle,
  MapPin,
  Truck,
  Clock,
  MoreHorizontal,
  Search,
  ShieldCheck,
  FileText,
  ClipboardX,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../components/ui/utils';
import { Checkbox } from '../components/ui/checkbox';

interface ProblemOption {
  id: string;
  label: string;
  category: 'Coleta' | 'Veículo' | 'Segurança' | 'Entrega' | 'Documentação' | 'Check List' | 'Outro';
  icon: React.ElementType;
}

export function ReportProblemType() {
  const navigate = useNavigate();
  const location = useLocation();
  const freightOffers = [
    { id: '4102', route: 'Campinas → Rio de Janeiro' },
    { id: '4105', route: 'Campinas → Rio de Janeiro' }
  ];

  const [step, setStep] = useState<'of_selection' | 'type_selection'>(
    freightOffers.length > 1 ? 'of_selection' : 'type_selection'
  );
  const [selectedOFs, setSelectedOFs] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(location.state?.preSelect || null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOF = (id: string) => {
    setSelectedOFs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedOFs.length === freightOffers.length) {
      setSelectedOFs([]);
    } else {
      setSelectedOFs(freightOffers.map(of => of.id));
    }
  };

  const problemTypes: ProblemOption[] = useMemo(() => {
    const status = localStorage.getItem('PROTOTYPE_TRIP_STATUS') || 'Contratada';
    
    const types: ProblemOption[] = [
      { id: 'coleta_atraso', label: 'Atraso na coleta', category: 'Coleta', icon: Clock },
      { id: 'coleta_recusa', label: 'Carga recusada', category: 'Coleta', icon: XCircle },
      { id: 'coleta_local', label: 'Local de coleta fechado', category: 'Coleta', icon: MapPin },
      { id: 'veiculo_mecanico', label: 'Problema mecânico', category: 'Veículo', icon: Truck },
      { id: 'veiculo_pneu', label: 'Pneu furado', category: 'Veículo', icon: Truck },
      { id: 'veiculo_acidente', label: 'Acidente/Colisão', category: 'Veículo', icon: AlertTriangle },
      { id: 'seguranca_roubo', label: 'Tentativa de roubo', category: 'Segurança', icon: ShieldCheck },
      { id: 'seguranca_risco', label: 'Área de risco detectada', category: 'Segurança', icon: AlertTriangle },
      { id: 'seguranca_parada', label: 'Parada não programada', category: 'Segurança', icon: MapPin },
      { id: 'entrega_atraso', label: 'Atraso na entrega', category: 'Entrega', icon: Clock },
      { id: 'entrega_recusa', label: 'Cliente recusou a carga', category: 'Entrega', icon: XCircle },
      { id: 'entrega_danificada', label: 'Carga danificada', category: 'Entrega', icon: AlertTriangle },
      { id: 'doc_falta', label: 'Documentação incompleta', category: 'Documentação', icon: FileText },
      { id: 'doc_erro', label: 'Erro na NF/CTE', category: 'Documentação', icon: FileText },
      { id: 'checklist_divergencia', label: 'Divergência no Check List', category: 'Check List', icon: ClipboardX },
      { id: 'outro', label: 'Outro motivo', category: 'Outro', icon: MoreHorizontal },
    ];

    return types;
  }, []);

  const filteredProblems = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return problemTypes.filter(p => 
      p.label.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, problemTypes]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <header className="bg-white dark:bg-[#1e293b] px-4 py-4 sticky top-0 z-30 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              if (step === 'type_selection' && freightOffers.length > 1) {
                setStep('of_selection');
              } else {
                navigate(-1);
              }
            }} 
            className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </Button>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {step === 'of_selection' ? 'Selecionar Oferta' : 'Reportar ocorrência'}
          </h1>
        </div>
        {step === 'type_selection' && (
          <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
            <input type="text" placeholder="Buscar motivo da ocorrência..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all dark:text-white dark:placeholder:text-slate-500" />
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40">
        {step === 'of_selection' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="px-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Para qual oferta é essa ocorrência?</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Selecione uma ou mais ofertas vinculadas à esta ocorrência.</p>
             </div>
             <div className="space-y-3">
                <div onClick={toggleAll} className="w-full p-5 rounded-2xl bg-white dark:bg-[#1e293b] border border-slate-100 dark:border-slate-800 flex items-center gap-4 text-left shadow-sm transition-all active:scale-[0.98] cursor-pointer">
                   <Checkbox checked={selectedOFs.length === freightOffers.length} />
                   <span className="font-bold text-slate-900 dark:text-white">Todas as ofertas</span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2" />
                {freightOffers.map(of => (
                  <div key={of.id} onClick={() => toggleOF(of.id)} className="w-full p-5 rounded-2xl bg-white dark:bg-[#1e293b] border border-slate-100 dark:border-slate-800 flex items-center gap-4 text-left shadow-sm transition-all active:scale-[0.98] cursor-pointer">
                     <Checkbox checked={selectedOFs.includes(of.id)} />
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white">OF #{of.id}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">{of.route}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <>
            <div className="px-1 animate-in fade-in slide-in-from-left-4 duration-500"><p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-tight">Selecione o motivo que melhor descreve o que aconteceu.</p></div>
            <div className="grid gap-2 animate-in fade-in slide-in-from-left-4 duration-500">
              {filteredProblems.map((type) => (
                <button key={type.id} onClick={() => setSelected(type.id)} className={cn("w-full p-4 rounded-2xl bg-white dark:bg-[#1e293b] border transition-all flex items-center gap-4 text-left group", selected === type.id ? "border-orange-500 shadow-md shadow-orange-500/5 ring-1 ring-orange-500" : "border-slate-100 dark:border-slate-800 shadow-sm")}>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors", selected === type.id ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500")}><type.icon className="w-5 h-5" /></div>
                  <span className={cn("flex-1 text-[15px] font-bold tracking-tight transition-colors", selected === type.id ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>{type.label}</span>
                  <ChevronRight className={cn("w-4 h-4 transition-colors", selected === type.id ? "text-orange-500" : "text-slate-300 dark:text-slate-600")} />
                </button>
              ))}
              {filteredProblems.length === 0 && (
                <div className="py-12 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600"><Search className="w-8 h-8" /></div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum motivo encontrado para "{searchQuery}"</p>
                  <Button variant="link" onClick={() => setSearchQuery('')} className="text-orange-600 dark:text-orange-400 font-bold">Limpar busca</Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-28 left-4 right-4 z-20">
        <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400"><MessageCircle className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Suporte Operacional</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Falar agora pelo WhatsApp</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-800 font-bold rounded-xl px-4 h-9 shadow-sm shadow-green-600/20" onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>Abrir</Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button 
          disabled={step === 'of_selection' ? selectedOFs.length === 0 : !selected} 
          onClick={() => {
            if (step === 'of_selection') {
              setStep('type_selection');
            } else {
              navigate('/trip/report-problem/details', {
                state: {
                  type: selected,
                  ofs: selectedOFs,
                  ...(selected === 'checklist_divergencia' && { checklistDivergence: true })
                }
              });
            }
          }} 
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-50 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-800 dark:disabled:to-slate-900"
        >
          {step === 'of_selection' ? 'Continuar' : 'Continuar para detalhes'}
        </Button>
      </div>
    </div>
  );
}
