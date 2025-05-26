
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, User, Calendar, Heart, Brain } from 'lucide-react';
import { ChildProfile } from '@/lib/types';
import { ProfileForm } from './ProfileForm';

interface ProfileSelectorProps {
  profiles: ChildProfile[];
  selectedProfile: ChildProfile | null;
  onSelectProfile: (profile: ChildProfile) => void;
  onCreateProfile: (profileData: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function ProfileSelector({ 
  profiles, 
  selectedProfile, 
  onSelectProfile, 
  onCreateProfile 
}: ProfileSelectorProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateProfile = (profileData: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    onCreateProfile(profileData);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Selecione ou Crie um Perfil
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Escolha o perfil da criança para acessar suas informações
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Perfis existentes */}
        {profiles.map((profile) => (
          <Card 
            key={profile.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedProfile?.id === profile.id 
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => onSelectProfile(profile)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {profile.age} anos
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {new Date(profile.dateOfBirth).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                {profile.diagnoses.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Brain className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {profile.diagnoses.slice(0, 2).join(', ')}
                      {profile.diagnoses.length > 2 && '...'}
                    </span>
                  </div>
                )}
                {profile.preferences.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {profile.preferences.length} preferência(s)
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Card para criar novo perfil */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
              <CardContent className="flex flex-col items-center justify-center h-48 space-y-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Plus className="h-6 w-6 text-gray-500" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Novo Perfil
                  </h3>
                  <p className="text-sm text-gray-500">
                    Adicionar uma criança
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Perfil</DialogTitle>
            </DialogHeader>
            
            <ProfileForm 
              onSubmit={handleCreateProfile}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
