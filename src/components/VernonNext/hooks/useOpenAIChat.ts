import { useState, useEffect, useCallback } from 'react';
import { useCompletion } from 'ai/react';
import { useToast } from "@/components/ui/use-toast"
import { ChatCompletionMessage } from 'ai';

interface UseOpenAIChatProps {
  initialMessages?: ChatCompletionMessage[];
  onContentChange?: (content: string) => void;
}

export const useOpenAIChat = ({ initialMessages = [], onContentChange }: UseOpenAIChatProps = {}) => {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>(initialMessages);
  const { toast } = useToast()
  const {
    completion,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setCompletion,
  } = useCompletion({
    api: '/api/chat',
    initialMessages: initialMessages,
    onFinish: (message) => {
      console.log("VernonNext COMPLETED", message)
    },
    onContentChange: (content) => {
      if (onContentChange) {
        onContentChange(content);
      }
    },
  });

  // Update local messages state when completion changes
  useEffect(() => {
    if (completion && completion.length > 0) {
      // Find the last AI message
      const lastAiMessageIndex = messages.findLastIndex(m => m.role === 'ai');
      
      if (lastAiMessageIndex !== -1) {
        // Update the content of the last AI message
        const newMessages = [...messages];
        newMessages[lastAiMessageIndex] = { ...newMessages[lastAiMessageIndex], content: completion };
        setMessages(newMessages);
      } else {
        // If there's no AI message, add a new one
        setMessages(prevMessages => [...prevMessages, { role: 'ai', content: completion }]);
      }
    }
  }, [completion, setMessages]);

  // Custom handleSubmit function
  const customHandleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!input.trim()) {
        toast({
          title: "Please enter a message",
        })
        return;
      }

      // Optimistically update the messages state with the user's input
      const userMessage: ChatCompletionMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      // Call the original handleSubmit to send the message to the API
      handleSubmit(e);
    },
    [input, handleSubmit, setInput, toast]
  );

  // Custom function to append a message to the chat
  const appendMessage = useCallback(
    (message: ChatCompletionMessage) => {
      if (message.content && message.content.trim() !== "") {
        // Basic check to prevent adding empty messages
        setMessages(prevMessages => {
          const trimmedContent = message.content.trim();

          // Fix the error - comparing "user" | "ai" with "system" 
          // Change this:
          // if (message.role === "system") {
          // To this:
          if (message.role === "user" || message.role === "ai") {
            return [...prevMessages, { ...message, content: trimmedContent }];
          }
          return prevMessages;
        });
      }
    },
    [setMessages]
  );

  return {
    messages,
    input,
    completion,
    handleInputChange,
    handleSubmit: customHandleSubmit,
    isLoading,
    stop,
    appendMessage,
    setInput,
    setCompletion
  };
};
