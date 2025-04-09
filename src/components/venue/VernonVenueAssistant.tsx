
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Crown } from "lucide-react";

const VernonVenueAssistant = () => {
  const openVernonChat = () => {
    // Trigger Vernon Chat UI
    window.dispatchEvent(new CustomEvent('open-vernon-chat', { detail: { mode: 'venue' } }));
  };
  
  return (
    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-amber-700 dark:text-amber-500">
          <Bot className="mr-2 h-5 w-5" />
          Vernon Venue Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">Get AI-powered help with managing your venue and analyzing customer data.</p>
          
          <div className="space-y-2">
            <h4 className="text-xs font-medium uppercase text-muted-foreground">Ask Vernon about:</h4>
            <ul className="text-sm space-y-1">
              <li className="flex items-center"><Crown className="mr-2 h-3 w-3 text-amber-500" /> Marketing strategies</li>
              <li className="flex items-center"><Crown className="mr-2 h-3 w-3 text-amber-500" /> Customer insights</li>
              <li className="flex items-center"><Crown className="mr-2 h-3 w-3 text-amber-500" /> Competitive analysis</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
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
