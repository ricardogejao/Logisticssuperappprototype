import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Camera, Upload, UserCheck, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Checkbox } from '../components/ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';
import { ChecklistSheet } from '../components/checklist/ChecklistSheet';
import { getChecklistFor, isChecklistPending } from '../utils/checklist';
import { ChecklistDefinition, ChecklistEvent } from '../types/checklist';
import { MOCK_OFFERS } from '../data/mocks';

// Viagem simulada única no protótipo: reaproveita o mesmo embarcador de
// demonstração (oferta #1) já que não há um id de oferta real por trás dela.
const ACTIVE_TRIP_SHIPPER = MOCK_OFFERS[0]?.shipper || '';

const CHECKLIST_EVENT_BY_STATUS: Record<string, ChecklistEvent> = {
  'Apresentação para Coleta': 'coleta',
  'Apresentação para Entrega': 'entrega',
};

export function UpdateTripStatus() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('Contratada');
  const [currentView, setCurrentView] = useState<'selection' | 'identity_verification' | 'nf_confirmation'>('selection');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Checklist de coleta/entrega (bottom sheet, mesmo padrão da contratação)
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [activeChecklist, setActiveChecklist] = useState<ChecklistDefinition | null>(null);

  // NF State
  const [nfs, setNfs] = useState([
    { id: 'NF-001', checked: false },
    { id: 'NF-002', checked: false },
    { id: 'NF-003', checked: false },
  ]);

  const allNfsChecked = nfs.every(nf => nf.checked);

  useEffect(() => {
    const savedStatus = localStorage.getItem('PROTOTYPE_TRIP_STATUS');
    if (savedStatus) {
      setSelectedStatus(savedStatus);
    }
  }, []);

  const statuses = [
    'Contratada',
    'A caminho da Coleta',
    'Apresentação para Coleta',
    'Coletada',
    'Apresentação para Entrega',
    'Finalizado Parcial',
    'Retornando à Origem',
    'Liquidada'
  ];

  const finalizeStatusUpdate = () => {
    if (selectedStatus === 'Liquidada') {
        localStorage.removeItem('PROTOTYPE_TRIP_ACTIVE');
        localStorage.removeItem('PROTOTYPE_TRIP_STATUS');
        
        toast.success("Viagem finalizada com sucesso!");
        navigate('/home', { replace: true });
    } else {
        localStorage.setItem('PROTOTYPE_TRIP_STATUS', selectedStatus);
        localStorage.setItem('PROTOTYPE_TRIP_ACTIVE', 'true');
        
        toast.success("Status e detalhes atualizados!");
        navigate('/trip/details', { replace: true });
    }
  };

  const goToIdentityVerification = () => {
    setCurrentView('identity_verification');
  };

  /**
   * Coleta/entrega exigem checklist: assim que o motorista seleciona um desses
   * status, o checklist já abre em bottom sheet — sem precisar passar por um
   * botão de "salvar" no meio (definido com o Ricardo). Retorna true quando o
   * status disparou esse fluxo, pra quem chamar saber que não precisa seguir
   * com a lógica padrão de salvar/avançar.
   */
  const maybeStartChecklistFlow = (status: string) => {
    const checklistEvent = CHECKLIST_EVENT_BY_STATUS[status];
    if (!checklistEvent) return false;

    const checklist = getChecklistFor(ACTIVE_TRIP_SHIPPER, checklistEvent);
    if (checklist && isChecklistPending(checklist)) {
      setActiveChecklist(checklist);
      setIsChecklistOpen(true);
    } else {
      // Sem checklist pendente pra esse cliente/evento: segue direto pra verificação
      goToIdentityVerification();
    }
    return true;
  };

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    maybeStartChecklistFlow(newStatus);
  };

  const handleSave = () => {
    // Fallback: se o motorista fechou o checklist sem responder e voltou a
    // tocar em "Salvar alterações", reabre o mesmo fluxo em vez de ignorar.
    if (maybeStartChecklistFlow(selectedStatus)) return;

    if (selectedStatus === 'Coletada') {
      setCurrentView('nf_confirmation');
      return;
    }

    finalizeStatusUpdate();
  };

  const handleStartVerification = () => {
    setIsVerifying(true);
    // Simulate Face Match / Liveness
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setTimeout(() => {
        finalizeStatusUpdate();
      }, 1500);
    }, 2500);
  };

  const toggleNf = (id: string) => {
    setNfs(prev => prev.map(nf => nf.id === id ? { ...nf, checked: !nf.checked } : nf));
  };

  if (currentView === 'identity_verification') {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans">
        <header className="px-4 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('selection')} disabled={isVerifying}>
            <X className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-bold">Verificação</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
          <AnimatePresence mode="wait">
            {!verificationSuccess ? (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6 flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center relative overflow-hidden">
                  {isVerifying && (
                    <motion.div 
                      className="absolute inset-0 bg-blue-500/20"
                      initial={{ top: "-100%" }}
                      animate={{ top: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  )}
                  <Camera className={`w-12 h-12 ${isVerifying ? 'text-blue-500' : 'text-slate-400'}`} />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Verificação necessária</h2>
                  <p className="text-slate-500 dark:text-slate-400">Precisamos confirmar sua identidade antes de continuar</p>
                </div>

                {!isVerifying && (
                  <Button onClick={handleStartVerification} className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-12 shadow-none">
                    Iniciar verificação
                  </Button>
                )}
                {isVerifying && (
                  <p className="text-blue-600 font-bold animate-pulse">Analisando biometria...</p>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <UserCheck className="w-12 h-12 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-green-600">Identidade confirmada!</h2>
                  <p className="text-slate-500 dark:text-slate-400">Tudo certo, seu status será atualizado agora.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (currentView === 'nf_confirmation') {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans">
        <header className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center gap-3 sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('selection')}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-bold">Confirmar Notas Fiscais</h1>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Notas fiscais coletadas</h2>
            <p className="text-sm text-slate-500">Marque todas as notas que foram conferidas no carregamento.</p>
          </div>

          <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {nfs.map((nf) => (
              <div 
                key={nf.id} 
                className="flex items-center justify-between p-5 border-b last:border-0 border-slate-100 dark:border-slate-800 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors"
                onClick={() => toggleNf(nf.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Check className={`w-5 h-5 ${nf.checked ? 'text-green-500' : 'text-slate-300'}`} />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{nf.id}</span>
                </div>
                <Checkbox checked={nf.checked} onCheckedChange={() => toggleNf(nf.id)} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800">
          <Button 
            disabled={!allNfsChecked}
            onClick={finalizeStatusUpdate}
            className={`w-full h-14 text-lg font-bold rounded-2xl transition-all ${
              allNfsChecked ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-200 text-slate-400'
            }`}
          >
            Confirmar coleta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      
      <header className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center gap-3 sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2"
        >
            <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Atualizar Operação</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
          
          {/* 1. Status Selection */}
          <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Novo Status
              </h2>
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <select
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full p-4 text-slate-900 dark:text-white font-bold bg-transparent outline-none appearance-none"
                    style={{ backgroundImage: 'none' }}
                  >
                      {statuses.map(status => (
                          <option key={status} value={status} className="dark:bg-[#1e293b]">{status}</option>
                      ))}
                  </select>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 px-1">Selecione a etapa atual da viagem para notificar o contratante.</p>
          </div>

          {/* 2. Evidence / Photos (Structure Prep) */}
          <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Evidências
              </h2>
              <button className="w-full h-14 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all">
                  <Upload className="w-5 h-5" />
                  <span className="font-bold">Anexar fotos ou documentos</span>
              </button>
          </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Button 
            onClick={handleSave}
            className="w-full h-12 text-base font-bold bg-slate-900 dark:bg-orange-500 hover:bg-slate-800 dark:hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-orange-500/20 transition-all"
          >
              Salvar alterações
          </Button>
      </div>

      {activeChecklist && (
        <ChecklistSheet
          open={isChecklistOpen}
          onOpenChange={setIsChecklistOpen}
          checklist={activeChecklist}
          onComplete={goToIdentityVerification}
        />
      )}

    </div>
  );
}
