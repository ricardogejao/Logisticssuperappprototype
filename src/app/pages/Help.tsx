import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Phone, 
  FileText, 
  ChevronRight, 
  Truck, 
  Wallet, 
  User, 
  ShieldCheck,
  Play
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import img13 from "../../imports/image-13.png";
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const FAQ_CATEGORIES = [
  { id: 'trips', label: 'Viagens e Fretes', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'payments', label: 'Pagamentos', icon: Wallet, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'account', label: 'Minha Conta', icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'security', label: 'Segurança', icon: ShieldCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const POPULAR_ARTICLES = [
  { id: 1, title: 'Como aceitar uma oferta de frete?', category: 'Viagens e Fretes' },
  { id: 2, title: 'Quando recebo meu pagamento?', category: 'Pagamentos' },
  { id: 3, title: 'Como cadastrar um novo veículo?', category: 'Minha Conta' },
  { id: 4, title: 'O que fazer em caso de sinistro?', category: 'Segurança' },
];

export function Help() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = POPULAR_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (category: string) => {
    setSearchQuery(''); // Clear search if any
    toast.info(`Filtrando por: ${category}`);
    // In a real app, this would filter the list or navigate to a category page
    // For this prototype, we'll just show the feedback
  };

  const handleWhatsApp = () => {
    // Open WhatsApp Web/App with a predefined message
    window.open('https://wa.me/5511999999999?text=Olá,%20preciso%20de%20ajuda%20com%20o%20SuperApp', '_blank');
  };

  const handlePhone = () => {
    window.location.href = 'tel:08001234567';
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-slate-900 px-4 pt-6 pb-12 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full w-10 h-10 hover:bg-slate-800 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-bold">Central de Ajuda</h1>
        </div>
        
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">Como podemos ajudar?</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                    placeholder="Buscar dúvidas frequentes..." 
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 h-12 rounded-xl focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
      </div>

      <div className="flex-1 px-4 -mt-6 pb-8 space-y-6">
        
        {/* Learn to use the app section */}
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Aprenda a usar o app</h3>
            <div className="relative aspect-video bg-slate-200 rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col items-center justify-center group cursor-default">
                <img 
                    src={img13}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    alt="Video thumbnail"
                />
                
                {/* Tag "Em breve" */}
                <div className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider z-10">
                    Em breve
                </div>
                
                {/* Placeholder Video Content */}
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-slate-400 fill-slate-400 ml-1" />
                </div>
                
                {/* Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                    <h4 className="text-white font-bold text-sm">Como dar seus primeiros passos no Carga24h</h4>
                    <span className="text-white/80 text-xs mt-0.5 inline-block">2:34</span>
                </div>
            </div>
        </section>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-3">
            {FAQ_CATEGORIES.map((cat) => (
                <button 
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.label)}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-colors active:scale-95 duration-200"
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cat.bg} ${cat.color}`}>
                        <cat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{cat.label}</span>
                </button>
            ))}
        </div>

        {/* Popular Articles */}
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Dúvidas Frequentes</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <button 
                            key={article.id}
                            onClick={() => navigate(`/help/article/${article.id}`)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-slate-400" />
                                <span className="text-sm font-medium text-slate-700">{article.title}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </button>
                    ))
                ) : (
                    <div className="p-4 text-center text-slate-500 text-sm">
                        Nenhum artigo encontrado para "{searchQuery}"
                    </div>
                )}
                
                <button 
                    onClick={() => toast.info('Carregando todos os artigos...')}
                    className="w-full p-4 text-center text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                    Ver todos os artigos
                </button>
            </div>
        </section>

        {/* Contact Support */}
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Ainda precisa de ajuda?</h3>
            <div className="space-y-3">
                <button 
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 text-white p-4 rounded-xl shadow-sm flex items-center justify-center gap-3 font-bold hover:bg-green-700 transition-colors active:scale-[0.98]"
                >
                    <MessageCircle className="w-5 h-5" />
                    Falar no WhatsApp
                </button>
                
                <button 
                    onClick={handlePhone}
                    className="w-full bg-white border border-slate-200 text-slate-700 p-4 rounded-xl shadow-sm flex items-center justify-center gap-3 font-bold hover:bg-slate-50 transition-colors active:scale-[0.98]"
                >
                    <Phone className="w-5 h-5 text-slate-500" />
                    Ligar para o Suporte 0800
                </button>
            </div>
        </section>

      </div>
    </div>
  );
}