export interface FilterState {
  searchRadius: number; // New: 5-250km
  priceRange: number[];
  distanceRange: number[];
  selectedTypes: string[];
  selectedDate: string;
  weightLimit: number; // Renamed from capacityLimit
  volumeLimit: number; // New, separate from weight
}

export const parsePrice = (p: string) => parseInt(p.replace('R$ ', '').replace('.', ''));
export const parseWeight = (w: string) => parseInt(w.replace(' ton', ''));

// Make sure to match the Offer interface or a compatible subset
export const filterOffers = (offers: any[], filters: FilterState) => {
  return offers.filter(offer => {
    // 1. Price Filter
    const p = parsePrice(offer.price);
    if (p < filters.priceRange[0] || p > filters.priceRange[1]) return false;

    // 2. Distance Filter (Total Trip)
    if (offer.distance < filters.distanceRange[0] || offer.distance > filters.distanceRange[1]) return false;

    // 3. Type Filter
    if (filters.selectedTypes.length > 0) {
      const typeMap: Record<string, string> = {
        'refrigerada': 'Refrigerada',
        'seca': 'Carga Seca',
        'granel': 'Graneleiro'
      };
      const match = filters.selectedTypes.some(t => offer.type === typeMap[t]);
      if (!match) return false;
    }

    // 4. Weight Filter
    if (offer.weightVal > filters.weightLimit) return false;

    // 5. Volume Filter
    if (offer.volume && offer.volume > filters.volumeLimit) return false;

    // 6. Date Filter
    if (filters.selectedDate !== 'any' && filters.selectedDate !== 'specific') {
       if (!offer.date.toLowerCase().includes(filters.selectedDate.toLowerCase())) return false;
    }

    return true;
  });
};
