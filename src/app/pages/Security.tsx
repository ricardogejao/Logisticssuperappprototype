import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Lock, Smartphone, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export function Security() {
  const navigate = useNavigate();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleBiometricsChange = (checked: boolean) => {
      setBiometricsEnabled(checked);
      if (checked) {
          toast.success("Biometria ativada com sucesso");
      } else {
          toast.info("Biometria desativada");
      }
  };

  const handleTwoFactorChange = (checked: boolean) => {
      setTwoFactorEnabled(checked);
      if (checked) {
          toast.success("Autenticação em duas etapas ativada");
      } else {
          toast.info("Autenticação em duas etapas desativada");
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/profile')}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Segurança</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Password Section */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Acesso</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <button 
                    onClick={() => toast.info("Funcionalidade de alterar senha em breve")}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Alterar senha</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Atualize sua senha de acesso</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                </button>
            </div>
        </section>

        {/* Device Security */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Dispositivo</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Biometria / FaceID</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Entrar usando biometria</span>
                        </div>
                    </div>
                    <Switch 
                        checked={biometricsEnabled}
                        onCheckedChange={handleBiometricsChange}
                    />
                </div>

                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Autenticação em 2 etapas</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Maior segurança para sua conta</span>
                        </div>
                    </div>
                    <Switch 
                        checked={twoFactorEnabled}
                        onCheckedChange={handleTwoFactorChange}
                    />
                </div>

            </div>
        </section>

        <p className="text-xs text-slate-400 dark:text-slate-500 text-center px-8 pt-4">
            Suas informações de segurança são protegidas e criptografadas. Nunca compartilhe sua senha com terceiros.
        </p>

      </div>
    </div>
  );
}