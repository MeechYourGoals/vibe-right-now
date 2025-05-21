
// Re-export functionality from GoogleAIService for backward compatibility
import { GoogleAIService } from '../GoogleAIService';

// Define default voices for compatibility with existing code
export const DEFAULT_MALE_VOICE = "en-US-Neural2-D";
export const DEFAULT_FEMALE_VOICE = "en-US-Neural2-F";

// Re-export all functionality for backward compatibility
export const generateText = GoogleAIService.generateText;
export const searchWithAI = GoogleAIService.search;
export const textToSpeech = GoogleAIService.textToSpeech;
export const speechToText = GoogleAIService.speechToText;
export const checkContentSafety = GoogleAIService.checkContentSafety;
export const analyzeText = GoogleAIService.analyzeText;
export const extractEntities = GoogleAIService.extractEntities;
export const extractCategories = GoogleAIService.extractCategories;

// Project Mariner functionality
export const bookTickets = GoogleAIService.bookTickets;
export const makeReservation = GoogleAIService.makeReservation;
export const checkTransactionStatus = GoogleAIService.checkTransactionStatus;
export const cancelTransaction = GoogleAIService.cancelTransaction;

// Create a hub to simplify imports (backward compatibility)
export const VertexAIHub = {
  // Text generation
  generateText: GoogleAIService.generateText.bind(GoogleAIService),
  searchWithAI: GoogleAIService.search.bind(GoogleAIService),
  
  // Speech services
  textToSpeech: GoogleAIService.textToSpeech.bind(GoogleAIService),
  speechToText: GoogleAIService.speechToText.bind(GoogleAIService),
  
  // Content safety
  checkContentSafety: GoogleAIService.checkContentSafety.bind(GoogleAIService),
  
  // Analysis
  analyzeText: GoogleAIService.analyzeText.bind(GoogleAIService),
  extractEntities: GoogleAIService.extractEntities.bind(GoogleAIService),
  extractCategories: GoogleAIService.extractCategories.bind(GoogleAIService),
  
  // Project Mariner
  bookTickets: GoogleAIService.bookTickets.bind(GoogleAIService),
  makeReservation: GoogleAIService.makeReservation.bind(GoogleAIService),
  checkTransactionStatus: GoogleAIService.checkTransactionStatus.bind(GoogleAIService),
  cancelTransaction: GoogleAIService.cancelTransaction.bind(GoogleAIService)
};
