import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  rgb: string;
  description?: string;
}

interface ColorCategory {
  title: string;
  tokens: ColorToken[];
}

const ColorCard = ({ token }: { token: ColorToken }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${text} copiado!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
      <div 
        className="h-24 w-full cursor-pointer relative group" 
        style={{ backgroundColor: token.hex }}
        onClick={() => copyToClipboard(token.hex)}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
          {copied ? <Check className="text-white w-6 h-6" /> : <Copy className="text-white w-6 h-6" />}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{token.name}</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white truncate" title={token.variable}>{token.variable}</span>
        <div className="mt-2 flex flex-col gap-0.5">
          <button 
            onClick={() => copyToClipboard(token.hex)}
            className="text-xs text-slate-500 dark:text-slate-400 font-mono hover:text-orange-500 dark:hover:text-orange-400 text-left transition-colors"
          >
            HEX: {token.hex}
          </button>
          <button 
            onClick={() => copyToClipboard(token.rgb)}
            className="text-xs text-slate-500 dark:text-slate-400 font-mono hover:text-orange-500 dark:hover:text-orange-400 text-left transition-colors"
          >
            RGB: {token.rgb}
          </button>
        </div>
      </div>
    </div>
  );
};

export function DesignTokens() {
  const navigate = useNavigate();

  const categories: ColorCategory[] = [
    {
      title: "Primárias",
      tokens: [
        { name: "primary/orange-500", variable: "Laranja Principal (CTA)", hex: "#ff6900", rgb: "255, 105, 0" },
        { name: "primary/orange-600", variable: "Laranja Hover", hex: "#e65e00", rgb: "230, 94, 0" },
        { name: "primary/orange-200", variable: "Laranja Desabilitado", hex: "#ffb480", rgb: "255, 180, 128" },
      ]
    },
    {
      title: "Neutras",
      tokens: [
        { name: "neutral/white", variable: "Branco", hex: "#ffffff", rgb: "255, 255, 255" },
        { name: "neutral/gray-50", variable: "Cinza Claro (BG)", hex: "#f8fafc", rgb: "248, 250, 252" },
        { name: "neutral/gray-200", variable: "Cinza Médio (Bordas)", hex: "#e2e8f0", rgb: "226, 232, 240" },
        { name: "neutral/gray-600", variable: "Cinza Escuro (Texto)", hex: "#475569", rgb: "71, 85, 105" },
        { name: "neutral/gray-900", variable: "Preto / Slate-900", hex: "#0f172a", rgb: "15, 23, 42" },
      ]
    },
    {
      title: "Feedback",
      tokens: [
        { name: "feedback/success", variable: "Verde Sucesso (Upper)", hex: "#00bc7d", rgb: "0, 188, 125" },
        { name: "feedback/error", variable: "Vermelho Erro", hex: "#ef4444", rgb: "239, 68, 68" },
        { name: "feedback/warning", variable: "Amarelo Aviso", hex: "#f59e0b", rgb: "245, 158, 11" },
        { name: "feedback/info", variable: "Azul Informação", hex: "#2563eb", rgb: "37, 99, 235" },
      ]
    },
    {
      title: "Dark Mode Equivalents",
      tokens: [
        { name: "dark/bg-primary", variable: "Background Dark", hex: "#0f172a", rgb: "15, 23, 42" },
        { name: "dark/bg-secondary", variable: "Card Dark", hex: "#1e293b", rgb: "30, 41, 59" },
        { name: "dark/border", variable: "Borda Dark", hex: "#1e293b", rgb: "30, 41, 59" },
        { name: "dark/text-muted", variable: "Texto Muted Dark", hex: "#94a3b8", rgb: "148, 163, 184" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Design Tokens / Paleta de Cores</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {categories.map((category, catIdx) => (
          <section key={catIdx} className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-orange-500 pl-3">
              {category.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.tokens.map((token, tokenIdx) => (
                <motion.div
                  key={tokenIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (catIdx * 0.1) + (tokenIdx * 0.05) }}
                >
                  <ColorCard token={token} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
