
'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const books = [
    {
      id: 1,
      title: "The Perfect Wedding Planner",
      author: "Sarah Johnson",
      price: "₦3,500",
      originalPrice: "₦5,000",
      rating: 4.8,
      reviews: 124,
      image: "https://readdy.ai/api/search-image?query=elegant%20wedding%20planning%20book%20cover%20with%20white%20and%20gold%20design%2C%20professional%20photography%20style%2C%20clean%20background%2C%20luxury%20aesthetic%2C%20book%20mockup&width=300&height=400&seq=book1&orientation=portrait",
      description: "Complete guide to planning your dream wedding with expert tips, checklists, and budget management strategies.",
      features: [
        "12-month planning timeline",
        "Budget tracking worksheets",
        "Vendor selection guide",
        "Day-of coordination tips",
        "Emergency backup plans"
      ]
    },
    {
      id: 2,
      title: "Corporate Events Mastery",
      author: "Michael Chen",
      price: "₦4,200",
      originalPrice: "₦6,000",
      rating: 4.9,
      reviews: 89,
      image: "https://readdy.ai/api/search-image?query=professional%20corporate%20events%20book%20cover%20with%20blue%20and%20silver%20design%2C%20business%20aesthetic%2C%20clean%20modern%20layout%2C%20book%20mockup&width=300&height=400&seq=book2&orientation=portrait",
      description: "Master the art of corporate event planning with proven strategies for conferences, seminars, and business gatherings.",
      features: [
        "ROI measurement techniques",
        "Stakeholder management",
        "Technology integration",
        "Networking optimization",
        "Post-event analysis"
      ]
    },
    {
      id: 3,
      title: "Birthday Party Magic",
      author: "Emma Williams",
      price: "₦2,800",
      originalPrice: "₦4,000",
      rating: 4.7,
      reviews: 156,
      image: "https://readdy.ai/api/search-image?query=colorful%20birthday%20party%20planning%20book%20cover%20with%20festive%20design%2C%20balloons%20and%20celebration%20elements%2C%20cheerful%20aesthetic%2C%20book%20mockup&width=300&height=400&seq=book3&orientation=portrait",
      description: "Create unforgettable birthday celebrations for all ages with creative themes, activities, and party planning secrets.",
      features: [
        "Age-appropriate themes",
        "DIY decoration ideas",
        "Entertainment planning",
        "Food and cake guides",
        "Safety considerations"
      ]
    }
  ];

  const handleBuyNow = (book: any) => {
    setSelectedBook(book);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowPaymentModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Event Planning Books
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Master the art of event planning with our expert guides
            </p>
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
              📚 Digital downloads available instantly after purchase
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-check-line text-green-600"></i>
                </div>
                <p className="text-green-800 font-medium">
                  Purchase successful! Check your email for download instructions.
                </p>
              </div>
            </div>
          )}

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Save {Math.round((1 - parseInt(book.price.replace(/[^\d]/g, '')) / parseInt(book.originalPrice.replace(/[^\d]/g, ''))) * 100)}%
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-3">by {book.author}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 flex items-center justify-center">
                          <i className={`ri-star-${i < Math.floor(book.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({book.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                    <ul className="space-y-1">
                      {book.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-4 h-4 flex items-center justify-center mr-2 mt-0.5">
                            <i className="ri-check-line text-green-500 text-xs"></i>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-indigo-600">{book.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{book.originalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleBuyNow(book)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      Buy Now - {book.price}
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                      Preview Sample
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Event Planning Books?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-download-line text-indigo-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Instant Download</h3>
                <p className="text-gray-600 text-sm">Get immediate access to your books after purchase. No waiting, no shipping fees.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-purple-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Expert Authors</h3>
                <p className="text-gray-600 text-sm">Written by industry professionals with years of event planning experience.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-refresh-line text-green-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Regular Updates</h3>
                <p className="text-gray-600 text-sm">Get free updates with new trends, tips, and industry best practices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-book-line text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h2>
              <p className="text-gray-600">{selectedBook.title}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Book:</span>
                <span className="text-gray-900">{selectedBook.title}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Author:</span>
                <span className="text-gray-900">{selectedBook.author}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Price:</span>
                <span className="text-xl font-bold text-indigo-600">{selectedBook.price}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  `Pay ${selectedBook.price}`
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure payment processing. You'll receive download instructions via email.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
