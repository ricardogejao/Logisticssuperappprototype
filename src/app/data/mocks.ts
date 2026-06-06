export interface Offer {
  id: string;
  origin: string;
  originState: string;
  destination: string;
  destinationState: string;
  price: string;
  weight: string;
  weightVal: number; // Numeric value in tons for calculation
  volume: number; // m3
  type: 'Refrigerada' | 'Carga Seca' | 'Graneleiro' | 'Diversos';
  date: string;
  deliveryDate: string;
  coordinates: { top: string; left: string }; 
  distance: number; // km
  shipper: string;
  observations: string;
  isReturn?: boolean;
  isNegotiable?: boolean;
  allowSharing?: boolean;
  isMop?: boolean;
}

export const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    origin: 'Campinas',
    originState: 'SP',
    destination: 'Rio de Janeiro',
    destinationState: 'RJ',
    price: 'R$ 4.200',
    weight: '12 ton',
    weightVal: 12,
    volume: 40,
    type: 'Refrigerada',
    date: 'Amanhã, 08:00',
    deliveryDate: '26/01, 14:00',
    coordinates: { top: '43%', left: '50%' },
    distance: 450,
    shipper: 'Indústria de Alimentos SP',
    observations: 'Carga paletizada, necessita de ajudante para descarga. Entrada apenas com calça comprida e bota.',
    isReturn: true,
    isNegotiable: true,
    allowSharing: true
  },
  {
    id: '2',
    origin: 'Campinas',
    originState: 'SP',
    destination: 'Rio de Janeiro',
    destinationState: 'RJ',
    price: 'R$ 3.850',
    weight: '8 ton',
    weightVal: 8,
    volume: 25,
    type: 'Carga Seca',
    date: 'Hoje, 14:00',
    deliveryDate: '25/01, 20:00',
    coordinates: { top: '46%', left: '45%' },
    distance: 450,
    shipper: 'Logística Campinas Ltda',
    observations: '',
    allowSharing: true,
    isMop: true
  },
  {
    id: '3',
    origin: 'Campinas',
    originState: 'SP',
    destination: 'Rio de Janeiro',
    destinationState: 'RJ',
    price: 'R$ 5.500',
    weight: '18 ton',
    weightVal: 18,
    volume: 60,
    type: 'Graneleiro',
    date: '26/12, 06:00',
    deliveryDate: '27/12, 12:00',
    coordinates: { top: '41%', left: '55%' },
    distance: 460,
    shipper: 'Agro Grãos Brasil',
    observations: 'Veículo precisa estar com a lona 100% íntegra. Descarga por ordem de chegada.',
    isNegotiable: true
  },
  {
    id: '4',
    origin: 'São Paulo',
    originState: 'SP',
    destination: 'Curitiba',
    destinationState: 'PR',
    price: 'R$ 4.100',
    weight: '12 ton',
    weightVal: 12,
    volume: 35,
    type: 'Diversos',
    date: 'Amanhã, 10:00',
    deliveryDate: '26/01, 18:00',
    coordinates: { top: '50%', left: '35%' },
    distance: 408,
    shipper: 'Mix Distribuidora',
    observations: 'Material frágil, cuidado no manuseio.',
    isReturn: true
  },
  {
    id: '5',
    origin: 'Belo Horizonte',
    originState: 'MG',
    destination: 'Vitória',
    destinationState: 'ES',
    price: 'R$ 6.200',
    weight: '22 ton',
    weightVal: 22,
    volume: 70,
    type: 'Graneleiro',
    date: '27/12, 07:30',
    deliveryDate: '28/12, 10:00',
    coordinates: { top: '35%', left: '65%' },
    distance: 520,
    shipper: 'Minas Mineração',
    observations: '',
    isNegotiable: true,
    isMop: true
  },
  {
    id: '6',
    origin: 'Osasco',
    originState: 'SP',
    destination: 'Londrina',
    destinationState: 'PR',
    price: 'R$ 3.950',
    weight: '10 ton',
    weightVal: 10,
    volume: 30,
    type: 'Carga Seca',
    date: 'Amanhã, 14:00',
    deliveryDate: '26/01, 10:00',
    coordinates: { top: '47%', left: '30%' },
    distance: 540,
    shipper: 'Varejo Express',
    observations: 'Entrega agendada para o período da tarde.',
    allowSharing: true
  }
];
