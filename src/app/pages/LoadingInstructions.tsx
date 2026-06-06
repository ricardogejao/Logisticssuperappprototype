import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function LoadingInstructions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-[#ef660a] px-4 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-md">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20 rounded-full -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-white leading-none">Instruções de Carregamento</h1>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 text-slate-800 text-base leading-relaxed space-y-4">
        <p>
          Estar atento ao dia e horário de coleta, bem como à Janela de Carregamento de cada Oferta de Frete.
        </p>
        <p>
          Ao chegar no local de coleta, dirigir-se à portaria da empresa, munido do número da Ordem de Coleta e Entrega e de sua documentação (CNH, CRLV e ANTT).
        </p>
        <p>
          Apresentar-se tanto para o carregamento, quanto para descarga, devidamente trajado, com camiseta de manga ou camisa, calças e sapatos fechados. Não se apresentar com chinelos, bermudas, sem camisa ou com camiseta sem manga. Essa regra vale também para o 2º Motorista e o(s) Ajudante(s) de Carga, caso seja(m) necessário(s).
        </p>
        <p>
          No caso de 2º Motorista, esse deve se apresentar munido do CNH e, no caso de Ajudante de Carga, esse deve estar munido de um documento de identificação (CNH ou RG).
        </p>
        <p>
          O assoalho e as lonas não podem apresentar furos e citas e cordas devem ser suficientes e em condições para uma amarração adequada.
        </p>
        <p>
          No caso de carrocerias abertas ou Sider, são obrigatórios alguns Equipamentos de Proteção Individual (colete refletivo, luvas e capacete).
        </p>
        <p>
          Estar atento às normas de segurança e cuidados durante o trajeto.
        </p>
        <p className="font-bold text-lg mt-6">
          Tenha uma ótima viagem!
        </p>
      </div>
    </div>
  );
}