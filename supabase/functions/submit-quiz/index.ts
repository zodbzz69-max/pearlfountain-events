import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { answers, personalityType } = await req.json()
    
    // Get user if authenticated
    const authHeader = req.headers.get('Authorization')
    let userId = null
    
    if (authHeader) {
      const { data: { user } } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
      userId = user?.id
    }

    // Check if user already took quiz today (if authenticated)
    if (userId) {
      const today = new Date().toISOString().split('T')[0]
      const { data: existingQuiz } = await supabaseClient
        .from('quiz_results')
        .select('id')
        .eq('user_id', userId)
        .gte('completed_at', `${today}T00:00:00.000Z`)
        .lt('completed_at', `${today}T23:59:59.999Z`)
        .single()

      if (existingQuiz) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'You can only take the quiz once per day. Come back tomorrow for more coins!'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }
    }

    // Insert quiz result
    const { data, error } = await supabaseClient
      .from('quiz_results')
      .insert({
        user_id: userId,
        personality_type: personalityType,
        answers: answers,
        webber_coins_earned: 5
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    // Award Weber Coins if user is authenticated
    if (userId) {
      // Get current balance
      const { data: currentBalance } = await supabaseClient
        .from('webber_coins')
        .select('balance')
        .eq('user_id', userId)
        .single()

      const newBalance = (currentBalance?.balance || 0) + 5

      await supabaseClient
        .from('webber_coins')
        .upsert({
          user_id: userId,
          balance: newBalance
        }, {
          onConflict: 'user_id'
        })

      // Record transaction
      await supabaseClient
        .from('transactions')
        .insert({
          user_id: userId,
          type: 'quiz_reward',
          amount: 0,
          webber_coins: 5,
          status: 'completed'
        })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Quiz completed successfully!',
        personalityType: personalityType,
        coinsEarned: userId ? 5 : 0,
        canRetakeAt: userId ? 'tomorrow' : null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})