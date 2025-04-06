
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  X, 
  Send, 
  Minimize, 
  Maximize, 
  Bot
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Mock responses for demonstration
const mockResponses = [
  "Based on your preferences, I'd recommend checking out The Roxy on Sunset Blvd. They have live music events almost every night!",
  "There are 5 coffee shops within walking distance of your current location. Would you like me to list them?",
  "The Jazz Festival starts at 7pm tonight at Downtown Commons. You can find tickets on their website or at the entrance.",
  "Yes, Crypto.com Arena allows food and non-alcoholic beverages in clear plastic containers.",
  "According to recent visitors, the crowd at The Grove is moderate right now. Might be a good time to visit!",
  "For hiking trails with a view of the city, I'd recommend Runyon Canyon or Griffith Observatory trails. Both are moderately difficult.",
  "The best happy hour deals near you are at Murphy's Pub (4-7pm) and Luna Lounge (5-8pm).",
  "Sorry, I can't answer that. I'm here to provide recommendations for events, venues, and places to go only."
];

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Vernon (Vern for short), your Vibe Language Model assistant. How can I help you discover venues and events?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Check if the message is about something other than venues, events, or places
    const isOffTopic = checkIfOffTopic(inputValue);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      // If off-topic, respond with the "Sorry, I can't answer that" message
      const responseText = isOffTopic 
        ? "Sorry, I can't answer that. I'm here to provide recommendations for events, venues, and places to go only."
        : mockResponses[Math.floor(Math.random() * (mockResponses.length - 1))]; // Exclude the last response which is the "sorry" message
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple function to check if a message is likely off-topic
  const checkIfOffTopic = (message: string): boolean => {
    const lowercaseMsg = message.toLowerCase();
    
    // Keywords related to venues, events, and places
    const onTopicKeywords = [
      'place', 'venue', 'event', 'restaurant', 'bar', 'club', 'concert', 
      'festival', 'show', 'theater', 'museum', 'gallery', 'park', 'beach',
      'where', 'when', 'how much', 'ticket', 'location', 'address', 'open',
      'close', 'hour', 'time', 'today', 'tomorrow', 'weekend', 'recommend',
      'suggestion', 'near', 'nearby', 'visit', 'go to', 'music', 'food',
      'drink', 'entertainment', 'fun', 'activity', 'happening', 'vibe'
    ];
    
    // Check if any on-topic keywords are in the message
    const isOnTopic = onTopicKeywords.some(keyword => lowercaseMsg.includes(keyword));
    
    // If the message contains any of these obviously off-topic prefixes, it's off-topic
    const obviouslyOffTopic = [
      'what is the meaning of life',
      'who is the president',
      'how do i',
      'can you write',
      'tell me about politics',
      'tell me a joke',
      'what is your opinion on',
      'solve this math',
      'write code',
      'create a',
      'generate a',
      'help me with my homework',
      'what do you think about'
    ].some(prefix => lowercaseMsg.includes(prefix));
    
    return obviouslyOffTopic || !isOnTopic;
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  if (!isOpen) {
    return (
      <Button 
        className="fixed left-6 bottom-6 h-12 w-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg animate-pulse-slow"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare />
      </Button>
    );
  }
  
  return (
    <div 
      className={`fixed left-6 bottom-6 bg-card border rounded-lg shadow-lg transition-all duration-200 z-40
      ${isMinimized ? 'w-64 h-12' : 'w-80 h-96'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-amber-500/10">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2 bg-amber-500/20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-amber-500 text-white">V</AvatarFallback>
          </Avatar>
          <h3 className="text-sm font-medium">Vernon (Vibe Assistant)</h3>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleMinimize}>
            {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="p-3 overflow-y-auto h-[calc(100%-6rem)]">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 bg-amber-500/20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-amber-500 text-white">V</AvatarFallback>
                  </Avatar>
                )}
                <div 
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <Avatar className="h-8 w-8 mr-2 bg-amber-500/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-amber-500 text-white">V</AvatarFallback>
                </Avatar>
                <div className="px-3 py-2 rounded-lg bg-muted">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form 
            onSubmit={handleSendMessage}
            className="border-t p-3 flex items-center"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about venues, events..."
              className="flex-1 mr-2"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!inputValue.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default VernonChat;
