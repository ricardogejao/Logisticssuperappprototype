import { ChecklistDefinition } from '../types/checklist';

// Dados de exemplo para o protótipo — na versão real, esses checklists são
// criados pelo cliente (embarcador) ou pelo Backoffice em um painel próprio.
// Aqui reproduzimos os que a "Indústria de Alimentos SP" (oferta #1, ver
// src/app/data/mocks.ts) configurou para contratação, coleta e entrega.
export const MOCK_CHECKLISTS: ChecklistDefinition[] = [
  {
    id: 'chk-contratacao-alimentos-sp',
    name: 'Checklist de contratação',
    shipper: 'Indústria de Alimentos SP',
    event: 'contratacao',
    validityDays: 30,
    finalMessage: 'Tudo certo! Você já pode seguir com a contratação.',
    questions: [
      {
        id: 'q1',
        text: 'O veículo possui rastreador ativo e funcionando?',
        type: 'boolean',
        validAnswer: 'Sim',
        required: true,
      },
      {
        id: 'q2',
        text: 'A lona está em condições de uso, sem rasgos ou furos?',
        type: 'boolean',
        validAnswer: 'Sim',
        required: true,
        requiresEvidence: true,
      },
      {
        id: 'q3',
        text: 'Algum equipamento adicional será necessário para o carregamento?',
        type: 'descriptive',
        required: false,
      },
    ],
  },
  {
    id: 'chk-coleta-alimentos-sp',
    name: 'Checklist de coleta',
    shipper: 'Indústria de Alimentos SP',
    event: 'coleta',
    validityDays: 1,
    finalMessage: 'Confirmado. Siga para o carregamento.',
    questions: [
      {
        id: 'q1',
        text: 'O motorista está com os EPIs exigidos pelo cliente (calça comprida e bota)?',
        type: 'boolean',
        validAnswer: 'Sim',
        required: true,
      },
      {
        id: 'q2',
        text: 'Qual a condição do lacre do baú?',
        type: 'single',
        options: ['Intacto', 'Violado', 'Não se aplica'],
        validAnswer: 'Intacto',
        required: true,
        requiresEvidence: true,
      },
    ],
  },
  {
    id: 'chk-entrega-alimentos-sp',
    name: 'Checklist de entrega',
    shipper: 'Indústria de Alimentos SP',
    event: 'entrega',
    validityDays: 1,
    finalMessage: 'Obrigado! Conclua a entrega normalmente.',
    questions: [
      {
        id: 'q1',
        text: 'A carga permaneceu estável durante o trajeto, sem indícios de tombamento?',
        type: 'boolean',
        validAnswer: 'Sim',
        required: true,
        requiresEvidence: true,
      },
      {
        id: 'q2',
        text: 'Os documentos de entrega (NF / canhoto) estão em mãos?',
        type: 'boolean',
        validAnswer: 'Sim',
        required: true,
      },
    ],
  },
];
