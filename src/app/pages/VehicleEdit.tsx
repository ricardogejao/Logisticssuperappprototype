import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Trash2, Plus, Truck, FileText, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

export function VehicleEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock initial form state
  const initialFormState = {
      plate: '',
      renavam: '',
      chassi: '',
      state: '',
      city: '',
      brand: '',
      model: '',
      manufactureYear: '',
      modelYear: '',
      type: '', 
      subType: '', 
      motorCode: '',
      motorPower: '',
      fuelType: '',
      avgConsumption: '',
      cargoType: '',
      cargoWidth: '',
      cargoHeight: '',
      cargoLength: '',
      volume: '', 
      pbt: '', 
      netWeight: '', 
      axles: '', 
      vehicleAxles: '',
      isThirdParty: false,
      isInsured: false,
      hasTracker: false,
      insuranceExpiration: '',
      trackerTechnology: '',
      trackerCommunication: '',
      trackerNumber: '',
      thirdPartyName: '',
      thirdPartyCpf: '',
      trailers: [] as any[],
      dollyPlate: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newTrailerPlate, setNewTrailerPlate] = useState('');
  const [newTrailerConfig, setNewTrailerConfig] = useState('Simples');

  // Load Mock Data
  useEffect(() => {
      // Simulate API fetch with rich data for the prototype
      const loadVehicle = () => {
          if (id === '1') {
             setFormData({
                plate: "ABC-1D23",
                renavam: '12345678900',
                chassi: '9BWZZZ37780001234',
                state: 'SP',
                city: 'São Paulo',
                brand: 'Volvo',
                model: 'FH 540',
                manufactureYear: '2023',
                modelYear: '2023',
                type: 'Caminhão Trator',
                subType: '',
                motorCode: 'D13K540',
                motorPower: '540',
                fuelType: 'Diesel',
                avgConsumption: '2.1',
                cargoType: 'Baú',
                cargoWidth: '',
                cargoHeight: '',
                cargoLength: '',
                volume: '95.50',
                pbt: '74000',
                netWeight: '52000',
                axles: '9',
                vehicleAxles: '3',
                isThirdParty: false,
                isInsured: true,
                hasTracker: true,
                insuranceExpiration: '2024-12-31',
                trackerTechnology: 'Sascar',
                trackerCommunication: 'Satelital',
                trackerNumber: '99887766',
                thirdPartyName: '',
                thirdPartyCpf: '',
                trailers: [
                    { id: 101, plate: "DEF-4G56", config: "Simples", bodyType: "Baú", label: "Baú Simples", type: "Semi-Reboque" },
                    { id: 102, plate: "GHI-7J89", config: "Simples", bodyType: "Baú", label: "Baú Simples", type: "Semi-Reboque" }
                ],
                dollyPlate: ''
             });
          } else if (id === '2') {
             setFormData({
                plate: "XYZ-9W87",
                renavam: '98765432100',
                chassi: '9BWZZZ37780005678',
                state: 'MG',
                city: 'Belo Horizonte',
                brand: 'Mercedes-Benz',
                model: 'Atego 2426',
                manufactureYear: '2022',
                modelYear: '2022',
                type: 'Caminhão Toco',
                subType: '',
                motorCode: 'OM 926 LA',
                motorPower: '256',
                fuelType: 'Diesel',
                avgConsumption: '3.5',
                cargoType: 'Sider',
                cargoWidth: '2.6',
                cargoHeight: '2.8',
                cargoLength: '8.5',
                volume: '61.88',
                pbt: '23000',
                netWeight: '14000',
                axles: '2',
                vehicleAxles: '2',
                isThirdParty: false,
                isInsured: false,
                hasTracker: false,
                insuranceExpiration: '',
                trackerTechnology: '',
                trackerCommunication: '',
                trackerNumber: '',
                thirdPartyName: '',
                thirdPartyCpf: '',
                trailers: [],
                dollyPlate: ''
             });
          }
      };
      loadVehicle();
  }, [id]);

  // Logic Helpers
  const isTractor = formData.type === 'Caminhão Trator';
  const isSemiReboque = formData.type === 'Semi-Reboque';
  const showMotor = !isSemiReboque && formData.type;
  const showCargoDims = !isTractor && formData.type;

  const handleInputChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
      if (!formData.plate || !formData.type) {
          toast.error("Preencha os campos obrigatórios");
          return;
      }
      
      // Update localStorage for Vehicles list persistence
      try {
          const saved = localStorage.getItem('carga24h_vehicles');
          if (saved) {
              const vehicles = JSON.parse(saved);
              const index = vehicles.findIndex((v: any) => v.id === id);
              if (index !== -1) {
                  vehicles[index] = {
                      ...vehicles[index],
                      plate: formData.plate,
                      model: formData.model,
                      type: formData.type,
                      bodyType: formData.cargoType || 'Padrão', // fallback
                      trailers: formData.trailers.map(t => t.plate)
                  };
                  localStorage.setItem('carga24h_vehicles', JSON.stringify(vehicles));
              }
          }
      } catch (e) {
          console.error("Failed to update storage", e);
      }

      toast.success("Alterações salvas com sucesso!");
      navigate('/vehicles');
  };
  
  const handleAddTrailer = () => {
      if (!newTrailerPlate || newTrailerPlate.length < 7) {
          toast.error("Digite a placa completa da carreta para adicionar.");
          return;
      }
      
      const mockBodyTypes = ['Grade Baixa', 'Baú', 'Sider', 'Graneleiro', 'Tanque', 'Caçamba'];
      const randomBody = mockBodyTypes[Math.floor(Math.random() * mockBodyTypes.length)];
      const specificLabel = `${randomBody} ${newTrailerConfig}`;

      setFormData(p => ({
          ...p,
          trailers: [...p.trailers, { 
              id: Date.now(), 
              plate: newTrailerPlate, 
              config: newTrailerConfig,
              bodyType: randomBody, 
              label: specificLabel,
              type: 'Semi-Reboque' 
          }]
      }));
      setNewTrailerPlate('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a] font-sans transition-colors duration-300">
        <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-20 shadow-sm shadow-slate-50/50 dark:shadow-none border-b dark:border-slate-800">
            <div className="px-6 pt-6 pb-2 flex items-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate('/vehicles')}
                    className="-ml-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full w-10 h-10 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-800 dark:text-slate-300" />
                </Button>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white ml-2">Editar Veículo</h1>
            </div>
        </div>

        <div className="flex-1 px-6 pt-3 pb-10 max-w-lg mx-auto w-full">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                
                {/* 1. Basic Data */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Dados do Veículo</h3>
                    
                    <div className="space-y-2">
                        <Label className="font-bold text-sm text-slate-700 dark:text-slate-300">Placa</Label>
                        <Input 
                            value={formData.plate} 
                            onChange={(e) => handleInputChange('plate', e.target.value.toUpperCase())}
                            className="bg-slate-50 dark:bg-slate-900/50 border-0 dark:border dark:border-slate-800 h-14 text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Renavam</Label>
                            <Input value={formData.renavam} onChange={(e) => handleInputChange('renavam', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Chassi</Label>
                            <Input value={formData.chassi} onChange={(e) => handleInputChange('chassi', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-[90px_1fr] gap-4">
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">UF</Label>
                            <Input value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Cidade</Label>
                            <Input value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Marca</Label>
                            <Input value={formData.brand} onChange={(e) => handleInputChange('brand', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Modelo</Label>
                            <Input value={formData.model} onChange={(e) => handleInputChange('model', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Ano Fabr.</Label>
                            <Input value={formData.manufactureYear} onChange={(e) => handleInputChange('manufactureYear', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Ano Mod.</Label>
                            <Input value={formData.modelYear} onChange={(e) => handleInputChange('modelYear', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-sm text-slate-700 dark:text-slate-300">Tipo de Veículo</Label>
                        <Select value={formData.type} onValueChange={(v) => handleInputChange('type', v)}>
                            <SelectTrigger className="h-14 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                                <SelectItem value="Caminhão Trator" className="dark:text-slate-300 dark:focus:bg-slate-800">Caminhão Trator</SelectItem>
                                <SelectItem value="Semi-Reboque" className="dark:text-slate-300 dark:focus:bg-slate-800">Semi-Reboque</SelectItem>
                                <SelectItem value="Caminhão Truck" className="dark:text-slate-300 dark:focus:bg-slate-800">Caminhão Truck</SelectItem>
                                <SelectItem value="Caminhão Toco" className="dark:text-slate-300 dark:focus:bg-slate-800">Caminhão Toco</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* 2. Compartimento & Dimensions */}
                {showCargoDims && (
                    <div className="space-y-4">
                         <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Compartimento e Dimensões</h3>
                         
                         <div className="space-y-2">
                             <Label className="font-bold text-sm text-slate-700 dark:text-slate-300">Tipo de Carroceria</Label>
                             <Select value={formData.cargoType} onValueChange={v => handleInputChange('cargoType', v)}>
                                <SelectTrigger className="h-12 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                                    <SelectItem value="Baú" className="dark:text-slate-300">Baú</SelectItem>
                                    <SelectItem value="Sider" className="dark:text-slate-300">Sider</SelectItem>
                                    <SelectItem value="Grade Baixa" className="dark:text-slate-300">Grade Baixa</SelectItem>
                                    <SelectItem value="Graneleiro" className="dark:text-slate-300">Graneleiro</SelectItem>
                                    <SelectItem value="Tanque" className="dark:text-slate-300">Tanque</SelectItem>
                                    <SelectItem value="Caçamba" className="dark:text-slate-300">Caçamba</SelectItem>
                                </SelectContent>
                             </Select>
                         </div>

                         <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-400">Comp. (m)</Label>
                                <Input type="number" value={formData.cargoLength} onChange={e => handleInputChange('cargoLength', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-400">Larg. (m)</Label>
                                <Input type="number" value={formData.cargoWidth} onChange={e => handleInputChange('cargoWidth', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-400">Alt. (m)</Label>
                                <Input type="number" value={formData.cargoHeight} onChange={e => handleInputChange('cargoHeight', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                            </div>
                         </div>
                         
                         <div className="space-y-2">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-400">Volume Total (m³)</Label>
                            <Input value={formData.volume} onChange={e => handleInputChange('volume', e.target.value)} className="bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800 font-bold text-slate-900 dark:text-white" />
                         </div>
                    </div>
                )}

                {/* 3. Motor & Capacity */}
                {showMotor && (
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Motorização e Capacidade</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Código Motor</Label>
                                <Input value={formData.motorCode} onChange={(e) => handleInputChange('motorCode', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Potência (cv)</Label>
                                <Input value={formData.motorPower} onChange={(e) => handleInputChange('motorPower', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Combustível</Label>
                                <Select value={formData.fuelType} onValueChange={v => handleInputChange('fuelType', v)}>
                                    <SelectTrigger className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                                        <SelectItem value="Diesel" className="dark:text-slate-300">Diesel</SelectItem>
                                        <SelectItem value="Elétrico" className="dark:text-slate-300">Elétrico</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="font-semibold text-sm text-slate-700 dark:text-slate-300">Consumo Médio (km/l)</Label>
                                <Input value={formData.avgConsumption} onChange={(e) => handleInputChange('avgConsumption', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Tractor Specifics: Trailers */}
                {isTractor && (
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Composição (Reboques)</h3>
                        
                        {/* List current trailers */}
                        {formData.trailers.length > 0 ? (
                            <div className="space-y-3">
                                {formData.trailers.map((trailer) => (
                                    <div key={trailer.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white dark:bg-[#1e293b] rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm">
                                                <Truck className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{trailer.plate}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{trailer.label}</p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            type="button"
                                            onClick={() => {
                                                setFormData(p => ({
                                                    ...p,
                                                    trailers: p.trailers.filter(t => t.id !== trailer.id)
                                                }));
                                            }}
                                            className="text-red-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-500 text-sm">Nenhum reboque vinculado.</p>
                            </div>
                        )}

                        {/* Add New Trailer Mock */}
                        <div className="pt-2">
                             <Label className="text-sm font-bold mb-2 block text-slate-700 dark:text-slate-300">Adicionar Reboque</Label>
                             <div className="flex gap-2">
                                 <Input 
                                    placeholder="PLACA" 
                                    value={newTrailerPlate}
                                    onChange={e => setNewTrailerPlate(e.target.value.toUpperCase())}
                                    maxLength={8}
                                    className="uppercase font-bold dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white"
                                 />
                                 <Select value={newTrailerConfig} onValueChange={setNewTrailerConfig}>
                                     <SelectTrigger className="w-[140px] dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white">
                                         <SelectValue />
                                     </SelectTrigger>
                                     <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                                         <SelectItem value="Simples" className="dark:text-slate-300">Simples</SelectItem>
                                         <SelectItem value="Vanderleia" className="dark:text-slate-300">Vanderleia</SelectItem>
                                         <SelectItem value="5ª Roda" className="dark:text-slate-300">5ª Roda</SelectItem>
                                     </SelectContent>
                                 </Select>
                                 <Button type="button" onClick={handleAddTrailer} variant="secondary" className="dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                                     <Plus className="w-5 h-5" />
                                 </Button>
                             </div>
                        </div>
                    </div>
                )}

                {/* 5. Additional Info (Insurance, etc) */}
                <div className="space-y-4">
                     <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Informações Adicionais</h3>
                     
                     <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border dark:border-slate-800">
                        <Label htmlFor="insurance" className="font-medium cursor-pointer text-slate-700 dark:text-slate-300">Veículo Segurado?</Label>
                        <Switch 
                            id="insurance"
                            checked={formData.isInsured}
                            onCheckedChange={c => handleInputChange('isInsured', c)}
                            className="data-[state=checked]:bg-[#00bc7d]"
                        />
                     </div>
                     
                     {formData.isInsured && (
                         <div className="space-y-2">
                             <Label className="text-sm text-slate-700 dark:text-slate-300">Vencimento do Seguro</Label>
                             <Input type="date" value={formData.insuranceExpiration} onChange={e => handleInputChange('insuranceExpiration', e.target.value)} className="dark:bg-[#1e293b] dark:border-slate-800 text-slate-900 dark:text-white" />
                         </div>
                     )}

                     <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border dark:border-slate-800">
                        <Label htmlFor="tracker" className="font-medium cursor-pointer text-slate-700 dark:text-slate-300">Possui Rastreador?</Label>
                        <Switch 
                            id="tracker"
                            checked={formData.hasTracker}
                            onCheckedChange={c => handleInputChange('hasTracker', c)}
                            className="data-[state=checked]:bg-[#00bc7d]"
                        />
                     </div>

                     {formData.hasTracker && (
                        <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                             <div className="space-y-2">
                                <Label className="text-sm text-slate-700 dark:text-slate-300">Tecnologia</Label>
                                <Select value={formData.trackerTechnology} onValueChange={v => handleInputChange('trackerTechnology', v)}>
                                    <SelectTrigger className="bg-white dark:bg-[#1e293b] dark:border-slate-700 text-slate-900 dark:text-white">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#1e293b] dark:border-slate-800">
                                        <SelectItem value="Sascar" className="dark:text-slate-300">Sascar</SelectItem>
                                        <SelectItem value="Omnilink" className="dark:text-slate-300">Omnilink</SelectItem>
                                        <SelectItem value="Autotrac" className="dark:text-slate-300">Autotrac</SelectItem>
                                        <SelectItem value="OnixSat" className="dark:text-slate-300">OnixSat</SelectItem>
                                    </SelectContent>
                                </Select>
                             </div>
                             <div className="space-y-2">
                                <Label className="text-sm text-slate-700 dark:text-slate-300">Nº Terminal / ID</Label>
                                <Input value={formData.trackerNumber} onChange={e => handleInputChange('trackerNumber', e.target.value)} className="bg-white dark:bg-[#1e293b] dark:border-slate-700 text-slate-900 dark:text-white" />
                             </div>
                        </div>
                     )}
                </div>

                {/* 6. Documentos */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Documentos</h3>

                    {/* CRLV */}
                    <button
                        type="button"
                        onClick={() => toast('CRLV não disponível no protótipo')}
                        className="w-full flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 transition-colors text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm shrink-0">
                            <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">CRLV do veículo</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{formData.plate || 'Placa não informada'}</p>
                        </div>
                    </button>

                    {/* Check List — visível apenas para proprietários */}
                    <button
                        type="button"
                        onClick={() => navigate('/checklist', { state: { vehicleChecklist: true, plate: formData.plate, returnTo: `-1` } })}
                        className="w-full flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 transition-colors text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm shrink-0">
                            <ClipboardList className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Check List do veículo</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">Ver / Responder questionário</p>
                        </div>
                    </button>
                </div>

                <div className="pt-4 pb-20">
                    <Button
                        type="submit"
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.99]"
                    >
                        Salvar alterações
                    </Button>
                </div>
            </form>
        </div>
    </div>
  );
}