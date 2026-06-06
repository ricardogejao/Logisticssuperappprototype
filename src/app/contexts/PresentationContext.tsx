import React, { createContext, useContext, useState } from 'react';

type BannerMode = 'goodyear' | 'trackerthings';

interface PresentationContextType {
  bannerMode: BannerMode;
  setBannerMode: (mode: BannerMode) => void;
}

const defaultContext: PresentationContextType = {
  bannerMode: 'goodyear',
  setBannerMode: () => {},
};

const PresentationContext = createContext<PresentationContextType>(defaultContext);

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [bannerMode, setBannerMode] = useState<BannerMode>('goodyear');

  return (
    <PresentationContext.Provider value={{ bannerMode, setBannerMode }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const context = useContext(PresentationContext);
  return context || defaultContext;
}
