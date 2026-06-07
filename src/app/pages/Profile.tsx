import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  User,
  Truck,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  ShieldCheck,
  FileText,
  Receipt,
  Trash2,
  FlaskConical,
  ClipboardList
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/ui/bottom-nav';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const [showBlockingAlert, setShowBlockingAlert] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFinalConfirmModal, setShowFinalConfirmModal] = useState(false);
  
  const hasOpenOCE = false; 

  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    rating: 4.9,
    trips: 142,
    memberSince: "Jan 2024"
  };

  const handleDeleteClick = () => {
    if (hasOpenOCE) {
      setShowBlockingAlert(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleFirstConfirmation = () => {
    setShowConfirmModal(false);
    setShowFinalConfirmModal(true);
  };

  const handleFinalConfirmation = () => {
    setShowFinalConfirmModal(false);
    toast.success("Alerta: Processo de exclusão de conta foi concluído com sucesso!");
  };

  const menuItems = [
    { label: 'Meus dados', icon: User, path: '/profile/edit' },
    { label: 'Meus veículos', icon: Truck, path: '/vehicles' },
    { label: 'Dados financeiros', icon: CreditCard, path: '/profile/financial-info' },
    { label: 'Documentos', icon: FileText, path: '/documents' },
    { label: 'Segurança', icon: ShieldCheck, path: '/security' },
    { label: 'Configurações', icon: Settings, path: '/settings' },
    { label: 'Minhas Assinaturas', icon: Receipt, path: '/subscriptions' },
    { label: 'Meus Contratos', icon: FileText, path: '/contracts' },
    { 
      label: 'Excluir Conta', 
      icon: Trash2, 
      action: handleDeleteClick,
      destructive: true 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Meu Perfil</h1>
      </div>

      <div className="flex-1 pb-24">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#1e293b] p-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center border-4 border-white dark:border-[#1e293b] shadow-lg mb-4 text-orange-600 dark:text-orange-400 text-3xl font-bold">
                    {user.name.substring(0, 2).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{user.email}</p>
                
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-orange-500 font-bold">
                            <Star className="w-4 h-4 fill-orange-500" />
                            <span>{user.rating}</span>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">Avaliação</span>
                    </div>
                    <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
                     <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-900 dark:text-white">{user.trips}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">Viagens</span>
                    </div>
                    <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
                     <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-900 dark:text-white">{user.memberSince}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">Membro desde</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white ml-1 uppercase tracking-wider">Conta</h3>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => item.action ? item.action() : navigate(item.path)}
                        className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.destructive ? 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                <item.icon className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-medium ${item.destructive ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${item.destructive ? 'text-red-200 dark:text-red-800' : 'text-slate-400 dark:text-slate-600'}`} />
                    </button>
                ))}
            </div>

            <Button
                variant="ghost"
                className="w-full mt-6 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 h-12 rounded-xl font-medium"
                onClick={() => navigate('/login')}
            >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da conta
            </Button>

            {/* Prototype Simulations */}
            <div className="mt-6">
              <div className="flex items-center gap-2 ml-1 mb-3">
                <FlaskConical className="w-3.5 h-3.5 text-violet-400" />
                <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider">Simulações do Protótipo</h3>
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/10 rounded-2xl border border-violet-100 dark:border-violet-900/30 overflow-hidden">
                <button
                  onClick={() => {
                    localStorage.removeItem('PROTOTYPE_ONBOARDING_CHECKLIST_DONE');
                    navigate('/checklist', {
                      state: { onboardingChecklist: true, eventName: 'Cadastro', returnTo: '/home' }
                    });
                  }}
                  className="w-full flex items-center justify-between p-4 hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">Check List de Onboarding</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">Simular primeiro acesso</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-violet-300 dark:text-violet-700" />
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
                <p className="text-xs text-slate-400 dark:text-slate-500">Versão 1.0.0</p>
            </div>
        </div>
      </div>

      <BottomNav />

      {/* Modals */}
      <AlertDialog open={showBlockingAlert} onOpenChange={setShowBlockingAlert}>
        <AlertDialogContent className="dark:bg-[#1e293b] dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Ação necessária</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-slate-400">
              Para excluir sua conta, é necessário encerrar ordens não liquidadas de coleta e entrega.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowBlockingAlert(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent className="dark:bg-[#1e293b] dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Cancelar conta</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-slate-400">
              Deseja realmente cancelar sua conta? Após confirmação, seus dados pessoais e do veículo serão excluídos na base de dados, após o qual será necessário um novo cadastro para fazer uso do SuperApp Carga24h.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-slate-700 dark:text-slate-300">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFirstConfirmation}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showFinalConfirmModal} onOpenChange={setShowFinalConfirmModal}>
        <AlertDialogContent className="dark:bg-[#1e293b] dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Excluir conta</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-slate-400">
              Deseja realmente excluir sua conta do Carga24h?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-slate-700 dark:text-slate-300">Não</AlertDialogCancel>
            <AlertDialogAction 
                onClick={handleFinalConfirmation}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
                Sim, excluir conta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
