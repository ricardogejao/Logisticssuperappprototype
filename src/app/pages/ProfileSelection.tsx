import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { ArrowLeft, Truck, Check, Package, Building2, Info } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { OnboardingProgress } from '../components/ui/onboarding-progress';

type ProfileType = 'motorista' | 'transportadora' | 'embarcador';

export function ProfileSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ProfileType>('motorista');

  const handleContinue = () => {
      if (selected === 'motorista') {
          navigate('/driver-license');
      } else {
          // Redirect to external form
          window.location.href = 'https://carga24h.com.br/form/';
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm shadow-slate-50/50 dark:shadow-slate-900/50 transition-colors duration-300">
        <div className="px-6 pt-6 pb-2 flex items-center">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/verification')}
                className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-white" />
            </Button>
        </div>
        <OnboardingProgress step={3} totalSteps={7} title="Perfil" className="pt-0 pb-4" />
      </div>

      <div className="flex-1 px-8 pt-8 pb-10 max-w-lg mx-auto w-full">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Qual é o seu perfil?</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-base font-light leading-relaxed">
                Escolha a opção que melhor descreve sua atuação no transporte.
            </p>

            <div className="space-y-4">
                {/* Motorista Option */}
                <ProfileOption 
                    id="motorista" 
                    title="Sou Motorista" 
                    description="Quero encontrar cargas, negociar fretes e receber pagamentos pelo app." 
                    icon={Truck} 
                    selected={selected} 
                    onSelect={setSelected} 
                />

                {/* Transportadora Option */}
                <ProfileOption 
                    id="transportadora" 
                    title="Sou Operador Logístico" 
                    description="Quero contratar motoristas, gerenciar frotas e distribuir cargas." 
                    icon={Building2} 
                    selected={selected} 
                    onSelect={setSelected} 
                />

                {/* Embarcador Option */}
                <ProfileOption 
                    id="embarcador" 
                    title="Sou Embarcador" 
                    description="Preciso enviar mercadorias e contratar transporte para minha carga." 
                    icon={Package} 
                    selected={selected} 
                    onSelect={setSelected} 
                />
            </div>

            {/* Informational Alert */}
            {selected === 'motorista' ? (
                <div className="mt-8 flex items-start gap-4 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                        <Info className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Para o cadastro você precisará de:</h3>
                        <ul className="text-sm text-blue-800/90 dark:text-blue-400/80 space-y-1 list-disc list-inside font-medium">
                            <li>CNH válida (frente e verso)</li>
                            <li>Comprovante de residência (até 2 meses)</li>
                            <li>CRLV do(s) veículo(s)</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="mt-8 flex items-start gap-4 p-5 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                        <Info className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">Importante</h3>
                        <p className="text-sm text-amber-800/90 dark:text-amber-400/80 leading-relaxed font-medium">
                            O aplicativo é exclusivo para <strong>Motoristas</strong>. 
                            Operadores Logísticos e Embarcadores serão direcionados para nossa plataforma web completa.
                        </p>
                    </div>
                </div>
            )}

            <div className="pt-8">
                <Button 
                    onClick={handleContinue}
                    disabled={!selected}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300 active:scale-[0.98]"
                >
                    Continuar
                </Button>
            </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileOption({ id, title, description, icon: Icon, selected, onSelect }: any) {
    const isSelected = selected === id;
    return (
        <div 
            className={cn(
                "cursor-pointer transition-all duration-300 border-2 rounded-2xl bg-white dark:bg-slate-900/50 relative p-5 flex items-center gap-5 group",
                isSelected 
                    ? "border-orange-500 shadow-lg shadow-orange-500/10" 
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
            )}
            onClick={() => onSelect(id)}
        >
            <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                isSelected ? "bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400" : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
            )}>
                <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div className="flex-1 pr-6">
                <h3 className={cn("font-bold text-lg transition-colors", isSelected ? "text-orange-600 dark:text-orange-400" : "text-slate-900 dark:text-slate-200")}>{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light leading-relaxed">
                    {description}
                </p>
            </div>
            {isSelected && (
                <div className="absolute top-5 right-5 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
            )}
        </div>
    );
}
