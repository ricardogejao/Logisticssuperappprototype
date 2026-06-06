import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { OnboardingProgress } from '../components/ui/onboarding-progress';
import { DocumentUpload } from '../components/ui/document-upload';
import { cn } from '../components/ui/utils';
import cameraPreview from 'figma:asset/d59d507f44795b94c06341b686a9af025fd169ce.png';

export function BaseAddress() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'upload' | 'camera-address' | 'confirm'>('upload');
  const [uploadState, setUploadState] = useState<'idle' | 'selecting' | 'uploading' | 'completed'>('idle');
  
  const [formData, setFormData] = useState({
      zip: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      issueDate: ''
  });

  const handleStartUpload = () => {
    setUploadState('selecting');
  };

  const simulateUploadAndOCR = () => {
      setUploadState('uploading');
      // Simulate OCR processing
      setTimeout(() => {
          setUploadState('completed');
          // Fill form with OCR data
          setFormData({
              zip: '01311-000',
              street: 'Av. Paulista',
              number: '1578',
              complement: 'Apto 12B',
              neighborhood: 'Bela Vista',
              city: 'São Paulo',
              state: 'SP',
              issueDate: ''
          });
          // Move to confirmation step automatically
          setTimeout(() => {
              setStep('confirm');
          }, 1000);
      }, 2500);
  };

  const handleSelectOption = (option: 'camera' | 'file' | 'digital') => {
      if (option === 'camera') {
          setStep('camera-address');
          return;
      }
      simulateUploadAndOCR();
  };

  const handleCaptureAddress = () => {
      setStep('upload');
      simulateUploadAndOCR();
  };

  const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isDarkMode = step === 'camera-address';

  return (
    <div className={cn("flex flex-col min-h-screen font-sans transition-colors duration-500", isDarkMode ? "bg-slate-950" : "bg-white dark:bg-[#0f172a]")}>
      <div className={cn("sticky top-0 z-20 shadow-sm transition-colors duration-500", isDarkMode ? "bg-slate-950 shadow-slate-900/50" : "bg-white dark:bg-[#1e293b] shadow-slate-50/50 dark:shadow-slate-900/50")}>
        <div className="px-6 pt-6 pb-2 flex items-center">
            <div className="flex items-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                        if (step === 'confirm') {
                            setStep('upload');
                        } else if (step === 'camera-address') {
                            setStep('upload');
                        } else {
                            navigate('/driver-license');
                        }
                    }}
                    className={cn("-ml-2 rounded-full w-10 h-10 transition-colors", isDarkMode ? "text-white hover:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800")}
                >
                    <ArrowLeft className={cn("w-5 h-5", isDarkMode ? "text-white" : "text-slate-800 dark:text-white")} />
                </Button>
                <h1 className={cn("text-lg font-bold ml-2 transition-colors", isDarkMode ? "text-white" : "text-slate-900 dark:text-white")}>
                    {step === 'camera-address' ? 'Posicionar Comprovante' : 'Endereço'}
                </h1>
            </div>
        </div>
        <OnboardingProgress 
            step={5} 
            totalSteps={7} 
            title="Localização" 
            className={cn("pt-0 pb-4 transition-colors", isDarkMode ? "text-white" : "")} 
            trackClassName={isDarkMode ? "bg-white/15" : undefined}
        />
      </div>

      <div className={cn("flex-1 pt-3 pb-10 w-full flex flex-col", step === 'camera-address' ? "px-0 max-w-none" : "px-8 max-w-lg mx-auto")}>
        <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 'confirm' ? 20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
        >
            {step === 'upload' && (
                <>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Comprovante de Endereço</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-base font-light">
                        Envie um comprovante recente em seu nome ou válido para o endereço informado. Aceitamos contas de água, luz, internet ou faturas de cartão.
                    </p>

                    <div className="space-y-6">
                        <DocumentUpload 
                            label="Toque para enviar o comprovante"
                            description="Conta de luz, água, telefone ou fatura de cartão"
                            isUploaded={uploadState === 'completed'}
                            isLoading={uploadState === 'uploading'}
                            isSelecting={uploadState === 'selecting'}
                            loadingText="Lendo comprovante..."
                            onUpload={handleStartUpload}
                            onSelectOption={handleSelectOption}
                        />
                    </div>
                </>
            )}

            {step === 'camera-address' && (
                <div className="flex flex-col h-full bg-slate-950 relative">
                     <div className="flex-1 flex flex-col items-center justify-center relative px-8 py-6">
                         
                         {/* Camera Preview Overlay */}
                         <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                             <img src={cameraPreview} className="w-full h-full object-cover" alt="" />
                         </div>

                         {/* Document Frame (A4 Ratio approx) */}
                         <div className="relative w-full max-w-[320px] aspect-[1/1.41] border-2 border-white/80 rounded-sm shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] z-10 overflow-hidden">
                             {/* Corner Markers */}
                             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 -mt-[2px] -ml-[2px]" />
                             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 -mt-[2px] -mr-[2px]" />
                             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 -mb-[2px] -ml-[2px]" />
                             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 -mb-[2px] -mr-[2px]" />
                         </div>

                         {/* Guidance Text */}
                         <div className="mt-8 z-20 text-center space-y-2">
                            <p className="text-white text-lg font-medium tracking-wide">
                                Centralize o comprovante dentro da moldura e mantenha o celular firme.
                            </p>
                            <p className="text-slate-400 text-sm">
                                Use boa iluminação e evite reflexos ou sombras.
                            </p>
                         </div>
                    </div>

                    <div className="p-8 pt-0 z-20">
                        <Button 
                            onClick={handleCaptureAddress}
                            className="w-full h-[56px] text-[18px] font-medium bg-[#FF5F00] text-white rounded-2xl border-0 shadow-lg hover:bg-[#FF5F00]/90"
                        >
                            Tirar foto
                        </Button>
                    </div>
                </div>
            )}

            {step === 'confirm' && (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/financial-info'); }}>
                    
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl flex items-center gap-3 transition-colors">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shrink-0">
                             <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Comprovante Validado</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400">Os dados foram extraídos automaticamente.</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep('upload')} className="ml-auto text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
                            Alterar
                        </Button>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Confirme os dados</h2>

                    <div className="space-y-2">
                        <Label htmlFor="zip" className="text-slate-900 dark:text-white font-medium text-sm">CEP</Label>
                        <Input 
                            id="zip" 
                            placeholder="00000-000" 
                            value={formData.zip}
                            onChange={(e) => handleInputChange('zip', e.target.value)}
                            className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all" 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="street" className="text-slate-900 dark:text-white font-medium text-sm">Rua</Label>
                        <Input 
                            id="street" 
                            value={formData.street}
                            onChange={(e) => handleInputChange('street', e.target.value)}
                            className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all" 
                        />
                    </div>
                    
                    <div className="grid grid-cols-[90px_1fr] gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="number" className="text-slate-900 dark:text-white font-medium text-sm">Número</Label>
                            <Input 
                                id="number" 
                                value={formData.number}
                                onChange={(e) => handleInputChange('number', e.target.value)}
                                className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all" 
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="complement" className="text-slate-900 dark:text-white font-medium text-sm">Complemento <span className="text-slate-400 dark:text-slate-500 font-normal">(Opcional)</span></Label>
                            <Input 
                                id="complement" 
                                value={formData.complement}
                                onChange={(e) => handleInputChange('complement', e.target.value)}
                                className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="neighborhood" className="text-slate-900 dark:text-white font-medium text-sm">Bairro</Label>
                        <Input 
                            id="neighborhood" 
                            value={formData.neighborhood}
                            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                            className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all" 
                        />
                    </div>

                    <div className="grid grid-cols-[1fr_90px] gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-slate-900 dark:text-white font-medium text-sm">Cidade</Label>
                            <Input 
                                id="city" 
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all" 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="state" className="text-slate-900 dark:text-white font-medium text-sm">UF</Label>
                            <Select 
                                value={formData.state} 
                                onValueChange={(val) => handleInputChange('state', val)}
                            >
                                <SelectTrigger className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all">
                                    <SelectValue placeholder="UF" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                                    <SelectItem value="SP" className="dark:text-white dark:focus:bg-slate-800">SP</SelectItem>
                                    <SelectItem value="RJ" className="dark:text-white dark:focus:bg-slate-800">RJ</SelectItem>
                                    <SelectItem value="MG" className="dark:text-white dark:focus:bg-slate-800">MG</SelectItem>
                                    <SelectItem value="PR" className="dark:text-white dark:focus:bg-slate-800">PR</SelectItem>
                                    <SelectItem value="SC" className="dark:text-white dark:focus:bg-slate-800">SC</SelectItem>
                                    <SelectItem value="RS" className="dark:text-white dark:focus:bg-slate-800">RS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="issueDate" className="text-slate-900 dark:text-white font-medium text-sm">Data de emissão do comprovante</Label>
                        <Input 
                            id="issueDate" 
                            type="date"
                            value={formData.issueDate}
                            onChange={(e) => handleInputChange('issueDate', e.target.value)}
                            className="h-14 bg-slate-50 dark:bg-[#1e293b] border-0 dark:text-white focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all w-full [color-scheme:light] dark:[color-scheme:dark]" 
                            required
                        />
                    </div>

                    <div className="pt-8">
                        <Button 
                            type="submit" 
                            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300"
                        >
                            Confirmar Endereço
                        </Button>
                    </div>
                </form>
            )}
        </motion.div>
      </div>
    </div>
  );
}