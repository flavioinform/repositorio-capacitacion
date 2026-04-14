import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the user from the authorization header
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    // Check subscription in the 'profiles' table
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('is_subscribed, subscription_expires_at')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    const isSubscribed = profile.is_subscribed && 
      (!profile.subscription_expires_at || new Date(profile.subscription_expires_at) > new Date())

    if (!isSubscribed) {
      return new Response(JSON.stringify({ error: 'Subscription required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      })
    }

    // Get story details to find the full_audio_path
    const { storyId } = await req.json()
    const { data: story, error: storyError } = await supabaseClient
      .from('stories')
      .select('full_audio_path')
      .eq('id', storyId)
      .single()

    if (storyError || !story?.full_audio_path) {
      return new Response(JSON.stringify({ error: 'Story not found or access denied' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    // Generate Signed URL
    const serviceRoleClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: urlData, error: storageError } = await serviceRoleClient
      .storage
      .from('stories-audio')
      .createSignedUrl(story.full_audio_path, 3600) // 1 hour validity

    if (storageError) {
      return new Response(JSON.stringify({ error: 'Error generating signed URL' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    return new Response(JSON.stringify({ signedUrl: urlData.signedUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
