
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, User, Bot, Trash2, Settings2 } from 'lucide-react';
import { ChatWindowProps, Message } from './types';
import './ChatWindow.css'; // Import custom CSS for typing indicator

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  input,
  setInput,
  onSendMessage,
  onClose,
  isProcessing,
  chatMode,
  toggleMode,
  clearMessages,
  isListening,
  toggleListening,
  isModelLoading,
  transcript
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isModelLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModelLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && !isProcessing && !isModelLoading) {
      onSendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setInput) {
      setInput(e.target.value);
    }
  };

  const renderMessage = (message: Message) => {
    const isIncoming = message.direction === 'incoming';

    return (
      <motion.div
        key={message.id}
        layout // Enables layout animations when items reorder or change size
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`mb-4 flex ${isIncoming ? 'justify-start' : 'justify-end'}`}
      >
        <div className={`flex items-start gap-2.5 max-w-[80%]`}>
          {isIncoming && (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              <Bot size={20} />
            </div>
          )}
          <div
            className={`px-4 py-3 rounded-2xl ${
              isIncoming
                ? 'bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-none'
                : 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-br-none'
            }`}
          >
            <div className="text-base leading-relaxed whitespace-pre-wrap break-words">
              {processMessageContent(message.content)}
            </div>
          </div>
          {!isIncoming && (
            <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0">
              <User size={20} />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Helper function to process message content for basic markdown and links
  const processMessageContent = (content: string) => {
    let processedContent = content;

    // Bold: **text** or __text__
    processedContent = processedContent.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    // Italics: *text* or _text_ (ensure not part of a URL)
    // This regex is a bit more complex to avoid matching * in URLs if we were not splitting by spaces later
    // However, for simplicity with link parsing, we handle links first.
    // For now, a simpler regex for italics:
    processedContent = processedContent.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)|(?<!_)_{1}(?!_)(.*?)(?<!_)_{1}(?!_)/g, '<em>$1$2</em>');

    // URLs: Convert to clickable links
    const urlRegex = /(\b(https:\/\/?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    // Split content by spaces to process segments, some of which might be URLs
    const parts = processedContent.split(/(\s+)/); // Split by space, keeping spaces

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // Prepend http:// if no protocol is present for www. links
        const href = part.startsWith('www.') ? `http://${part}` : part;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 underline"
          >
            {part}
          </a>
        );
      }
      // Re-apply simple markdown to non-URL parts if needed, or use dangerouslySetInnerHTML for combined approach
      // For simplicity, we'll rely on the initial regex pass for bold/italics and just render text here.
      // A more robust solution would parse markdown on segments.
      // Using dangerouslySetInnerHTML for parts that had bold/italics applied before link splitting.
      // This is generally okay if 'part' is from our own regex processing of original content.
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };


  return (
    <div className="fixed right-6 bottom-6 w-[400px] h-[640px] max-h-[calc(100vh-48px)] bg-background border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg text-neutral-800 dark:text-neutral-100">Vernon AI</span>
        </div>
        <div className="flex items-center space-x-1">
          {/* Header buttons remain unchanged */}
          <button
            onClick={toggleMode}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
            title={chatMode === 'user' ? 'Switch to Venue Mode' : 'Switch to User Mode'}
          >
            <Settings2 className="w-5 h-5" />
          </button>
          <button
            onClick={clearMessages}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
            title="Clear conversation"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
            title="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence mode="popLayout">
          {messages.map(renderMessage)}
        </AnimatePresence>
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
              exit={{ opacity: 0, height: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }}
              className="flex justify-start mb-4" // mb-4 to match message spacing
            >
              <div className="flex items-center gap-2.5 max-w-[80%]">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                  <Bot size={20} />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-bl-none">
                  <div className="typing-indicator">
                    <span className="bg-neutral-500 dark:bg-neutral-400"></span>
                    <span className="bg-neutral-500 dark:bg-neutral-400"></span>
                    <span className="bg-neutral-500 dark:bg-neutral-400"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Transcript display */}
      {isListening && transcript && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 py-2 bg-neutral-100/80 dark:bg-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-300 italic border-t border-neutral-200 dark:border-neutral-700"
        >
          {transcript}
        </motion.div>
      )}

      {/* Input area (remains unchanged, transitions are handled by Tailwind's disabled:opacity) */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-3 bg-background">
        <button
          type="button"
          onClick={toggleListening}
          disabled={isModelLoading}
          className={`p-2.5 rounded-full transition-colors duration-150 ease-in-out
            ${isListening
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300'}
            disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isListening ? (
              <motion.span
                key="mic-off"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MicOff size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="mic-on"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Mic size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder="Type a message..."
          disabled={isProcessing || isModelLoading}
          className="flex-1 px-4 py-3 bg-background border border-neutral-300 dark:border-neutral-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent text-base text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
        />

        <button
          type="submit"
          disabled={!input || isProcessing || isModelLoading}
          className={`p-2.5 rounded-full transition-colors duration-150 ease-in-out
            ${(!input || isProcessing || isModelLoading)
              ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'}`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
