import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, CheckCircle2, Loader2, Info, Share2, Wallet, Eye, EyeOff, ChevronRight, CreditCard } from 'lucide-react';
import moppLosango from '../../imports/logo_mopp_losango_v2.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { OnboardingProgress } from '../components/ui/onboarding-progress';
import { toast } from 'sonner';

interface FinancialInfoProps {
  isProfileView?: boolean;
}

export function FinancialInfo({ isProfileView = false }: FinancialInfoProps) {
  const navigate = useNavigate();

  // =========================================================
  // MOPP STATE (PRESERVED)
  // =========================================================
  const moppDetected = true; // SIMULATION: Flag returned by OCR
  const [hasMopp, setHasMopp] = useState(moppDetected);

  // =========================================================
  // RNTRC STATE & BUSINESS LOGIC
  // =========================================================
  const [rntrc, setRntrc] = useState('');
  
  // ANTT Validation Status (Green vs Red text)
  const [anttStatus, setAnttStatus] = useState<'idle' | 'validating' | 'valid_antt' | 'pending_antt'>('idle');
  
  // Ownership Status from Carga24h Base
  // 'unknown': Not found in base (Scenario 1 & 2)
  // 'self': Found and belongs to user (Scenario 3)
  // 'other': Found and belongs to someone else (Scenario 4)
  const [ownershipStatus, setOwnershipStatus] = useState<'unknown' | 'self' | 'other'>('unknown');
  
  // Manual Toggle State
  const [isOwnerToggle, setIsOwnerToggle] = useState(true);

  // Mock Data for "Other" scenario
  const [rntrcOwnerName, setRntrcOwnerName] = useState('');

  // Conta Digital Settings
  const [hideBalance, setHideBalance] = useState(false);

  // =========================================================
  // SIMULATION MODE (PROTOTYPE ONLY)
  // =========================================================
  const applySimulation = (scenario: string) => {
    // Reset basic state to valid-looking defaults
    setRntrc('12345678'); 
    setRntrcOwnerName('');

    switch (scenario) {
      case '1': // RNTRC não existe / não validado — titular é o usuário
        setAnttStatus('pending_antt');
        setOwnershipStatus('unknown');
        setIsOwnerToggle(true);
        break;
      
      case '2': // RNTRC não existe — usuário NÃO é titular
        setAnttStatus('pending_antt');
        setOwnershipStatus('unknown');
        setIsOwnerToggle(false);
        break;

      case '3': // RNTRC validado — titular é o usuário
        setAnttStatus('valid_antt');
        setOwnershipStatus('self');
        setIsOwnerToggle(true);
        break;

      case '4': // RNTRC validado — titular é outro usuário
        setAnttStatus('valid_antt');
        setOwnershipStatus('other');
        setRntrcOwnerName("TRANSPORTADORA EXEMPLO LTDA");
        setIsOwnerToggle(false); // Irrelevant visually (hidden) but good for logic
        break;
    }
    
    toast.info(`Cenário ${scenario} aplicado para testes.`);
  };

  // =========================================================
  // OTHER FORM FIELDS
  // =========================================================
  const [actAs, setActAs] = useState<'PF' | 'PJ'>('PF');
  const [socialReason, setSocialReason] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [usePix, setUsePix] = useState(false);
  const [useTed, setUseTed] = useState(false);
  const [usePef, setUsePef] = useState(false);
  
  const [pixKey, setPixKey] = useState('');
  const [bank, setBank] = useState('');
  const [agency, setAgency] = useState('');
  const [account, setAccount] = useState('');
  
  const [pefCards, setPefCards] = useState<{ id: string; operator: string; number: string }[]>([{ id: '1', operator: '', number: '' }]);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const PEF_OPERATORS = [
    { value: 'pamcard', label: 'Pamcard' },
    { value: 'repom', label: 'Repom' },
    { value: 'veloe', label: 'Veloe Go' },
    { value: 'ndd', label: 'NDD Cargo' },
    { value: 'target', label: 'Target' }
  ];

  const handlePefChange = (id: string, field: 'operator' | 'number', value: string) => {
    setPefCards(prev => prev.map(card => card.id === id ? { ...card, [field]: value } : card));
    setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[`pef${field === 'operator' ? 'Operator' : 'CardNumber'}_${id}`];
        return newErrs;
    });
  };

  const handleAddPefCard = () => {
    setPefCards(prev => [...prev, { id: Date.now().toString(), operator: '', number: '' }]);
  };

  const handleRemovePefCard = (id: string) => {
    if (pefCards.length > 1) {
        setPefCards(prev => prev.filter(card => card.id !== id));
    }
  };

  // =========================================================
  // VALIDATION HANDLER
  // =========================================================
  const validateRntrc = () => {
      if (rntrc.length < 8) {
          toast.error("RNTRC inválido");
          return;
      }
      
      setAnttStatus('validating');
      
      // Mock API Validation
      setTimeout(() => {
          // MOCK SCENARIOS BASED ON LAST DIGIT
          // 9 -> Scenario 4: Validated ANTT + Other Owner
          // 1 -> Scenario 3: Validated ANTT + Self Owner
          // Others -> Scenario 1: Pending ANTT + Unknown Owner
          
          if (rntrc.endsWith('9')) {
              // Scenario 4
              setAnttStatus('valid_antt');
              setOwnershipStatus('other');
              setRntrcOwnerName("TRANSPORTADORA EXEMPLO LTDA");
              setIsOwnerToggle(false); // Irrelevant visually but good for logic
          } else if (rntrc.endsWith('1')) {
              // Scenario 3
              setAnttStatus('valid_antt');
              setOwnershipStatus('self');
              setIsOwnerToggle(true);
          } else {
              // Scenario 1 (Default)
              setAnttStatus('pending_antt');
              setOwnershipStatus('unknown');
              setIsOwnerToggle(true);
          }
      }, 1500);
  };

  const handleShare = async () => {
      const shareData = {
          title: 'Carga24h',
          text: 'Cadastre-se no Carga24h para gerenciar seus veículos!',
          url: 'https://carga24h.com.br/form/'
      };

      try {
          if (navigator.share) {
              await navigator.share(shareData);
          } else {
              navigator.clipboard.writeText(shareData.url);
              toast.success("Link copiado para a área de transferência!");
          }
      } catch (err) {
          console.error(err);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Prevent submit if not validated yet
      if (anttStatus === 'idle' || anttStatus === 'validating') {
          toast.error("Valide seu RNTRC para continuar");
          return;
      }

      // Prevent submit in Scenario 2 ("Not owner -> Share link")
      if (ownershipStatus === 'unknown' && !isOwnerToggle) {
        toast.error("É necessário ser titular do RNTRC para continuar");
        return;
      }

      // Prevent submit in Scenario 4 ("Other owner")
      if (ownershipStatus === 'other') {
        toast.error("RNTRC vinculado a outro cadastro");
        return;
      }

      // Validation Logic for Active Options (Only if showing form)
      const showForm = (ownershipStatus === 'self') || (ownershipStatus === 'unknown' && isOwnerToggle);
      
      if (showForm) {
          let hasError = false;
          const newErrors: any = {};

          // Rule 1: At least one payment method selected
          if (!usePix && !useTed && !usePef) {
              toast.error("Selecione ao menos uma forma de recebimento do frete para continuar.");
              return;
          }

          if (actAs === 'PJ') {
              if (!socialReason.trim()) { newErrors.socialReason = "Campo obrigatório"; hasError = true; }
              if (!cnpj.trim()) { newErrors.cnpj = "Campo obrigatório"; hasError = true; }
          }

          if (usePix && !pixKey.trim()) {
             newErrors.pixKey = "Campo obrigatório";
             hasError = true;
          }

          if (useTed) {
              if (!bank.trim()) { newErrors.bank = "Campo obrigatório"; hasError = true; }
              if (!agency.trim()) { newErrors.agency = "Campo obrigatório"; hasError = true; }
              if (!account.trim()) { newErrors.account = "Campo obrigatório"; hasError = true; }
          }

          if (usePef) {
              pefCards.forEach(card => {
                  if (!card.operator) {
                      newErrors[`pefOperator_${card.id}`] = "Campo obrigatório";
                      hasError = true;
                  }
                  if (!card.number.trim()) {
                      newErrors[`pefCardNumber_${card.id}`] = "Campo obrigatório";
                      hasError = true;
                  }
              });
          }

          setErrors(newErrors);

          if (hasError) {
              toast.error("Verifique os campos obrigatórios nas opções selecionadas.");
              return;
          }
      }

      if (isProfileView) {
        toast.success("Dados financeiros salvos com sucesso!");
        navigate('/profile');
      } else {
        // Navigate to Vehicles (Onboarding)
        navigate('/vehicle-registration', { state: { isOwner: true } });
      }
  };

  // Logic to determine what to render
  const showToggle = ownershipStatus !== 'other';
  const isToggleLocked = ownershipStatus === 'self';
  
  const showFormFields = (ownershipStatus === 'self') || (ownershipStatus === 'unknown' && isOwnerToggle);
  const showScenario2Message = (ownershipStatus === 'unknown' && !isOwnerToggle);
  const showScenario4Message = (ownershipStatus === 'other');

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm shadow-slate-50/50 dark:shadow-slate-900/50 transition-colors">
        {/* PROTOTYPE SIMULATION CONTROL */}
        <div className="bg-slate-100 dark:bg-slate-900 px-6 py-3 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <Label className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 block tracking-wider">Simular Status do RNTRC (Modo Protótipo)</Label>
            <Select onValueChange={applySimulation}>
                <SelectTrigger className="bg-white dark:bg-slate-800 h-9 text-xs dark:text-white dark:border-slate-700">
                    <SelectValue placeholder="Selecione um cenário para testar..." />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem value="1" className="dark:text-white">1. Aguardando Validação - Sou Titular</SelectItem>
                    <SelectItem value="2" className="dark:text-white">2. Aguardando Validação - Não Sou Titular</SelectItem>
                    <SelectItem value="3" className="dark:text-white">3. Validado ANTT - Sou Titular</SelectItem>
                    <SelectItem value="4" className="dark:text-white">4. Validado ANTT - Outro Titular</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="px-6 pt-6 pb-2 flex items-center">
            <div className="flex items-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate(isProfileView ? '/profile' : '/base-address')}
                    className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-white" />
                </Button>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white ml-2">
                    {isProfileView ? "Dados Financeiros" : "Dados Complementares"}
                </h1>
            </div>
        </div>
        {!isProfileView && (
            <OnboardingProgress step={6} totalSteps={7} title="Profissional" className="pt-0 pb-4" />
        )}
      </div>

      <div className="flex-1 px-8 pt-6 pb-10 max-w-lg mx-auto w-full">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                {isProfileView ? "Dados Financeiros" : "Perfil Profissional"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-base font-light leading-relaxed transition-colors">
                {isProfileView 
                    ? "Gerencie suas informações financeiras e configurações." 
                    : "Informe seus dados de registro e preferências."
                }
            </p>

            {/* Conta Digital Section (Visible ONLY in Profile View) */}
            {isProfileView && (
                <div className="mb-8 space-y-3">
                    <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 transition-colors">Conta Digital</h2>
                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800 transition-colors">
                        
                        <button 
                            onClick={() => navigate('/digital-account')}
                            className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/10 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <span className="block text-base font-bold text-slate-900 dark:text-white text-left">Conta Digital</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                    <span className="text-xs font-medium uppercase tracking-wider">Acessar</span>
                                    <ChevronRight className="w-4 h-4" />
                            </div>
                        </button>

                        <label className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                                    {hideBalance ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                </div>
                                <span className="text-base font-bold text-slate-900 dark:text-white">Ocultar saldo</span>
                            </div>
                            <Switch 
                                checked={hideBalance}
                                onCheckedChange={setHideBalance}
                            />
                        </label>

                        <button 
                            onClick={() => toast.info("Esta funcionalidade estará disponível em breve.")}
                            className="w-full flex items-center justify-between p-5 opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-not-allowed"
                        >
                            <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 shrink-0">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-base font-bold text-slate-900 dark:text-white">Antecipação de Recebíveis</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md uppercase tracking-wide">Em breve</span>
                        </button>

                    </div>
                </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
                
                {/* MOPP Toggle */}
                <div className="p-4 bg-slate-50 dark:bg-[#1e293b] rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ImageWithFallback src={moppLosango} alt="MOPP" className="w-6 h-6 object-contain" />
                            <div className="space-y-0.5">
                                <Label className="text-slate-900 dark:text-white font-semibold text-base transition-colors">Habilitação MOPP</Label>
                                <p className="text-slate-500 dark:text-slate-400 text-xs transition-colors">
                                    {moppDetected 
                                        ? "Habilitação identificada na sua CNH"
                                        : "Não identificamos habilitação MOPP na sua CNH. Para atualizar essa informação, entre em contato com a Central Carga24h."
                                    }
                                </p>
                            </div>
                        </div>
                        <Switch 
                            checked={hasMopp} 
                            onCheckedChange={moppDetected ? setHasMopp : undefined} 
                            disabled={!moppDetected}
                            className="data-[state=checked]:bg-orange-500 transition-all" 
                        />
                    </div>
                    
                    {/* Warning if Manually Disabled */}
                    {moppDetected && !hasMopp && (
                         <div className="flex items-start gap-2 pt-2">
                             <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                             <p className="text-xs text-red-600 font-medium leading-tight">
                                Ao desativar, você deixará de receber ofertas de cargas perigosas (MOPP).
                             </p>
                         </div>
                    )}
                </div>

                {/* RNTRC Section */}
                <div className="space-y-2">
                     <div className="space-y-2">
                        <Label htmlFor="rntrc" className="text-slate-900 dark:text-white font-semibold text-sm transition-colors">Informe o número do RNTRC <span className="text-orange-500">*</span></Label>
                        <div className="flex gap-2">
                            <Input 
                                id="rntrc" 
                                value={rntrc}
                                onChange={e => {
                                    setRntrc(e.target.value);
                                    setAnttStatus('idle');
                                    setOwnershipStatus('unknown');
                                    setIsOwnerToggle(true);
                                }}
                                className="h-14 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 dark:text-white focus:ring-2 focus:ring-orange-500 rounded-xl text-lg px-4 flex-1 transition-colors" 
                                placeholder="00000000"
                                maxLength={12}
                            />
                            <Button 
                                type="button"
                                onClick={validateRntrc}
                                disabled={rntrc.length < 4 || anttStatus === 'validating'}
                                className="h-14 w-14 rounded-xl bg-slate-900 dark:bg-orange-600 text-white hover:bg-slate-800 dark:hover:bg-orange-700 disabled:opacity-50 transition-all"
                            >
                                {anttStatus === 'validating' ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="font-bold text-lg">OK</span>}
                            </Button>
                        </div>
                    </div>

                    {/* STATUS DISPLAY (Below Field) */}
                    <AnimatePresence>
                        {anttStatus !== 'idle' && anttStatus !== 'validating' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="pt-1"
                            >
                                {anttStatus === 'valid_antt' ? (
                                    <div className="flex items-center gap-2 text-emerald-700">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">RNTRC validado junto à ANTT</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <AlertTriangle className="w-4 h-4" />
                                        <span className="text-sm font-medium">RNTRC aguardando validação</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* DYNAMIC CONTENT BLOCK */}
                {anttStatus !== 'idle' && anttStatus !== 'validating' && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="space-y-8 pt-2"
                    >
                         {/* TOGGLE SECTION (Scenarios 1, 2, 3) */}
                         {showToggle && (
                            <div className="flex items-center justify-between py-2 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-slate-900 dark:text-white font-semibold text-base transition-colors">Sou titular do RNTRC informado</Label>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs transition-colors">O documento pertence a mim</p>
                                </div>
                                <Switch 
                                    checked={isOwnerToggle} 
                                    onCheckedChange={isToggleLocked ? undefined : setIsOwnerToggle} 
                                    disabled={isToggleLocked}
                                    className="data-[state=checked]:bg-orange-500 disabled:opacity-50 transition-all" 
                                />
                            </div>
                         )}

                         {/* SCENARIO 2 MESSAGE */}
                         {showScenario2Message && (
                             <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl p-6 text-center space-y-4 transition-colors">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                                    <Info className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-amber-900 dark:text-amber-300 text-lg">Atenção</h3>
                                <p className="text-sm text-amber-800 dark:text-amber-400/80 leading-relaxed font-medium">
                                    É necessário que o titular do RNTRC se cadastre no Carga24h para dar continuidade.
                                </p>
                                <Button 
                                    type="button" 
                                    onClick={handleShare}
                                    className="w-full h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 gap-2 font-bold transition-all"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Compartilhar link de cadastro
                                </Button>
                            </div>
                         )}

                        {/* SCENARIO 4 MESSAGE */}
                        {showScenario4Message && (
                             <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl p-4 flex items-start gap-3 transition-colors">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-red-900 dark:text-red-300">RNTRC ativo e vinculado a outro cadastro.</p>
                                    {rntrcOwnerName && (
                                        <p className="text-xs text-red-700 dark:text-red-400/80 mt-1">Titular: {rntrcOwnerName}</p>
                                    )}
                                </div>
                             </div>
                        )}

                        {/* FORM FIELDS (Scenarios 1 & 3) */}
                        {showFormFields && (
                             <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                             >
                                <div className="space-y-4">
                                    <Label className="text-slate-900 font-semibold text-sm">Como você atua?</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setActAs('PF')}
                                            className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${actAs === 'PF' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b] text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <span className="font-bold">Pessoa Física</span>
                                            <span className="text-xs">Autônomo</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActAs('PJ')}
                                            className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${actAs === 'PJ' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b] text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <span className="font-bold">Pessoa Jurídica</span>
                                            <span className="text-xs">Empresa / MEI</span>
                                        </button>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {actAs === 'PJ' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="grid grid-cols-1 gap-4 pt-2 overflow-hidden"
                                            >
                                                    <div className="space-y-2">
                                                        <Label htmlFor="socialReason" className="text-slate-900 dark:text-white font-semibold text-sm transition-colors">Razão Social <span className="text-orange-500">*</span></Label>
                                                        <Input 
                                                            id="socialReason" 
                                                            value={socialReason}
                                                            onChange={e => {
                                                                setSocialReason(e.target.value);
                                                                if (errors.socialReason) setErrors({...errors, socialReason: ''});
                                                            }}
                                                            className={`h-14 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 dark:text-white rounded-xl px-4 focus:ring-2 focus:ring-orange-500 transition-colors ${errors.socialReason ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                        />
                                                        {errors.socialReason && <p className="text-xs text-red-500 font-medium">{errors.socialReason}</p>}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cnpj" className="text-slate-900 dark:text-white font-semibold text-sm transition-colors">CNPJ <span className="text-orange-500">*</span></Label>
                                                        <Input 
                                                            id="cnpj" 
                                                            value={cnpj}
                                                            onChange={e => {
                                                                setCnpj(e.target.value);
                                                                if (errors.cnpj) setErrors({...errors, cnpj: ''});
                                                            }}
                                                            placeholder="00.000.000/0000-00"
                                                            className={`h-14 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 dark:text-white rounded-xl px-4 focus:ring-2 focus:ring-orange-500 transition-colors ${errors.cnpj ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                        />
                                                        {errors.cnpj && <p className="text-xs text-red-500 font-medium">{errors.cnpj}</p>}
                                                    </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                    <div>
                                        <h3 className="text-slate-900 dark:text-white font-bold text-base transition-colors">Como prefere receber o frete?</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Selecione todas as opções que utiliza</p>
                                    </div>
                                    
                                    {/* PIX TOGGLE */}
                                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-[#1e293b] transition-colors">
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/20 transition-colors">
                                            <Label className="text-slate-900 dark:text-white font-semibold cursor-pointer flex-1 text-base transition-colors" onClick={() => setUsePix(!usePix)}>PIX</Label>
                                            <Switch checked={usePix} onCheckedChange={setUsePix} className="data-[state=checked]:bg-orange-500" />
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {usePix && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 space-y-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                                                        <div className="space-y-2">
                                                            <Label className="text-slate-900 dark:text-white font-semibold text-sm transition-colors">Chave PIX <span className="text-orange-500">*</span></Label>
                                                            <Input 
                                                                value={pixKey}
                                                                onChange={e => {
                                                                    setPixKey(e.target.value);
                                                                    if (errors.pixKey) setErrors({...errors, pixKey: ''});
                                                                }}
                                                                placeholder="CPF, CNPJ, Email ou Telefone"
                                                                className={`h-14 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 dark:text-white rounded-xl px-4 focus:ring-2 focus:ring-orange-500 transition-colors ${errors.pixKey ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/10' : ''}`}
                                                            />
                                                             {errors.pixKey && <p className="text-xs text-red-500 font-medium">{errors.pixKey}</p>}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* TED TOGGLE */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50">
                                            <Label className="text-slate-900 font-semibold cursor-pointer flex-1 text-base" onClick={() => setUseTed(!useTed)}>Conta Bancária (TED)</Label>
                                            <Switch checked={useTed} onCheckedChange={setUseTed} className="data-[state=checked]:bg-orange-500" />
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {useTed && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 space-y-4 border-t border-slate-100">
                                                        <div className="space-y-2">
                                                            <Label className="text-slate-900 font-semibold text-sm">Banco <span className="text-orange-500">*</span></Label>
                                                            <Input 
                                                                value={bank}
                                                                onChange={e => {
                                                                    setBank(e.target.value);
                                                                    if (errors.bank) setErrors({...errors, bank: ''});
                                                                }}
                                                                placeholder="Nome ou código do banco"
                                                                className={`h-14 bg-white border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-orange-500 ${errors.bank ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                            />
                                                            {errors.bank && <p className="text-xs text-red-500 font-medium">{errors.bank}</p>}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label className="text-slate-900 font-semibold text-sm">Agência <span className="text-orange-500">*</span></Label>
                                                                <Input 
                                                                    value={agency}
                                                                    onChange={e => {
                                                                        setAgency(e.target.value);
                                                                        if (errors.agency) setErrors({...errors, agency: ''});
                                                                    }}
                                                                    className={`h-14 bg-white border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-orange-500 ${errors.agency ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                                />
                                                                 {errors.agency && <p className="text-xs text-red-500 font-medium">{errors.agency}</p>}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-slate-900 font-semibold text-sm">Conta <span className="text-orange-500">*</span></Label>
                                                                <Input 
                                                                    value={account}
                                                                    onChange={e => {
                                                                        setAccount(e.target.value);
                                                                        if (errors.account) setErrors({...errors, account: ''});
                                                                    }}
                                                                    className={`h-14 bg-white border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-orange-500 ${errors.account ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                                />
                                                                {errors.account && <p className="text-xs text-red-500 font-medium">{errors.account}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* PEF TOGGLE */}
                                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50">
                                            <Label className="text-slate-900 font-semibold cursor-pointer flex-1 text-base" onClick={() => setUsePef(!usePef)}>Cartão Frete (PEF)</Label>
                                            <Switch checked={usePef} onCheckedChange={setUsePef} className="data-[state=checked]:bg-orange-500" />
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {usePef && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 space-y-4 border-t border-slate-100">
                                                        {pefCards.map((card, index) => (
                                                            <div key={card.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                                                                {index > 0 && (
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => handleRemovePefCard(card.id)}
                                                                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    >
                                                                        <span className="sr-only">Remover</span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
                                                                    </button>
                                                                )}
                                                                <div className="space-y-4">
                                                                    <div className="space-y-2">
                                                                        <Label className="text-slate-900 font-semibold text-sm">Operadora <span className="text-orange-500">*</span></Label>
                                                                        <Select 
                                                                            value={card.operator} 
                                                                            onValueChange={val => handlePefChange(card.id, 'operator', val)}
                                                                        >
                                                                            <SelectTrigger className={`h-14 bg-white border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-orange-500 ${errors[`pefOperator_${card.id}`] ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}>
                                                                                <SelectValue placeholder="Selecione a operadora" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {PEF_OPERATORS.map(op => (
                                                                                    <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        {errors[`pefOperator_${card.id}`] && <p className="text-xs text-red-500 font-medium">{errors[`pefOperator_${card.id}`]}</p>}
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label className="text-slate-900 font-semibold text-sm">Número do Cartão <span className="text-orange-500">*</span></Label>
                                                                        <Input 
                                                                            value={card.number}
                                                                            onChange={e => handlePefChange(card.id, 'number', e.target.value)}
                                                                            placeholder="0000 0000 0000 0000"
                                                                            className={`h-14 bg-white border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-orange-500 ${errors[`pefCardNumber_${card.id}`] ? 'border-red-300 ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                                        />
                                                                        {errors[`pefCardNumber_${card.id}`] && <p className="text-xs text-red-500 font-medium">{errors[`pefCardNumber_${card.id}`]}</p>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        
                                                        <Button 
                                                            type="button"
                                                            variant="outline"
                                                            onClick={handleAddPefCard}
                                                            className="w-full h-12 border-dashed border-2 border-slate-200 text-slate-500 hover:border-orange-500 hover:text-orange-600"
                                                        >
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Adicionar outro cartão
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                             </motion.div>
                        )}
                    </motion.div>
                )}

                <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-500/20"
                >
                    {isProfileView ? "Salvar Alterações" : "Próximo"}
                </Button>

            </form>
        </motion.div>
      </div>
    </div>
  );
}
