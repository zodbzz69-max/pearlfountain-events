
'use client';

import Link from 'next/link';

export default function BirthdaysPage() {
  const birthdayGallery = [
    {
      title: 'Colorful Birthday Setup',
      image: 'https://readdy.ai/api/search-image?query=Birthday%20party%20celebration%20at%20PearlFountain%20Events%20Centre%20with%20colorful%20decorations%2C%20balloon%20arrangements%2C%20festive%20table%20setup%2C%20birthday%20cake%20display%2C%20joyful%20party%20atmosphere&width=300&height=200&seq=birthday-1&orientation=landscape'
    },
    {
      title: 'Kids Birthday Theme',
      image: 'https://readdy.ai/api/search-image?query=Children%20birthday%20party%20setup%20with%20cartoon%20themed%20decorations%2C%20colorful%20balloons%2C%20fun%20table%20arrangements%2C%20kids%20party%20atmosphere%20at%20event%20venue&width=300&height=200&seq=birthday-2&orientation=landscape'
    },
    {
      title: 'Adult Birthday Celebration',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20adult%20birthday%20party%20with%20sophisticated%20decorations%2C%20balloon%20arch%2C%20elegant%20table%20setting%2C%20mature%20celebration%20atmosphere%20at%20event%20hall&width=300&height=200&seq=birthday-3&orientation=landscape'
    },
    {
      title: 'Birthday Cake Display',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20birthday%20cake%20display%20table%20with%20elegant%20decorations%2C%20multiple%20tier%20cake%2C%20festive%20backdrop%2C%20celebration%20setup&width=300&height=200&seq=birthday-4&orientation=landscape'
    },
    {
      title: 'Party Entertainment Area',
      image: 'https://readdy.ai/api/search-image?query=Birthday%20party%20entertainment%20area%20with%20dance%20floor%2C%20DJ%20setup%2C%20colorful%20lighting%2C%20fun%20party%20atmosphere%20for%20celebration&width=300&height=200&seq=birthday-5&orientation=landscape'
    },
    {
      title: 'Photo Booth Corner',
      image: 'https://readdy.ai/api/search-image?query=Birthday%20party%20photo%20booth%20area%20with%20fun%20backdrop%2C%20props%20display%2C%20colorful%20decorations%2C%20memorable%20photo%20opportunity%20setup&width=300&height=200&seq=birthday-6&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Link href="/" className="flex items-center text-gray-600">
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </Link>
          <h1 className="font-bold text-gray-800">Birthday Parties</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-24 px-6">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-cake-line text-yellow-500 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Birthday Celebrations</h2>
            <p className="text-gray-600 text-sm">
              Memorable birthday parties for all ages at PearlFountain Events Centre
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="space-y-6 mb-8">
            {birthdayGallery.map((item, index) => (
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
            <h3 className="font-bold text-gray-800 mb-4 text-center">Birthday Packages</h3>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-800">Basic Birthday Package</h4>
                <p className="text-gray-600">₦300,000 - Perfect for intimate celebrations</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-800">Premium Birthday Package</h4>
                <p className="text-gray-600">₦400,000 - Enhanced with entertainment</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-800">Luxury Birthday Package</h4>
                <p className="text-gray-600">₦600,000 - Complete celebration experience</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/booking" className="block w-full bg-yellow-500 text-white py-4 rounded-xl font-bold text-center hover:bg-yellow-600 transition-colors">
            Book Birthday Party
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
          <Link href="/services" className="flex flex-col items-center text-yellow-500">
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
