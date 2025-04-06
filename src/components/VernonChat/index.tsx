
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Minimize, Maximize } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from './types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { PerplexityService } from '@/services/PerplexityService';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';

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
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSendMessage = async (inputValue: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
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
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
            isSearching={isSearching} 
          />
          
          <MessageInput 
            onSendMessage={handleSendMessage} 
            isTyping={isTyping} 
          />
        </>
      )}
    </div>
  );
};

export default VernonChat;
