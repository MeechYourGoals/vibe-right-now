import { useState } from 'react';
import { Message } from '../types';
import { SimpleSearchService } from '@/services/SimpleSearchService';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { cityCoordinates } from '@/utils/locations';

export const useChat = () => {
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

  // Generate a natural language response about locations in a city
  const generateLocationResponse = (cityName: string, locations: any[]): string => {
    if (locations.length === 0) return "";
    
    const sportVenues = locations.filter(loc => loc.type === "sports");
    const bars = locations.filter(loc => loc.type === "bar");
    const restaurants = locations.filter(loc => loc.type === "restaurant");
    const events = locations.filter(loc => loc.type === "event");
    const attractions = locations.filter(loc => loc.type === "attraction");
    const others = locations.filter(loc => loc.type === "other");
    
    let response = `Here are some interesting places in ${cityName} from our database:\n\n`;
    
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
    
    return response;
  };

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
      // Get response from our simple search service
      const responseText = await SimpleSearchService.searchForCityInfo(inputValue);
      
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
          
          // Send the search response but also add local venue data
          const combinedResponse = `${responseText}\n\n**Local Venues in our Database:**\n${generateLocationResponse(cityInfo.name, cityLocations)}`;
          
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: combinedResponse,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } else {
          // Fall back to just the search response
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

  return {
    messages,
    isTyping,
    isSearching,
    handleSendMessage
  };
};
