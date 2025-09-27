import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lock, MessageCircle, TrendingUp, Plus, Send, Mic, Trash2, Search, Bot, User, Menu, Volume2, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useChatHistory } from '@/hooks/useChatHistory';
import { cn } from '@/lib/utils';
import { generateGeminiResponse } from '@/lib/gemini';
import { useLanguage } from '@/hooks/useLanguage';
import { Languages } from 'lucide-react';

export default function Chat() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const {
    sessions,
    currentSession,
    messages,
    loading: chatLoading,
    createSession,
    addMessage,
    deleteSession,
    loadSession,
  } = useChatHistory();

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Quick prompts for farmers (EN/ML)
  const quickPrompts = language === 'en'
    ? [
        'Which crop should I grow today in Kerala?',
        'What are the best pest control methods for rice this month?',
        "Today’s weather and planting advice for Thrissur",
        'Current market price for banana in Kochi?'
      ]
    : [
        'കേരളത്തിൽ ഇന്ന് ഞാൻ ഏത് വിള കൃഷി ചെയ്യണം?',
        'ഈ മാസം നെല്ലിന് മികച്ച കീടനിയന്ത്രണ മാർഗങ്ങൾ എന്തെല്ലാം?',
        'ത്രിശ്ശൂരിന് ഇന്നത്തെ കാലാവസ്ഥയും കൃഷി നിർദേശവും',
        'കൊച്ചിയിലെ വാഴയ്ക്കിന്റെ ഇന്നത്തെ മാർക്കറ്റ് വില?'
      ];

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async (overrideMessage?: string) => {
    const candidate = overrideMessage ?? newMessage;
    if (!candidate.trim() || isProcessing) return;
    const userMessage = candidate.trim();
    setNewMessage('');
    setIsProcessing(true);

    try {
      let sessionToUse = currentSession;
      if (!sessionToUse) {
        sessionToUse = await createSession();
        if (!sessionToUse) return;
      }

  await addMessage(userMessage, 'user', sessionToUse.id);
  const aiResponse = await generateGeminiResponse(userMessage, {
    language,
    history: messages.map(m => ({ role: m.role, content: m.content })),
  });
    await addMessage(aiResponse, 'assistant', sessionToUse.id);
    // Speak AI response aloud
    speakText(aiResponse);

    } catch (error) {
      console.error('Error sending message:', error);
      await addMessage("⚠️ Unable to get response from AI.", "assistant", currentSession?.id || "");
    } finally {
      setIsProcessing(false);
    }
  };

  // Text-to-Speech helpers
  const speakText = (text: string) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      // Prefer Malayalam voice if ml, else Indian English for en
  // Prefer Malayalam voice if ml; fall back to English if not available
  utter.lang = language === 'en' ? 'en-IN' : 'ml-IN';
      utter.rate = 1;
      utter.pitch = 1;
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // no-op if TTS fails
    }
  };

  const stopSpeaking = () => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
    } finally {
      setIsSpeaking(false);
    }
  };

  // Cleanup any ongoing speech on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  

  // Send a predefined quick prompt directly
  const sendPrompt = async (prompt: string) => {
    if (isProcessing) return;
    await handleSendMessage(prompt);
  };

  const handleNewChat = async () => {
    await createSession();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full gradient-hero mb-6">
              <Lock className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {language === 'en' ? 'AI Chat Assistant' : 'AI ചാറ്റ് സഹായി'}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {language === 'en'
                ? 'Please sign in to access the AI-powered farming assistant. Get personalized advice for all your farming needs.'
                : 'AI ശക്തിയുള്ള കൃഷി സഹായിയെ ആക്‌സസ് ചെയ്യാൻ ദയവായി സൈൻ ഇൻ ചെയ്യുക. നിങ്ങളുടെ എല്ലാ കൃഷി ആവശ്യങ്ങൾക്കും വ്യക്തിഗതമാക്കിയ ഉപദേശം നേടുക.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {language === 'en' ? 'Smart Conversations' : 'സ്മാർട്ട് സംഭാഷണങ്ങൾ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {language === 'en'
                    ? 'Chat with AI about farming techniques, crop diseases, weather patterns, and more.'
                    : 'കൃഷി സാങ്കേതികതകൾ, വിള രോഗങ്ങൾ, കാലാവസ്ഥാ പാറ്റേണുകൾ എന്നിവയെക്കുറിച്ച് AI യുമായി സംസാരിക്കുക.'}
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-crop" />
                  {language === 'en' ? 'Personalized Advice' : 'വ്യക്തിഗത ഉപദേശം'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {language === 'en'
                    ? 'Get customized recommendations based on your location, crop type, and farming history.'
                    : 'നിങ്ങളുടെ സ്ഥാനം, വിള തരം, കൃഷി ചരിത്രം എന്നിവയെ അടിസ്ഥാനമാക്കി ഇഷ്‌ടാനുസൃത ശുപാർശകൾ നേടുക.'}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl" asChild>
              <Link to="/auth">{language === 'en' ? 'Sign In' : 'സൈൻ ഇൻ'}</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Don't have an account?" : 'അക്കൗണ്ട് ഇല്ലേ?'}
              <Link to="/auth" className="text-primary hover:underline ml-1">
                {language === 'en' ? 'Sign up here' : 'ഇവിടെ സൈൻ അപ്പ് ചെയ്യുക'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* Sidebar */}
      <div className={cn(
        "w-80 border-r border-border h-full min-h-0 flex-col bg-card transition-transform duration-300 ease-in-out",
        isSidebarOpen ? 'flex' : 'hidden'
      )}>
        {/* Sidebar header: hide toggle + language toggle + title/subtitle */}
        <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-full h-9 w-9"
              aria-label={language === 'en' ? 'Hide sidebar' : 'സൈഡ്ബാർ മറയ്ക്കുക'}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="rounded-full">
              <Languages className="h-4 w-4 mr-2" />
              {language === 'en' ? 'English' : 'മലയാളം'}
            </Button>
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              {currentSession?.title || (language === 'en' ? 'AI Chat Assistant' : 'AI ചാറ്റ് സഹായി')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Ask about farming' : 'കൃഷിയെക്കുറിച്ച് ചോദിക്കുക'}
            </p>
          </div>
        </div>
        <div className="p-4">
          <Button onClick={handleNewChat} className="w-full rounded-xl" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'New Chat' : 'പുതിയ ചാറ്റ്'}
          </Button>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>
        </div>
        <ScrollArea className="flex-1 px-4 overscroll-contain">
          <div className="space-y-2">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-accent transition-colors",
                  currentSession?.id === session.id ? "bg-accent" : ""
                )}
                onClick={() => loadSession(session)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{session.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(session.updated_at).toLocaleDateString()}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {sessions.length === 0 && !chatLoading && (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{language === 'en' ? 'No chats yet' : 'ഇതുവരെ ചാറ്റുകളില്ല'}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
  <div className="flex-1 flex flex-col relative h-full min-h-0">
        {/* Floating open-sidebar button when sidebar hidden */}
        {!isSidebarOpen && (
          <div className="absolute top-2 left-2 z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-full h-9 w-9"
              aria-label={language === 'en' ? 'Show sidebar' : 'സൈഡ്ബാർ കാണിക്കുക'}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1 p-4 overscroll-contain">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.length === 0 && !chatLoading && (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'Welcome to Krishi Mitra' : 'കൃഷി മിത്രത്തിലേക്ക് സ്വാഗതം'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en'
                    ? 'Ask me anything about farming, crops, weather, or agricultural practices.'
                    : 'കൃഷി, വിളകൾ, കാലാവസ്ഥ, അല്ലെങ്കിൽ കാർഷിക രീതികളെക്കുറിച്ച് എന്തും ചോദിക്കുക.'}
                </p>
                {/* Quick prompt chips with better padding */}
                <div className="mt-6 p-3 sm:p-4 rounded-xl bg-muted/30 border">
                  <div className="grid grid-cols-2 gap-3">
                    {quickPrompts.map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        className="justify-start rounded-xl px-4 py-3 h-auto text-left"
                        onClick={() => sendPrompt(q)}
                        disabled={isProcessing}
                        title={q}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 p-4 rounded-2xl",
                  message.role === 'user'
                    ? "bg-primary/5 ml-12"
                    : "mr-12"
                )}
              >
                <div className="flex-shrink-0">
                  {message.role === 'user' ? (
                    <User className="h-6 w-6 text-primary" />
                  ) : (
                    <Bot className="h-6 w-6 text-crop" />
                  )}
                </div>
                <div className="flex-1 prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3">
                  <div className="flex items-center justify-between mb-1 not-prose">
                    <div className="font-medium text-sm">
                      {message.role === 'user' ? 'You' : 'Krishi Mitra'}
                    </div>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => speakText(message.content)}
                          title={language === 'en' ? 'Listen' : 'കേൾക്കുക'}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={stopSpeaking}
                          disabled={!isSpeaking}
                          title={language === 'en' ? 'Stop' : 'നിർത്തുക'}
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-3 p-4 rounded-2xl mr-12">
                <Bot className="h-6 w-6 text-crop flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">Krishi Mitra</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Thinking...' : 'ചിന്തിക്കുന്നു...'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-card sticky bottom-0 left-0 right-0 z-10">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? 'Type your message...' : 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...'}
                disabled={isProcessing}
                className="pr-12 rounded-xl"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full"
                disabled
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim() || isProcessing}
              size="sm"
              className="rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
