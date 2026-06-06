import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Globe, 
  Navigation, 
  Map, 
  CreditCard, 
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { Moon } from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Preferências do App
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleDarkModeToggle = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    toast.success(`Modo ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado!`);
    
    // As per requirement: navigate to the equivalent Home screen
    setTimeout(() => {
      navigate('/home');
    }, 300);
  };

  // Viagem e Navegação
  const [autoTripMode, setAutoTripMode] = useState(true);
  const [altRoutes, setAltRoutes] = useState(true);
  const [showTolls, setShowTolls] = useState(true);

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
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Configurações</h1>
      </div>

      <div className="p-4 space-y-6 pb-24">
        
        {/* Preferências do App */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Preferências do App</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between p-4 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                            <Moon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Modo Escuro</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Ativar tema visual premium</span>
                        </div>
                    </div>
                    <Switch 
                        checked={theme === 'dark'}
                        onCheckedChange={handleDarkModeToggle}
                    />
                </div>

                {/* Notificações */}
                <button 
                    onClick={() => navigate('/settings/notifications')}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Notificações</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Gerencie alertas de viagens, ofertas e pagamentos</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                {/* Localização */}
                <button 
                    onClick={() => toast.info("Gerenciamento de localização via sistema do aparelho")}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Localização</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Usamos sua localização para sugerir ofertas próximas</span>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">Ativa</span>
                </button>

                {/* Idioma */}
                <button 
                    onClick={() => toast.info("Apenas Português disponível no momento")}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">Idioma</span>
                        </div>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Português</span>
                </button>

            </div>
        </section>

        {/* Viagem e Navegação */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Viagem e Navegação</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                
                <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                            <Navigation className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Abrir modo de viagem automaticamente</span>
                    </div>
                    <Switch 
                        checked={autoTripMode}
                        onCheckedChange={setAutoTripMode}
                    />
                </label>

                <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                            <Map className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Mostrar rotas alternativas</span>
                    </div>
                    <Switch 
                        checked={altRoutes}
                        onCheckedChange={setAltRoutes}
                    />
                </label>

                <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Exibir pedágios no modo viagem</span>
                    </div>
                    <Switch 
                        checked={showTolls}
                        onCheckedChange={setShowTolls}
                    />
                </label>

            </div>
        </section>

        {/* Sobre o App */}
        <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Sobre o App</h2>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                            <div className="font-bold text-xs">v1</div>
                        </div>
                        <span className="block text-sm font-bold text-slate-900 dark:text-white">Versão do app</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Versão 1.0.0</span>
                </div>

            </div>
        </section>

      </div>
    </div>
  );
}