import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/contracts')}
          className="rounded-full w-10 h-10 hover:bg-slate-50 text-slate-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 truncate">Política de Privacidade</h1>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Política de Privacidade – EApproachS-Carga24h</h2>
        
        <div className="prose prose-slate text-slate-600 text-sm space-y-4">
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações ao utilizar o SuperApp Carga24h.
          </p>
          
          <h3 className="text-slate-900 font-bold mt-6">1. Coleta de Informações</h3>
          <p>
            Coletamos informações pessoais que você nos fornece voluntariamente ao se cadastrar, como nome, endereço, e-mail e número de telefone, além de dados do veículo e documentos profissionais.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">2. Uso das Informações</h3>
          <p>
            Utilizamos suas informações para operar, manter e melhorar nossos serviços, processar transações, enviar notificações relacionadas ao serviço e para fins de segurança e conformidade legal.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">3. Compartilhamento de Dados</h3>
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar dados com parceiros de serviço estritamente para a execução dos serviços contratados (ex: seguradoras, processadores de pagamento).
          </p>

          <h3 className="text-slate-900 font-bold mt-6">4. Geolocalização</h3>
          <p>
            Para o funcionamento adequado do rastreamento de cargas, coletamos dados de localização do seu dispositivo enquanto o aplicativo está em uso e, em alguns casos, em segundo plano durante uma viagem ativa.
          </p>
          
          <h3 className="text-slate-900 font-bold mt-6">5. Segurança dos Dados</h3>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">6. Seus Direitos</h3>
          <p>
            Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais, conforme previsto na legislação aplicável (LGPD).
          </p>

          <p className="mt-8 italic text-slate-400">
            Última atualização: 26 de Janeiro de 2026.
          </p>
          
          {/* Placeholder for potentially very long content */}
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  );
}