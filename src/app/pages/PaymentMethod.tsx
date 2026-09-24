import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, CreditCard, Landmark, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

// Tela de meio de pagamento (integração Getnet) — pedido do Ricardo em
// 22-23/set: depois que o motorista escolhe o produto na tela de cardápio,
// ele cai aqui pra escolher forma de pagamento (Crédito, Débito ou PIX),
// condição de pagamento (à vista ou parcelado) e informar os dados do cartão.

type PaymentMethodType = 'credit' | 'debit' | 'pix';

const INSTALLMENT_OPTIONS = [1, 2, 3, 4, 5, 6, 10, 12];

function formatCurrencyFromString(value: string): number {
  const numeric = value.replace(/[^\d,]/g, '').replace(',', '.');
  const parsed = parseFloat(numeric);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function PaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();

  const productName: string = location.state?.productName ?? 'Serviço selecionado';
  const productPrice: string = location.state?.productPrice ?? 'R$ 350 / dia';
  const baseAmount = formatCurrencyFromString(productPrice);

  const [method, setMethod] = useState<PaymentMethodType>('credit');
  const [installments, setInstallments] = useState('1');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const isCardMethod = method === 'credit' || method === 'debit';
  const canConfirm = method === 'pix' || (cardNumber && cardName && cardExpiry && cardCvv);

  const installmentValue = (n: number) => {
    if (baseAmount <= 0) return '';
    const value = baseAmount / n;
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleConfirm = () => {
    if (!canConfirm) {
      toast.error('Preencha os dados de pagamento');
      return;
    }
    setConfirmed(true);
    toast.success('Pagamento confirmado com sucesso!');
  };

  if (confirmed) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] items-center justify-center p-6 text-center transition-colors duration-300">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pagamento confirmado</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-8">
          {productName} — {productPrice}
        </p>
        <Button
          onClick={() => navigate('/home')}
          className="w-full max-w-xs h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl"
        >
          Voltar para o início
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] pb-28 transition-colors duration-300">
      <div className="bg-white dark:bg-[#1e293b] px-4 py-3 flex items-center gap-4 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full w-10 h-10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-base font-bold text-slate-900 dark:text-white">Pagamento</h1>
      </div>

      <div className="p-4 space-y-5 flex-1">
        {/* Resumo do pedido */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
              Produto selecionado
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block">{productName}</span>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white shrink-0 ml-3">{productPrice}</span>
        </div>

        {/* Forma de pagamento */}
        <div>
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Forma de pagamento
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setMethod('credit')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors ${
                method === 'credit'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-600'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b]'
              }`}
            >
              <CreditCard
                className={`w-5 h-5 ${method === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
              />
              <span
                className={`text-[11px] font-bold ${method === 'credit' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Crédito
              </span>
            </button>

            <button
              onClick={() => setMethod('debit')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors ${
                method === 'debit'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-600'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b]'
              }`}
            >
              <Landmark
                className={`w-5 h-5 ${method === 'debit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
              />
              <span
                className={`text-[11px] font-bold ${method === 'debit' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Débito
              </span>
            </button>

            <button
              onClick={() => setMethod('pix')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors ${
                method === 'pix'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-600'
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1e293b]'
              }`}
            >
              <QrCode
                className={`w-5 h-5 ${method === 'pix' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
              />
              <span
                className={`text-[11px] font-bold ${method === 'pix' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                PIX
              </span>
            </button>
          </div>
        </div>

        {/* Cartão: campos + parcelamento (só crédito) */}
        {isCardMethod && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 block">
                Número do cartão
              </label>
              <Input
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 block">
                Nome impresso no cartão
              </label>
              <Input
                placeholder="Como está no cartão"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 block">
                  Validade
                </label>
                <Input
                  placeholder="MM/AA"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 block">
                  CVV
                </label>
                <Input
                  placeholder="000"
                  inputMode="numeric"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white"
                />
              </div>
            </div>

            {method === 'credit' && (
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 block">
                  Condição de pagamento
                </label>
                <Select value={installments} onValueChange={setInstallments}>
                  <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                    {INSTALLMENT_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)} className="dark:text-white dark:focus:bg-slate-800">
                        {n === 1 ? `À vista — ${installmentValue(1)}` : `${n}x de ${installmentValue(n)} sem juros`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* PIX */}
        {method === 'pix' && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center text-center gap-3">
            <div className="w-40 h-40 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
              <QrCode className="w-20 h-20 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[220px]">
              Escaneie o QR Code ou copie o código para pagar. O código expira em 30 minutos.
            </p>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:text-white"
              onClick={() => toast.success('Código PIX copiado!')}
            >
              Copiar código PIX
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 justify-center pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Pagamento processado com segurança pela Getnet</span>
        </div>
      </div>

      {/* CTA fixo */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto p-4 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800">
        <Button
          onClick={handleConfirm}
          className="w-full h-14 text-base bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20"
        >
          Confirmar pagamento
        </Button>
      </div>
    </div>
  );
}
