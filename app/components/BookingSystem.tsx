'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function BookingSystem() {
  const [activeTab, setActiveTab] = useState('booking')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/booking`
      }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        eventType: formData.get('eventType'),
        eventDate: formData.get('eventDate'),
        guestCount: formData.get('guestCount'),
        packageType: formData.get('packageType'),
        budgetRange: formData.get('budgetRange'),
        specialRequests: formData.get('specialRequests')
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          ...(user && { 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` })
        },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()
      
      if (result.success) {
        setSuccessMessage(result.message + (result.coinsEarned > 0 ? ` You earned ${result.coinsEarned} Weber Coins!` : ''))
        setShowSuccess(true)
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      alert('Booking submission failed. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const consultationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        preferredDate: formData.get('preferredDate'),
        preferredTime: formData.get('preferredTime'),
        consultationType: formData.get('consultationType'),
        message: formData.get('message')
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-consultation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          ...(user && { 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` })
        },
        body: JSON.stringify(consultationData)
      })

      const result = await response.json()
      
      if (result.success) {
        setSuccessMessage(result.message)
        setShowSuccess(true)
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      alert('Consultation submission failed. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* User Authentication Section */}
        {user ? (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{user.email?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                  <p className="text-sm text-green-600">✓ Signed in - Earn Weber Coins!</p>
                </div>
              </div>
              <button
                onClick={signOut}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <i className="ri-coins-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn Weber Coins!</h3>
            <p className="text-gray-600 mb-4">Sign in to earn 100 Weber Coins when you book an event</p>
            <button
              onClick={signInWithGoogle}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
            >
              Sign In with Google
            </button>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Event</h1>
          <p className="text-gray-600">Let's make your celebration unforgettable at PearlFountain Events Centre</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-2 mb-8 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('booking')}
              className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'booking'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Event Booking
            </button>
            <button
              onClick={() => setActiveTab('consultation')}
              className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'consultation'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Free Consultation
            </button>
          </div>
        </div>

        {/* Event Booking Form */}
        {activeTab === 'booking' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Booking Request</h2>
            
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Event Type *</label>
                  <select
                    name="eventType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="graduation">Graduation</option>
                    <option value="social">Social Gathering</option>
                    <option value="launch">Product Launch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Number of Guests *</label>
                  <input
                    type="number"
                    name="guestCount"
                    required
                    min="1"
                    max="300"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="e.g., 150"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Package Type *</label>
                  <select
                    name="packageType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select package</option>
                    <option value="basic">Basic Package - ₦300,000</option>
                    <option value="premium">Premium Package - ₦400,000</option>
                    <option value="luxury">Luxury Package - ₦600,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Budget Range</label>
                <select
                  name="budgetRange"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="200k-400k">₦200,000 - ₦400,000</option>
                  <option value="400k-600k">₦400,000 - ₦600,000</option>
                  <option value="600k-1m">₦600,000 - ₦1,000,000</option>
                  <option value="1m+">₦1,000,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Any special requirements, decorations, or additional services..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        )}

        {/* Consultation Form */}
        {activeTab === 'consultation' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Free Consultation</h2>
            <p className="text-gray-600 mb-6">Schedule a free consultation to discuss your event needs and get personalized recommendations.</p>
            
            <form onSubmit={handleConsultationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-rose-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Consultation Type *</label>
                <select
                  name="consultationType"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select consultation type</option>
                  <option value="venue-tour">Venue Tour</option>
                  <option value="event-planning">Event Planning Discussion</option>
                  <option value="package-details">Package Details</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your event or any specific questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Schedule Consultation'}
              </button>
            </form>
          </div>
        )}

        {/* ... existing packages section ... */}
      </div>
    </div>
  )
}
