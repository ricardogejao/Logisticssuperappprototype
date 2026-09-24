import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, ChevronRight, Info } from 'lucide-react';
import { Button } from '../components/ui/button';

// Cardápio de produtos de parceiros — tela intermediária pedida pelo Ricardo
// (15/set): fica entre o card/banner de "parceiro perto de você" e o
// ambiente do parceiro em si. Apresenta os produtos daquele parceiro com
// condições comerciais (preço, forma de pagamento, promoções).
//
// IMPORTANTE: o conteúdo comercial abaixo é ilustrativo. Segundo o Ricardo,
// essas telas precisam ser elaboradas com participação do marketing de cada
// parceiro — os preços e condições reais ainda não foram definidos.

type PartnerType = 'galpao' | 'implementos' | 'semparar';

interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  tags: string[];
}

interface PartnerCatalogInfo {
  title: string;
  subtitle: string;
  products: CatalogProduct[];
}

const PARTNER_CATALOGS: Record<PartnerType, PartnerCatalogInfo> = {
  galpao: {
    title: 'Locação de galpão',
    subtitle: 'Parceiro mais próximo do ponto de coleta ou entrega da sua oferta',
    products: [
      {
        id: 'galpao-500',
        name: 'Galpão Classe A · 500 m²',
        description: 'Armazenagem geral, piso industrial, docas niveladas',
        price: 'R$ 4.200',
        priceUnit: '/ mês',
        tags: ['Locação spot', 'Locação mensal'],
      },
      {
        id: 'galpao-1200',
        name: 'Galpão Classe A · 1.200 m²',
        description: 'Cross-docking, pé-direito alto, monitoramento 24h',
        price: 'R$ 9.800',
        priceUnit: '/ mês',
        tags: ['Locação mensal'],
      },
    ],
  },
  implementos: {
    title: 'Locação de carreta',
    subtitle: 'Implemento rodoviário adequado para sua operação',
    products: [
      {
        id: 'carreta-sider',
        name: 'Carreta Sider 15m',
        description: 'Ideal para carga geral paletizada',
        price: 'R$ 350',
        priceUnit: '/ dia',
        tags: ['Locação spot', 'Locação mensal'],
      },
      {
        id: 'carreta-graneleira',
        name: 'Carreta Graneleira',
        description: 'Transporte de granéis sólidos',
        price: 'R$ 390',
        priceUnit: '/ dia',
        tags: ['Locação spot'],
      },
    ],
  },
  semparar: {
    title: 'Sem Parar',
    subtitle: 'Vale-pedágio para sua frota',
    products: [
      {
        id: 'semparar-tag',
        name: 'Tag Sem Parar',
        description: 'Passagem automática em praças de pedágio',
        price: 'R$ 15',
        priceUnit: '/ mês',
        tags: ['Transportadoras', 'Embarcadores'],
      },
    ],
  },
};

export function PartnerCatalog() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const catalog = PARTNER_CATALOGS[(type as PartnerType) ?? 'implementos'] ?? PARTNER_CATALOGS.implementos;

  const handleSelect = (product: CatalogProduct) => {
    navigate('/partner/payment', {
      state: {
        productName: product.name,
        productPrice: `${product.price} ${product.priceUnit}`,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              Parceiro perto de você
            </span>
          </div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{catalog.title}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">{catalog.subtitle}</p>

        <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-3">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-snug">
            Conteúdo ilustrativo — preços e condições reais ainda dependem de validação do marketing do parceiro.
          </p>
        </div>

        <div className="space-y-3">
          {catalog.products.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className="w-full text-left bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 flex items-center gap-3 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{product.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.description}</p>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="block text-base font-bold text-slate-900 dark:text-white">{product.price}</span>
                <span className="block text-[10px] text-slate-400 dark:text-slate-500">{product.priceUnit}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
