
const functions = require('firebase-functions');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

// Initialize Text-to-Speech client
const client = new TextToSpeechClient();

exports.textToSpeech = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }
  
  try {
    const { text, options = {} } = data;
    
    // Set default options
    const voice = options.voice || 'en-US-Neural2-D';
    const speakingRate = options.speakingRate || 1.0;
    const pitch = options.pitch || 0;
    
    // Configure request
    const request = {
      input: { text },
      voice: {
        languageCode: voice.split('-').slice(0, 2).join('-'),
        name: voice,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate,
        pitch,
      },
    };
    
    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    
    // Convert audio content to base64
    const audioContent = response.audioContent.toString('base64');
    
    return { audioContent };
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
