
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  X, 
  Send, 
  Minimize, 
  Maximize, 
  Bot,
  Loader
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Service to interact with Perplexity AI
const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      // Note: In a real implementation, this would call a Supabase Edge Function with a Perplexity API key
      // For now, we'll simulate the response
      console.log('Searching Perplexity for:', query);
      
      // Check if query is about local events
      if (query.toLowerCase().includes("going on in") || 
          query.toLowerCase().includes("events in") || 
          query.toLowerCase().includes("happening in")) {
        
        // Extract city name if possible
        const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
        const city = cityMatch ? cityMatch[1].trim() : "the area";
        
        return `Based on my search, here are some exciting events happening in ${city} tonight:\n\n` +
               `1. "Summer Music Festival" at Downtown Park - Live performances starting at 7PM\n` +
               `2. "Art Gallery Opening" at Metropolitan Museum - New exhibition from 6-9PM\n` +
               `3. "Food Truck Rally" at Civic Center - Various food options from 5-10PM\n\n` +
               `Would you like more details about any of these events?`;
      }
      
      // For other types of questions, simulate a helpful response
      return `I found this information for you: ${query} is a great question! Based on my search, there are several interesting answers. The most relevant information suggests that this is something many people are curious about. Would you like more specific details?`;
    } catch (error) {
      console.error('Error searching Perplexity:', error);
      return "I'm having trouble connecting to my search service right now. Could you try again in a moment?";
    }
  }
};

// Function to update trending locations based on AI query results
const updateTrendingLocations = (cityName: string, events: any[]) => {
  // In a real implementation, this would update the global state or database
  // For demonstration, we'll just log what would happen
  console.log(`Updating trending locations for ${cityName} with:`, events);
  
  // This function would normally modify the app's state to display these events
  // in the TrendingLocations component
};

const VernonChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Vernon (Vern for short), your Vibe Language Model assistant. I can help you discover venues, events, and answer general questions too. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e?: React.FormEvent) => {
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
    setIsSearching(true);
    
    try {
      // Get response from Perplexity
      const responseText = await PerplexityService.searchPerplexity(inputValue);
      
      // Parse events if the query was about local events
      if (inputValue.toLowerCase().includes("going on in") || 
          inputValue.toLowerCase().includes("events in") || 
          inputValue.toLowerCase().includes("happening in")) {
        
        const cityMatch = inputValue.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
        const city = cityMatch ? cityMatch[1].trim() : "your area";
        
        // Mock events that would be extracted from the Perplexity response
        const events = [
          {
            id: `event-${Date.now()}-1`,
            name: "Summer Music Festival",
            address: "Downtown Park",
            city: city,
            state: "CA",
            type: "event",
            verified: true
          },
          {
            id: `event-${Date.now()}-2`,
            name: "Art Gallery Opening",
            address: "Metropolitan Museum", 
            city: city,
            state: "CA",
            type: "attraction",
            verified: true
          },
          {
            id: `event-${Date.now()}-3`,
            name: "Food Truck Rally",
            address: "Civic Center",
            city: city,
            state: "CA",
            type: "event",
            verified: false
          }
        ];
        
        // Update trending locations with these events
        updateTrendingLocations(city, events);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble finding that information right now. Could you try again in a moment?",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSearching(false);
    }
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
                <div className="px-3 py-2 rounded-lg bg-muted flex items-center">
                  {isSearching ? (
                    <div className="flex items-center">
                      <span className="text-xs mr-2">Searching web</span>
                      <Loader className="h-3 w-3 animate-spin" />
                    </div>
                  ) : (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-150"></div>
                    </div>
                  )}
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
              placeholder="Ask me anything..."
              className="flex-1 mr-2"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!inputValue.trim() || isTyping}
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
