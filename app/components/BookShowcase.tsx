
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookShowcase() {
  const [selectedBook, setSelectedBook] = useState(0);

  const books = [
    {
      id: 1,
      title: 'Just a Pound of Flesh',
      author: 'Daniel Sokari-Pedro',
      price: '₦3,500',
      originalPrice: '₦5,000',
      rating: 4.8,
      reviews: 127,
      description: 'A gripping tale of resilience, justice, and the human spirit. This powerful Nigerian novel explores themes of corruption, redemption, and the price of integrity in modern society. Set against the backdrop of contemporary Nigeria, it follows the journey of a young lawyer who must choose between personal gain and moral righteousness.',
      cover: 'https://readdy.ai/api/search-image?query=Nigerian%20literature%20book%20cover%20design%20for%20Just%20a%20Pound%20of%20Flesh%20by%20Daniel%20Sokari-Pedro%2C%20dramatic%20book%20cover%20with%20dark%20themes%2C%20justice%20and%20corruption%20themes%2C%20professional%20book%20design%2C%20African%20literature%20aesthetic%2C%20powerful%20typography%2C%20symbolic%20imagery&width=200&height=300&seq=book-cover-1&orientation=portrait',
      genre: 'Nigerian Literature',
      pages: 40,
      language: 'English',
      publisher: 'PearlFountain Press',
      launchDate: 'Coming 2025',
      features: [
        'Compelling storyline',
        'Rich character development',
        'Social commentary',
        'Award-winning narrative'
      ]
    }
  ];

  const currentBook = books[selectedBook];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Featured Book Launch</h2>
          <p className="text-gray-600 text-sm">Discover compelling Nigerian literature - Coming 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Book Cover Section */}
          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-center">
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              PRE-ORDER
            </div>
            <div className="absolute top-4 left-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              2025 LAUNCH
            </div>
            <img 
              src={currentBook.cover} 
              alt={currentBook.title}
              className="w-32 h-48 object-cover object-top rounded-lg shadow-xl mx-auto mb-4"
            />
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">{currentBook.title}</h3>
              <p className="text-indigo-200 text-sm mb-3">by {currentBook.author}</p>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`ri-star-${i < Math.floor(currentBook.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
                    ></i>
                  ))}
                </div>
                <span className="text-indigo-200 text-sm">(Expected reviews)</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl font-bold">{currentBook.price}</span>
                <span className="text-indigo-300 line-through text-sm">{currentBook.originalPrice}</span>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">About This Book</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{currentBook.description}</p>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-500">Genre:</span>
                <p className="font-medium text-gray-900">{currentBook.genre}</p>
              </div>
              <div>
                <span className="text-gray-500">Pages:</span>
                <p className="font-medium text-gray-900">{currentBook.pages}</p>
              </div>
              <div>
                <span className="text-gray-500">Language:</span>
                <p className="font-medium text-gray-900">{currentBook.language}</p>
              </div>
              <div>
                <span className="text-gray-500">Launch:</span>
                <p className="font-medium text-gray-900">{currentBook.launchDate}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Why Readers Will Love It</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentBook.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-colors">
                Pre-Order Now - {currentBook.price}
              </button>
              <Link href="/books" className="block w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center">
                Explore All Books
              </Link>
            </div>
          </div>
        </div>

        {/* Author Spotlight */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-user-line text-indigo-600 text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Meet the Author</h3>
            <p className="text-indigo-600 font-medium mb-3">{currentBook.author}</p>
            <p className="text-gray-600 text-sm mb-4">
              Acclaimed Nigerian author known for powerful storytelling and social commentary. 
              Winner of multiple literary awards for outstanding contribution to African literature.
            </p>
            <Link href="/books" className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors">
              View Author Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}