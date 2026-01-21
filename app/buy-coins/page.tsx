
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Package {
  id: number
  name: string
  price_naira: number
  webber_coins: number
  bonus_coins: number
  description: string
}

export default function BuyCoinsPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [userBalance, setUserBalance] = useState(0)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchPackages()
    checkUser()
    fetchUserBalance()
  }, [])

  const fetchPackages = async () => {
    const { data } = await supabase
      .from('webber_coin_packages')
      .select('*')
      .eq('is_active', true)
      .order('price_naira')
    
    if (data) setPackages(data)
  }

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchUserBalance = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('webber_coins')
        .select('balance')
        .eq('user_id', user.id)
        .single()
      
      setUserBalance(data?.balance || 0)
    }
  }

  const handlePurchase = async (pkg: Package) => {
    if (!user) {
      alert('Please sign in to purchase Webber Coins')
      return
    }

    setSelectedPackage(pkg)
    setShowPayment(true)
  }

  const processPayment = async () => {
    if (!selectedPackage) return

    setLoading(true)
    try {
      // Simulate payment processing (replace with actual Paystack/Flutterwave integration)
      const paymentReference = `WC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const response = await fetch('/api/supabase/functions/v1/purchase-webber-coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          paymentReference
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert(result.message)
        setShowPayment(false)
        setSelectedPackage(null)
        fetchUserBalance()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      alert('Payment failed. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getPackageColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'starter': return 'from-gray-400 to-gray-600'
      case 'bronze': return 'from-amber-600 to-amber-800'
      case 'silver': return 'from-gray-300 to-gray-500'
      case 'gold': return 'from-yellow-400 to-yellow-600'
      case 'platinum': return 'from-purple-400 to-purple-600'
      default: return 'from-blue-400 to-blue-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Navigation */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-rose-200 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </div>
            <span className="font-medium text-gray-700">Back</span>
          </Link>
          <h1 className="font-bold text-lg text-gray-800">Buy Webber Coins</h1>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="pt-20 pb-24 px-4">
        {/* User Balance */}
        {user && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <i className="ri-coins-line text-2xl text-white"></i>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Balance</h2>
              <p className="text-3xl font-bold text-yellow-600">{userBalance.toLocaleString()} WC</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💰 Buy Webber Coins</h1>
          <p className="text-gray-600">Purchase Webber Coins to unlock exclusive rewards and discounts</p>
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Exchange Rate:</span> ₦1 = 10 Webber Coins
            </p>
          </div>
        </div>

        {/* Packages */}
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getPackageColor(pkg.name)} text-white font-semibold`}>
                  {pkg.name}
                </div>
                {pkg.bonus_coins > 0 && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    +{pkg.bonus_coins.toLocaleString()} Bonus
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-800">₦{pkg.price_naira.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-yellow-600">
                  <i className="ri-coins-line"></i>
                  <span className="font-semibold">{(pkg.webber_coins + pkg.bonus_coins).toLocaleString()} WC</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{pkg.description}</p>
              </div>

              <button
                onClick={() => handlePurchase(pkg)}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
              >
                Purchase Now
              </button>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedPackage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Purchase</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold">₦{selectedPackage.price_naira.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">You'll receive:</span>
                  <span className="font-semibold text-yellow-600">
                    {(selectedPackage.webber_coins + selectedPackage.bonus_coins).toLocaleString()} WC
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sign In Prompt */}
        {!user && (
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-2xl text-gray-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign In Required</h3>
            <p className="text-gray-600 mb-4">Please sign in to purchase Webber Coins and track your balance</p>
            <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold">
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <Link href="/" className="flex flex-col items-center py-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-home-line text-gray-400"></i>
            </div>
            <span className="text-xs text-gray-400 mt-1">Home</span>
          </Link>
          <Link href="/experience-hub" className="flex flex-col items-center py-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-book-line text-gray-400"></i>
            </div>
            <span className="text-xs text-gray-400 mt-1">Books</span>
          </Link>
          <Link href="/buy-coins" className="flex flex-col items-center py-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-coins-line text-rose-500"></i>
            </div>
            <span className="text-xs text-rose-500 mt-1">Coins</span>
          </Link>
          <Link href="/booking" className="flex flex-col items-center py-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-calendar-line text-gray-400"></i>
            </div>
            <span className="text-xs text-gray-400 mt-1">Book</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
