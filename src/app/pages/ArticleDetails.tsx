import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function ArticleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFeedback = (type: 'positive' | 'negative') => {
    toast.success('Obrigado pelo seu feedback!');
  };

  // Mock content based on ID
  const articleContent = {
    title: 'Como aceitar uma oferta de frete?',
    content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>Para aceitar uma oferta de frete no aplicativo, siga os passos abaixo:</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li>Acesse a aba <strong className="text-slate-900 dark:text-white">Viagens</strong> no menu principal.</li>
                <li>Toque na oferta desejada para ver os detalhes.</li>
                <li>Verifique as informações de rota, carga e valor.</li>
                <li>Clique no botão verde <strong className="text-slate-900 dark:text-white">Aceitar Oferta</strong> na parte inferior da tela.</li>
            </ol>
            <p>Pronto! Agora é só se dirigir ao local de coleta no horário combinado.</p>
        </div>
    )
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center gap-3 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
        <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 text-slate-700 dark:text-slate-300"
        >
            <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Ajuda</h1>
      </div>

      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{articleContent.title}</h2>

        {articleContent.content}

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-900 dark:text-white text-center mb-4">Esse artigo foi útil?</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => handleFeedback('positive')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                    <ThumbsUp className="w-4 h-4" />
                    Sim
                </button>
                <button
                    onClick={() => handleFeedback('negative')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                    <ThumbsDown className="w-4 h-4" />
                    Não
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}