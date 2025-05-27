import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChildProfile } from '@/lib/types';
import { WelcomeStep } from './onboarding/WelcomeStep';
import { ChildInfoStep } from './onboarding/ChildInfoStep';
import { DiagnosisStep } from './onboarding/DiagnosisStep';
import { SensoryProfileStep } from './onboarding/SensoryProfileStep';
import { CommunicationStep } from './onboarding/CommunicationStep';
import { FinalStep } from './onboarding/FinalStep';

interface OnboardingWizardProps {
  onComplete: (profileData: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const steps = [
  { id: 'welcome', title: 'Boas-vindas', component: WelcomeStep },
  { id: 'childInfo', title: 'Informações Básicas', component: ChildInfoStep },
  { id: 'diagnosis', title: 'Diagnóstico', component: DiagnosisStep },
  { id: 'sensoryProfile', title: 'Perfil Sensorial', component: SensoryProfileStep },
  { id: 'communication', title: 'Comunicação', component: CommunicationStep },
  { id: 'final', title: 'Finalização', component: FinalStep }
];

export function OnboardingWizard({ onComplete, onCancel }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Partial<ChildProfile>>({
    sensitivities: [],
    preferences: [],
    diagnoses: [],
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
  });

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const handleStepData = (stepData: Partial<ChildProfile>) => {
    setProfileData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const completeProfile = {
      ...profileData,
      age: profileData.age || 0,
      name: profileData.name || '',
      gender: profileData.gender || 'nao_informado',
      dateOfBirth: profileData.dateOfBirth || '',
      diagnoses: profileData.diagnoses || [],
      sensitivities: profileData.sensitivities || [],
      preferences: profileData.preferences || [],
      sensoryProfile: profileData.sensoryProfile!,
      communicationLevel: profileData.communicationLevel!
    } as Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>;

    onComplete(completeProfile);
  };

  const renderCurrentStep = () => {
    if (currentStep === 0) {
      // WelcomeStep props
      return (
        <CurrentStepComponent
          onNext={handleNext}
          isFirstStep={true}
        />
      );
    } else if (currentStep === steps.length - 1) {
      // FinalStep props
      return (
        <CurrentStepComponent
          data={profileData}
          onPrevious={handlePrevious}
          onComplete={handleComplete}
        />
      );
    } else {
      // Other steps props
      return (
        <CurrentStepComponent
          data={profileData}
          onDataChange={handleStepData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstStep={currentStep === 0}
        />
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl">Configuração do Perfil</CardTitle>
            <Button variant="ghost" onClick={onCancel}>
              ✕
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Etapa {currentStep + 1} de {steps.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-center font-medium">{steps[currentStep].title}</p>
          </div>
        </CardHeader>

        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>
    </div>
  );
}
