import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export function NotificationSettings() {
  const navigate = useNavigate();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [promoEnabled, setPromoEnabled] = useState(true);

  const handlePushChange = (checked: boolean) => {
    setPushEnabled(checked);
    toast.success(`Notificações Push ${checked ? 'ativadas' : 'desativadas'}`);
  };

  const handleEmailChange = (checked: boolean) => {
    setEmailEnabled(checked);
    toast.success(`Notificações por E-mail ${checked ? 'ativadas' : 'desativadas'}`);
  };

  const handleSmsChange = (checked: boolean) => {
    setSmsEnabled(checked);
    toast.success(`Notificações por SMS ${checked ? 'ativadas' : 'desativadas'}`);
  };

  const handlePromoChange = (checked: boolean) => {
    setPromoEnabled(checked);
    toast.success(`Ofertas ${checked ? 'ativadas' : 'desativadas'}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Configurar Notificações</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Canais de Comunicação */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Canais</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Push Notifications</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Alertas no celular</span>
                        </div>
                    </div>
                    <Switch 
                        checked={pushEnabled}
                        onCheckedChange={handlePushChange}
                    />
                </div>

                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">E-mail</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Resumos e ofertas</span>
                        </div>
                    </div>
                    <Switch 
                        checked={emailEnabled}
                        onCheckedChange={handleEmailChange}
                    />
                </div>

                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">SMS / WhatsApp</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Alertas urgentes</span>
                        </div>
                    </div>
                    <Switch 
                        checked={smsEnabled}
                        onCheckedChange={handleSmsChange}
                    />
                </div>

            </div>
        </section>

        {/* Tipos de Alerta */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Tipos de Alerta</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden p-4">
                <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-slate-900 dark:text-white">Novas ofertas e promoções</span>
                     <Switch 
                        checked={promoEnabled}
                        onCheckedChange={handlePromoChange}
                    />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 pr-8">
                    Receba avisos sobre novas cargas compatíveis e oportunidades exclusivas.
                </p>
            </div>
        </section>

      </div>
    </div>
  );
}