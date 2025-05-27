
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Users, Target } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
  isFirstStep: boolean;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Heart className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Bem-vindo ao Autism+
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Vamos criar um perfil personalizado para sua criança. Este processo nos ajudará a entender melhor suas necessidades, preferências e características únicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Brain className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Perfil Personalizado</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Coletamos informações sobre diagnósticos, sensibilidades e preferências para personalizar a experiência.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Comunicação Efetiva</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Identificamos as melhores formas de comunicação e estratégias que funcionam para sua criança.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Target className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Mapeamento Sensorial</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Criamos um perfil sensorial detalhado para melhor compreender as necessidades específicas.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <Heart className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Suporte Contínuo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Oferecemos ferramentas e recursos para acompanhar o desenvolvimento e bem-estar.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Importante:</strong> Todas as informações são armazenadas de forma segura e podem ser editadas a qualquer momento. Este processo leva cerca de 5-10 minutos para ser concluído.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
        Começar Configuração
      </Button>
    </div>
  );
}
