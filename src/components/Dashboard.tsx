
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  MessageCircle, 
  Activity, 
  Calendar,
  Video,
  TrendingUp,
  Users
} from 'lucide-react';
import { ChildProfile } from '@/lib/types';

interface DashboardProps {
  selectedProfile: ChildProfile;
  onNavigate: (page: string) => void;
}

export function Dashboard({ selectedProfile, onNavigate }: DashboardProps) {
  const menuItems = [
    {
      id: 'diario',
      title: 'Diário Digital',
      description: 'Registre eventos e momentos especiais',
      icon: BookOpen,
      color: 'bg-blue-500 hover:bg-blue-600',
      count: '12 entradas esta semana'
    },
    {
      id: 'comportamento',
      title: 'Monitoramento Comportamental',
      description: 'Acompanhe padrões e comportamentos',
      icon: Activity,
      color: 'bg-green-500 hover:bg-green-600',
      count: '3 registros hoje'
    },
    {
      id: 'assistente',
      title: 'Assistente Virtual',
      description: 'Chat inteligente para suporte e orientação',
      icon: MessageCircle,
      color: 'bg-purple-500 hover:bg-purple-600',
      count: 'Disponível 24h'
    },
    {
      id: 'comunicacao',
      title: 'Comunicação',
      description: 'PECS e rotinas visuais',
      icon: Users,
      color: 'bg-orange-500 hover:bg-orange-600',
      count: '15 cartões ativos'
    },
    {
      id: 'desenvolvimento',
      title: 'Marcos de Desenvolvimento',
      description: 'Acompanhe o progresso e conquistas',
      icon: TrendingUp,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      count: '85% concluído'
    },
    {
      id: 'analise-video',
      title: 'Análise de Vídeo',
      description: 'IA para análise comportamental',
      icon: Video,
      color: 'bg-red-500 hover:bg-red-600',
      count: '2 vídeos processados'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Bem-vindo ao Autism+ 
          </h1>
          <p className="text-gray-600 mt-1">
            Acompanhando o desenvolvimento de <span className="font-semibold text-blue-700">{selectedProfile.name}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Hoje</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center transition-colors`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.count}</span>
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate(item.id)}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Acessar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Próximas Atividades</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Terapia Ocupacional</p>
                  <p className="text-sm text-gray-600">Hoje, 14:00</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Consulta Médica</p>
                  <p className="text-sm text-gray-600">Amanhã, 10:30</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Insights Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">
                  Padrão identificado: Melhor concentração nas manhãs
                </p>
                <p className="text-xs text-purple-600 mt-1">Baseado em 7 dias de dados</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-800">
                  Progresso: 3 novos marcos alcançados esta semana
                </p>
                <p className="text-xs text-orange-600 mt-1">Comunicação e social</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
