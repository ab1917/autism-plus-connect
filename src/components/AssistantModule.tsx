
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Lightbulb } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

interface AssistantModuleProps {
  childName: string;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export function AssistantModule({ childName, messages, onSendMessage }: AssistantModuleProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Como lidar com crises sensoriais?",
    "Estratégias para melhorar a comunicação",
    "Atividades para desenvolver habilidades sociais",
    "Dicas para estabelecer rotinas",
    "Como preparar para mudanças na rotina?"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    onSendMessage(userMessage);
    
    // Simular resposta da IA
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        `Olá! Entendo sua preocupação sobre ${userMessage.toLowerCase()}. Para ${childName}, é importante manter a calma e usar estratégias sensoriais adequadas. Posso sugerir algumas técnicas específicas baseadas no perfil sensorial da criança.`,
        `Ótima pergunta! Com base no perfil de ${childName}, recomendo uma abordagem gradual. Vamos trabalhar juntos para encontrar a melhor estratégia para essa situação.`,
        `Isso é muito comum em crianças no espectro autista. Para ${childName} especificamente, sugiro começarmos com pequenos passos e muito reforço positivo. Posso detalhar algumas técnicas específicas?`
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      onSendMessage(response);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Assistente Virtual Autism+</h2>
        <p className="text-gray-600">
          Seu assistente inteligente para suporte e orientação sobre {childName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <span>Chat com IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Olá! Sou seu assistente virtual. Como posso ajudar com {childName} hoje?
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'assistant' && (
                            <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                          )}
                          {message.type === 'user' && (
                            <User className="h-4 w-4 mt-0.5 text-white" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua pergunta..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span>Sugestões</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left h-auto p-3 text-wrap"
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tópicos Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <strong>Crises Sensoriais</strong>
                  <p className="text-xs text-gray-600">Estratégias de prevenção e manejo</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <strong>Rotinas</strong>
                  <p className="text-xs text-gray-600">Como estabelecer e manter</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <strong>Comunicação</strong>
                  <p className="text-xs text-gray-600">Desenvolvimento da linguagem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
