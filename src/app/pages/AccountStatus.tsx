import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { OnboardingProgress } from '../components/ui/onboarding-progress';

type AccountStatusState = 'review' | 'approved';

export function AccountStatus() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AccountStatusState>('review');

  useEffect(() => {
    // Simulating approval process for the prototype
    const timer = setTimeout(() => {
      setStatus('approved');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const renderStatusContent = () => {
    switch (status) {
      case 'review':
        return {
          icon: <Clock className="w-16 h-16 text-slate-300 dark:text-slate-700" />,
          title: "Em análise",
          description: "Estamos validando seus documentos. Isso geralmente leva poucos minutos.",
          bgColor: "bg-slate-50 dark:bg-slate-900/50",
          button: (
            <div className="w-full">
                <Button 
                    disabled 
                    className="w-full h-14 text-lg font-medium bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-xl border-0"
                >
                    Aguardando...
                </Button>
            </div>
          )
        };
      case 'approved':
        return {
          icon: <CheckCircle2 className="w-16 h-16 text-emerald-500" />,
          title: "Tudo pronto!",
          description: "Seu cadastro foi aprovado. Você já pode visualizar as ofertas disponíveis.",
          bgColor: "bg-emerald-50/30 dark:bg-emerald-500/10",
          button: (
            <Button 
                onClick={() => navigate('/home')}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 border-0"
            >
                Acessar App
                <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )
        };
    }
  };

  const content = renderStatusContent();

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <div className="flex-1 flex flex-col justify-center px-8 pt-3 relative">
        <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
        >
            <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-10 transition-colors duration-500", content.bgColor)}>
                {content.icon}
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                {content.title}
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-12 max-w-xs font-light">
                {content.description}
            </p>

            {content.button}
        </motion.div>
      </div>
    </div>
  );
}
