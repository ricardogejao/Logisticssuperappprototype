import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  QrCode, 
  Barcode, 
  Receipt, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import goodyearProductsImg from 'figma:asset/2e52c76fba273b14321fa4c14aafcbc421511df9.png';
import goodyearDealerImg from 'figma:asset/9cadb0362cb5303f55d8c3a20464041c00f2df14.png';
import trackerDeviceImg from '../../imports/banner_card.png';
import trackerSecurityImg from '../../imports/image-11.png';
import trackerActivationImg from '../../imports/image-12.png';
import upperCarouselImg1 from '../../imports/banner-carga-24hPrancheta-1-copiar-1.png';
import upperCarouselImg2 from '../../imports/banner-carga-24hPrancheta-1.png';
import upperCarouselImg3 from '../../imports/banner-carga-24hPrancheta-2.png';
import goodyearLogo from '../../imports/Goodyear_Tire_and_Rubber_Company-Logo.wine-1.svg';
import trackerThingsLogo from '../../imports/_versao-branca-sem-fundo_-TrackerThings-1.png';
import { useBannerMode } from '../hooks/useBannerMode';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function DigitalAccount() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { bannerMode } = useBannerMode();

  const upperImg = React.useMemo(() => {
    const imgs = [upperCarouselImg1, upperCarouselImg2, upperCarouselImg3];
    return imgs[Math.floor(Math.random() * imgs.length)];
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / (width * 0.8)); 
    if (newIndex !== activeCard) {
      setActiveCard(newIndex);
    }
  };

  const availableBalance = 1250.00;
  const contractedFreight = 4500.00;
  const receivables = 3250.00;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const hiddenValue = "••••";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <header className="bg-slate-900 dark:bg-[#1e293b] text-white px-6 pt-8 pb-12 rounded-b-[32px] shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d293d] to-[#0f172b] dark:from-[#1e293b] dark:to-[#0f172a] pointer-events-none" />
        
        {/* Navigation */}
        <div className="relative z-10 flex items-center justify-between mb-8">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/home')}
                className="text-white hover:bg-white/10 rounded-full -ml-2"
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold">Conta Digital</h1>
            <div className="w-10" />
        </div>

        {/* Main Balance */}
        <div className="relative z-10 text-center mb-8">
            <p className="text-slate-400 text-sm font-medium mb-2 flex items-center justify-center gap-2">
                Saldo disponível
                <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-slate-500 hover:text-white transition-colors focus:outline-none"
                >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
                {showBalance ? formatCurrency(availableBalance) : hiddenValue}
            </h2>
        </div>

        {/* Quick Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Contratado</p>
                <p className="text-sm font-bold text-white">
                    {showBalance ? formatCurrency(contractedFreight) : hiddenValue}
                </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">A Receber</p>
                <p className="text-sm font-bold text-emerald-400">
                    {showBalance ? formatCurrency(receivables) : hiddenValue}
                </p>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 -mt-6 relative z-20 pb-8">
        
        {/* Services */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Serviços</h3>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => navigate('/digital-account/pix')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform"><QrCode className="w-6 h-6" /></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Pix</span>
                </button>
                <button onClick={() => navigate('/digital-account/payments')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"><Barcode className="w-6 h-6" /></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Pagamentos</span>
                </button>
                <button onClick={() => navigate('/digital-account/receipts')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform"><Receipt className="w-6 h-6" /></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Comprovantes</span>
                </button>
                <div className="relative">
                    <button onClick={() => toast.info('Em breve: Crédito e Antecipação de Recebíveis')} className="w-full flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm text-slate-400 dark:text-slate-500"><TrendingUp className="w-6 h-6" /></div>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Crédito</span>
                    </button>
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-md uppercase">Em breve</span>
                </div>
            </div>
        </div>

        {/* Transactions */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Últimas movimentações</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/digital-account/receipts')} className="text-xs text-blue-600 dark:text-blue-400 h-auto p-0 hover:bg-transparent">Ver tudo</Button>
            </div>
            <div className="space-y-4">
                {[
                    { title: "Adiantamento de Frete", date: "Hoje, 10:30", amount: 1250.00, type: "in", icon: ArrowDownLeft, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { title: "Posto Shell - Abastecimento", date: "Ontem, 18:45", amount: -450.00, type: "out", icon: ArrowUpRight, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-800" },
                    { title: "Transferência Pix", date: "24 jan", amount: -120.00, type: "out", icon: ArrowUpRight, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-800" },
                ].map((item, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg -mx-2 transition-colors" onClick={() => navigate(`/digital-account/transaction/${idx}`)}>
                        <div className="flex items-center gap-3 text-left">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}><item.icon className="w-5 h-5" /></div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.date}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-bold ${item.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{item.type === 'in' ? '+' : ''} {formatCurrency(item.amount)}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
