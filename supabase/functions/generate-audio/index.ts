
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    const deepgramApiKey = Deno.env.get('DEEPGRAM_API_KEY')
    if (!deepgramApiKey) {
      throw new Error('Deepgram API key not configured')
    }

    const model = 'aura-asteria-en'

    const response = await fetch(`https://api.deepgram.com/v1/speak?model=${model}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'Authorization': `Token ${deepgramApiKey}`,
      },
      body: JSON.stringify({ text })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Deepgram API error:', error)
      throw new Error(`Failed to generate speech: ${response.status}`)
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in generate-audio function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
