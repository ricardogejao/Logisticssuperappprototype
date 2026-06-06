import React from 'react';
import { Camera, CheckCircle2, Loader2, Upload, Smartphone, FileText } from 'lucide-react';
import { cn } from './utils';

interface DocumentUploadProps {
  label: string;
  description?: string;
  isUploaded: boolean;
  isLoading?: boolean;
  isSelecting?: boolean;
  loadingText?: string;
  error?: boolean;
  onUpload: () => void;
  onSelectOption?: (option: 'camera' | 'file' | 'digital') => void;
  className?: string;
}

export function DocumentUpload({
  label,
  description,
  isUploaded,
  isLoading,
  isSelecting,
  loadingText,
  error,
  onUpload,
  onSelectOption,
  className
}: DocumentUploadProps) {
  return (
    <div 
        onClick={!isLoading && !isUploaded && !isSelecting ? onUpload : undefined} 
        className={cn(
            "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[160px]",
            error
                ? "border-red-300 bg-red-50 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/10 dark:hover:bg-red-900/20" 
                : isUploaded 
                    ? "border-emerald-500 bg-emerald-50/50 dark:border-emerald-500/50 dark:bg-emerald-500/10" 
                    : isSelecting
                        ? "border-orange-300 bg-orange-50/50 dark:border-orange-500/50 dark:bg-orange-500/10"
                        : "border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900",
            isLoading && "opacity-80 cursor-wait",
            className
        )}
    >
        {isLoading ? (
            <div className="flex flex-col items-center animate-pulse">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-3" />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[200px] leading-tight">
                    {loadingText || "Analisando documento..."}
                </span>
            </div>
        ) : error ? (
            <div className="flex flex-col items-center">
                 <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-3">
                    <Camera className="w-6 h-6 text-red-500 dark:text-red-400" />
                </div>
                <span className="text-sm font-bold text-red-600 dark:text-red-400 block mb-1">Não foi possível validar</span>
                <span className="text-xs text-red-500 dark:text-red-400/80 font-medium max-w-[200px] leading-tight">
                    Tente novamente com uma imagem mais nítida.
                </span>
            </div>
        ) : isUploaded ? (
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Documento validado com sucesso</span>
            </div>
        ) : isSelecting && onSelectOption ? (
            <div className="flex flex-col items-center w-full">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 block">Escolha como enviar:</span>
                <div className="grid grid-cols-3 gap-3 w-full">
                    {/* Camera */}
                    <button 
                         onClick={(e) => { e.stopPropagation(); onSelectOption('camera'); }}
                         className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-orange-100/50 dark:hover:bg-orange-950/30 transition-colors group"
                    >
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-200 dark:group-hover:border-orange-500">
                             <Camera className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-orange-500 dark:group-hover:text-orange-400" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 leading-tight">Fotografar</span>
                    </button>

                    {/* File Upload */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelectOption('file'); }}
                        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-orange-100/50 dark:hover:bg-orange-950/30 transition-colors group"
                    >
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-200 dark:group-hover:border-orange-500">
                             <Upload className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-orange-500 dark:group-hover:text-orange-400" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 leading-tight">Enviar arquivo</span>
                    </button>

                    {/* Digital Document */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelectOption('digital'); }}
                        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-orange-100/50 dark:hover:bg-orange-950/30 transition-colors group"
                    >
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm group-hover:border-orange-200 dark:group-hover:border-orange-500">
                             <Smartphone className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-orange-500 dark:group-hover:text-orange-400" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 leading-tight">Importar Digital</span>
                    </button>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center mb-3 shadow-sm">
                    <Camera className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-1">{label}</span>
                {description && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 max-w-[220px] leading-tight">{description}</span>
                )}
            </div>
        )}
    </div>
  );
}