import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Trash2, Plus, Truck, AlertCircle, Info, Link as LinkIcon, AlertTriangle, CheckCircle2, Loader2, User, FileText } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { DocumentUpload } from '../components/ui/document-upload';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import truckImage from 'figma:asset/e4bc9839f6485a5be69a83c3d434cb79258395da.png';

export function VehicleRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { isOwner?: boolean } || {};
  const isOwner = state.isOwner !== false;

  const [view, setView] = useState<'list' | 'form'>('list');
  const [vehicles, setVehicles] = useState<any[]>([]);

  // Mock initial vehicles
  useEffect(() => {
      if (!isOwner && vehicles.length === 0) {
          setVehicles([
              { id: 1, plate: 'ABC-1234', model: 'SCANIA R450', type: 'Caminhão Trator', owner: 'TRANSPORTADORA EXEMPLO' }
          ]);
      }
  }, [isOwner, vehicles.length]);

  // --- FORM STATE ---
  const [uploadStep, setUploadStep] = useState<'idle' | 'selecting' | 'uploading' | 'completed'>('idle');
  
  // Plate Validation State
  const [plateStatus, setPlateStatus] = useState<'idle' | 'validating' | 'valid' | 'error'>('idle');
  const [plateMessage, setPlateMessage] = useState('');
  const [plateMismatch, setPlateMismatch] = useState(false);

  const initialFormState = {
      plate: '',
      renavam: '',
      chassi: '',
      
      // New Required Fields
      state: '',
      city: '',
      brand: '',
      model: '',
      manufactureYear: '',
      modelYear: '',

      // Classification
      type: '', 
      subType: '', 
      
      // Motorization
      motorCode: '',
      motorPower: '',
      fuelType: '',
      avgConsumption: '',
      
      // Dimensions & Capacity
      cargoType: '',
      cargoWidth: '',
      cargoHeight: '',
      cargoLength: '',
      volume: '', 
      
      // Weights
      pbt: '', 
      netWeight: '', 
      axles: '', // This will represent the total axles for the set
      vehicleAxles: '', // This represents the axles of the individual vehicle (OCR)
      
      // Toggles
      isThirdParty: false,
      isInsured: false,
      hasTracker: false,
      insuranceExpiration: '',
      trackerTechnology: '',
      trackerCommunication: '',
      trackerNumber: '',
      
      // Third Party Data
      thirdPartyName: 'João da Silva (Você)', // Mock logged user
      thirdPartyCpf: '123.456.789-00', // Mock logged user
      
      // Tractor specifics
      trailers: [] as any[],
      dollyPlate: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newTrailerPlate, setNewTrailerPlate] = useState('');
  const [newTrailerConfig, setNewTrailerConfig] = useState('Simples'); // For simulation
  const [crlvAttempts, setCrlvAttempts] = useState(0);

  // Logic Helpers
  const isTractor = formData.type === 'Caminhão Trator';
  const isSemiReboque = formData.type === 'Semi-Reboque';
  const showMotor = !isSemiReboque && formData.type;
  const showCargoDims = !isTractor && formData.type;

  // --- DYNAMIC CALCULATIONS (Rule 1: Capacity Behavior) ---
  useEffect(() => {
      if (isTractor) {
          const trailerCount = formData.trailers.length;
          
          if (trailerCount === 0) {
              // Rule 1.1: Before selection -> Zeroed values, only Tractor axles
              setFormData(p => ({
                  ...p,
                  volume: '0.00',
                  pbt: '0',
                  netWeight: '0',
                  axles: '3' // Default tractor axles
              }));
          } else {
              // Rule 1.2: Sum values from selected trailers
              let totalVol = 0;
              let totalPbt = 0;
              let totalNet = 0;
              let totalAxles = 3; // Start with tractor axles

              formData.trailers.forEach(t => {
                  // Mock values based on config to simulate specific trailer data
                  // These values would come from the trailer's CRLV in a real scenario
                  switch (t.config) {
                      case 'Simples':
                          totalVol += 35.5;
                          totalPbt += 25000;
                          totalNet += 17000;
                          totalAxles += 3;
                          break;
                      case 'Vanderleia':
                          totalVol += 40.0;
                          totalPbt += 27000;
                          totalNet += 19000;
                          totalAxles += 3;
                          break;
                      case '5ª Roda':
                          totalVol += 20.0;
                          totalPbt += 16000;
                          totalNet += 11000;
                          totalAxles += 2;
                          break;
                      default:
                          totalVol += 30;
                          totalPbt += 20000;
                          totalNet += 15000;
                          totalAxles += 2;
                  }
              });

              setFormData(p => ({
                  ...p,
                  volume: totalVol.toFixed(2),
                  pbt: totalPbt.toString(),
                  netWeight: totalNet.toString(),
                  axles: totalAxles.toString()
              }));
          }
      } 
      // Manual volume calc for rigid trucks (keep existing logic for non-tractors)
      else if (formData.cargoWidth && formData.cargoHeight && formData.cargoLength) {
          const vol = (parseFloat(formData.cargoWidth) * parseFloat(formData.cargoHeight) * parseFloat(formData.cargoLength)).toFixed(2);
          if (vol !== formData.volume) setFormData(p => ({ ...p, volume: vol }));
      }
  }, [isTractor, formData.trailers, formData.cargoWidth, formData.cargoHeight, formData.cargoLength, formData.type]);

  // --- DOLLY LOGIC ---
  const showDollyInput = formData.trailers.filter(t => t.config === 'Simples' || t.config === 'Vanderleia').length >= 2;

  // --- HANDLERS ---

  const handleInputChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePlate = (plate: string) => {
      const cleanPlate = plate.replace(/[^A-Z0-9]/g, '');
      
      if (cleanPlate.length >= 7) {
          setPlateStatus('validating');
          setPlateMessage("Validando placa...");
          setPlateMismatch(false);
          
          setTimeout(() => {
              if (cleanPlate === 'ABA1Q33') {
                  setPlateStatus('error');
                  setPlateMessage('');
              } else {
                  setPlateStatus('valid');
                  setPlateMessage(""); 
              }
          }, 1500);
      } else {
          setPlateStatus('idle');
          setPlateMessage('');
      }
  };

  const handleUploadStart = () => setUploadStep('selecting');
  
  const handleUploadOption = (option: 'camera' | 'file' | 'digital') => {
      setUploadStep('uploading');
      
      setTimeout(() => {
          if (crlvAttempts < 1) {
              setUploadStep('idle');
              setCrlvAttempts(prev => prev + 1);
              toast.error("Não foi possível validar o documento. Tente novamente.");
              return;
          }

          setUploadStep('completed');
          
          const cleanPlate = formData.plate.replace(/[^A-Z0-9]/g, '');
          let ocrPlate = cleanPlate; 
          let isMismatch = false;

          if (cleanPlate === 'ABC1D23') {
              ocrPlate = 'MER1234';
              isMismatch = true;
          }

          if (isMismatch) {
              setPlateMismatch(true);
              setPlateStatus('validating');
              setTimeout(() => {
                  handleInputChange('plate', ocrPlate);
                  setPlateStatus('valid');
                  setPlateMessage("Documento validado com sucesso");
              }, 1500);
          } else {
             setPlateMessage("Documento validado com sucesso");
          }

          setFormData(prev => ({
              ...prev,
              plate: ocrPlate,
              renavam: '12345678900',
              chassi: '9BWZZZ37780001234',
              state: 'SP',
              city: 'São Bernardo do Campo',
              brand: 'SCANIA',
              model: 'R450 6x2',
              manufactureYear: '2023',
              modelYear: '2023',
              type: 'Caminhão Trator', 
              axles: '3', // Initial set total
              vehicleAxles: '3', // Individual vehicle axles
              motorCode: 'OM 457 LA',
              motorPower: '440',
              fuelType: 'Diesel',
              avgConsumption: '2.5',
              pbt: '0', 
              netWeight: '0',
              volume: '0.00'
          }));
          
          if (!isMismatch) {
              toast.success("Leitura do CRLV realizada com sucesso!");
          }
      }, 2000);
  };

  const handleAddTrailer = () => {
      if (!newTrailerPlate || newTrailerPlate.length < 7) {
          toast.error("Digite a placa completa da carreta para adicionar.");
          return;
      }
      
      if (newTrailerConfig === '5ª Roda') {
          const hasFifthWheel = formData.trailers.some(t => t.config === '5ª Roda');
          if (hasFifthWheel) {
              toast.error("Não é permitido adicionar dois semirreboques do tipo 5ª Roda.");
              return;
          }
      }

      // Rule 2.1: Mock Body Type for label generation
      const mockBodyTypes = ['Grade Baixa', 'Baú', 'Sider', 'Graneleiro', 'Tanque', 'Caçamba'];
      const randomBody = mockBodyTypes[Math.floor(Math.random() * mockBodyTypes.length)];
      
      // Construct the specific label requested
      const specificLabel = `${randomBody} ${newTrailerConfig}`;

      setFormData(p => ({
          ...p,
          trailers: [...p.trailers, { 
              id: Date.now(), 
              plate: newTrailerPlate, 
              config: newTrailerConfig,
              bodyType: randomBody, 
              label: specificLabel, // Store the displayed label
              type: 'Semi-Reboque' 
          }]
      }));
      setNewTrailerPlate('');
  };

  const handleSave = () => {
      if (!formData.plate || !formData.type) {
          toast.error("Preencha os campos obrigatórios");
          return;
      }
      setVehicles([...vehicles, { ...formData, id: Date.now() }]);
      setFormData(initialFormState);
      setUploadStep('idle');
      setPlateStatus('idle');
      setPlateMessage('');
      setView('list');
      toast.success("Veículo cadastrado!");
  };

  // --- VIEW RENDERING ---

  if (view === 'list') {
      return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
             <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors">
                <div className="px-6 pt-6 pb-2 flex items-center">
                    <div className="flex items-center">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => navigate('/financial-info')}
                            className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-white" />
                        </Button>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white ml-2">Sua Frota</h1>
                    </div>
                </div>
            </div>

                <div className="flex-1 px-6 pt-6 pb-10 max-w-lg mx-auto w-full flex flex-col">
                    <div className="space-y-4 flex-1">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Sua Frota</h1>
                        {vehicles.length === 0 ? (
                        <div className="text-center py-16 px-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-6 transition-colors">
                            <div>
                                <Truck className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">Nenhum veículo cadastrado</p>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Adicione seus veículos para começar a receber ofertas.</p>
                            </div>
                            {isOwner && (
                                <Button 
                                    onClick={() => setView('form')}
                                    className="bg-white dark:bg-slate-800 border-2 border-orange-500 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 font-bold rounded-2xl px-10 h-14 transition-all active:scale-95"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Adicionar Veículo
                                </Button>
                            )}
                        </div>
                    ) : (
                        vehicles.map(v => (
                            <div key={v.id} className="bg-white dark:bg-[#1e293b] p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex justify-between items-center transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-14 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
                                        <img src={truckImage} alt="Veículo" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{v.plate}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mt-1">{v.model} • {v.type}</p>
                                    </div>
                                </div>
                                {isOwner && (
                                    <Button variant="ghost" size="icon" onClick={() => setVehicles(vehicles.filter(i => i.id !== v.id))} className="text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 w-12 h-12 rounded-full">
                                        <Trash2 className="w-6 h-6" />
                                    </Button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {isOwner && vehicles.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <Button 
                            onClick={() => setView('form')}
                            className="w-full h-14 bg-white dark:bg-[#1e293b] border-2 border-orange-500 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 font-bold rounded-2xl transition-all"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Adicionar Outro Veículo
                        </Button>
                        
                        <Button 
                            onClick={() => {
                                toast.success("Frota atualizada com sucesso!");
                                navigate('/account-status'); 
                            }}
                            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
                        >
                            Finalizar Cadastro
                        </Button>
                    </div>
                )}
            </div>
        </div>
      );
  }

  // --- FORM VIEW ---
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
        <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors">
            <div className="px-6 pt-6 pb-2 flex items-center">
                <div className="flex items-center">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setView('list')}
                        className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-white" />
                    </Button>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white ml-2">Novo Veículo</h1>
                </div>
            </div>
        </div>

        <div className="flex-1 px-6 pt-3 pb-10 max-w-lg mx-auto w-full">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Novo Veículo</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-base font-light transition-colors">
                    Informe a placa para validarmos o veículo junto à base de dados.
                </p>
                <div className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="plate" className="text-slate-900 dark:text-white font-bold text-sm">Placa <span className="text-orange-500">*</span></Label>
                        <div className="relative">
                            <Input 
                                id="plate"
                                value={formData.plate}
                                onChange={e => {
                                    const val = e.target.value.toUpperCase();
                                    handleInputChange('plate', val);
                                    validatePlate(val);
                                }}
                                maxLength={8}
                                placeholder="AAA-1A11"
                                className={cn(
                                    "h-14 text-lg font-bold uppercase tracking-widest transition-all dark:bg-slate-800 dark:text-white dark:border-slate-700", 
                                    plateMismatch ? "border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800" : "",
                                    plateStatus === 'valid' ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10 dark:border-emerald-800" : "",
                                    plateStatus === 'error' ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-900 dark:text-red-400" : ""
                                )}
                            />
                            {/* Input Status Icons */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                {plateStatus === 'validating' && <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />}
                                {plateStatus === 'valid' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                                {plateStatus === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
                            </div>
                        </div>

                        {/* Status Message Feedback */}
                        {plateStatus === 'validating' && (
                            <div className="flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 animate-pulse">
                                Validando placa...
                            </div>
                        )}
                        
                        {plateStatus === 'error' && (
                            <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800 text-red-800 dark:text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>Veículo já vinculado a outra conta. Entre em contato com o suporte caso seja o proprietário.</span>
                            </div>
                        )}

                        {plateStatus === 'valid' && (
                            <div className="space-y-2">
                                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    Documento validado com sucesso
                                </div>
                                {plateMismatch && (
                                     <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800 text-amber-800 dark:text-amber-400 text-sm">
                                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span>A placa identificada no CRLV é diferente da informada. O campo foi atualizado automaticamente.</span>
                                     </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Only show upload if plate is VALID */}
                    <AnimatePresence>
                        {plateStatus === 'valid' && uploadStep !== 'completed' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <DocumentUpload 
                                    label="Validar com CRLV"
                                    description="Envie o arquivo PDF ou imagem do CRLV Digital"
                                    isUploaded={uploadStep === 'completed'}
                                    isLoading={uploadStep === 'uploading'}
                                    isSelecting={uploadStep === 'selecting'}
                                    onUpload={handleUploadStart}
                                    onSelectOption={handleUploadOption}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progressive Form Fields */}
                <AnimatePresence>
                {uploadStep === 'completed' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* 2. Basic Data (OCR) */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Dados do Veículo</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Renavam</Label>
                                    <Input value={formData.renavam} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Chassi</Label>
                                    <Input value={formData.chassi} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-[90px_1fr] gap-4">
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">UF</Label>
                                    <Input value={formData.state} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Cidade</Label>
                                    <Input value={formData.city} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Marca</Label>
                                    <Input value={formData.brand} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Modelo</Label>
                                    <Input value={formData.model} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Ano Fabr. / Ano Mod.</Label>
                                    <Input value={`${formData.manufactureYear} / ${formData.modelYear}`} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-semibold text-sm dark:text-slate-400">Quantidade de Eixos</Label>
                                    <Input value={formData.vehicleAxles} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold text-sm dark:text-white">Tipo de Veículo</Label>
                                <Select value={formData.type} onValueChange={(v) => handleInputChange('type', v)}>
                                    <SelectTrigger className="h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                        <SelectItem value="Caminhão Trator" className="dark:text-white dark:focus:bg-slate-700">Caminhão Trator</SelectItem>
                                        <SelectItem value="Semi-Reboque" className="dark:text-white dark:focus:bg-slate-700">Semi-Reboque</SelectItem>
                                        <SelectItem value="Caminhão Truck" className="dark:text-white dark:focus:bg-slate-700">Caminhão Truck</SelectItem>
                                        <SelectItem value="Caminhão Toco" className="dark:text-white dark:focus:bg-slate-700">Caminhão Toco</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sub-Type for Semi-Reboque */}
                            {isSemiReboque && (
                                <div className="space-y-2">
                                    <Label className="font-bold text-sm dark:text-white">Configuração</Label>
                                    <Input value={formData.subType || "Simples"} readOnly className="h-14 bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                </div>
                            )}
                        </div>

                        {/* 3. Compartimento & Dimensions (Shown if NOT Tractor) - EDITABLE */}
                        {showCargoDims && (
                            <div className="space-y-4">
                                 <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Compartimento e Dimensões</h3>
                                 
                                 <div className="space-y-2">
                                     <Label className="font-bold text-sm dark:text-white">Tipo de Carroceria <span className="text-orange-500">*</span></Label>
                                     <Select value={formData.cargoType} onValueChange={v => handleInputChange('cargoType', v)}>
                                        <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                        <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                            <SelectItem value="Baú" className="dark:text-white dark:focus:bg-slate-700">Baú</SelectItem>
                                            <SelectItem value="Sider" className="dark:text-white dark:focus:bg-slate-700">Sider</SelectItem>
                                            <SelectItem value="Grade Baixa" className="dark:text-white dark:focus:bg-slate-700">Grade Baixa</SelectItem>
                                            <SelectItem value="Graneleiro">Graneleiro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Comp. (m)</Label>
                                        <Input type="number" value={formData.cargoLength} onChange={e => handleInputChange('cargoLength', e.target.value)} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Larg. (m)</Label>
                                        <Input type="number" value={formData.cargoWidth} onChange={e => handleInputChange('cargoWidth', e.target.value)} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Alt. (m)</Label>
                                        <Input type="number" value={formData.cargoHeight} onChange={e => handleInputChange('cargoHeight', e.target.value)} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. Motorization (Shown if NOT Semi-Reboque) - READ ONLY */}
                        {showMotor && (
                            <div className="space-y-4">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 transition-colors">Motorização</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Cód. do Motor</Label>
                                        <Input value={formData.motorCode} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Potência (CV)</Label>
                                        <Input value={formData.motorPower} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Combustível</Label>
                                        <Input value={formData.fuelType} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Consumo Médio (km/l)</Label>
                                        <Input value={formData.avgConsumption} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 5. Capacity (Shown if NOT Tractor) - READ ONLY */}
                        {!isTractor && (
                            <div className="space-y-4">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 transition-colors">Capacidade</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Peso Líquido (kg)</Label>
                                        <Input value={formData.netWeight} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Volume (m³)</Label>
                                        <Input value={formData.volume} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">PBT (kg)</Label>
                                        <Input value={formData.pbt} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-slate-500 dark:text-slate-400">Total de Eixos</Label>
                                        <Input value={formData.axles} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 dark:text-white" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 6. Tractor Linking (Shown Only for Tractor) */}
                        {isTractor && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 transition-colors">Placas da(s) Carreta(s)</h3>
                                    
                                    <div className="space-y-1.5">
                                        <div className="flex gap-3 px-1">
                                            <Label className="flex-1 text-xs text-slate-500 dark:text-slate-400 font-medium">Placa</Label>
                                            <Label className="flex-1 text-xs text-slate-500 dark:text-slate-400 font-medium">Tipo (Simulação)</Label>
                                            <div className="w-14 shrink-0" />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <Input 
                                                    value={newTrailerPlate} 
                                                    onChange={e => setNewTrailerPlate(e.target.value.toUpperCase())}
                                                    maxLength={8}
                                                    className="w-full h-14 uppercase bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white"
                                                    placeholder="AAA-1A11"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Select value={newTrailerConfig} onValueChange={setNewTrailerConfig}>
                                                    <SelectTrigger className="h-14 w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                                        <SelectItem value="Simples" className="dark:text-white dark:focus:bg-slate-700">Simples</SelectItem>
                                                        <SelectItem value="Vanderleia" className="dark:text-white dark:focus:bg-slate-700">Vanderleia</SelectItem>
                                                        <SelectItem value="5ª Roda" className="dark:text-white dark:focus:bg-slate-700">5ª Roda</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button type="button" onClick={handleAddTrailer} className="h-14 w-14 bg-slate-900 dark:bg-orange-600 text-white hover:bg-slate-800 dark:hover:bg-orange-700 rounded-xl shrink-0 shadow-sm transition-all">
                                                <Plus className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {formData.trailers.map((t, index) => (
                                            <div key={t.id} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="font-bold text-slate-900 dark:text-white">{t.plate}</p>
                                                        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wide">Vinculado</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.bodyType || 'Carga'} – {t.config}</p>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => setFormData(p => ({ ...p, trailers: p.trailers.filter(i => i.id !== t.id) }))}
                                                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dolly Input */}
                                {showDollyInput && (
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/20 space-y-2 animate-in fade-in slide-in-from-top-2 transition-colors">
                                        <Label className="text-blue-900 dark:text-blue-300 font-bold text-sm">Informe a placa da Dolly</Label>
                                        <Input 
                                            value={formData.dollyPlate}
                                            onChange={e => handleInputChange('dollyPlate', e.target.value.toUpperCase())}
                                            className="bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 h-12 uppercase font-bold text-blue-900 dark:text-white"
                                            placeholder="AAA-1A11"
                                        />
                                    </div>
                                )}

                                {/* Tractor Capacity (Dynamic Sum) */}
                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Capacidade do Conjunto</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500 dark:text-slate-400">Peso Líquido (kg)</Label>
                                            <Input value={formData.netWeight} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 font-bold text-slate-700 dark:text-slate-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500 dark:text-slate-400">Volume (m³)</Label>
                                            <Input value={formData.volume} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 font-bold text-slate-700 dark:text-slate-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500 dark:text-slate-400">PBT (kg)</Label>
                                            <Input value={formData.pbt} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 font-bold text-slate-700 dark:text-slate-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-500 dark:text-slate-400">Total de Eixos</Label>
                                            <Input value={formData.axles} readOnly className="bg-slate-50 dark:bg-slate-900 border-0 font-bold text-slate-700 dark:text-slate-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Third Party Toggle & Others */}
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-8 transition-colors">
                            
                            {/* Insurance */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-slate-900 dark:text-white font-bold text-base cursor-pointer transition-colors" htmlFor="insurance-switch">Veículo possui seguro?</Label>
                                    <Switch 
                                        id="insurance-switch"
                                        checked={formData.isInsured} 
                                        onCheckedChange={(checked) => handleInputChange('isInsured', checked)}
                                        className="data-[state=checked]:bg-orange-500" 
                                    />
                                </div>
                                <AnimatePresence>
                                    {formData.isInsured && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-1">
                                                <Label className="font-semibold text-sm mb-2 block dark:text-white transition-colors">Vencimento da Apólice <span className="text-orange-500">*</span></Label>
                                                <Input 
                                                    type="date"
                                                    value={formData.insuranceExpiration || ''}
                                                    onChange={e => handleInputChange('insuranceExpiration', e.target.value)}
                                                    className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Tracker */}
                             <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-slate-900 dark:text-white font-bold text-base cursor-pointer transition-colors" htmlFor="tracker-switch">Veículo possui rastreador?</Label>
                                    <Switch 
                                        id="tracker-switch"
                                        checked={formData.hasTracker} 
                                        onCheckedChange={(checked) => handleInputChange('hasTracker', checked)}
                                        className="data-[state=checked]:bg-orange-500" 
                                    />
                                </div>
                                <AnimatePresence>
                                    {formData.hasTracker && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-1 space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="font-semibold text-sm dark:text-white transition-colors">Tecnologia do Rastreador <span className="text-orange-500">*</span></Label>
                                                    <Select value={formData.trackerTechnology} onValueChange={(v) => handleInputChange('trackerTechnology', v)}>
                                                        <SelectTrigger className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white transition-colors"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                        <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                                            <SelectItem value="Sascar" className="dark:text-white dark:focus:bg-slate-700">Sascar</SelectItem>
                                                            <SelectItem value="Omnilink" className="dark:text-white dark:focus:bg-slate-700">Omnilink</SelectItem>
                                                            <SelectItem value="Autotrac" className="dark:text-white dark:focus:bg-slate-700">Autotrac</SelectItem>
                                                            <SelectItem value="OnixSat" className="dark:text-white dark:focus:bg-slate-700">OnixSat</SelectItem>
                                                            <SelectItem value="Outros" className="dark:text-white dark:focus:bg-slate-700">Outros</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="font-semibold text-sm dark:text-white transition-colors">Tipo de Comunicação <span className="text-orange-500">*</span></Label>
                                                    <Select value={formData.trackerCommunication} onValueChange={(v) => handleInputChange('trackerCommunication', v)}>
                                                        <SelectTrigger className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white transition-colors"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                        <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                                            <SelectItem value="Satelital" className="dark:text-white dark:focus:bg-slate-700">Satelital</SelectItem>
                                                            <SelectItem value="GPRS" className="dark:text-white dark:focus:bg-slate-700">GPRS</SelectItem>
                                                            <SelectItem value="Híbrido" className="dark:text-white dark:focus:bg-slate-700">Híbrido</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="font-semibold text-sm dark:text-white transition-colors">Número do Rastreador <span className="text-orange-500">*</span></Label>
                                                    <Input 
                                                        value={formData.trackerNumber || ''}
                                                        onChange={e => handleInputChange('trackerNumber', e.target.value)}
                                                        className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white transition-colors"
                                                        placeholder="Digite o código"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Third Party (Owner) */}
                             <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-slate-900 dark:text-white font-bold text-base cursor-pointer transition-colors" htmlFor="third-party-switch">Veículo em nome de terceiro?</Label>
                                    <Switch 
                                        id="third-party-switch"
                                        checked={formData.isThirdParty} 
                                        onCheckedChange={(checked) => handleInputChange('isThirdParty', checked)}
                                        className="data-[state=checked]:bg-orange-500" 
                                    />
                                </div>
                                <AnimatePresence mode="wait">
                                    {formData.isThirdParty ? (
                                        <motion.div 
                                            key="third-party"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="space-y-4 overflow-hidden pt-1"
                                        >
                                            <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg flex items-start gap-2 text-sm text-orange-800 dark:text-orange-300 border border-orange-100 dark:border-orange-900/20 mb-2 transition-colors">
                                                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>Informe os dados do proprietário conforme consta no CRLV.</span>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-sm dark:text-white transition-colors">Nome / Razão Social</Label>
                                                <Input placeholder="Nome do proprietário" className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-sm dark:text-white transition-colors">CPF / CNPJ</Label>
                                                <Input placeholder="000.000.000-00" className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white" />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="owner-self"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="space-y-4 opacity-50 pointer-events-none grayscale overflow-hidden pt-1"
                                        >
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-sm dark:text-white transition-colors">Nome / Razão Social</Label>
                                                <div className="h-12 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl flex items-center px-4 font-medium text-slate-700 dark:text-slate-300 transition-colors">
                                                    {formData.thirdPartyName} <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">VOCÊ</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-sm dark:text-white transition-colors">CPF / CNPJ</Label>
                                                <div className="h-12 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl flex items-center px-4 font-medium text-slate-700 dark:text-slate-300 transition-colors">
                                                    {formData.thirdPartyCpf}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button 
                                type="submit" 
                                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20"
                            >
                                Salvar Veículo
                            </Button>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </form>
        </div>
    </div>
  );
}
