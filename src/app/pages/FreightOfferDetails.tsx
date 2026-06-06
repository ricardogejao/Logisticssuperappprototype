import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Phone, Package, Navigation, MessageCircle, Truck, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../components/ui/utils';

interface TripStatus {
  label: string;
  active: boolean;
  color?: 'orange' | 'green' | 'blue';
}

interface FreightOfferData {
  id: string;
  number: string;
  title: string;
  origin: {
    city: string;
    state: string;
    address?: string;
  };
  destination: {
    city: string;
    state: string;
    address?: string;
  };
  currentStatus: string;
  statuses: TripStatus[];
  cargo: {
    vehicleType: string;
    weight: string;
    pickupDate: string;
    pickupTime: string;
    deliveryDate: string;
    deliveryTime: string;
  };
  observation?: string;
  contractor: {
    name: string;
    initials: string;
    reference: string;
  };
  vehicle: {
    name: string;
    plate: string;
    type: string;
  };
  hasRouteTracking?: boolean;
  isMop?: boolean;
}

const getMockOfferData = (offerId: string): FreightOfferData => {
  const offerNumbers: Record<string, string> = {
    '1': '4102',
    '2': '4105'
  };

  return {
    id: offerId,
    number: offerNumbers[offerId] || '4102',
    title: 'Viagem',
    origin: {
      city: 'Campinas',
      state: 'SP',
      address: 'Av. Francisco Glicério, 1000 - Centro'
    },
    destination: {
      city: 'Rio de Janeiro',
      state: 'RJ',
      address: 'Av. Brasil, 5000 - Bonsucesso'
    },
    currentStatus: 'Contratada',
    statuses: [
      { label: 'Contratada', active: true, color: 'orange' },
      { label: 'A caminho da Coleta', active: false },
      { label: 'Apresentação para Coleta', active: false },
      { label: 'Coletada', active: false },
      { label: 'Apresentação para Entrega', active: false },
      { label: 'Finalizado Parcial', active: false },
      { label: 'Retornando à Origem', active: false },
      { label: 'Liquidada', active: false }
    ],
    cargo: {
      vehicleType: 'Refrigerada',
      weight: '12 ton',
      pickupDate: 'Amanhã',
      pickupTime: '08:00',
      deliveryDate: '26/01',
      deliveryTime: '14:00'
    },
    observation: 'Carga frágil, manter temperatura controlada.',
    contractor: {
      name: 'Logística Express Ltda',
      initials: 'LE',
      reference: '#CARGA-9821'
    },
    vehicle: {
      name: 'Volvo FH 540',
      plate: 'ABC-1234',
      type: 'Carreta Sider'
    },
    hasRouteTracking: true,
    isMop: offerId === '2' || offerId === '4105'
  };
};

export function FreightOfferDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasActiveOccurrence, setHasActiveOccurrence] = useState(false);

  useEffect(() => {
    const savedOccurrence = localStorage.getItem('PROTOTYPE_OCCURRENCE_ACTIVE');
    if (savedOccurrence !== null) {
      setHasActiveOccurrence(savedOccurrence === 'true');
    }
  }, []);
  
  const offerData = getMockOfferData(id || '1');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e293b] px-6 py-6 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2 w-10 h-10 text-slate-800 dark:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">OF #{offerData.number}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              {offerData.origin.city}, {offerData.origin.state} <span className="mx-1 text-slate-300 dark:text-slate-700">•</span> {offerData.destination.city}, {offerData.destination.state}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-full w-10 h-10 transition-colors shadow-sm"
        >
          <Phone className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto pb-48 px-6 pt-6 space-y-6">
        {/* Status da Viagem */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 space-y-6">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status da viagem</h3>
          
          <div className="relative pl-2">
            {/* Linha vertical */}
            <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-slate-100 dark:bg-slate-800" />
            
            {/* Status items */}
            <div className="space-y-10">
              {offerData.statuses.map((status, index) => (
                <div key={index} className="flex items-center gap-4 relative">
                  {/* Status indicator */}
                  <div className={`
                    w-[14px] h-[14px] rounded-full shrink-0 relative z-10
                    ${status.active && status.color === 'orange' 
                      ? 'bg-orange-500 border-2 border-orange-500 shadow-[0px_0px_0px_4px_rgba(249,115,22,0.15)]' 
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800'
                    }
                  `} />
                  
                  {/* Status label */}
                  <span className={`
                    text-sm font-bold tracking-tight
                    ${status.active ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}
                  `}>
                    {status.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status da Ocorrência - New Section */}
        {hasActiveOccurrence && (
          <section className="bg-white dark:bg-[#1e293b] rounded-2xl border-2 border-orange-100 dark:border-orange-900/30 shadow-sm p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status da Ocorrência</h3>
                  <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Ocorrência em andamento</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2.5 py-1 rounded-md uppercase tracking-wide">Em análise</span>
            </div>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />
            <Button 
              variant="ghost" 
              className="w-full h-10 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-bold rounded-xl justify-between px-2" 
              onClick={() => navigate('/trip/occurrence')}
            >
              <span className="text-sm">Ver detalhes</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </section>
        )}

        {/* Origem e Destino Detalhado */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-8">
          {/* Origem */}
          <div className="flex gap-4">
            <div className="relative pt-1.5">
              <div className="w-4 h-4 rounded-full border-2 border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 shrink-0" />
              <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[2px] h-20 bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Origem</p>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {offerData.origin.city}, {offerData.origin.state}
              </p>
              {offerData.origin.address && (
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{offerData.origin.address}</p>
              )}
            </div>
          </div>

          {/* Destino */}
          <div className="flex gap-4">
            <div className="w-4 h-4 rounded-full bg-orange-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Destino</p>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {offerData.destination.city}, {offerData.destination.state}
              </p>
              {offerData.destination.address && (
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{offerData.destination.address}</p>
              )}
            </div>
          </div>
        </section>

        {/* Detalhes da Carga */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-6 px-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Detalhes da carga</h3>
            </div>

            <div className="space-y-4 px-1">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tipo de veículo</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{offerData.cargo.vehicleType}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Peso total</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{offerData.cargo.weight}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Data de coleta</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{offerData.cargo.pickupDate}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Horário de coleta</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{offerData.cargo.pickupTime}</span>
              </div>
              
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
              
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Data de entrega</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{offerData.cargo.deliveryDate}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Hora de entrega</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{offerData.cargo.deliveryTime}</span>
              </div>
            </div>
        </section>

        {/* MOPP Alert Section */}
        {offerData.isMop && (
          <section className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl p-4 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
              <AlertCircle className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Atenção</h3>
            </div>
            <div className="space-y-1">
              <p className="text-[14px] font-bold text-slate-900 dark:text-white leading-snug">
                Esta carga exige certificação MOPP — Manuseio e Operação de Produtos Perigosos
              </p>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Certifique-se de que seu cadastro está atualizado com o curso MOPP.
              </p>
            </div>
          </section>
        )}

        {/* Observation */}
        {offerData.observation && (
          <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl p-4">
            <p className="text-xs text-amber-900 dark:text-amber-400 leading-relaxed">
              <span className="font-bold uppercase tracking-tighter mr-1">Obs:</span> {offerData.observation}
            </p>
          </section>
        )}

        {/* Contratante */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Contratante</h3>
          <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-900">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-lg shadow-blue-500/20">
              {offerData.contractor.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-slate-900 dark:text-white truncate leading-tight">{offerData.contractor.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">Ref: {offerData.contractor.reference}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 dark:border-slate-700 h-10 w-10 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-white dark:hover:bg-slate-800 transition-all">
               <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Veículo Ativo */}
        <section className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Veículo ativo</h3>
          <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-900">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
              <Truck className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">{offerData.vehicle.name}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight mt-1">Placa: {offerData.vehicle.plate} <span className="mx-1 text-slate-200 dark:text-slate-800">•</span> {offerData.vehicle.type}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer CTAs */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Button 
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          onClick={() => navigate('/trip/mode')}
        >
          <Navigation className="size-5 mr-2" />
          Abrir modo viagem
        </Button>
        <Button 
          variant="outline"
          className="w-full h-12 text-[#314158] dark:text-slate-300 border-[#e2e8f0] dark:border-slate-700 rounded-[14px] hover:bg-slate-50 dark:hover:bg-slate-800 shadow-none font-bold transition-all active:scale-[0.98]"
          onClick={() => navigate('/trip/status')}
        >
          Atualizar status
        </Button>
      </div>
    </div>
  );
}
