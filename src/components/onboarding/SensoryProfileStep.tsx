
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Volume2, Eye, Hand, RotateCcw } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface SensoryProfileStepProps {
  data: Partial<ChildProfile>;
  onDataChange: (data: Partial<ChildProfile>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const sensitivityLevels = [
  { value: 'baixa', label: 'Baixa Sensibilidade', color: 'text-green-600' },
  { value: 'media', label: 'Sensibilidade Moderada', color: 'text-yellow-600' },
  { value: 'alta', label: 'Alta Sensibilidade', color: 'text-red-600' }
];

export function SensoryProfileStep({ data, onDataChange, onNext, onPrevious }: SensoryProfileStepProps) {
  const updateSensoryProfile = (category: string, field: string, value: string) => {
    const currentProfile = data.sensoryProfile || {
      auditory: { loudNoises: 'media', specificSounds: [], backgroundNoise: 'media' },
      visual: { brightLights: 'media', flashingLights: 'media', visualPatterns: 'media' },
      tactile: { clothingTextures: 'media', lightTouch: 'media', foodTextures: 'media' },
      vestibular: { movement: 'media', heights: 'media', spinning: 'media' }
    };

    onDataChange({
      sensoryProfile: {
        ...currentProfile,
        [category]: {
          ...currentProfile[category as keyof typeof currentProfile],
          [field]: value
        }
      }
    });
  };

  const sensoryProfile = data.sensoryProfile;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Perfil Sensorial
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Mapeie as sensibilidades sensoriais da criança para personalizar melhor a experiência
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Sensibilidades Auditivas */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Sensibilidades Auditivas
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ruídos Altos</label>
              <Select 
                value={sensoryProfile?.auditory.loudNoises || 'media'} 
                onValueChange={(value) => updateSensoryProfile('auditory', 'loudNoises', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ruído de Fundo</label>
              <Select 
                value={sensoryProfile?.auditory.backgroundNoise || 'media'} 
                onValueChange={(value) => updateSensoryProfile('auditory', 'backgroundNoise', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Sensibilidades Visuais */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-6 w-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Sensibilidades Visuais
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Luzes Brilhantes</label>
              <Select 
                value={sensoryProfile?.visual.brightLights || 'media'} 
                onValueChange={(value) => updateSensoryProfile('visual', 'brightLights', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Luzes Piscantes</label>
              <Select 
                value={sensoryProfile?.visual.flashingLights || 'media'} 
                onValueChange={(value) => updateSensoryProfile('visual', 'flashingLights', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Padrões Visuais</label>
              <Select 
                value={sensoryProfile?.visual.visualPatterns || 'media'} 
                onValueChange={(value) => updateSensoryProfile('visual', 'visualPatterns', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Sensibilidades Táteis */}
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Hand className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Sensibilidades Táteis
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Texturas de Roupas</label>
              <Select 
                value={sensoryProfile?.tactile.clothingTextures || 'media'} 
                onValueChange={(value) => updateSensoryProfile('tactile', 'clothingTextures', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Toque Leve</label>
              <Select 
                value={sensoryProfile?.tactile.lightTouch || 'media'} 
                onValueChange={(value) => updateSensoryProfile('tactile', 'lightTouch', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Texturas de Alimentos</label>
              <Select 
                value={sensoryProfile?.tactile.foodTextures || 'media'} 
                onValueChange={(value) => updateSensoryProfile('tactile', 'foodTextures', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Sensibilidades Vestibulares */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Sensibilidades Vestibulares
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Movimento</label>
              <Select 
                value={sensoryProfile?.vestibular.movement || 'media'} 
                onValueChange={(value) => updateSensoryProfile('vestibular', 'movement', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Alturas</label>
              <Select 
                value={sensoryProfile?.vestibular.heights || 'media'} 
                onValueChange={(value) => updateSensoryProfile('vestibular', 'heights', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Giros</label>
              <Select 
                value={sensoryProfile?.vestibular.spinning || 'media'} 
                onValueChange={(value) => updateSensoryProfile('vestibular', 'spinning', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
