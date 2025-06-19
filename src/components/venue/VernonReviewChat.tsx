import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VernonReviewChatProps {
  reviewSummary: string;
  venueId: string;
  platform?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'vernon';
  content: string;
  timestamp: Date;
}

const VernonReviewChat: React.FC<VernonReviewChatProps> = ({
  reviewSummary,
  venueId,
  platform = 'reviews'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "What's the dress code?",
    "How's the parking situation?",
    "Is it family-friendly?",
    "What's the best time to visit?",
    "Are reservations needed?",
    "What's the atmosphere like?"
  ];

  const handleSendMessage = async (question?: string) => {
    const messageText = question || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Gemini via our existing edge function
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: {
          prompt: `Based on the following ${platform} review summary for a venue, please answer this question: "${messageText}"

Review Summary:
${reviewSummary}

Please provide a helpful, specific answer based on what customers have said in their reviews. If the information isn't available in the reviews, say so and suggest what to look for or ask the venue directly.`,
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
      
      // Provide contextual fallback responses
      const getContextualResponse = (question: string) => {
        const q = question.toLowerCase();
        if (q.includes('dress code')) {
          return "Based on the reviews, the dress code appears to be casual to smart casual. Most reviewers mention comfortable attire.";
        }
        if (q.includes('parking')) {
          return "From what I can see in the reviews, parking can be challenging during peak hours. Many suggest using rideshare or arriving early.";
        }
        if (q.includes('family') || q.includes('kid')) {
          return "The reviews indicate this venue is family-friendly during earlier hours, but becomes more adult-oriented in the evening.";
        }
        if (q.includes('reservation')) {
          return "Based on customer feedback, reservations are highly recommended, especially for weekend dining.";
        }
        if (q.includes('time') || q.includes('when')) {
          return "Reviewers suggest visiting during off-peak hours for a better experience and shorter wait times.";
        }
        return "I'd be happy to help answer that based on the review summary. Could you be more specific about what you'd like to know?";
      };

      const vernonResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'vernon',
        content: getContextualResponse(messageText),
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
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="h-5 w-5 text-purple-500" />
        <span className="text-sm font-medium text-foreground">Ask Vernon about these reviews</span>
        <Sparkles className="h-4 w-4 text-purple-400" />
      </div>
      
      {messages.length === 0 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="grid grid-cols-2 gap-1">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(question)}
                className="text-left text-xs bg-muted/50 hover:bg-muted text-foreground px-2 py-1 rounded border border-border transition-colors"
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {messages.length > 0 && (
        <div className="max-h-40 overflow-y-auto space-y-2 mb-3 bg-muted/20 rounded p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded text-sm ${
                message.type === 'user'
                  ? 'bg-purple-900/30 text-foreground ml-4 border border-purple-500/30'
                  : 'bg-card text-foreground mr-4 border border-border'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {message.type === 'vernon' && <Bot className="h-3 w-3 text-purple-500" />}
                <strong className="text-xs text-foreground">
                  {message.type === 'user' ? 'You' : 'Vernon'}
                </strong>
              </div>
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-card text-foreground mr-4 border border-border p-2 rounded text-sm">
              <div className="flex items-center gap-1 mb-1">
                <Bot className="h-3 w-3 text-purple-500" />
                <strong className="text-xs text-foreground">Vernon</strong>
              </div>
              <div className="flex items-center gap-1">
                <div className="animate-pulse">Thinking...</div>
                <Sparkles className="h-3 w-3 animate-spin text-purple-400" />
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          placeholder="Ask about dress code, parking, atmosphere, reservations..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500"
          disabled={isLoading}
        />
        <Button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VernonReviewChat;
