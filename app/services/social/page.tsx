
'use client';

import Link from 'next/link';

export default function SocialPage() {
  const socialGallery = [
    {
      title: 'Family Gathering Setup',
      image: 'https://readdy.ai/api/search-image?query=Family%20social%20gathering%20at%20PearlFountain%20Events%20Centre%20with%20warm%20decorations%2C%20comfortable%20seating%20arrangement%2C%20friendly%20atmosphere%2C%20casual%20celebration%20setup&width=300&height=200&seq=social-1&orientation=landscape'
    },
    {
      title: 'Friends Reunion Party',
      image: 'https://readdy.ai/api/search-image?query=Friends%20reunion%20party%20setup%20with%20casual%20decorations%2C%20fun%20atmosphere%2C%20social%20gathering%20arrangement%2C%20comfortable%20party%20environment&width=300&height=200&seq=social-2&orientation=landscape'
    },
    {
      title: 'Anniversary Celebration',
      image: 'https://readdy.ai/api/search-image?query=Anniversary%20celebration%20setup%20with%20romantic%20decorations%2C%20intimate%20table%20arrangement%2C%20special%20occasion%20atmosphere%20at%20event%20venue&width=300&height=200&seq=social-3&orientation=landscape'
    },
    {
      title: 'Community Event',
      image: 'https://readdy.ai/api/search-image?query=Community%20social%20event%20with%20inclusive%20setup%2C%20welcoming%20atmosphere%2C%20group%20celebration%20arrangement%2C%20friendly%20gathering%20space&width=300&height=200&seq=social-4&orientation=landscape'
    },
    {
      title: 'Holiday Party Setup',
      image: 'https://readdy.ai/api/search-image?query=Holiday%20social%20party%20with%20festive%20decorations%2C%20seasonal%20theme%2C%20joyful%20celebration%20atmosphere%2C%20community%20gathering%20setup&width=300&height=200&seq=social-5&orientation=landscape'
    },
    {
      title: 'Casual Dining Area',
      image: 'https://readdy.ai/api/search-image?query=Casual%20social%20dining%20area%20with%20comfortable%20seating%2C%20relaxed%20atmosphere%2C%20friendly%20gathering%20space%20for%20social%20events&width=300&height=200&seq=social-6&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Link href="/" className="flex items-center text-gray-600">
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </Link>
          <h1 className="font-bold text-gray-800">Social Gatherings</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-24 px-6">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-group-line text-purple-500 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Social Gatherings</h2>
            <p className="text-gray-600 text-sm">
              Perfect venue for family and friends gatherings at PearlFountain Events Centre
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="space-y-6 mb-8">
            {socialGallery.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-center">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Package Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-bold text-gray-800 mb-4 text-center">Social Gathering Packages</h3>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">Basic Social Package</h4>
                <p className="text-gray-600">₦300,000 - Perfect for intimate gatherings</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">Premium Social Package</h4>
                <p className="text-gray-600">₦400,000 - Enhanced with entertainment</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">Luxury Social Package</h4>
                <p className="text-gray-600">₦600,000 - Complete social experience</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/booking" className="block w-full bg-purple-500 text-white py-4 rounded-xl font-bold text-center hover:bg-purple-600 transition-colors">
            Book Social Event
          </Link>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
          <Link href="/" className="flex flex-col items-center text-gray-400">
            <i className="ri-home-line text-xl mb-1"></i>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center text-purple-500">
            <i className="ri-service-line text-xl mb-1"></i>
            <span className="text-xs">Services</span>
          </Link>
          <Link href="/booking" className="flex flex-col items-center text-gray-400">
            <i className="ri-calendar-line text-xl mb-1"></i>
            <span className="text-xs">Book</span>
          </Link>
          <Link href="/books" className="flex flex-col items-center text-gray-400">
            <i className="ri-book-line text-xl mb-1"></i>
            <span className="text-xs">Books</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
