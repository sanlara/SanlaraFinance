import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Institution } from '../types/institution';

interface CSVUploaderProps {
  onDataProcessed: (data: string, bank: string) => void;
  institutions: Institution[];
}

export function CSVUploader({ onDataProcessed, institutions }: CSVUploaderProps) {
  const [selectedBank, setSelectedBank] = useState<string>('');

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!selectedBank) {
      toast.error('Por favor, selecciona una institución financiera');
      return;
    }

    if (!file.name.endsWith('.csv')) {
      toast.error('Por favor, sube un archivo CSV válido');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        try {
          onDataProcessed(text, selectedBank);
          toast.success(`Archivo CSV de ${selectedBank} procesado exitosamente`, {
            duration: 4000,
            icon: '📊'
          });
        } catch (error) {
          toast.error('Error al procesar el archivo CSV. Verifica el formato del archivo.', {
            duration: 5000
          });
          console.error('CSV Processing Error:', error);
        }
      }
    };
    reader.onerror = () => {
      toast.error('Error al leer el archivo. Por favor, intenta nuevamente.', {
        duration: 4000
      });
    };
    reader.readAsText(file);

    // Reset the input value so the same file can be uploaded again if needed
    event.target.value = '';
  }, [onDataProcessed, selectedBank]);

  // Filter only bank type institutions
  const banks = institutions.filter(inst => inst.type === 'bank');

  if (banks.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-accent/70 mb-2">
          No hay instituciones bancarias configuradas.
        </p>
        <p className="text-sm text-accent/50">
          Primero debes crear al menos un banco en la sección de Recursos.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Step 1: Bank Selection */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-primary text-sm font-medium">
            1
          </div>
          <h3 className="text-lg font-medium text-accent">
            Escoge una institución financiera
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banks.map((bank) => {
            const isSelected = selectedBank === bank.name;
            return (
              <label
                key={bank.id}
                className={`
                  relative flex items-center gap-3 p-4
                  border rounded-xl cursor-pointer
                  transition-all duration-200
                  ${isSelected ? 'border-accent bg-accent/10' : 'border-accent/20 hover:border-accent/30'}
                `}
              >
                <input
                  type="radio"
                  name="bank"
                  value={bank.name}
                  checked={isSelected}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="
                    relative appearance-none w-5 h-5
                    border-2 rounded-full
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-1 focus:ring-offset-[#333333]
                    border-accent/30
                    checked:border-accent
                    after:content-['']
                    after:block
                    after:w-2.5
                    after:h-2.5
                    after:rounded-full
                    after:absolute
                    after:top-1/2
                    after:left-1/2
                    after:-translate-x-1/2
                    after:-translate-y-1/2
                    after:bg-accent
                    after:scale-0
                    after:transition-transform
                    after:duration-200
                    checked:after:scale-100
                  "
                />
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: bank.color }}
                  />
                  <span className="text-base font-medium text-accent">
                    {bank.name}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Step 2: File Upload */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-primary text-sm font-medium">
            2
          </div>
          <h3 className="text-lg font-medium text-accent">
            Sube un archivo .csv con tus transacciones
          </h3>
        </div>
        <label className={`
          flex flex-col items-center justify-center
          border-2 border-accent/20 border-dashed rounded-xl
          ${selectedBank ? 'cursor-pointer hover:bg-accent/5' : 'bg-accent/5 cursor-not-allowed'} 
          transition-colors p-10
        `}>
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className={`w-10 h-10 mb-4 ${selectedBank ? 'text-accent' : 'text-accent/40'}`} />
            {selectedBank ? (
              <>
                <p className="text-lg text-accent font-medium mb-2">
                  Subir archivo CSV
                </p>
                <p className="text-sm text-accent/70">
                  Arrastra y suelta aquí o haz click para seleccionar
                </p>
              </>
            ) : (
              <p className="text-lg text-accent/50 font-medium">
                Primero selecciona una institución financiera
              </p>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={!selectedBank}
          />
        </label>
      </div>
    </div>
  );
}