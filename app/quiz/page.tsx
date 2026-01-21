
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: { text: string; value: string; icon: string }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "How do you like your event atmosphere?",
    options: [
      { text: "Elegant & Calm", value: "royal", icon: "🌸" },
      { text: "Loud & Lively", value: "vibe", icon: "🔊" },
      { text: "Classy & Chic", value: "social", icon: "✨" },
      { text: "Warm & Family-friendly", value: "heart", icon: "❤️" }
    ]
  },
  {
    id: 2,
    question: "What's your ideal event size?",
    options: [
      { text: "Intimate (20-50 guests)", value: "heart", icon: "👥" },
      { text: "Medium (50-100 guests)", value: "royal", icon: "👫" },
      { text: "Large (100-200 guests)", value: "social", icon: "👪" },
      { text: "Grand (200+ guests)", value: "vibe", icon: "🎪" }
    ]
  },
  {
    id: 3,
    question: "Which decoration style appeals to you most?",
    options: [
      { text: "Classic & Timeless", value: "royal", icon: "🏛️" },
      { text: "Modern & Trendy", value: "social", icon: "🎨" },
      { text: "Colorful & Vibrant", value: "vibe", icon: "🌈" },
      { text: "Simple & Meaningful", value: "heart", icon: "🕊️" }
    ]
  },
  {
    id: 4,
    question: "What's most important for your event?",
    options: [
      { text: "Perfect photography moments", value: "social", icon: "📸" },
      { text: "Luxury and comfort", value: "royal", icon: "👑" },
      { text: "Fun and entertainment", value: "vibe", icon: "🎉" },
      { text: "Meaningful connections", value: "heart", icon: "💝" }
    ]
  },
  {
    id: 5,
    question: "How do you prefer to plan events?",
    options: [
      { text: "Every detail planned months ahead", value: "royal", icon: "📋" },
      { text: "Flexible with room for spontaneity", value: "vibe", icon: "🎲" },
      { text: "Focus on the guest experience", value: "heart", icon: "🤗" },
      { text: "Trendy and Instagram-worthy", value: "social", icon: "📱" }
    ]
  },
  {
    id: 6,
    question: "What's your ideal event timing?",
    options: [
      { text: "Elegant evening affair", value: "royal", icon: "🌙" },
      { text: "Afternoon garden party", value: "heart", icon: "🌻" },
      { text: "Late night celebration", value: "vibe", icon: "🌃" },
      { text: "Stylish brunch event", value: "social", icon: "☀️" }
    ]
  },
  {
    id: 7,
    question: "What motivates you to host events?",
    options: [
      { text: "Creating lasting memories", value: "heart", icon: "💭" },
      { text: "Showcasing style and taste", value: "royal", icon: "💎" },
      { text: "Bringing people together for fun", value: "vibe", icon: "🎊" },
      { text: "Building social connections", value: "social", icon: "🤝" }
    ]
  }
]

const personalityTypes = {
  royal: {
    title: "Royal Planner",
    description: "You love premium details and elegant setups. Every element must be perfect and sophisticated.",
    traits: ["Attention to detail", "Luxury-focused", "Timeless elegance", "Premium quality"],
    icon: "👑",
    color: "from-purple-500 to-purple-700"
  },
  vibe: {
    title: "Vibe Curator",
    description: "You create energetic atmospheres where everyone has an amazing time. Fun is your priority!",
    traits: ["High energy", "Entertainment-focused", "Spontaneous", "Party atmosphere"],
    icon: "🎉",
    color: "from-orange-500 to-red-600"
  },
  social: {
    title: "Social Architect",
    description: "You design experiences that look amazing and create perfect social moments.",
    traits: ["Trendy style", "Photo-worthy", "Social media savvy", "Modern aesthetics"],
    icon: "✨",
    color: "from-pink-500 to-rose-600"
  },
  heart: {
    title: "Heart Connector",
    description: "You focus on meaningful moments and bringing people closer together.",
    traits: ["Meaningful connections", "Family-focused", "Warm atmosphere", "Personal touches"],
    icon: "❤️",
    color: "from-green-500 to-emerald-600"
  }
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [personalityType, setPersonalityType] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [canRetake, setCanRetake] = useState(true)
  const [userBalance, setUserBalance] = useState(0)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUser()
    fetchUserBalance()
  }, [])

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

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/quiz`
      }
    })
  }

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = async (allAnswers: string[]) => {
    const counts = { royal: 0, vibe: 0, social: 0, heart: 0 }
    
    allAnswers.forEach(answer => {
      counts[answer as keyof typeof counts]++
    })

    const result = Object.entries(counts).reduce((a, b) => 
      counts[a[0] as keyof typeof counts] > counts[b[0] as keyof typeof counts] ? a : b
    )[0]

    setPersonalityType(result)
    setShowResult(true)

    // Submit to database
    if (user) {
      await submitQuizResult(allAnswers, result)
    }
  }

  const submitQuizResult = async (allAnswers: string[], result: string) => {
    setLoading(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          answers: allAnswers,
          personalityType: result
        })
      })

      const data = await response.json()
      
      if (data.success) {
        if (data.coinsEarned > 0) {
          fetchUserBalance()
        }
        setCanRetake(data.canRetakeAt === 'tomorrow' ? false : true)
      } else {
        setCanRetake(false)
        alert(data.message)
      }
    } catch (error) {
      console.error('Quiz submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setPersonalityType('')
  }

  const shareResult = () => {
    const personality = personalityTypes[personalityType as keyof typeof personalityTypes]
    const text = `I just took the PearlFountain Event Quiz and I'm a ${personality.title}! 🎉 Discover your event planning personality at PearlFountain Events Centre.`
    
    if (navigator.share) {
      navigator.share({
        title: 'PearlFountain Event Quiz Result',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href)
      alert('Result copied to clipboard!')
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
          <h1 className="font-bold text-lg text-gray-800">Event Quiz</h1>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="pt-20 pb-24 px-4">
        {/* User Balance */}
        {user && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <i className="ri-coins-line text-xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weber Coins</p>
                  <p className="text-xl font-bold text-yellow-600">{userBalance.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Quiz Reward</p>
                <p className="text-lg font-semibold text-green-600">+5 WC</p>
              </div>
            </div>
          </div>
        )}

        {!showResult ? (
          <>
            {/* Hero Section */}
            {currentQuestion === 0 && answers.length === 0 && (
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=elegant%20event%20hall%20with%20confetti%20and%20celebration%20lights%2C%20festive%20atmosphere%2C%20premium%20venue%20interior%20with%20golden%20lighting%20and%20party%20decorations%2C%20luxurious%20celebration%20space&width=400&height=200&seq=quiz-hero&orientation=landscape"
                    alt="PearlFountain Quiz"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-2xl font-bold">🎉 PearlFountain Event Quiz</h1>
                    <p className="text-sm opacity-90">Discover Your Perfect Event Style</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">How It Works</h2>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🧠</span>
                      </div>
                      <p className="text-sm text-gray-600">Answer 7 fun questions</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🎭</span>
                      </div>
                      <p className="text-sm text-gray-600">Get your personality</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">💎</span>
                      </div>
                      <p className="text-sm text-gray-600">Earn 5 Weber Coins</p>
                    </div>
                  </div>
                  
                  {!user && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                      <p className="text-sm text-yellow-800 mb-3">Sign in to earn Weber Coins and track your results!</p>
                      <button
                        onClick={signInWithGoogle}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2 rounded-lg font-semibold text-sm"
                      >
                        Sign In with Google
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-sm text-gray-500">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 text-left border border-gray-200 rounded-xl hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-800 group-hover:text-rose-600">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Confetti Animation */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce">🎊</div>
              <h1 className="text-2xl font-bold text-gray-800">Quiz Complete!</h1>
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${personalityTypes[personalityType as keyof typeof personalityTypes]?.color} rounded-full flex items-center justify-center text-3xl`}>
                  {personalityTypes[personalityType as keyof typeof personalityTypes]?.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  You're a {personalityTypes[personalityType as keyof typeof personalityTypes]?.title}!
                </h2>
                <p className="text-gray-600 mb-4">
                  {personalityTypes[personalityType as keyof typeof personalityTypes]?.description}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Your Traits:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {personalityTypes[personalityType as keyof typeof personalityTypes]?.traits.map((trait, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {user && (
                <div className="bg-green-50 rounded-xl p-4 mb-6 text-center">
                  <div className="text-2xl mb-2">🎁</div>
                  <p className="font-semibold text-green-800">Earned: +5 Weber Coins!</p>
                  <p className="text-sm text-green-600">
                    {canRetake ? 'You can retake the quiz tomorrow for more coins!' : 'Come back tomorrow to retake the quiz!'}
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={shareResult}
                  className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Share Result
                </button>
                {canRetake && (
                  <button
                    onClick={resetQuiz}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Ready to Plan Your Event?</h3>
              <p className="text-gray-600 mb-4">Book your next event and earn 100 Weber Coins instantly!</p>
              <Link
                href="/booking"
                className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
              >
                Book Your Event
              </Link>
            </div>
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
              <i className="ri-coins-line text-gray-400"></i>
            </div>
            <span className="text-xs text-gray-400 mt-1">Coins</span>
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
