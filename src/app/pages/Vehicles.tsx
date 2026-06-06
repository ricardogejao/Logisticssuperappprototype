import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Truck, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

export function Vehicles() {
  const navigate = useNavigate();

  // Mock data matching the Home screen active vehicle + others
  const defaultVehicles = [
    {
      id: '1',
      plate: "ABC-1D23",
      type: "Caminhão Trator",
      model: "Volvo FH 540",
      bodyType: "Baú",
      status: "Ativo",
      trailers: ["DEF-4G56", "GHI-7J89"]
    },
    {
      id: '2',
      plate: "XYZ-9W87",
      type: "Caminhão Toco",
      model: "Mercedes-Benz Atego",
      bodyType: "Sider",
      status: "Inativo",
      trailers: []
    }
  ];

  const [vehicles, setVehicles] = useState(defaultVehicles);

  useEffect(() => {
    const saved = localStorage.getItem('carga24h_vehicles');
    if (saved) {
      setVehicles(JSON.parse(saved));
    } else {
      // Initialize storage with defaults if empty
      localStorage.setItem('carga24h_vehicles', JSON.stringify(defaultVehicles));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e293b] px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/home')}
                className="rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 -ml-2"
            >
                <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </Button>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Meus Veículos</h1>
        </div>
        <Button 
            variant="ghost" 
            size="icon" 
            className="text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-full"
            onClick={() => navigate('/vehicle-registration')}
        >
            <Plus className="w-6 h-6" />
        </Button>
      </header>

      <div className="flex-1 p-4 space-y-4">
        {vehicles.map((vehicle) => (
            <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group cursor-pointer hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                            <Truck className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">{vehicle.plate}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{vehicle.model}</p>
                        </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        vehicle.status === 'Ativo' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                    }`}>
                        {vehicle.status}
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Tipo</span>
                        <span className="text-slate-900 dark:text-white font-medium">{vehicle.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Carroceria</span>
                        <span className="text-slate-900 dark:text-white font-medium">{vehicle.bodyType}</span>
                    </div>
                    {vehicle.trailers && vehicle.trailers.length > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Reboques</span>
                            <span className="text-slate-900 dark:text-white font-medium">{vehicle.trailers.join(', ')}</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button 
                        variant="outline" 
                        className="flex-1 h-10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/vehicles/${vehicle.id}/edit`);
                        }}
                    >
                        <Edit2 className="w-3.5 h-3.5 mr-2" />
                        Editar
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="h-10 w-10 p-0 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-300 rounded-lg"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Delete logic would go here
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </motion.div>
        ))}

        <div 
            onClick={() => navigate('/vehicle-registration')}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-400 dark:hover:border-orange-900/50 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all gap-3"
        >
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                <Plus className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Adicionar novo veículo</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Cadastre um novo caminhão ou carreta</p>
            </div>
        </div>
      </div>
    </div>
  );
}