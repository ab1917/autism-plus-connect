import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface ProfileFormProps {
  onSubmit: (profileData: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
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

const commonSensitivities = [
  'Sensibilidade a ruídos altos',
  'Sensibilidade a luzes brilhantes',
  'Sensibilidade tátil (texturas)',
  'Sensibilidade a odores',
  'Sensibilidade a sabores',
  'Sensibilidade ao toque',
  'Dificuldade com mudanças de rotina',
  'Sensibilidade a multidões',
  'Sensibilidade a temperaturas',
  'Sensibilidade vestibular (movimento)'
];

const commonPreferences = [
  'Música calma',
  'Espaços silenciosos',
  'Rotinas estruturadas',
  'Objetos texturizados',
  'Brinquedos fidget',
  'Atividades visuais',
  'Quebra-cabeças',
  'Desenho e pintura',
  'Tecnologia/tablets',
  'Atividades físicas',
  'Animais de estimação',
  'Histórias e livros'
];

export function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'nao_informado' as 'masculino' | 'feminino' | 'outro' | 'nao_informado',
    dateOfBirth: '',
    diagnoses: [] as string[],
    sensitivities: [] as string[],
    preferences: [] as string[]
  });

  const [customInputs, setCustomInputs] = useState({
    diagnosis: '',
    sensitivity: '',
    preference: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    console.log('Validating form with data:', formData);
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 18) {
      newErrors.age = 'Idade deve ser entre 1 e 18 anos';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Data de nascimento é obrigatória';
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Raw form data:', formData);
    
    if (!validateForm()) {
      console.log('❌ Validation failed:', errors);
      return;
    }
    
    const profileData: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      diagnoses: formData.diagnoses,
      sensitivities: formData.sensitivities,
      preferences: formData.preferences,
      sensoryProfile: {
        auditory: { loudNoises: 'media', specificSounds: [], backgroundNoise: 'media' },
        visual: { brightLights: 'media', flashingLights: 'media', visualPatterns: 'media' },
        tactile: { clothingTextures: 'media', lightTouch: 'media', foodTextures: 'media' },
        vestibular: { movement: 'media', heights: 'media', spinning: 'media' }
      },
      communicationLevel: {
        verbalLevel: 'palavras_simples',
        preferredMethods: [],
        strategies: []
      }
    };

    console.log('✅ Validation passed. Submitting profile data:', profileData);
    
    try {
      onSubmit(profileData);
      console.log('✅ Profile submitted successfully');
    } catch (error) {
      console.error('❌ Error submitting profile:', error);
    }
  };

  const addItem = (category: 'diagnoses' | 'sensitivities' | 'preferences', item: string) => {
    if (item && !formData[category].includes(item)) {
      console.log(`Adding ${item} to ${category}`);
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], item]
      }));
    } else {
      console.log(`Item ${item} already exists in ${category} or is empty`);
    }
  };

  const removeItem = (category: 'diagnoses' | 'sensitivities' | 'preferences', item: string) => {
    console.log(`Removing ${item} from ${category}`);
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i !== item)
    }));
  };

  const addCustomItem = (category: 'diagnoses' | 'sensitivities' | 'preferences') => {
    const inputKey = category === 'diagnoses' ? 'diagnosis' : 
                     category === 'sensitivities' ? 'sensitivity' : 'preference';
    const value = customInputs[inputKey].trim();
    
    if (value) {
      console.log(`Adding custom ${inputKey}: ${value}`);
      addItem(category, value);
      setCustomInputs(prev => ({ ...prev, [inputKey]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Nome da criança *
        </label>
        <Input
          value={formData.name}
          onChange={(e) => {
            console.log('Name changed to:', e.target.value);
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          placeholder="Digite o nome"
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
            value={formData.age}
            onChange={(e) => {
              console.log('Age changed to:', e.target.value);
              setFormData({ ...formData, age: e.target.value });
              if (errors.age) setErrors({ ...errors, age: '' });
            }}
            placeholder="Idade em anos"
            min="1"
            max="18"
            className={errors.age ? 'border-red-500' : ''}
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Data de nascimento *
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => {
              console.log('Date of birth changed to:', e.target.value);
              setFormData({ ...formData, dateOfBirth: e.target.value });
              if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
            }}
            className={errors.dateOfBirth ? 'border-red-500' : ''}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Gênero *
        </label>
        <Select 
          value={formData.gender} 
          onValueChange={(value: 'masculino' | 'feminino' | 'outro' | 'nao_informado') => {
            console.log('Gender changed to:', value);
            setFormData({ ...formData, gender: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o gênero" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50">
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="feminino">Feminino</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
            <SelectItem value="nao_informado">Prefiro não informar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Diagnósticos
        </label>
        <div className="space-y-3">
          <Select onValueChange={(value) => addItem('diagnoses', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um diagnóstico comum" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50">
              {commonDiagnoses.map((diagnosis) => (
                <SelectItem key={diagnosis} value={diagnosis}>
                  {diagnosis}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Input
              value={customInputs.diagnosis}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="Adicionar diagnóstico personalizado"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem('diagnoses'))}
            />
            <Button type="button" onClick={() => addCustomItem('diagnoses')} size="sm">
              Adicionar
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.diagnoses.map((diagnosis) => (
              <Badge key={diagnosis} variant="secondary" className="flex items-center gap-1">
                {diagnosis}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem('diagnoses', diagnosis)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Sensibilidades
        </label>
        <div className="space-y-3">
          <Select onValueChange={(value) => addItem('sensitivities', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma sensibilidade comum" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50">
              {commonSensitivities.map((sensitivity) => (
                <SelectItem key={sensitivity} value={sensitivity}>
                  {sensitivity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Input
              value={customInputs.sensitivity}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, sensitivity: e.target.value }))}
              placeholder="Adicionar sensibilidade personalizada"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem('sensitivities'))}
            />
            <Button type="button" onClick={() => addCustomItem('sensitivities')} size="sm">
              Adicionar
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.sensitivities.map((sensitivity) => (
              <Badge key={sensitivity} variant="secondary" className="flex items-center gap-1">
                {sensitivity}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem('sensitivities', sensitivity)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Preferências
        </label>
        <div className="space-y-3">
          <Select onValueChange={(value) => addItem('preferences', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma preferência comum" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50">
              {commonPreferences.map((preference) => (
                <SelectItem key={preference} value={preference}>
                  {preference}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Input
              value={customInputs.preference}
              onChange={(e) => setCustomInputs(prev => ({ ...prev, preference: e.target.value }))}
              placeholder="Adicionar preferência personalizada"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem('preferences'))}
            />
            <Button type="button" onClick={() => addCustomItem('preferences')} size="sm">
              Adicionar
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.preferences.map((preference) => (
              <Badge key={preference} variant="secondary" className="flex items-center gap-1">
                {preference}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeItem('preferences', preference)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Criar Perfil
        </Button>
      </div>
    </form>
  );
}
