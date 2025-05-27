
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, MessageCircle, Plus } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface CommunicationStepProps {
  data: Partial<ChildProfile>;
  onDataChange: (data: Partial<ChildProfile>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const verbalLevels = [
  { value: 'nao_verbal', label: 'Não Verbal' },
  { value: 'palavras_simples', label: 'Palavras Simples' },
  { value: 'frases_curtas', label: 'Frases Curtas' },
  { value: 'conversacao_completa', label: 'Conversação Completa' }
];

const commonMethods = [
  'Linguagem de sinais',
  'Cartões PECS',
  'Gestos',
  'Aplicativos de comunicação',
  'Comunicação por imagens',
  'Linguagem corporal',
  'Vocalização/sons',
  'Escrita'
];

const commonStrategies = [
  'Espera extra para resposta',
  'Instruções visuais',
  'Rotinas de comunicação',
  'Ambiente calmo',
  'Validação de sentimentos',
  'Repetição de instruções',
  'Comunicação simples e direta',
  'Apoio visual constante'
];

export function CommunicationStep({ data, onDataChange, onNext, onPrevious }: CommunicationStepProps) {
  const [customMethod, setCustomMethod] = useState('');
  const [customStrategy, setCustomStrategy] = useState('');

  const updateCommunication = (field: string, value: any) => {
    const currentComm = data.communicationLevel || {
      verbalLevel: 'palavras_simples',
      preferredMethods: [],
      strategies: []
    };

    onDataChange({
      communicationLevel: {
        ...currentComm,
        [field]: value
      }
    });
  };

  const addMethod = (method: string) => {
    const current = data.communicationLevel?.preferredMethods || [];
    if (method && !current.includes(method)) {
      updateCommunication('preferredMethods', [...current, method]);
    }
  };

  const removeMethod = (method: string) => {
    const current = data.communicationLevel?.preferredMethods || [];
    updateCommunication('preferredMethods', current.filter(m => m !== method));
  };

  const addStrategy = (strategy: string) => {
    const current = data.communicationLevel?.strategies || [];
    if (strategy && !current.includes(strategy)) {
      updateCommunication('strategies', [...current, strategy]);
    }
  };

  const removeStrategy = (strategy: string) => {
    const current = data.communicationLevel?.strategies || [];
    updateCommunication('strategies', current.filter(s => s !== strategy));
  };

  const addCustomMethod = () => {
    if (customMethod.trim()) {
      addMethod(customMethod.trim());
      setCustomMethod('');
    }
  };

  const addCustomStrategy = () => {
    if (customStrategy.trim()) {
      addStrategy(customStrategy.trim());
      setCustomStrategy('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Comunicação
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Vamos entender como sua criança se comunica melhor e quais estratégias são mais efetivas
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Nível Verbal */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Nível de Comunicação Verbal
            </h3>
          </div>
          
          <Select 
            value={data.communicationLevel?.verbalLevel || 'palavras_simples'} 
            onValueChange={(value) => updateCommunication('verbalLevel', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {verbalLevels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Métodos Preferidos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Métodos de Comunicação Preferidos
          </h3>
          
          <div>
            <Select onValueChange={addMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um método de comunicação" />
              </SelectTrigger>
              <SelectContent>
                {commonMethods.map(method => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              value={customMethod}
              onChange={(e) => setCustomMethod(e.target.value)}
              placeholder="Adicionar método personalizado"
              onKeyPress={(e) => e.key === 'Enter' && addCustomMethod()}
            />
            <Button type="button" onClick={addCustomMethod} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {data.communicationLevel?.preferredMethods && data.communicationLevel.preferredMethods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.communicationLevel.preferredMethods.map(method => (
                <Badge key={method} variant="secondary" className="flex items-center gap-1">
                  {method}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeMethod(method)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Estratégias Efetivas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Estratégias de Comunicação Efetivas
          </h3>
          
          <div>
            <Select onValueChange={addStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma estratégia" />
              </SelectTrigger>
              <SelectContent>
                {commonStrategies.map(strategy => (
                  <SelectItem key={strategy} value={strategy}>
                    {strategy}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              value={customStrategy}
              onChange={(e) => setCustomStrategy(e.target.value)}
              placeholder="Adicionar estratégia personalizada"
              onKeyPress={(e) => e.key === 'Enter' && addCustomStrategy()}
            />
            <Button type="button" onClick={addCustomStrategy} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {data.communicationLevel?.strategies && data.communicationLevel.strategies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.communicationLevel.strategies.map(strategy => (
                <Badge key={strategy} variant="secondary" className="flex items-center gap-1">
                  {strategy}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeStrategy(strategy)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
            💬 Dica de Comunicação
          </h4>
          <p className="text-sm text-green-700 dark:text-green-300">
            Lembre-se de que cada criança é única. As estratégias de comunicação podem variar dependendo do contexto, humor e ambiente. É importante ser flexível e adaptar a abordagem conforme necessário.
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
