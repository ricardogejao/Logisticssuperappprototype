import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Subscriptions() {
  const navigate = useNavigate();

  const subscriptions = [
    {
      id: 1,
      name: 'Conta Digital',
      value: 'R$ 0,00',
      validity: 'Indeterminado',
      paymentMethod: 'Gratuito',
      status: 'Ativo'
    },
    {
      id: 2,
      name: 'Rastreador',
      value: 'R$ 59,90/mês',
      validity: 'Vencido em 15/02/2026',
      paymentMethod: 'Cartão de Crédito **** 1234',
      status: 'Desativado'
    },
    {
      id: 3,
      name: 'Perfil Securitário',
      value: 'R$ 29,90/mês',
      validity: '-',
      paymentMethod: '-',
      status: 'Não contratado'
    }
  ];

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
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Minhas Assinaturas</h1>
      </div>

      <div className="p-4 space-y-4">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{sub.name}</h3>
                {sub.status === 'Ativo' && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{sub.status}</span>
                  </div>
                )}
                {sub.status === 'Desativado' && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                    <span className="text-sm text-red-600 dark:text-red-400 font-medium">{sub.status}</span>
                  </div>
                )}
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{sub.value}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
              {sub.status !== 'Não contratado' ? (
                <>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="text-sm">{sub.validity}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="text-sm">{sub.paymentMethod}</span>
                  </div>
                </>
              ) : (
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Contrate esse serviço
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="pt-4 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[250px] mx-auto">
                Para alterar ou cancelar suas assinaturas, entre em contato com o suporte.
            </p>
        </div>
      </div>
    </div>
  );
}