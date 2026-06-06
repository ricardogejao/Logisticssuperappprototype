import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function TermsOfUse() {
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
        <h1 className="text-lg font-bold text-slate-900 truncate">Termos e Condições de Uso</h1>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Termos e Condições de Uso – Condutor</h2>
        
        <div className="prose prose-slate text-slate-600 text-sm space-y-4">
          <p>
            Bem-vindo ao SuperApp Carga24h. Estes Termos e Condições de Uso regem o acesso e uso da plataforma pelos condutores parceiros.
          </p>
          
          <h3 className="text-slate-900 font-bold mt-6">1. Aceitação dos Termos</h3>
          <p>
            Ao utilizar o aplicativo, você concorda em cumprir estes Termos e Condições. Caso não concorde com qualquer parte destes termos, você não deve utilizar o serviço.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">2. Cadastro e Elegibilidade</h3>
          <p>
            Para utilizar os serviços, você deve realizar um cadastro fornecendo informações verdadeiras, exatas, atuais e completas. Você é responsável por manter a confidencialidade de sua senha e conta.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">3. Uso da Plataforma</h3>
          <p>
            O SuperApp Carga24h conecta condutores autônomos a demandas de transporte de carga. O condutor reconhece que não há vínculo empregatício com a Carga24h.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">4. Responsabilidades do Condutor</h3>
          <p>
            O condutor é inteiramente responsável pela condução do veículo, pela segurança da carga transportada e pelo cumprimento de todas as leis de trânsito aplicáveis.
          </p>
          
          <h3 className="text-slate-900 font-bold mt-6">5. Pagamentos</h3>
          <p>
            Os pagamentos pelos serviços prestados serão realizados conforme as regras estabelecidas na plataforma, sujeitos à confirmação da entrega e ausência de avarias.
          </p>

          <h3 className="text-slate-900 font-bold mt-6">6. Alterações nos Termos</h3>
          <p>
            A Carga24h reserva-se o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma.
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