import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../components/ui/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type QuestionType = 'boolean' | 'single' | 'multiple' | 'descriptive';

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  booleanLabels?: [string, string]; // [positive, negative]
  options?: string[];
  evidence: boolean;
}

interface Checklist {
  title: string;
  defaultEvent: string;
  finalMessage: string;
  questions: Question[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CHECKLIST: Checklist = {
  title: 'Transporte de Químicos',
  defaultEvent: 'Apresentação para Coleta',
  finalMessage:
    'Em caso de divergência em alguma resposta neste Check List, uma ocorrência será aberta automaticamente.',
  questions: [
    {
      id: 1,
      text: 'Indique a quantidade máxima de posições de paletes/containers remontados do seu compartimento de carga.',
      type: 'single',
      options: ['14', '16', '18', '20', '22', '24', '26', '28', '30'],
      evidence: false,
    },
    {
      id: 2,
      text: 'A sinalização de produtos perigosos está disponível? Evidencie.',
      type: 'boolean',
      booleanLabels: ['SIM', 'NÃO'],
      evidence: true,
    },
    {
      id: 3,
      text: 'O veículo possui equipamento de proteção individual (EPI) completo?',
      type: 'boolean',
      booleanLabels: ['SIM', 'NÃO'],
      evidence: false,
    },
    {
      id: 4,
      text: 'Descreva as condições atuais do compartimento de carga.',
      type: 'descriptive',
      evidence: false,
    },
    {
      id: 5,
      text: 'Todos os documentos do veículo estão dentro da validade?',
      type: 'boolean',
      booleanLabels: ['ATENDE', 'NÃO ATENDE'],
      evidence: true,
    },
  ],
};

// ─── Answer State ─────────────────────────────────────────────────────────────

type Answers = Record<number, string | string[]>;

// ─── Sub-components ───────────────────────────────────────────────────────────

function BooleanAnswer({
  labels,
  value,
  onChange,
}: {
  labels: [string, string];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3">
      {labels.map((label) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className={cn(
            'flex-1 py-4 rounded-2xl text-base font-bold border-2 transition-all duration-150',
            value === label
              ? 'bg-orange-500 border-orange-500 text-white shadow-md scale-[1.02]'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-orange-300'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function SingleChoiceAnswer({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-150',
            value === opt
              ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-orange-300'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MultipleChoiceAnswer({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left text-sm font-medium transition-all duration-150',
              selected
                ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400 text-orange-700 dark:text-orange-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            )}
          >
            <span
              className={cn(
                'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors',
                selected
                  ? 'bg-orange-500 border-orange-500'
                  : 'border-slate-300 dark:border-slate-600'
              )}
            >
              {selected && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function DescriptiveAnswer({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Digite sua resposta aqui..."
      rows={4}
      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm resize-none focus:outline-none focus:border-orange-400 transition-colors"
    />
  );
}

function EvidenceButtons() {
  return (
    <div className="bg-orange-50/50 dark:bg-orange-900/10 border-[1.8px] border-orange-200 dark:border-orange-900/20 rounded-[20px] p-5 flex flex-col items-center gap-4 mt-2">
      <span className="text-[14px] font-bold text-slate-700 dark:text-slate-300 tracking-[-0.15px]">
        Evidência obrigatória:
      </span>
      <div className="flex justify-center gap-10 w-full">
        {/* Fotografar */}
        <button
          onClick={() => toast('Câmera não disponível no protótipo')}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="size-12 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-500 transition-all">
            <svg className="size-6" fill="none" viewBox="0 0 20 20">
              <path d="M13.3333 15.8337H6.66667C4.82572 15.8337 3.33334 14.3413 3.33334 12.5003V7.50033C3.33334 5.65938 4.82572 4.16699 6.66667 4.16699H13.3333C15.1743 4.16699 16.6667 5.65938 16.6667 7.50033V12.5003C16.6667 14.3413 15.1743 15.8337 13.3333 15.8337Z" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.11px]">Fotografar</span>
        </button>

        {/* Enviar arquivo */}
        <button
          onClick={() => toast('Upload não disponível no protótipo')}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="size-12 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-500 transition-all">
            <svg className="size-6" fill="none" viewBox="0 0 20 20">
              <path d="M10 12.5V3.33333M10 3.33333L6.66667 6.66667M10 3.33333L13.3333 6.66667M16.6667 12.5V13.3333C16.6667 15.1743 15.1743 16.6667 13.3333 16.6667H6.66667C4.82572 16.6667 3.33334 15.1743 3.33334 13.3333V12.5" stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-[0.11px]">Arquivo</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CheckList() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { eventName?: string; returnTo?: string; onboardingChecklist?: boolean }) ?? {};

  const isOnboarding = state.onboardingChecklist === true;
  const checklist = MOCK_CHECKLIST;
  const eventName = state.eventName ?? checklist.defaultEvent;
  const returnTo = state.returnTo ?? '/trip/details';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const total = checklist.questions.length;
  const question = checklist.questions[currentIndex];
  const isLast = currentIndex === total - 1;
  const isFirst = currentIndex === 0;
  const progress = ((currentIndex + 1) / total) * 100;

  const currentAnswer = answers[question.id];
  const hasAnswer =
    currentAnswer !== undefined &&
    currentAnswer !== '' &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

  const setAnswer = (value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleBack = () => {
    if (showFinalMessage) {
      setShowFinalMessage(false);
      return;
    }
    if (isFirst) {
      navigate(-1);
      return;
    }
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  };

  const handleAdvance = () => {
    if (!hasAnswer) return;
    if (isLast) {
      if (checklist.finalMessage) {
        setShowFinalMessage(true);
      } else {
        handleConclude();
      }
      return;
    }
    setDirection(1);
    setCurrentIndex((i) => i + 1);
  };

  const handleConclude = () => {
    localStorage.setItem('PROTOTYPE_CHECKLIST_DONE', 'true');
    if (isOnboarding) {
      localStorage.setItem('PROTOTYPE_ONBOARDING_CHECKLIST_DONE', 'true');
    }
    toast.success('Check List respondido com sucesso!');
    if (returnTo === '-1') {
      navigate(-1);
    } else {
      navigate(returnTo, { replace: true });
    }
  };

  // ── Final Message Screen ──
  if (showFinalMessage) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans">
        <header className="bg-white dark:bg-[#1e293b] px-4 pt-12 pb-4 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
          <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">Check List</p>
            <h1 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
              {checklist.title}
            </h1>
          </div>
        </header>

        <div className="flex-1 px-6 flex flex-col items-center justify-center gap-6 text-center pb-32">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Mensagem Final
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
              {checklist.finalMessage}
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex gap-3">
          <Button
            variant="ghost"
            className="flex-1 h-12 rounded-2xl text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/20"
            onClick={handleBack}
          >
            VOLTAR
          </Button>
          <Button
            className="flex-1 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold"
            onClick={handleConclude}
          >
            CONCLUIR
          </Button>
        </div>
      </div>
    );
  }

  // ── Question Screen ──
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e293b] px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {isOnboarding ? 'Credenciamento' : `Check List – ${eventName}`}
            </p>
            <h1 className="font-bold text-slate-900 dark:text-white text-base leading-tight truncate">
              {isOnboarding ? 'Check List de Cadastro' : checklist.title}
            </h1>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
            {currentIndex + 1} de {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1 text-right">
          {currentIndex + 1} de {total} pergunta{total !== 1 ? 's' : ''} respondida{total !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Question content */}
      <div className="flex-1 px-6 pt-6 pb-32">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={question.id}
            initial={{ x: direction * 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -30, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="space-y-5"
          >
            {/* Question number + text */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="inline-block text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1 rounded-full mb-3">
                Pergunta {question.id}
              </span>
              <p className="text-slate-800 dark:text-slate-100 text-sm font-medium leading-relaxed">
                {question.text}
              </p>
            </div>

            {/* Answer input */}
            <div className="space-y-3">
              {question.type === 'boolean' && question.booleanLabels && (
                <BooleanAnswer
                  labels={question.booleanLabels}
                  value={currentAnswer as string | undefined}
                  onChange={setAnswer}
                />
              )}

              {question.type === 'single' && question.options && (
                <SingleChoiceAnswer
                  options={question.options}
                  value={currentAnswer as string | undefined}
                  onChange={setAnswer}
                />
              )}

              {question.type === 'multiple' && question.options && (
                <MultipleChoiceAnswer
                  options={question.options}
                  value={(currentAnswer as string[]) ?? []}
                  onChange={setAnswer}
                />
              )}

              {question.type === 'descriptive' && (
                <DescriptiveAnswer
                  value={currentAnswer as string | undefined}
                  onChange={setAnswer}
                />
              )}

              {/* Evidence buttons */}
              {question.evidence && <EvidenceButtons />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex gap-3">
        <Button
          variant="ghost"
          disabled={isFirst}
          className="flex-1 h-12 rounded-2xl text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/20 disabled:opacity-30"
          onClick={handleBack}
        >
          VOLTAR
        </Button>
        <Button
          disabled={!hasAnswer}
          className="flex-1 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={handleAdvance}
        >
          {isLast ? 'FINALIZAR' : 'AVANÇAR'}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
