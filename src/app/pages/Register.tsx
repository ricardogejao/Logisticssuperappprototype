import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { OnboardingProgress } from '../components/ui/onboarding-progress';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      name: '',
      nickname: '',
      cpf: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear error when typing
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
      
      // Basic CPF validation (Length)
      const cpfClean = formData.cpf.replace(/\D/g, '');
      if (cpfClean.length !== 11) newErrors.cpf = "CPF inválido (11 dígitos)";

      // Password validation
      if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
      if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "As senhas não conferem";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
          navigate('/verification');
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm shadow-slate-50/50 dark:shadow-slate-900/50 transition-colors">
        <div className="px-6 pt-6 pb-2 flex items-center">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-white" />
            </Button>
        </div>
        <OnboardingProgress step={1} totalSteps={7} title="Conta" className="pt-0 pb-4" />
      </div>

      <div className="flex-1 px-8 pt-6 pb-10 max-w-lg mx-auto w-full">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Criar conta</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-base font-light leading-relaxed">
                Crie seu acesso para começar. O cadastro profissional será na próxima etapa.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">Nome completo</Label>
                    <Input 
                        id="name" 
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.name ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                        placeholder="Seu nome completo" 
                    />
                    {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="nickname" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">Como você gosta de ser chamado?</Label>
                    <Input 
                        id="nickname" 
                        value={formData.nickname}
                        onChange={e => handleInputChange('nickname', e.target.value)}
                        className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.nickname ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                        placeholder="Seu apelido" 
                    />
                     {errors.nickname && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.nickname}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">CPF</Label>
                    <Input 
                        id="cpf" 
                        value={formData.cpf}
                        onChange={e => handleInputChange('cpf', e.target.value.replace(/\D/g, '').slice(0, 11))} 
                        className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.cpf ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                        placeholder="000.000.000-00" 
                        type="number"
                    />
                     {errors.cpf && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.cpf}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">Celular</Label>
                    <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.phone ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                        placeholder="(00) 00000-0000" 
                    />
                     {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">E-mail</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.email ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                        placeholder="nome@exemplo.com" 
                    />
                     {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">Senha</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            value={formData.password}
                            onChange={e => handleInputChange('password', e.target.value)}
                            className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.password ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                            placeholder="••••••" 
                        />
                         {errors.password && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-slate-900 dark:text-slate-300 font-medium text-sm pl-1">Confirmar</Label>
                        <Input 
                            id="confirmPassword" 
                            type="password" 
                            value={formData.confirmPassword}
                            onChange={e => handleInputChange('confirmPassword', e.target.value)}
                            className={`h-14 bg-slate-50 dark:bg-slate-900/50 border-0 focus:ring-2 focus:ring-orange-500/20 dark:text-white rounded-xl text-base px-4 transition-all ${errors.confirmPassword ? 'ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : ''}`} 
                            placeholder="••••••" 
                        />
                         {errors.confirmPassword && <p className="text-xs text-red-500 flex items-center gap-1 pl-1"><AlertCircle className="w-3 h-3" /> {errors.confirmPassword}</p>}
                    </div>
                </div>

                <div className="pt-6 text-center space-y-4">
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300"
                    >
                        Criar conta
                    </Button>
                </div>
            </form>
        </motion.div>
      </div>
    </div>
  );
}