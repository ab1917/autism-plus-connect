
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Lightbulb, Heart, Brain, HelpCircle } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

interface AssistantModuleProps {
  childName: string;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

export function AssistantModule({ childName, messages, onSendMessage }: AssistantModuleProps) {
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    {
      icon: Brain,
      title: 'Estratégias de comunicação',
      message: `Como posso melhorar a comunicação com ${childName}?`
    },
    {
      icon: Heart,
      title: 'Manejo de crises',
      message: `${childName} está tendo uma crise. Como posso ajudar?`
    },
    {
      icon: Lightbulb,
      title: 'Atividades sensoriais',
      message: `Que atividades sensoriais são adequadas para ${childName}?`
    },
    {
      icon: HelpCircle,
      title: 'Rotinas diárias',
      message: `Como estabelecer uma rotina eficaz para ${childName}?`
    }
  ];

  const predefinedResponses = {
    'comunicação': 'Para melhorar a comunicação, considere usar recursos visuais como cartões PECS, manter contato visual gentil, usar linguagem simples e clara, e dar tempo para processamento. Cada criança é única, então observe o que funciona melhor.',
    'crise': 'Durante uma crise, mantenha a calma, reduza estímulos sensoriais (luzes, sons), ofereça um local seguro, use técnicas de respiração, e valide os sentimentos da criança. Evite tocar sem permissão e fale em tom suave.',
    'atividades sensoriais': 'Atividades sensoriais podem incluir: massinha de modelar, caixas sensoriais com diferentes texturas, música calma, balanço, atividades com água, e pintura com dedos. Observe as preferências e sensibilidades da criança.',
    'rotina': 'Para estabelecer rotinas eficazes: use apoios visuais (calendários, cronogramas), mantenha consistência, prepare antecipadamente para mudanças, inclua atividades preferidas, e seja flexível quando necessário.'
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      
      // Simular resposta do assistente
      setTimeout(() => {
        const lowerMessage = inputMessage.toLowerCase();
        let response = 'Entendo sua preocupação. Cada criança no espectro autista é única, e é importante observar e adaptar estratégias às necessidades individuais. Posso ajudar com orientações específicas se você compartilhar mais detalhes.';
        
        // Buscar resposta baseada em palavras-chave
        for (const [key, value] of Object.entries(predefinedResponses)) {
          if (lowerMessage.includes(key)) {
            response = value;
            break;
          }
        }
        
        onSendMessage(response);
      }, 1500);
      
      setInputMessage('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-200px)] flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Assistente Virtual
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Suporte especializado em autismo para {childName}
        </p>
      </div>

      {/* Sugestões rápidas */}
      {messages.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => handleSuggestionClick(suggestion.message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {suggestion.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Chat messages */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>Chat com o Assistente</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea 
            ref={scrollAreaRef}
            className="flex-1 p-4 max-h-96"
          >
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Olá! Sou seu assistente especializado em autismo.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Como posso ajudar você e {childName} hoje?
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  
                  <div className={`flex-1 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
