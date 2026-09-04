import React, { useState } from 'react';
import { ClipboardCheck, Check } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DocumentUpload } from '../ui/document-upload';
import { cn } from '../ui/utils';
import { toast } from 'sonner';
import {
  ChecklistDefinition,
  ChecklistEvent,
  ChecklistAnswerValue,
  ChecklistQuestion,
} from '../../types/checklist';
import { evaluateAnswers, saveChecklistAnswer, triggerChecklistOccurrence } from '../../utils/checklist';

type EvidenceStatus = 'idle' | 'selecting' | 'uploading' | 'completed';

interface ChecklistSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklist: ChecklistDefinition;
  /** Chamado ao final, sempre — resposta válida ou não nunca bloqueia o motorista. */
  onComplete: (wasValid: boolean) => void;
}

const EVENT_LABELS: Record<ChecklistEvent, string> = {
  contratacao: 'Antes de confirmar interesse',
  coleta: 'Apresentação para coleta',
  entrega: 'Apresentação para entrega',
  credenciamento: 'Credenciamento do veículo',
};

const PillOption = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'px-4 py-2.5 rounded-full text-sm font-bold border transition-all',
      selected
        ? 'bg-slate-900 dark:bg-orange-500 text-white border-slate-900 dark:border-orange-500'
        : 'bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
    )}
  >
    {children}
  </button>
);

export function ChecklistSheet({ open, onOpenChange, checklist, onComplete }: ChecklistSheetProps) {
  const [answers, setAnswers] = useState<Record<string, ChecklistAnswerValue>>({});
  const [evidence, setEvidence] = useState<Record<string, EvidenceStatus>>({});
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (id: string, value: ChecklistAnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMultiple = (id: string, option: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [id]: next };
    });
  };

  const startEvidence = (id: string) => setEvidence((prev) => ({ ...prev, [id]: 'selecting' }));

  const selectEvidenceOption = (id: string) => {
    setEvidence((prev) => ({ ...prev, [id]: 'uploading' }));
    setTimeout(() => {
      setEvidence((prev) => ({ ...prev, [id]: 'completed' }));
    }, 900);
  };

  const isAnswered = (question: ChecklistQuestion) => {
    if (!question.required) return true;
    const given = answers[question.id];
    if (question.type === 'multiple') return Array.isArray(given) && given.length > 0;
    return given !== undefined && given !== '';
  };

  const evidenceReady = (question: ChecklistQuestion) =>
    !question.requiresEvidence || evidence[question.id] === 'completed';

  const canConfirm = checklist.questions.every((q) => isAnswered(q) && evidenceReady(q));

  const resetLocalState = () => {
    setAnswers({});
    setEvidence({});
    setSubmitting(false);
  };

  const handleConfirm = () => {
    setSubmitting(true);
    const isValid = evaluateAnswers(checklist, answers);
    saveChecklistAnswer(checklist, isValid);

    if (isValid) {
      toast.success(checklist.finalMessage || 'Tudo certo! Respostas confirmadas.');
    } else {
      triggerChecklistOccurrence(checklist.name);
      toast.warning(
        'Uma ocorrência foi aberta para análise e disposição pelo contratante de uma ou mais divergências nas respostas do checklist. Aguarde instruções ou entre em contato com o contratante em caso de dúvidas.',
      );
    }

    onOpenChange(false);
    onComplete(isValid);
    resetLocalState();
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        if (!next) resetLocalState();
        onOpenChange(next);
      }}
    >
      <DrawerContent className="max-h-[85vh] flex flex-col px-0 pb-0 bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-800">
        <div className="mx-auto w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 mb-2 shrink-0" />

        <DrawerHeader className="px-6 pt-2 pb-4 text-left shrink-0 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <DrawerTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {checklist.name}
              </DrawerTitle>
              <DrawerDescription className="text-xs text-slate-500 dark:text-slate-400">
                {EVENT_LABELS[checklist.event]}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checklist.questions.map((question, index) => (
            <div
              key={question.id}
              className="space-y-3 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0 last:mb-0"
            >
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                <span className="text-slate-400 dark:text-slate-500 font-mono text-xs mr-1.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {question.text}
                {question.required && <span className="text-red-500"> *</span>}
              </p>

              {question.type === 'boolean' && (
                <div className="flex gap-2">
                  {['Sim', 'Não'].map((opt) => (
                    <PillOption
                      key={opt}
                      selected={answers[question.id] === opt}
                      onClick={() => setAnswer(question.id, opt)}
                    >
                      {opt}
                    </PillOption>
                  ))}
                </div>
              )}

              {question.type === 'single' && (
                <div className="flex flex-wrap gap-2">
                  {(question.options || []).map((opt) => (
                    <PillOption
                      key={opt}
                      selected={answers[question.id] === opt}
                      onClick={() => setAnswer(question.id, opt)}
                    >
                      {opt}
                    </PillOption>
                  ))}
                </div>
              )}

              {question.type === 'multiple' && (
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                  {(question.options || []).map((opt) => {
                    const selected = Array.isArray(answers[question.id]) && (answers[question.id] as string[]).includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => toggleMultiple(question.id, opt)}
                        className="flex items-center justify-between px-4 py-3 border-b last:border-0 border-slate-100 dark:border-slate-800 cursor-pointer active:bg-slate-100 dark:active:bg-slate-800/50 transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{opt}</span>
                        <Checkbox checked={selected} onCheckedChange={() => toggleMultiple(question.id, opt)} />
                      </div>
                    );
                  })}
                </div>
              )}

              {question.type === 'descriptive' && (
                <textarea
                  rows={3}
                  placeholder="Digite sua resposta"
                  value={(answers[question.id] as string) || ''}
                  onChange={(e) => setAnswer(question.id, e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-medium text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              )}

              {question.type === 'date' && (
                <input
                  type="date"
                  value={(answers[question.id] as string) || ''}
                  onChange={(e) => setAnswer(question.id, e.target.value)}
                  className="w-full h-12 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              )}

              {question.requiresEvidence && (
                <DocumentUpload
                  label="Anexar evidência"
                  description="Fotografe agora, envie da galeria ou anexe um PDF"
                  isUploaded={evidence[question.id] === 'completed'}
                  isLoading={evidence[question.id] === 'uploading'}
                  isSelecting={evidence[question.id] === 'selecting'}
                  onUpload={() => startEvidence(question.id)}
                  onSelectOption={() => selectEvidenceOption(question.id)}
                  className="h-32"
                />
              )}
            </div>
          ))}
        </div>

        <DrawerFooter className="px-6 pt-4 pb-6 shrink-0 border-t border-slate-100 dark:border-slate-800">
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm || submitting}
            className={cn(
              'w-full h-14 rounded-2xl',
              !canConfirm && 'opacity-50 grayscale',
            )}
          >
            <Check className="w-5 h-5" />
            Confirmar respostas
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
