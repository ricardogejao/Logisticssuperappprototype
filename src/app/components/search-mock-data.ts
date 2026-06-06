export interface Offer {
  origin: string;
  destination: string;
  distance: number; // Proximity to "Minha localização atual" (Campinas)
}

export const MOCK_OFFERS: Offer[] = [
  { origin: 'Campinas', destination: 'Rondonópolis', distance: 0 },
  { origin: 'Campinas', destination: 'Uberaba', distance: 0 },
  { origin: 'Campinas', destination: 'Ponta Grossa', distance: 0 },
  { origin: 'Campinas', destination: 'Curitiba', distance: 0 },
  { origin: 'Paulínia', destination: 'Uberaba', distance: 15 },
  { origin: 'Paulínia', destination: 'Uberlândia', distance: 15 },
  { origin: 'Paulínia', destination: 'Goiânia', distance: 15 },
  { origin: 'Sumaré', destination: 'Uberlândia', distance: 25 },
  { origin: 'Sumaré', destination: 'Maringá', distance: 25 },
  { origin: 'Hortolândia', destination: 'Cuiabá', distance: 10 },
  { origin: 'Hortolândia', destination: 'Rondonópolis', distance: 10 },
  { origin: 'Americana', destination: 'Rondonópolis', distance: 35 },
  { origin: 'Americana', destination: 'Cuiabá', distance: 35 },
  { origin: 'Americana', destination: 'Uberaba', distance: 35 },
  { origin: 'Louveira', destination: 'Ponta Grossa', distance: 20 },
  { origin: 'Louveira', destination: 'Curitiba', distance: 20 },
  { origin: 'Indaiatuba', destination: 'Curitiba', distance: 30 },
  { origin: 'Indaiatuba', destination: 'Maringá', distance: 30 },
  { origin: 'Valinhos', destination: 'Uberaba', distance: 12 },
  { origin: 'Valinhos', destination: 'Uberlândia', distance: 12 },
  { origin: 'Vinhedo', destination: 'Ponta Grossa', distance: 18 },
  { origin: 'Jundiaí', destination: 'Curitiba', distance: 40 },
  { origin: 'Jundiaí', destination: 'Goiânia', distance: 40 },
  { origin: 'Rondonópolis', destination: 'Minha casa', distance: 800 },
  { origin: 'Uberaba', destination: 'Minha casa', distance: 450 },
  { origin: 'Uberlândia', destination: 'Minha casa', distance: 600 },
];

export const RADIUS_OPTIONS = [25, 50, 100, 200];
