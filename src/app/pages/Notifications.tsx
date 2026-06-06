import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, CheckCircle2, Truck, Wallet, AlertCircle, Clock, FileText, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

const NOTIFICATIONS = [
  {
    id: 101,
    type: 'alert',
    title: 'Sua CNH está vencendo',
    message: 'Sua CNH vence em 15 dias. Atualize o documento para continuar contratando fretes.',
    time: 'Agora',
    read: false,
    icon: FileText,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    path: '/profile/edit',
  },
  {
    id: 102,
    type: 'alert',
    title: 'CRLV do veículo vencendo',
    message: 'O CRLV do seu veículo vence em 10 dias. Mantenha a documentação em dia.',
    time: 'Há 5 min',
    read: false,
    icon: FileText,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    path: '/profile/edit',
  },
  {
    id: 103,
    type: 'alert',
    title: 'Seguro do veículo vencendo',
    message: 'O seguro do seu veículo vence em 7 dias. Renove para continuar operando.',
    time: 'Há 12 min',
    read: false,
    icon: Shield,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    path: '/profile/edit',
  },
  {
    id: 104,
    type: 'alert',
    title: 'Sua CNH está vencida',
    message: 'Sua CNH está vencida. Atualize agora para voltar a contratar fretes.',
    time: 'Vencido',
    isExpired: true,
    read: false,
    icon: FileText,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    path: '/profile/edit',
  },
  {
    id: 105,
    type: 'alert',
    title: 'CRLV do veículo vencido',
    message: 'Seu CRLV está vencido. Atualize agora para voltar a contratar fretes.',
    time: 'Vencido',
    isExpired: true,
    read: false,
    icon: FileText,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    path: '/profile/edit',
  },
  {
    id: 106,
    type: 'alert',
    title: 'Seguro do veículo vencido',
    message: 'Seu seguro veicular está vencido. Atualize agora para voltar a contratar fretes.',
    time: 'Vencido',
    isExpired: true,
    read: false,
    icon: Shield,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    path: '/profile/edit',
  },
  {
    id: 100,
    type: 'alert',
    title: 'Exame toxicológico vencendo',
    message: 'Seu exame vence em 5 dias. Atualize a data para não perder acesso às contratações.',
    time: 'Agora',
    read: false,
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    path: '/profile/edit',
    hasAction: true,
    actionLabel: 'Atualizar agora'
  },
  {
    id: 0,
    type: 'occurrence',
    title: 'Atualização de Ocorrência',
    message: 'Sua ocorrência #OC-9842 (Avaria) está em fase de tratamento pela central.',
    time: 'Agora',
    read: false,
    icon: AlertCircle,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    path: '/trip/occurrence'
  },
  {
    id: 1,
    type: 'payment',
    title: 'Pix Recebido',
    message: 'Você recebeu uma transferência de R$ 1.250,00 de Transportadora ABC.',
    time: 'Há 15 min',
    read: false,
    icon: Wallet,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/20',
    path: '/digital-account'
  },
  {
    id: 2,
    type: 'offer',
    title: 'Nova Oferta Compatível',
    message: 'Carga de Soja para Rio Verde (GO) com alta rentabilidade encontrada.',
    time: 'Há 1 hora',
    read: false,
    icon: Truck,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    path: '/marketplace'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Documentação',
    message: 'Sua CNH irá vencer em 30 dias. Regularize para continuar operando.',
    time: 'Há 3 horas',
    read: true,
    icon: AlertCircle,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    path: '/documents'
  },
  {
    id: 4,
    type: 'system',
    title: 'Cadastro Aprovado',
    message: 'Seus documentos foram validados e você já pode aceitar fretes!',
    time: 'Ontem',
    read: true,
    icon: CheckCircle2,
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-800',
    path: '/home'
  },
  {
    id: 6,
    type: 'occurrence',
    title: 'Ocorrência Resolvida',
    message: 'A ocorrência relatada na viagem Ordem #8932 foi finalizada com sucesso.',
    time: 'Há 2 horas',
    read: true,
    icon: CheckCircle2,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
    path: '/trip/occurrence'
  },
  {
    id: 5,
    type: 'trip',
    title: 'Viagem Finalizada',
    message: 'O comprovante de entrega da Ordem #8932 foi aceito com sucesso.',
    time: 'Ontem',
    read: true,
    icon: Clock,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    path: '/trips?tab=history'
  }
];

export function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2"
            >
                <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </Button>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Notificações</h1>
        </div>
        <Button variant="ghost" className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
            Limpar todas
        </Button>
      </header>

      {/* List */}
      <div className="flex-1 p-4 space-y-3">
        {NOTIFICATIONS.map((item, index) => (
            <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(item.path)}
                className={`p-4 rounded-2xl border flex gap-4 cursor-pointer active:scale-[0.98] transition-all ${
                    item.read 
                    ? 'bg-white dark:bg-[#1e293b] border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50' 
                    : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-sm font-bold ${item.read ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                            {item.title}
                        </h3>
                        {item.isExpired ? (
                            <span className="text-[9px] font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded uppercase tracking-tighter whitespace-nowrap ml-2">
                                Vencido
                            </span>
                        ) : (
                            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">
                                {item.time}
                            </span>
                        )}
                    </div>
                    <p className={`text-xs leading-relaxed ${item.read ? 'text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300 font-medium'}`}>
                        {item.message}
                    </p>
                    {item.hasAction && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3 h-8 text-[11px] font-bold border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(item.path);
                            }}
                        >
                            {item.actionLabel}
                        </Button>
                    )}
                </div>
                
                {!item.read && (
                    <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                )}
            </motion.div>
        ))}

        <div className="pt-8 pb-4 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">Você não tem mais notificações antigas.</p>
        </div>
      </div>
    </div>
  );
}
