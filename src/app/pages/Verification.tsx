import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp"
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { OnboardingProgress } from '../components/ui/onboarding-progress';

export function Verification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
      navigate('/profile-selection');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm shadow-slate-50/50 dark:shadow-slate-900/50 transition-colors duration-300">
        <div className="px-6 pt-6 pb-2 flex items-center">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/register')}
                className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-white" />
            </Button>
        </div>
        <OnboardingProgress step={2} totalSteps={7} title="Verificação" className="pt-0 pb-4" />
      </div>

      <div className="flex-1 px-8 pt-8 pb-10 flex flex-col items-center max-w-lg mx-auto w-full">
          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
          >
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center sm:text-left">Confirmação</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-base font-light text-center sm:text-left leading-relaxed">
                  Digite abaixo o código enviado para seu e-mail ou celular.
              </p>

              <div className="space-y-8">
                  {/* OTP Section */}
                  <div className="space-y-6">
                      <div className="flex justify-center">
                          <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
                              <InputOTPGroup className="gap-2 sm:gap-4">
                                  {[0, 1, 2, 3, 4, 5].map((index) => (
                                      <InputOTPSlot 
                                          key={index} 
                                          index={index} 
                                          className="h-12 w-10 sm:h-16 sm:w-14 text-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" 
                                      />
                                  ))}
                              </InputOTPGroup>
                          </InputOTP>
                      </div>
                      <div className="text-center">
                          <button className="text-orange-600 dark:text-orange-500 text-sm font-bold hover:text-orange-700 dark:hover:text-orange-400 transition-colors">
                              Reenviar código
                          </button>
                      </div>
                  </div>
              </div>

              <div className="pt-10">
                  <Button 
                      onClick={handleContinue}
                      disabled={otp.length !== 6}
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
                  >
                      Continuar
                  </Button>
              </div>
          </motion.div>
      </div>
    </div>
  );
}
