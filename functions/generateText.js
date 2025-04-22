
const functions = require('firebase-functions');
const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI
const projectId = 'YOUR_PROJECT_ID'; // Replace with your GCP project ID
const location = 'us-central1';
const vertexAI = new VertexAI({ project: projectId, location });
const generativeModel = vertexAI.preview.getGenerativeModel({
  model: 'gemini-1.5-pro',
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
  }
});

exports.generateText = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }
  
  try {
    const { text, history = [], options = {} } = data;
    
    // Prepare the prompt
    let prompt = text;
    
    // Apply system context based on the mode
    let systemPrompt = '';
    if (options.mode === 'venue') {
      systemPrompt = `You are Vernon for Venues, a business insights assistant specialized in helping venue owners understand their metrics, customer trends, and marketing performance.

You provide data-driven insights and actionable recommendations. You maintain a professional but friendly tone that builds confidence. Focus on identifying trends, opportunities, and potential areas for improvement.`;
    } else {
      systemPrompt = `You are Vernon, a venue and event discovery assistant specialized in helping users find great places to go and things to do.

You respond in a concise, informative, and enthusiastic tone. You're friendly, approachable, and helpful. You offer creative and interesting suggestions based on users' interests and location preferences.`;
    }
    
    // Format chat history for Gemini
    const formattedHistory = history.map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }]
    }));
    
    // Add system prompt to the beginning if needed
    if (systemPrompt) {
      formattedHistory.unshift({
        role: 'model',
        parts: [{ text: systemPrompt }]
      });
    }
    
    // Generate response
    const chatSession = generativeModel.startChat({
      history: formattedHistory,
    });
    
    const result = await chatSession.sendMessage(text);
    const responseText = result.response.text();
    
    return { text: responseText };
  } catch (error) {
    console.error('Error generating text:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
