import { useSyncExternalStore } from 'react';

export type BannerMode = 'goodyear' | 'trackerthings' | 'upper';

// Global state outside React - simple and direct
let globalBannerMode: BannerMode = 'goodyear';
let subscribers: Set<() => void> = new Set();

export function getBannerMode(): BannerMode {
  return globalBannerMode;
}

export function setBannerModeGlobal(mode: BannerMode) {
  if (globalBannerMode !== mode) {
    globalBannerMode = mode;
    subscribers.forEach(cb => cb());
  }
}

const bannerStore = {
  subscribe(callback: () => void) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
  getSnapshot() {
    return globalBannerMode;
  }
};

export function useBannerMode() {
  const bannerMode = useSyncExternalStore(bannerStore.subscribe, bannerStore.getSnapshot);

  return {
    bannerMode,
    setBannerMode: setBannerModeGlobal
  };
}
