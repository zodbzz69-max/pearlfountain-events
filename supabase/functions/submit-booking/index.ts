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

    const formData = await req.json()
    
    // Get user if authenticated
    const authHeader = req.headers.get('Authorization')
    let userId = null
    
    if (authHeader) {
      const { data: { user } } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
      userId = user?.id
    }

    // Insert booking request
    const { data, error } = await supabaseClient
      .from('bookings')
      .insert({
        user_id: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        guest_count: parseInt(formData.guestCount),
        package_type: formData.packageType,
        budget_range: formData.budgetRange,
        special_requests: formData.specialRequests
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    // Award Weber Coins if user is authenticated
    if (userId) {
      await supabaseClient
        .from('webber_coins')
        .upsert({
          user_id: userId,
          balance: 100
        }, {
          onConflict: 'user_id'
        })

      // Record transaction
      await supabaseClient
        .from('transactions')
        .insert({
          user_id: userId,
          type: 'booking_reward',
          amount: 0,
          webber_coins: 100,
          status: 'completed'
        })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking request submitted successfully!',
        bookingId: data.id,
        coinsEarned: userId ? 100 : 0
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