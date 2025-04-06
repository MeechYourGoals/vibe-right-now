
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Minimize, Maximize } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from './types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { PerplexityService } from '@/services/PerplexityService';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { Location } from '@/types';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { cityCoordinates } from '@/utils/cityLocations';

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
      
      // Parse city if the query was about events or places in a specific city
      let detectedCity = "";
      
      // Common patterns for city detection in user queries
      const cityPatterns = [
        /(?:in|at|near|around|for)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
        /what's\s+(?:happening|going on)\s+in\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
        /places\s+(?:in|at|near)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
        /events\s+(?:in|at|near)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
        /([a-zA-Z\s]+)\s+(?:nightlife|restaurants|bars|clubs)(?:\?|$|\.)/i,
        /([a-zA-Z\s]+)\s+(?:things to do|activities|attractions)(?:\?|$|\.)/i
      ];
      
      // Try to detect a city in the query
      for (const pattern of cityPatterns) {
        const match = inputValue.match(pattern);
        if (match && match[1]) {
          const potentialCity = match[1].trim().toLowerCase();
          // Check if it matches any of our city keys
          if (Object.keys(cityCoordinates).includes(potentialCity)) {
            detectedCity = potentialCity;
            break;
          }
        }
      }
      
      // If city was detected and the query seems to be about locations or events
      if (detectedCity && 
          (inputValue.toLowerCase().includes("going on") || 
           inputValue.toLowerCase().includes("events") || 
           inputValue.toLowerCase().includes("places") ||
           inputValue.toLowerCase().includes("happening") ||
           inputValue.toLowerCase().includes("visit") ||
           inputValue.toLowerCase().includes("things to do"))) {
        
        // Get locations for the detected city
        const cityInfo = cityCoordinates[detectedCity];
        const cityLocations = getLocationsByCity(cityInfo.name);
        
        if (cityLocations.length > 0) {
          // Update trending locations with these events
          updateTrendingLocations(cityInfo.name, getTrendingLocationsForCity(cityInfo.name));
          
          // Customize the response to include references to the actual locations
          const locationResponse = generateLocationResponse(cityInfo.name, cityLocations);
          
          // Add response about events in the city
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: locationResponse || responseText,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } else {
          // Fall back to standard response
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
        }
      } else {
        // Standard response if no city was detected or query isn't about events
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
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
  
  // Generate a natural language response about locations in a city
  const generateLocationResponse = (cityName: string, locations: Location[]): string => {
    if (locations.length === 0) return "";
    
    const sportVenues = locations.filter(loc => loc.type === "sports");
    const bars = locations.filter(loc => loc.type === "bar");
    const restaurants = locations.filter(loc => loc.type === "restaurant");
    const events = locations.filter(loc => loc.type === "event");
    const attractions = locations.filter(loc => loc.type === "attraction");
    const others = locations.filter(loc => loc.type === "other");
    
    let response = `Here's what's happening in ${cityName} right now:\n\n`;
    
    if (sportVenues.length > 0) {
      response += `🏟️ **Sports:** ${sportVenues.map(v => v.name).join(", ")}.\n\n`;
    }
    
    if (bars.length > 0) {
      response += `🍸 **Nightlife:** ${bars.map(v => v.name).join(", ")}.\n\n`;
    }
    
    if (restaurants.length > 0) {
      response += `🍽️ **Dining:** ${restaurants.map(v => v.name).join(", ")}.\n\n`;
    }
    
    if (events.length > 0) {
      response += `🎭 **Events:** ${events.map(v => v.name).join(", ")}.\n\n`;
    }
    
    if (attractions.length > 0) {
      response += `🏛️ **Attractions:** ${attractions.map(v => v.name).join(", ")}.\n\n`;
    }
    
    if (others.length > 0) {
      response += `🏋️ **Other Activities:** ${others.map(v => v.name).join(", ")}.\n\n`;
    }
    
    response += `These are all trending in ${cityName} right now. You can check the map to see their exact locations. Would you like more details about any specific place?`;
    
    return response;
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
