import { MOCK_CHECKLISTS } from '../data/checklists';
import { ChecklistDefinition, ChecklistEvent, ChecklistAnswerValue } from '../types/checklist';

const ANSWER_KEY_PREFIX = 'PROTOTYPE_CHECKLIST_ANSWER_';

/** Acha o checklist configurado para este cliente + evento da jornada, se houver. */
export function getChecklistFor(shipper: string, event: ChecklistEvent): ChecklistDefinition | undefined {
  return MOCK_CHECKLISTS.find((c) => c.shipper === shipper && c.event === event);
}

interface StoredAnswer {
  answeredAt: number;
  isValid: boolean;
}

/**
 * Uma resposta vale para o cliente + checklist e se aplica automaticamente a
 * todas as próximas OFs do mesmo motorista com o mesmo cliente, dentro da
 * validade — por isso a checagem é só por checklist.id, não por OF.
 */
export function isChecklistPending(checklist: ChecklistDefinition): boolean {
  try {
    const raw = localStorage.getItem(ANSWER_KEY_PREFIX + checklist.id);
    if (!raw) return true;
    const saved = JSON.parse(raw) as StoredAnswer;
    const validUntil = saved.answeredAt + checklist.validityDays * 24 * 60 * 60 * 1000;
    return Date.now() > validUntil;
  } catch {
    return true;
  }
}

export function saveChecklistAnswer(checklist: ChecklistDefinition, isValid: boolean) {
  try {
    const payload: StoredAnswer = { answeredAt: Date.now(), isValid };
    localStorage.setItem(ANSWER_KEY_PREFIX + checklist.id, JSON.stringify(payload));
  } catch {
    // localStorage indisponível — segue sem persistir (prototype only)
  }
}

/**
 * Confere se cada pergunta com "resposta válida" configurada recebeu
 * exatamente essa resposta. Perguntas descritivas ou sem resposta válida
 * configurada não são avaliadas (não dá para validar texto livre).
 */
export function evaluateAnswers(
  checklist: ChecklistDefinition,
  answers: Record<string, ChecklistAnswerValue>,
): boolean {
  return checklist.questions.every((question) => {
    if (question.validAnswer === undefined) return true;
    const given = answers[question.id];

    if (question.type === 'multiple') {
      const expected = Array.isArray(question.validAnswer) ? question.validAnswer : [question.validAnswer];
      const givenArr = Array.isArray(given) ? given : [];
      return expected.every((option) => givenArr.includes(option));
    }

    return given === question.validAnswer;
  });
}

/**
 * Resposta divergente da esperada não bloqueia o motorista — ela abre uma
 * ocorrência automaticamente (motivo padrão "Checklist inválido") que entra
 * na jornada de Ocorrência já existente no app. Quem decide o desfecho é o
 * planejador, não o app.
 */
export function triggerChecklistOccurrence(checklistName: string) {
  try {
    localStorage.setItem('PROTOTYPE_OCCURRENCE_ACTIVE', 'true');
    localStorage.setItem('PROTOTYPE_OCCURRENCE_REASON', 'Checklist inválido');
    localStorage.setItem('PROTOTYPE_OCCURRENCE_SOURCE', checklistName);
  } catch {
    // no-op
  }
}
