
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, User, Calendar, Heart, Brain } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

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
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dateOfBirth: '',
    diagnoses: '',
    sensitivities: '',
    preferences: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileData = {
      name: formData.name,
      age: parseInt(formData.age),
      dateOfBirth: formData.dateOfBirth,
      diagnoses: formData.diagnoses.split(',').map(d => d.trim()).filter(d => d),
      sensitivities: formData.sensitivities.split(',').map(s => s.trim()).filter(s => s),
      preferences: formData.preferences.split(',').map(p => p.trim()).filter(p => p)
    };

    onCreateProfile(profileData);
    setIsCreateDialogOpen(false);
    setFormData({
      name: '',
      age: '',
      dateOfBirth: '',
      diagnoses: '',
      sensitivities: '',
      preferences: ''
    });
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

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Perfil</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome da criança *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Digite o nome"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Idade *
                </label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Idade em anos"
                  min="1"
                  max="18"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Data de nascimento *
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Diagnósticos
                </label>
                <Input
                  value={formData.diagnoses}
                  onChange={(e) => setFormData({ ...formData, diagnoses: e.target.value })}
                  placeholder="Separados por vírgula"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Sensibilidades
                </label>
                <Textarea
                  value={formData.sensitivities}
                  onChange={(e) => setFormData({ ...formData, sensitivities: e.target.value })}
                  placeholder="Separadas por vírgula"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferências
                </label>
                <Textarea
                  value={formData.preferences}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  placeholder="Separadas por vírgula"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Criar Perfil
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
