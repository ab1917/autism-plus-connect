
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface DiagnosisStepProps {
  data: Partial<ChildProfile>;
  onDataChange: (data: Partial<ChildProfile>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const commonDiagnoses = [
  'Transtorno do Espectro Autista (TEA)',
  'Síndrome de Asperger',
  'Transtorno de Déficit de Atenção e Hiperatividade (TDAH)',
  'Transtorno de Ansiedade',
  'Transtorno Obsessivo-Compulsivo (TOC)',
  'Síndrome de Down',
  'Transtorno do Processamento Sensorial',
  'Dislexia',
  'Apraxia da Fala',
  'Deficiência Intelectual'
];

export function DiagnosisStep({ data, onDataChange, onNext, onPrevious }: DiagnosisStepProps) {
  const [customDiagnosis, setCustomDiagnosis] = useState('');

  const addDiagnosis = (diagnosis: string) => {
    if (diagnosis && !data.diagnoses?.includes(diagnosis)) {
      onDataChange({
        diagnoses: [...(data.diagnoses || []), diagnosis]
      });
    }
  };

  const removeDiagnosis = (diagnosis: string) => {
    onDataChange({
      diagnoses: data.diagnoses?.filter(d => d !== diagnosis) || []
    });
  };

  const addCustomDiagnosis = () => {
    if (customDiagnosis.trim()) {
      addDiagnosis(customDiagnosis.trim());
      setCustomDiagnosis('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Diagnósticos
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Selecione os diagnósticos relevantes. Você pode adicionar múltiplos diagnósticos e informações sobre comorbidades.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Diagnósticos Comuns
          </label>
          <Select onValueChange={addDiagnosis}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um diagnóstico" />
            </SelectTrigger>
            <SelectContent>
              {commonDiagnoses.map((diagnosis) => (
                <SelectItem key={diagnosis} value={diagnosis}>
                  {diagnosis}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Diagnóstico Personalizado
          </label>
          <div className="flex gap-2">
            <Input
              value={customDiagnosis}
              onChange={(e) => setCustomDiagnosis(e.target.value)}
              placeholder="Digite um diagnóstico específico"
              onKeyPress={(e) => e.key === 'Enter' && addCustomDiagnosis()}
            />
            <Button type="button" onClick={addCustomDiagnosis} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data.diagnoses && data.diagnoses.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Diagnósticos Selecionados
            </label>
            <div className="flex flex-wrap gap-2">
              {data.diagnoses.map((diagnosis) => (
                <Badge key={diagnosis} variant="secondary" className="flex items-center gap-1">
                  {diagnosis}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeDiagnosis(diagnosis)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
            💡 Dica Importante
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Se sua criança não possui um diagnóstico formal ainda, você pode pular esta etapa e adicionar informações posteriormente. O importante é que você se sinta confortável compartilhando as informações que tem disponíveis.
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
