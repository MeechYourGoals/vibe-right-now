
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Crown } from "lucide-react";

const VernonVenueAssistant = () => {
  const openVernonChat = () => {
    // Create and dispatch custom event
    const event = new CustomEvent('open-vernon-chat', { 
      detail: { mode: 'venue' } 
    });
    window.dispatchEvent(event);
    
    // Alternative approach: manipulate DOM elements directly
    const chatButtons = document.querySelectorAll('.chatButton');
    if (chatButtons && chatButtons.length > 0) {
      (chatButtons[0] as HTMLElement).click();
    }
  };
  
  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/50 dark:to-background">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
          <Bot className="mr-2 h-5 w-5" />
          Vernon Venue Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Get AI-powered help with managing your venue using Google's Vertex AI and Gemini technology.
          </p>
          
          <div className="space-y-2">
            <h4 className="text-xs font-medium uppercase text-gray-700 dark:text-gray-200">Ask Vernon about:</h4>
            <ul className="text-sm space-y-1 text-gray-800 dark:text-gray-100">
              <li className="flex items-center"><Crown className="mr-2 h-3 w-3 text-amber-500" /> Marketing strategies</li>
              <li className="flex items-center"><Crown className="mr-2 h-3 w-3 text-amber-500" /> Customer insights</li>
              <li className="flex items-center"><Crown className="mr-2 h-3 w-3 text-amber-500" /> Competitive analysis</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium"
            onClick={openVernonChat}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with Vernon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VernonVenueAssistant;
