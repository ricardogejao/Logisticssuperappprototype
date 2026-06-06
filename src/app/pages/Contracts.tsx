import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight, FileText, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Contracts() {
  const navigate = useNavigate();

  const documents = [
    {
      id: 'terms',
      title: 'Termos e Condições de Uso',
      icon: FileText,
      path: '/contracts/terms'
    },
    {
      id: 'privacy',
      title: 'Política de Privacidade',
      icon: Shield,
      path: '/contracts/privacy'
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
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Meus Contratos</h1>
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
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <doc.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{doc.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}