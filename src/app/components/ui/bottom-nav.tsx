import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Home, Search, Map, User } from 'lucide-react';
import { cn } from './utils';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasActiveTrip, setHasActiveTrip] = useState(false);

  useEffect(() => {
    // In this prototype, Trips page always has hardcoded active trips.
    // So we can assume true to match the UI content.
    // Or we could check localStorage if we wanted strict flow adherence.
    // For visual consistency with the Trips page content, we'll set it to true.
    setHasActiveTrip(true);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const items = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Ofertas', icon: Search, path: '/marketplace' },
    { label: 'Viagens', icon: Map, path: '/trips' },
    { label: 'Perfil', icon: User, path: '/profile' }, // Placeholder path
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-800 px-6 py-2 pb-6 z-30 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 min-w-[64px] relative group"
          >
            <div className="relative">
                <item.icon
                className={cn(
                    "w-6 h-6 transition-colors",
                    isActive(item.path) ? "text-orange-500" : "text-slate-400 dark:text-slate-500"
                )}
                />
                {item.label === 'Viagens' && hasActiveTrip && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                )}
            </div>
            <span
              className={cn(
                "text-[10px] font-medium transition-colors",
                isActive(item.path) ? "text-orange-600 dark:text-orange-500" : "text-slate-500 dark:text-slate-400"
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
