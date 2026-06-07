import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import logo from 'figma:asset/2f91b80feed9556632a158b97f45c755e649b888.png';

export function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Force light mode behavior for Login page only
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
    }
    
    return () => {
      // Restore theme when leaving login page
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 font-sans relative overflow-hidden transition-colors duration-500">
      
      {/* Background Noise/Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="flex-1 px-8 pt-10 pb-10 max-w-lg mx-auto w-full flex flex-col justify-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-center mb-10 drop-shadow-xl">
                <img src={logo} alt="Carga24h" className="h-28 w-auto object-contain" />
            </div>

            <div className="mb-8 text-center sm:text-left">
                 <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Bem-vindo(a)</h1>
                 <p className="text-white/90 text-lg leading-relaxed font-medium">
                    Insira seus dados para acessar sua conta ou criar um novo cadastro.
                </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem('PROTOTYPE_AUTH_STATE', 'true');
                navigate('/home');
            }}>
                <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-white font-bold text-sm pl-1">CPF</Label>
                    <Input 
                        id="cpf" 
                        className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-white/30 focus:border-white/30 rounded-xl text-lg px-4 transition-all" 
                        placeholder="000.000.000-00" 
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center pl-1">
                        <Label htmlFor="password" className="text-white font-bold text-sm">Senha</Label>
                        <button type="button" className="text-sm text-white/80 font-medium hover:text-white transition-colors" onClick={() => console.log("Forgot password flow")}>
                            Esqueceu a senha?
                        </button>
                    </div>
                    <Input 
                        id="password" 
                        type="password" 
                        className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-white/30 focus:border-white/30 rounded-xl text-lg px-4 transition-all" 
                        placeholder="••••••••" 
                    />
                </div>

                <div className="pt-6 space-y-4">
                    <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold bg-white text-orange-600 hover:bg-slate-50 rounded-xl shadow-lg shadow-black/10 transition-all duration-300 transform active:scale-[0.99]"
                    >
                        Entrar
                    </Button>
                    
                    <Button 
                        type="button" 
                        onClick={() => navigate('/register')}
                        variant="outline"
                        className="w-full h-14 text-lg font-bold border-2 border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white hover:text-white rounded-xl transition-all duration-300"
                    >
                        Criar conta
                    </Button>
                </div>
            </form>
        </motion.div>
      </div>

      <div className="p-6 text-center relative z-10">
          <p className="text-sm text-white max-w-[320px] mx-auto leading-relaxed font-medium drop-shadow-md">
              Ao continuar, você concorda com a nossa <a href="#" className="underline font-bold hover:text-orange-100 transition-colors">Política de Privacidade</a>.
          </p>
      </div>
    </div>
  );
}
