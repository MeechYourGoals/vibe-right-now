
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { withErrorHandling } from "../_shared/request-handler.ts";
import { createSuccessResponse, createValidationErrorResponse } from "../_shared/response.ts";
import { validateRequired, validateUrl } from "../_shared/validation.ts";
import { getApiKey } from "../_shared/auth.ts";
import { logInfo } from "../_shared/logging.ts";

const GEMINI_API_KEY = getApiKey('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const handler = withErrorHandling(async (req: Request): Promise<Response> => {
  logInfo("Received request to gemini-ai function");
  
  const { prompt, mode, history } = await req.json();
  
  // Validation
  validateRequired(prompt, 'prompt');
  
  // Build conversation history in Gemini format
  const messages = [];
  
  // Add system prompt based on the mode
  if (mode === 'venue') {
    messages.push({
      role: "model",
      parts: [{ text: "I am VeRNon for Venues, a business insights assistant. I help venue owners understand their metrics, customer trends, and marketing performance." }]
    });
  } else {
    messages.push({
      role: "model", 
      parts: [{ text: "I am VeRNon, a venue and event discovery assistant. I help users find venues, events, and local attractions based on their preferences and location." }]
    });
  }
  
  // Add conversation history
  if (history && history.length > 0) {
    for (const message of history) {
      messages.push({
        role: message.sender === 'user' ? "user" : "model",
        parts: [{ text: message.text }]
      });
    }
  }
  
  // Add the current prompt
  messages.push({
    role: "user",
    parts: [{ text: prompt }]
  });
  
  logInfo("Sending request to Gemini API", { messageCount: messages.length });
  
  // Call the Gemini API
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    logInfo(`Gemini API error: ${response.status}`, { errorData });
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  logInfo("Gemini API response received successfully");
  
  // Extract the response text
  const responseText = data.candidates[0].content.parts[0].text;
  
  return createSuccessResponse({ text: responseText });
}, 'gemini-ai');

serve(handler);
