
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Tag, Smile, Meh, Frown, Search, Filter } from 'lucide-react';
import { DiaryEntry } from '@/lib/types';

interface DiaryModuleProps {
  childId: string;
  entries: DiaryEntry[];
  onAddEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void;
}

export function DiaryModule({ childId, entries, onAddEntry }: DiaryModuleProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'cotidiano' as DiaryEntry['category'],
    mood: 3 as DiaryEntry['mood'],
    tags: ''
  });

  const categories = [
    { value: 'escola', label: 'Escola', color: 'bg-blue-500' },
    { value: 'terapia', label: 'Terapia', color: 'bg-green-500' },
    { value: 'medico', label: 'Médico', color: 'bg-red-500' },
    { value: 'cotidiano', label: 'Cotidiano', color: 'bg-purple-500' }
  ];

  const moodIcons = [
    { value: 1, icon: Frown, color: 'text-red-500', label: 'Muito triste' },
    { value: 2, icon: Frown, color: 'text-orange-500', label: 'Triste' },
    { value: 3, icon: Meh, color: 'text-yellow-500', label: 'Neutro' },
    { value: 4, icon: Smile, color: 'text-green-500', label: 'Feliz' },
    { value: 5, icon: Smile, color: 'text-blue-500', label: 'Muito feliz' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData: Omit<DiaryEntry, 'id' | 'createdAt'> = {
      childId,
      date: new Date().toISOString().split('T')[0],
      title: formData.title,
      content: formData.content,
      category: formData.category,
      mood: formData.mood,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    onAddEntry(entryData);
    setIsCreateDialogOpen(false);
    setFormData({
      title: '',
      content: '',
      category: 'cotidiano',
      mood: 3,
      tags: ''
    });
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (category: string) => 
    categories.find(cat => cat.value === category) || categories[3];

  const getMoodIcon = (mood: number) => 
    moodIcons.find(m => m.value === mood) || moodIcons[2];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Diário Digital
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Registre momentos e eventos importantes
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Entrada
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Entrada no Diário</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Título *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título da entrada"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categoria
                  </label>
                  <Select value={formData.category} onValueChange={(value: DiaryEntry['category']) => 
                    setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Humor
                  </label>
                  <Select value={formData.mood.toString()} onValueChange={(value) => 
                    setFormData({ ...formData, mood: parseInt(value) as DiaryEntry['mood'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {moodIcons.map((mood) => {
                        const Icon = mood.icon;
                        return (
                          <SelectItem key={mood.value} value={mood.value.toString()}>
                            <div className="flex items-center space-x-2">
                              <Icon className={`h-4 w-4 ${mood.color}`} />
                              <span>{mood.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Conteúdo *
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Descreva o que aconteceu..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tags
                </label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Separadas por vírgula (ex: escola, progresso, comunicação)"
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
                  Salvar Entrada
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar entradas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de entradas */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <div className="text-center">
                <p className="text-gray-500 mb-2">
                  {searchTerm || filterCategory !== 'all' 
                    ? 'Nenhuma entrada encontrada' 
                    : 'Nenhuma entrada no diário ainda'
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  Criar primeira entrada
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => {
            const category = getCategoryInfo(entry.category);
            const moodInfo = getMoodIcon(entry.mood);
            const MoodIcon = moodInfo.icon;

            return (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                        <CardTitle className="text-lg">{entry.title}</CardTitle>
                        <MoodIcon className={`h-5 w-5 ${moodInfo.color}`} />
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {entry.content}
                  </p>
                  {entry.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
