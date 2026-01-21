'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function ExperienceHubPage() {
  const [weberCoins, setWeberCoins] = useState(0);
  const [dailyQuizTaken, setDailyQuizTaken] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  useEffect(() => {
    const savedCoins = localStorage.getItem('weberCoins');
    const lastQuizDate = localStorage.getItem('lastQuizDate');
    const today = new Date().toDateString();
    
    if (savedCoins) {
      setWeberCoins(parseInt(savedCoins));
    }
    
    if (lastQuizDate === today) {
      setDailyQuizTaken(true);
    }
  }, []);

  const addCoins = (amount: number, message: string) => {
    const newTotal = weberCoins + amount;
    setWeberCoins(newTotal);
    localStorage.setItem('weberCoins', newTotal.toString());
    setRewardMessage(message);
    setShowRewardModal(true);
    setTimeout(() => setShowRewardModal(false), 3000);
  };

  const activities = [
    {
      id: 'quiz',
      title: 'Event Planner Quiz',
      description: 'Discover your event planning personality',
      reward: '+5 Weber Coins',
      icon: 'ri-questionnaire-line',
      color: 'bg-purple-500',
      available: !dailyQuizTaken,
      action: () => window.location.href = '/quiz'
    },
    {
      id: 'share',
      title: 'Share Our Services',
      description: 'Share PearlFountain with friends',
      reward: '+3 Weber Coins',
      icon: 'ri-share-line',
      color: 'bg-blue-500',
      available: true,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'PearlFountain Events Centre',
            text: 'Check out this amazing event venue!',
            url: window.location.origin
          });
        } else {
          navigator.clipboard.writeText(window.location.origin);
        }
        addCoins(3, 'Thanks for sharing! +3 Weber Coins earned');
      }
    },
    {
      id: 'review',
      title: 'Leave a Review',
      description: 'Share your experience with us',
      reward: '+10 Weber Coins',
      icon: 'ri-star-line',
      color: 'bg-yellow-500',
      available: true,
      action: () => addCoins(10, 'Thank you for your review! +10 Weber Coins earned')
    },
    {
      id: 'newsletter',
      title: 'Subscribe to Newsletter',
      description: 'Get updates on events and offers',
      reward: '+5 Weber Coins',
      icon: 'ri-mail-line',
      color: 'bg-green-500',
      available: true,
      action: () => addCoins(5, 'Welcome to our newsletter! +5 Weber Coins earned')
    }
  ];

  const rewards = [
    {
      id: 'book-discount',
      title: '10% Off Book Purchase',
      description: 'Discount on "Just a Pound of Flesh"',
      cost: 50,
      icon: 'ri-book-line',
      color: 'bg-indigo-500'
    },
    {
      id: 'tent-discount',
      title: '₦5,000 Off Tent Rental',
      description: 'Discount on any tent rental service',
      cost: 100,
      icon: 'ri-tent-line',
      color: 'bg-green-500'
    },
    {
      id: 'consultation',
      title: 'Free Event Consultation',
      description: '1-hour free planning consultation',
      cost: 75,
      icon: 'ri-user-voice-line',
      color: 'bg-blue-500'
    },
    {
      id: 'hall-discount',
      title: '₦20,000 Off Hall Booking',
      description: 'Discount on any event hall package',
      cost: 200,
      icon: 'ri-building-line',
      color: 'bg-rose-500'
    }
  ];

  const redeemReward = (reward: any) => {
    if (weberCoins >= reward.cost) {
      const newTotal = weberCoins - reward.cost;
      setWeberCoins(newTotal);
      localStorage.setItem('weberCoins', newTotal.toString());
      setRewardMessage(`${reward.title} redeemed! Check your email for details.`);
      setShowRewardModal(true);
      setTimeout(() => setShowRewardModal(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Experience Hub
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Engage, earn, and redeem Weber Coins for amazing rewards
            </p>
            
            {/* Weber Coins Balance */}
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <i className="ri-coin-line text-2xl"></i>
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Your Balance</div>
                <div className="text-2xl font-bold">{weberCoins} Weber Coins</div>
              </div>
            </div>
          </div>

          {/* Reward Modal */}
          {showRewardModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-pulse">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-coin-line text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                <p className="text-gray-600">{rewardMessage}</p>
              </div>
            </div>
          )}

          {/* Activities Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Earn Weber Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20quiz%20brain%20with%20question%20marks%2C%20vibrant%20purple%20and%20pink%20colors%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective&width=64&height=64&seq=quiz-icon&orientation=squarish"
                      alt="Quiz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">Event Planner Quiz</h3>
                    <p className="text-sm text-gray-600 mb-2">Discover your event planning personality</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">+5 WC</span>
                      <span className="text-xs text-gray-500">Daily</span>
                    </div>
                  </div>
                </div>
                <Link href="/quiz">
                  <button className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-purple-500 text-white hover:opacity-90">
                    Start Activity
                  </button>
                </Link>
              </div>
              {activities.slice(1).map((activity) => (
                <div key={activity.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 ${activity.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className={`${activity.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                    <div className="text-lg font-bold text-green-600 mb-4">{activity.reward}</div>
                  </div>
                  
                  <button
                    onClick={activity.action}
                    disabled={!activity.available}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      activity.available
                        ? `${activity.color} text-white hover:opacity-90`
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {activity.available ? 'Start Activity' : 'Completed Today'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Redeem Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 ${reward.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className={`${reward.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="text-lg font-bold text-purple-600 mb-4">{reward.cost} Coins</div>
                  </div>
                  
                  <button
                    onClick={() => redeemReward(reward)}
                    disabled={weberCoins < reward.cost}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      weberCoins >= reward.cost
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {weberCoins >= reward.cost ? 'Redeem Now' : 'Need More Coins'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="/booking"
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-rose-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-rose-200 transition-colors">
                  <i className="ri-calendar-line text-rose-600 text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Book Event</h3>
                <p className="text-sm text-gray-600 text-center">Earn 100 coins with booking</p>
              </Link>

              <Link 
                href="/books"
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition-colors">
                  <i className="ri-book-line text-indigo-600 text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Browse Books</h3>
                <p className="text-sm text-gray-600 text-center">Discover amazing literature</p>
              </Link>

              <Link 
                href="/services"
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <i className="ri-service-line text-green-600 text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Our Services</h3>
                <p className="text-sm text-gray-600 text-center">Explore all our offerings</p>
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mt-12 text-white">
            <h2 className="text-2xl font-bold text-center mb-8">How Weber Coins Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-play-circle-line text-2xl"></i>
                </div>
                <h3 className="font-semibold mb-2">1. Participate</h3>
                <p className="text-sm text-white/90">Complete activities and engage with our platform</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-coin-line text-2xl"></i>
                </div>
                <h3 className="font-semibold mb-2">2. Earn Coins</h3>
                <p className="text-sm text-white/90">Get Weber Coins for every completed activity</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-shopping-bag-line text-2xl"></i>
                </div>
                <h3 className="font-semibold mb-2">3. Redeem</h3>
                <p className="text-sm text-white/90">Use coins for discounts and exclusive rewards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-gift-line text-2xl"></i>
                </div>
                <h3 className="font-semibold mb-2">4. Enjoy</h3>
                <p className="text-sm text-white/90">Get amazing deals on our services and books</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}