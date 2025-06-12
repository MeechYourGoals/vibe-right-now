
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Brian voice ID from ElevenLabs
const BRIAN_VOICE_ID = 'nPczCjzI2devNBz1zQrb'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice_id, model_id } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    // Get ElevenLabs API key from environment
    const apiKey = Deno.env.get('ELEVEN_LABS_API_KEY')
    
    if (!apiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Use Brian voice by default, allow override
    const voiceId = voice_id || BRIAN_VOICE_ID
    const modelId = model_id || 'eleven_multilingual_v2'

    console.log(`Converting text to speech with Brian voice (${voiceId})`)
    console.log(`Text length: ${text.length} characters`)

    // Call ElevenLabs TTS API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.8,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      
      // Check for quota exceeded
      if (response.status === 429 || errorText.includes('quota')) {
        return new Response(
          JSON.stringify({ error: 'quota_exceeded', message: 'ElevenLabs quota exceeded' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
    }

    // Convert audio to base64
    const audioBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    )

    console.log(`Successfully generated audio with Brian voice`)

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in TTS function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'tts_error', 
        message: error.message || 'Failed to generate speech' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
