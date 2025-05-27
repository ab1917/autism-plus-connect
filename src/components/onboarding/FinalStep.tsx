
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, CheckCircle, User, Brain, Volume2, MessageCircle } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface FinalStepProps {
  data: Partial<ChildProfile>;
  onPrevious: () => void;
  onComplete: () => void;
}

export function FinalStep({ data, onPrevious, onComplete }: FinalStepProps) {
  const getSensitivityLabel = (level: string) => {
    switch (level) {
      case 'baixa': return 'Baixa';
      case 'media': return 'Moderada';
      case 'alta': return 'Alta';
      default: return 'Não definida';
    }
  };

  const getVerbalLevelLabel = (level: string) => {
    switch (level) {
      case 'nao_verbal': return 'Não Verbal';
      case 'palavras_simples': return 'Palavras Simples';
      case 'frases_curtas': return 'Frases Curtas';
      case 'conversacao_completa': return 'Conversação Completa';
      default: return 'Não definido';
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'masculino': return 'Masculino';
      case 'feminino': return 'Feminino';
      case 'outro': return 'Outro';
      case 'nao_informado': return 'Não informado';
      default: return 'Não definido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Perfil Completo!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Revise as informações antes de finalizar a criação do perfil
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Informações Básicas */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Informações Básicas
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Nome:</span>
              <p className="text-gray-600 dark:text-gray-400">{data.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Idade:</span>
              <p className="text-gray-600 dark:text-gray-400">{data.age} anos</p>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Gênero:</span>
              <p className="text-gray-600 dark:text-gray-400">{getGenderLabel(data.gender || '')}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Nascimento:</span>
              <p className="text-gray-600 dark:text-gray-400">
                {data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString('pt-BR') : 'Não informado'}
              </p>
            </div>
          </div>
        </div>

        {/* Diagnósticos */}
        {data.diagnoses && data.diagnoses.length > 0 && (
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Diagnósticos
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.diagnoses.map(diagnosis => (
                <Badge key={diagnosis} variant="secondary">
                  {diagnosis}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Perfil Sensorial */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="h-6 w-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Perfil Sensorial
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Auditivo</h4>
              <p>Ruídos altos: {getSensitivityLabel(data.sensoryProfile?.auditory.loudNoises || '')}</p>
              <p>Ruído de fundo: {getSensitivityLabel(data.sensoryProfile?.auditory.backgroundNoise || '')}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Visual</h4>
              <p>Luzes brilhantes: {getSensitivityLabel(data.sensoryProfile?.visual.brightLights || '')}</p>
              <p>Luzes piscantes: {getSensitivityLabel(data.sensoryProfile?.visual.flashingLights || '')}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Tátil</h4>
              <p>Texturas de roupas: {getSensitivityLabel(data.sensoryProfile?.tactile.clothingTextures || '')}</p>
              <p>Toque leve: {getSensitivityLabel(data.sensoryProfile?.tactile.lightTouch || '')}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Vestibular</h4>
              <p>Movimento: {getSensitivityLabel(data.sensoryProfile?.vestibular.movement || '')}</p>
              <p>Alturas: {getSensitivityLabel(data.sensoryProfile?.vestibular.heights || '')}</p>
            </div>
          </div>
        </div>

        {/* Comunicação */}
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Comunicação
            </h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Nível verbal:</span>
              <p className="text-gray-600 dark:text-gray-400">
                {getVerbalLevelLabel(data.communicationLevel?.verbalLevel || '')}
              </p>
            </div>
            
            {data.communicationLevel?.preferredMethods && data.communicationLevel.preferredMethods.length > 0 && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Métodos preferidos:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.communicationLevel.preferredMethods.map(method => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {data.communicationLevel?.strategies && data.communicationLevel.strategies.length > 0 && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Estratégias efetivas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.communicationLevel.strategies.map(strategy => (
                    <Badge key={strategy} variant="outline" className="text-xs">
                      {strategy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Parabéns!</strong> Você criou um perfil completo e detalhado. Essas informações nos ajudarão a personalizar a experiência do Autism+ para atender melhor às necessidades da sua criança. Você poderá editar essas informações a qualquer momento.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <Button onClick={onComplete} size="lg" className="bg-green-600 hover:bg-green-700 px-8">
          <CheckCircle className="h-5 w-5 mr-2" />
          Finalizar Perfil
        </Button>
      </div>
    </div>
  );
}
