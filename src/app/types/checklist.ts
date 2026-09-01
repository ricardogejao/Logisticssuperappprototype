export type ChecklistEvent = 'contratacao' | 'coleta' | 'entrega' | 'credenciamento';

export type ChecklistQuestionType = 'boolean' | 'single' | 'multiple' | 'descriptive' | 'date';

export interface ChecklistQuestion {
  id: string;
  text: string;
  type: ChecklistQuestionType;
  /** Opções para 'single' e 'multiple'. Ignorado nos demais tipos. */
  options?: string[];
  /**
   * Resposta esperada, configurada por quem criou o checklist. Não existe para 'descriptive'.
   * Em 'multiple', todas as opções listadas precisam estar selecionadas para a resposta ser válida.
   */
  validAnswer?: string | string[];
  /** Exige foto (câmera/galeria) ou anexo em PDF, reaproveitando o componente de evidência já usado no app. */
  requiresEvidence?: boolean;
  required?: boolean;
}

export interface ChecklistDefinition {
  id: string;
  name: string;
  /** Nome do cliente (embarcador) dono do checklist — casa com Offer.shipper. */
  shipper: string;
  event: ChecklistEvent;
  /** Dias de validade de uma resposta antes de precisar ser refeita. */
  validityDays: number;
  /** Mensagem opcional exibida ao motorista ao concluir, escrita por quem criou o checklist. */
  finalMessage?: string;
  questions: ChecklistQuestion[];
}

export type ChecklistAnswerValue = string | string[] | undefined;
