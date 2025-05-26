
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, User } from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface ProfileSelectorProps {
  profiles: ChildProfile[];
  selectedProfile: ChildProfile | null;
  onSelectProfile: (profile: ChildProfile) => void;
  onCreateProfile: (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function ProfileSelector({ profiles, selectedProfile, onSelectProfile, onCreateProfile }: ProfileSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    
    const newProfile = {
      name: formData.name,
      age: parseInt(formData.age),
      dateOfBirth: formData.dateOfBirth,
      diagnoses: formData.diagnoses.split(',').map(d => d.trim()).filter(Boolean),
      sensitivities: formData.sensitivities.split(',').map(s => s.trim()).filter(Boolean),
      preferences: formData.preferences.split(',').map(p => p.trim()).filter(Boolean),
    };

    onCreateProfile(newProfile);
    setIsOpen(false);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-900">Perfis das Crianças</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Criança
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Perfil</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="diagnoses">Diagnósticos (separados por vírgula)</Label>
                <Input
                  id="diagnoses"
                  value={formData.diagnoses}
                  onChange={(e) => setFormData({ ...formData, diagnoses: e.target.value })}
                  placeholder="TEA, TDAH, etc."
                />
              </div>
              <div>
                <Label htmlFor="sensitivities">Sensibilidades (separadas por vírgula)</Label>
                <Input
                  id="sensitivities"
                  value={formData.sensitivities}
                  onChange={(e) => setFormData({ ...formData, sensitivities: e.target.value })}
                  placeholder="Ruídos altos, luzes fortes, etc."
                />
              </div>
              <div>
                <Label htmlFor="preferences">Preferências (separadas por vírgula)</Label>
                <Input
                  id="preferences"
                  value={formData.preferences}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  placeholder="Música, desenhos, etc."
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Criar Perfil
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedProfile?.id === profile.id
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectProfile(profile)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <p className="text-sm text-gray-600">{profile.age} anos</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {profile.diagnoses.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Diagnósticos:</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.diagnoses.map((diagnosis, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {diagnosis}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
