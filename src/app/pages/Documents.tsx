import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight, FileText, User, MapPin, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Documents() {
  const navigate = useNavigate();

  const documents = [
    {
      id: 'cnh',
      title: 'Carteira Nacional de Habilitação (CNH)',
      subtitle: 'Validado',
      icon: User,
      path: '/driver-license',
      status: 'valid'
    },
    {
      id: 'address',
      title: 'Comprovante de Endereço',
      subtitle: 'Validado',
      icon: MapPin,
      path: '/base-address',
      status: 'valid'
    },
    {
      id: 'vehicles',
      title: 'Documentos do Veículo (CRLV)',
      subtitle: 'Gerenciar na frota',
      icon: Truck,
      path: '/vehicles',
      status: 'info'
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
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Meus Documentos</h1>
      </div>

      <div className="p-4">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          {documents.map((doc, index) => (
            <button
              key={doc.id}
              onClick={() => navigate(doc.path)}
              className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${index !== documents.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${doc.status === 'valid' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                  <doc.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-slate-900 dark:text-white">{doc.title}</span>
                  <span className={`text-xs font-medium ${doc.status === 'valid' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {doc.subtitle}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </button>
          ))}
        </div>
        
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-6 px-8">
            Mantenha seus documentos sempre atualizados para evitar bloqueios no envio de ofertas.
        </p>
      </div>
    </div>
  );
}