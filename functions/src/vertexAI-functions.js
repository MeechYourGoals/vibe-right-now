
/**
 * Firebase Cloud Functions for Vertex AI integration
 * 
 * This file contains templates for Firebase Cloud Functions that would be deployed
 * to support Vernon and Vertex AI integration.
 * 
 * Note: This is a template file that would be deployed to Firebase Functions.
 * It's not used directly by the React application.
 */

const functions = require('firebase-functions');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

// Initialize Google Auth for Vertex AI
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Configure the project and location
const PROJECT_ID = 'YOUR_GOOGLE_CLOUD_PROJECT_ID';
const LOCATION = 'us-central1';
const GEMINI_MODEL = 'gemini-1.5-pro';

/**
 * Generate text with Vertex AI Gemini
 */
exports.generateText = functions.https.onCall(async (data, context) => {
  try {
    // Get the authenticated client
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    // Get parameters from request
    const { prompt, mode = 'default', context: messageContext = [] } = data;
    
    // Build Vertex AI API URL
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${GEMINI_MODEL}:generateContent`;
    
    // Prepare system prompt based on mode
    let systemPrompt = "You are a helpful assistant that provides concise, accurate information.";
    if (mode === 'venue') {
      systemPrompt = "You are a business assistant helping venue owners understand trends and metrics.";
    } else if (mode === 'search') {
      systemPrompt = "You are a search assistant providing factual information about places and events.";
    }
    
    // Format conversation for Vertex AI
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "I understand my role and will assist accordingly." }] }
    ];
    
    // Add message context if provided
    if (messageContext.length > 0) {
      for (const message of messageContext) {
        contents.push({
          role: message.role === 'user' ? "user" : "model",
          parts: [{ text: message.content }]
        });
      }
    }
    
    // Add the current prompt
    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });
    
    // Call the Vertex AI API
    const response = await axios.post(url, {
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract the response text
    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    return { text: generatedText };
  } catch (error) {
    console.error('Error in Vertex AI generate text:', error);
    throw new functions.https.HttpsError('internal', 'Error generating text with Vertex AI', error);
  }
});

/**
 * Search with Vertex AI
 */
exports.search = functions.https.onCall(async (data, context) => {
  try {
    // Get the authenticated client
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    // Get parameters from request
    const { query, categories = [] } = data;
    
    // Build Vertex AI API URL
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${GEMINI_MODEL}:generateContent`;
    
    // Prepare enhanced search prompt
    let searchPrompt = `Search for real factual information about: "${query}". Include real venue names, addresses, opening hours, and other specific details.`;
    
    // Add category context if available
    if (categories.length > 0) {
      searchPrompt += ` Focus on these categories: ${categories.join(', ')}.`;
    }
    
    // Format for Vertex AI
    const contents = [
      { 
        role: "user", 
        parts: [{ 
          text: "You are a search assistant providing factual information about places and events. Your responses should include real venue names, addresses, and specific details."
        }] 
      },
      { 
        role: "model", 
        parts: [{ 
          text: "I understand my role and will provide specific, factual information."
        }] 
      },
      {
        role: "user",
        parts: [{ text: searchPrompt }]
      }
    ];
    
    // Call the Vertex AI API with low temperature for more factual results
    const response = await axios.post(url, {
      contents,
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract the response text
    const searchResults = response.data.candidates[0].content.parts[0].text;
    
    return { text: searchResults };
  } catch (error) {
    console.error('Error in Vertex AI search:', error);
    throw new functions.https.HttpsError('internal', 'Error searching with Vertex AI', error);
  }
});

/**
 * Text-to-speech with Google Cloud Text-to-Speech API
 */
exports.textToSpeech = functions.https.onCall(async (data, context) => {
  try {
    // Get the authenticated client
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    // Get parameters from request
    const { 
      text, 
      voice = 'en-US-Neural2-D', 
      speakingRate = 1.0, 
      pitch = 0 
    } = data;
    
    // Build Google Cloud Text-to-Speech API URL
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize`;
    
    // Call the Text-to-Speech API
    const response = await axios.post(url, {
      input: { text },
      voice: { 
        languageCode: voice.split('-')[0] + '-' + voice.split('-')[1],
        name: voice
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate,
        pitch
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Return the audio content (base64 encoded)
    return { audioContent: response.data.audioContent };
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    throw new functions.https.HttpsError('internal', 'Error with text-to-speech', error);
  }
});

/**
 * Analyze text with Google Natural Language API
 */
exports.analyzeText = functions.https.onCall(async (data, context) => {
  try {
    // Get the authenticated client
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    // Get parameters from request
    const { text } = data;
    
    // Build Google Cloud Natural Language API URL
    const url = `https://language.googleapis.com/v1/documents:analyzeEntities`;
    
    // Call the Natural Language API
    const response = await axios.post(url, {
      document: {
        type: 'PLAIN_TEXT',
        content: text
      },
      encodingType: 'UTF8'
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Return the entity analysis
    return response.data;
  } catch (error) {
    console.error('Error in Natural Language API:', error);
    throw new functions.https.HttpsError('internal', 'Error analyzing text', error);
  }
});
