
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Smile, Meh, Frown } from 'lucide-react';
import { DiaryEntry } from '@/lib/types';

interface DiaryModuleProps {
  childId: string;
  entries: DiaryEntry[];
  onAddEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void;
}

export function DiaryModule({ childId, entries, onAddEntry }: DiaryModuleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    category: 'cotidiano' as DiaryEntry['category'],
    title: '',
    content: '',
    mood: 3 as DiaryEntry['mood'],
    tags: ''
  });

  const categories = {
    escola: { label: 'Escola', color: 'bg-blue-100 text-blue-800' },
    terapia: { label: 'Terapia', color: 'bg-green-100 text-green-800' },
    medico: { label: 'Médico', color: 'bg-red-100 text-red-800' },
    cotidiano: { label: 'Cotidiano', color: 'bg-gray-100 text-gray-800' }
  };

  const moodIcons = {
    1: { icon: Frown, color: 'text-red-500', label: 'Muito difícil' },
    2: { icon: Frown, color: 'text-orange-500', label: 'Difícil' },
    3: { icon: Meh, color: 'text-yellow-500', label: 'Normal' },
    4: { icon: Smile, color: 'text-green-500', label: 'Bom' },
    5: { icon: Smile, color: 'text-blue-500', label: 'Excelente' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry = {
      childId,
      date: new Date().toISOString().split('T')[0],
      category: formData.category,
      title: formData.title,
      content: formData.content,
      mood: formData.mood,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    onAddEntry(newEntry);
    setIsOpen(false);
    setFormData({
      category: 'cotidiano',
      title: '',
      content: '',
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-900">Diário Digital</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova Entrada no Diário</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as DiaryEntry['category'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categories).map(([key, cat]) => (
                      <SelectItem key={key} value={key}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="content">Descrição</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label>Como foi o dia?</Label>
                <div className="flex space-x-2 mt-2">
                  {Object.entries(moodIcons).map(([mood, config]) => {
                    const Icon = config.icon;
                    const moodNum = parseInt(mood) as DiaryEntry['mood'];
                    return (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => setFormData({ ...formData, mood: moodNum })}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          formData.mood === moodNum
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${config.color}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="escola, amigos, brincadeira"
                />
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Salvar Entrada
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar entradas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Object.entries(categories).map(([key, cat]) => (
              <SelectItem key={key} value={key}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-gray-500">Nenhuma entrada encontrada. Que tal criar a primeira?</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => {
            const category = categories[entry.category];
            const moodConfig = moodIcons[entry.mood];
            const MoodIcon = moodConfig.icon;
            
            return (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className={category.color}>{category.label}</Badge>
                      <h3 className="font-semibold">{entry.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MoodIcon className={`h-5 w-5 ${moodConfig.color}`} />
                      <span className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{entry.content}</p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
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
