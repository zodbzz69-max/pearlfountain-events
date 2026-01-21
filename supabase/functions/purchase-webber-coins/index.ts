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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Unauthorized')
    }

    const { packageId, paymentReference } = await req.json()

    // Get package details
    const { data: packageData, error: packageError } = await supabaseClient
      .from('webber_coin_packages')
      .select('*')
      .eq('id', packageId)
      .single()

    if (packageError || !packageData) {
      throw new Error('Package not found')
    }

    // Calculate total coins (base + bonus)
    const totalCoins = packageData.webber_coins + packageData.bonus_coins

    // Update user's webber coins balance
    const { error: updateError } = await supabaseClient
      .from('webber_coins')
      .upsert({
        user_id: user.id,
        balance: totalCoins
      }, {
        onConflict: 'user_id'
      })

    if (updateError) {
      // If upsert fails, try to add to existing balance
      const { data: existingBalance } = await supabaseClient
        .from('webber_coins')
        .select('balance')
        .eq('user_id', user.id)
        .single()

      const newBalance = (existingBalance?.balance || 0) + totalCoins

      const { error: incrementError } = await supabaseClient
        .from('webber_coins')
        .update({ balance: newBalance })
        .eq('user_id', user.id)

      if (incrementError) {
        throw new Error('Failed to update balance')
      }
    }

    // Record transaction
    await supabaseClient
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'webber_coin_purchase',
        amount: packageData.price_naira,
        webber_coins: totalCoins,
        payment_reference: paymentReference,
        status: 'completed'
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully purchased ${totalCoins.toLocaleString()} Webber Coins!`,
        coinsAdded: totalCoins
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