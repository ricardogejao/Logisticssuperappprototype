import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, AlertCircle, User, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function ProfileEdit() {
  const navigate = useNavigate();
  
  // Mock initial data - In a real app, this would come from a context/API
  const [formData, setFormData] = useState({
      name: 'João Silva',
      nickname: 'João',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      toxicologicalDate: '2026-05-15'
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false); // Toggle for demonstration

  const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }));
      }
  };

  const validate = () => {
      const newErrors: { [key: string]: string } = {};
      
      if (!formData.name) newErrors.name = "Nome obrigatório";
      if (!formData.nickname) newErrors.nickname = "Apelido obrigatório";
      if (!formData.phone) newErrors.phone = "Celular obrigatório";
      if (!formData.email) newErrors.email = "E-mail obrigatório";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
          setIsLoading(true);
          // Simulate API call
          setTimeout(() => {
              setIsLoading(false);
              toast.success("Dados atualizados com sucesso!");
              navigate('/profile');
          }, 1000);
      }
  };

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
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Editar Dados</h1>
      </div>

      <div className="flex-1 p-6 pb-24 max-w-lg mx-auto w-full space-y-6">
        {/* Development Toggle (Optional, but helpful for the user to see both states) */}
        <div className="flex justify-end">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsExpired(!isExpired)}
                className="text-[10px] h-7 px-3 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
                Simular estado: {isExpired ? 'Vencido' : 'Normal'}
            </Button>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900 dark:text-white font-medium text-sm">Nome completo</Label>
                    <Input 
                        id="name" 
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all dark:text-white ${errors.name ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : ''}`} 
                    />
                    {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="nickname" className="text-slate-900 dark:text-white font-medium text-sm">Como gosta de ser chamado</Label>
                    <Input 
                        id="nickname" 
                        value={formData.nickname}
                        onChange={e => handleInputChange('nickname', e.target.value)}
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all dark:text-white ${errors.nickname ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : ''}`} 
                    />
                    {errors.nickname && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.nickname}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-slate-900 dark:text-white font-medium text-sm">CPF</Label>
                    <Input 
                        id="cpf" 
                        value={formData.cpf}
                        disabled
                        className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-600 rounded-xl text-base px-4 cursor-not-allowed" 
                    />
                    <p className="text-xs text-slate-400 dark:text-slate-500">O CPF não pode ser alterado.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-900 dark:text-white font-medium text-sm">Celular</Label>
                    <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all dark:text-white ${errors.phone ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : ''}`} 
                    />
                    {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-900 dark:text-white font-medium text-sm">E-mail</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all dark:text-white ${errors.email ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : ''}`} 
                    />
                    {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="toxicologicalDate" className="text-slate-900 dark:text-white font-medium text-sm">Validade do exame toxicológico</Label>
                    <Input 
                        id="toxicologicalDate" 
                        type="date" 
                        value={formData.toxicologicalDate}
                        onChange={e => handleInputChange('toxicologicalDate', e.target.value)}
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-base px-4 transition-all dark:text-white ${isExpired ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/10' : ''}`} 
                    />
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Atualize após cada renovação do exame</p>
                    {isExpired && (
                        <p className="text-xs text-red-500 font-bold flex items-start gap-2 pt-1">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>Seu exame toxicológico está vencido ou próximo do vencimento. Atualize para continuar contratando fretes.</span>
                        </p>
                    )}
                </div>

                <div className="pt-2">
                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-6" />
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/profile/professional')}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                                <User className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-slate-900 dark:text-white">Perfil Profissional</h3>
                                <p className="text-xs">
                                    <span className="text-blue-600 dark:text-blue-400 font-medium">RNTRC</span>
                                    <span className="text-slate-400 dark:text-slate-500 mx-1">e</span>
                                    <span className="text-orange-600 dark:text-orange-400 font-medium">Formas de pagamento</span>
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors" />
                    </button>
                </div>

                <div className="pt-6">
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-12 text-base font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                           <>
                             <Save className="w-5 h-5" />
                             Salvar Alterações
                           </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}