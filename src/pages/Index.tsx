
import React, { useState, useEffect, useCallback } from 'react';
import { ProfileSelector } from '@/components/ProfileSelector';
import { Dashboard } from '@/components/Dashboard';
import { DiaryModule } from '@/components/DiaryModule';
import { AssistantModule } from '@/components/AssistantModule';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Moon, Sun, Heart } from 'lucide-react';
import { ChildProfile, DiaryEntry, ChatMessage } from '@/lib/types';
import { storage } from '@/lib/storage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<string>('profiles');
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    console.log('=== INICIANDO CARREGAMENTO DE DADOS ===');
    console.log('Current storage state:', storage.getAll());
    
    const storedProfiles = storage.get<ChildProfile[]>('profiles') || [];
    const storedEntries = storage.get<DiaryEntry[]>('diaryEntries') || [];
    const storedMessages = storage.get<ChatMessage[]>('chatMessages') || [];
    const storedTheme = storage.get<boolean>('isDarkMode') || false;
    
    console.log('Loaded profiles:', storedProfiles);
    console.log('Loaded entries:', storedEntries);
    console.log('Loaded messages:', storedMessages);
    console.log('Loaded theme:', storedTheme);
    
    // Aplicar os dados carregados
    setProfiles(storedProfiles);
    setDiaryEntries(storedEntries);
    setChatMessages(storedMessages);
    setIsDarkMode(storedTheme);
    
    // Marcar como carregado para evitar sobrescrita
    setIsLoaded(true);
    
    console.log('=== CARREGAMENTO CONCLUÍDO ===');

    // Se houver apenas um perfil, selecioná-lo automaticamente
    if (storedProfiles.length === 1) {
      setSelectedProfile(storedProfiles[0]);
      setCurrentPage('dashboard');
    } else if (storedProfiles.length > 1) {
      setCurrentPage('profiles');
    }
  }, []);

  // Salvar perfis apenas quando carregado e quando há mudanças reais
  useEffect(() => {
    if (!isLoaded) {
      console.log('Skipping save - not loaded yet');
      return;
    }
    
    console.log('=== SALVANDO PERFIS ===');
    console.log('Profiles to save:', profiles);
    storage.set('profiles', profiles);
    console.log('Profiles saved successfully');
  }, [profiles, isLoaded]);

  // Salvar outros dados
  useEffect(() => {
    if (!isLoaded) return;
    console.log('Saving diary entries:', diaryEntries);
    storage.set('diaryEntries', diaryEntries);
  }, [diaryEntries, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    storage.set('chatMessages', chatMessages);
  }, [chatMessages, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    storage.set('isDarkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, isLoaded]);

  const handleCreateProfile = useCallback((profileData: Omit<ChildProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('=== CRIANDO NOVO PERFIL ===');
    console.log('Profile data received:', profileData);
    
    const newProfile: ChildProfile = {
      ...profileData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('New profile created:', newProfile);
    
    setProfiles(prevProfiles => {
      const updatedProfiles = [...prevProfiles, newProfile];
      console.log('Updated profiles array:', updatedProfiles);
      console.log('Previous profiles:', prevProfiles);
      return updatedProfiles;
    });
    
    setSelectedProfile(newProfile);
    setCurrentPage('dashboard');
    
    console.log('=== PERFIL CRIADO COM SUCESSO ===');
  }, []);

  const handleSelectProfile = useCallback((profile: ChildProfile) => {
    console.log('Selecting profile:', profile);
    setSelectedProfile(profile);
    setCurrentPage('dashboard');
  }, []);

  const handleAddDiaryEntry = useCallback((entryData: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
    const newEntry: DiaryEntry = {
      ...entryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setDiaryEntries(prev => [newEntry, ...prev]);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    const isUser = chatMessages.length === 0 || chatMessages[chatMessages.length - 1].type === 'assistant';
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: isUser ? 'user' : 'assistant',
      content,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  }, [chatMessages]);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  const handleBack = useCallback(() => {
    if (currentPage === 'dashboard' && profiles.length > 1) {
      setCurrentPage('profiles');
      setSelectedProfile(null);
    } else if (currentPage !== 'profiles' && currentPage !== 'dashboard') {
      setCurrentPage('dashboard');
    }
  }, [currentPage, profiles.length]);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'profiles': return 'Selecionar Perfil';
      case 'dashboard': return 'Dashboard';
      case 'diario': return 'Diário Digital';
      case 'assistente': return 'Assistente Virtual';
      default: return 'Autism+';
    }
  };

  const filteredDiaryEntries = selectedProfile 
    ? diaryEntries.filter(entry => entry.childId === selectedProfile.id)
    : [];

  // Mostrar loading enquanto carrega
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando Autism+...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {(currentPage !== 'profiles' && (currentPage !== 'dashboard' || profiles.length > 1)) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="bg-white/80 hover:bg-white border-blue-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Autism+
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {getPageTitle()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white/80 hover:bg-white border-blue-200"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            {selectedProfile && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/80 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">{selectedProfile.name}</span>
              </div>
            )}
          </div>
        </header>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <p className="text-sm font-bold">Debug Info:</p>
            <p className="text-sm">Perfis carregados: {profiles.length}</p>
            <p className="text-sm">Perfil selecionado: {selectedProfile?.name || 'Nenhum'}</p>
            <p className="text-sm">Storage total: {JSON.stringify(storage.getAll()).length} chars</p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => console.log('Current state:', { profiles, selectedProfile, currentPage })}
              className="mt-2"
            >
              Log Current State
            </Button>
          </div>
        )}

        {/* Main Content */}
        <main>
          {currentPage === 'profiles' && (
            <ProfileSelector
              profiles={profiles}
              selectedProfile={selectedProfile}
              onSelectProfile={handleSelectProfile}
              onCreateProfile={handleCreateProfile}
            />
          )}

          {currentPage === 'dashboard' && selectedProfile && (
            <Dashboard
              selectedProfile={selectedProfile}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'diario' && selectedProfile && (
            <DiaryModule
              childId={selectedProfile.id}
              entries={filteredDiaryEntries}
              onAddEntry={handleAddDiaryEntry}
            />
          )}

          {currentPage === 'assistente' && selectedProfile && (
            <AssistantModule
              childName={selectedProfile.name}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
            />
          )}

          {!['profiles', 'dashboard', 'diario', 'assistente'].includes(currentPage) && (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Módulo em Desenvolvimento
                  </h3>
                  <p className="text-gray-500">
                    Esta funcionalidade estará disponível em breve.
                  </p>
                  <Button 
                    onClick={() => setCurrentPage('dashboard')} 
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Voltar ao Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Autism+ © 2024 - Desenvolvido com 💙 para apoiar famílias e profissionais
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
