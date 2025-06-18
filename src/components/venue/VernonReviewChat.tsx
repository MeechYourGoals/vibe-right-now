
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VernonReviewChatProps {
  reviewSummary: string;
  venueId: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'vernon';
  content: string;
  timestamp: Date;
}

const VernonReviewChat: React.FC<VernonReviewChatProps> = ({
  reviewSummary,
  venueId
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Gemini via our existing edge function
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: {
          prompt: input,
          mode: 'venue',
          context: reviewSummary
        }
      });

      if (error) throw error;

      const vernonResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'vernon',
        content: data.text || 'I apologize, but I encountered an issue processing your question. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, vernonResponse]);
    } catch (error) {
      console.error('Error sending message to Vernon:', error);
      
      // Fallback mock responses
      const mockResponses = [
        "Based on the reviews, the dress code appears to be casual to smart casual. Most reviewers mention comfortable attire.",
        "From what I can see in the reviews, parking can be challenging during peak hours. Many suggest using rideshare or arriving early.",
        "The reviews indicate this venue is family-friendly during earlier hours, but becomes more adult-oriented in the evening.",
        "Based on customer feedback, reservations are highly recommended, especially for weekend dining."
      ];

      const vernonResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'vernon',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, vernonResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">Ask Vernon about this venue</span>
      </div>
      
      {messages.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded text-sm ${
                message.type === 'user'
                  ? 'bg-blue-100 text-blue-900 ml-4'
                  : 'bg-gray-100 text-gray-800 mr-4'
              }`}
            >
              <strong>{message.type === 'user' ? 'You: ' : 'Vernon: '}</strong>
              {message.content}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          placeholder="Ask about dress code, parking, atmosphere..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {messages.length === 0 && (
        <div className="text-xs text-muted-foreground mt-2">
          Example questions: "What's the dress code?", "How's the parking?", "Is it kid-friendly?"
        </div>
      )}
    </div>
  );
};

export default VernonReviewChat;
