import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, User, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function PixTransfer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [key, setKey] = useState('');
  const [receiverName, setReceiverName] = useState('');

  useEffect(() => {
    // Pre-fill if coming from contacts or copy-paste
    if (location.state?.mode === 'contact') {
        setReceiverName(location.state.contact.name);
        setKey('123.456.789-00'); // Mock key
    } else if (location.state?.mode === 'copy-paste') {
        setKey(location.state.code);
        setReceiverName('Estabelecimento Comercial Ltda');
        setAmount('150.00');
    }
  }, [location.state]);

  const handleContinue = () => {
    if (!amount || !key) {
        toast.error('Preencha todos os campos');
        return;
    }
    toast.success('Transferência realizada com sucesso!');
    navigate('/digital-account');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="bg-slate-900 text-white px-4 py-4 flex items-center gap-3 sticky top-0 z-20">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-white/10 text-white -ml-2"
        >
            <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold">Transferir Pix</h1>
      </div>

      <div className="p-4 space-y-6 flex-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Valor a transferir</label>
                <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-900 font-bold text-lg">R$</span>
                    <Input 
                        type="number" 
                        placeholder="0,00" 
                        className="pl-10 text-2xl font-bold border-0 border-b-2 border-slate-100 rounded-none focus-visible:ring-0 focus-visible:border-emerald-500 h-14 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Chave Pix ou CPF</label>
                    <Input 
                        placeholder="E-mail, CPF, Telefone ou Chave Aleatória" 
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="bg-slate-50 border-slate-200"
                    />
                </div>

                {receiverName && (
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl text-emerald-800">
                        <User className="w-5 h-5" />
                        <div>
                            <p className="text-xs opacity-70">Destinatário</p>
                            <p className="font-bold text-sm">{receiverName}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-base font-bold rounded-xl shadow-lg shadow-emerald-600/20"
            onClick={handleContinue}
        >
            Confirmar Transferência
            <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}