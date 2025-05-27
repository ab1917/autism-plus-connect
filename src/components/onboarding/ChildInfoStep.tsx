
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface ChildInfoStepProps {
  data: Partial<ChildProfile>;
  onDataChange: (data: Partial<ChildProfile>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
}

export function ChildInfoStep({ data, onDataChange, onNext, onPrevious, isFirstStep }: ChildInfoStepProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateAndNext = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!data.name?.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!data.age || data.age < 1 || data.age > 18) {
      newErrors.age = 'Idade deve ser entre 1 e 18 anos';
    }
    
    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = 'Data de nascimento é obrigatória';
    }

    if (!data.gender) {
      newErrors.gender = 'Gênero é obrigatório';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof ChildProfile, value: any) => {
    onDataChange({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Informações Básicas
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Vamos começar com as informações fundamentais sobre sua criança
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nome da criança *
          </label>
          <Input
            value={data.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Digite o nome completo"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Idade *
            </label>
            <Input
              type="number"
              value={data.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              placeholder="Idade"
              min="1"
              max="18"
              className={errors.age ? 'border-red-500' : ''}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Gênero *
            </label>
            <Select 
              value={data.gender || ''} 
              onValueChange={(value) => handleInputChange('gender', value)}
            >
              <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="feminino">Feminino</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
                <SelectItem value="nao_informado">Prefiro não informar</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Data de nascimento *
          </label>
          <Input
            type="date"
            value={data.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-red-500' : ''}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <Button onClick={validateAndNext} className="bg-blue-600 hover:bg-blue-700">
          Próximo
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
