
'use client';

import Link from 'next/link';

export default function CorporatePage() {
  const corporateGallery = [
    {
      title: 'Conference Setup',
      image: 'https://readdy.ai/api/search-image?query=Corporate%20conference%20setup%20at%20PearlFountain%20Events%20Centre%20with%20professional%20stage%2C%20modern%20presentation%20screen%2C%20business%20seating%20arrangement%2C%20professional%20lighting%2C%20elegant%20corporate%20event%20decoration&width=300&height=200&seq=corporate-1&orientation=landscape'
    },
    {
      title: 'Business Meeting Layout',
      image: 'https://readdy.ai/api/search-image?query=Corporate%20business%20meeting%20room%20setup%20with%20round%20tables%2C%20professional%20chairs%2C%20modern%20audio%20visual%20equipment%2C%20clean%20corporate%20design%20at%20event%20venue&width=300&height=200&seq=corporate-2&orientation=landscape'
    },
    {
      title: 'Presentation Stage',
      image: 'https://readdy.ai/api/search-image?query=Professional%20presentation%20stage%20with%20modern%20backdrop%2C%20corporate%20branding%20space%2C%20professional%20lighting%2C%20business%20conference%20setup%20at%20event%20hall&width=300&height=200&seq=corporate-3&orientation=landscape'
    },
    {
      title: 'Networking Area',
      image: 'https://readdy.ai/api/search-image?query=Corporate%20networking%20area%20with%20cocktail%20tables%2C%20professional%20standing%20setup%2C%20business%20event%20atmosphere%2C%20elegant%20corporate%20decoration&width=300&height=200&seq=corporate-4&orientation=landscape'
    },
    {
      title: 'Training Workshop Setup',
      image: 'https://readdy.ai/api/search-image?query=Corporate%20training%20workshop%20setup%20with%20classroom%20style%20seating%2C%20professional%20presentation%20area%2C%20modern%20business%20environment%20at%20event%20venue&width=300&height=200&seq=corporate-5&orientation=landscape'
    },
    {
      title: 'Awards Ceremony',
      image: 'https://readdy.ai/api/search-image?query=Corporate%20awards%20ceremony%20setup%20with%20elegant%20stage%2C%20professional%20backdrop%2C%20formal%20seating%20arrangement%2C%20business%20celebration%20atmosphere&width=300&height=200&seq=corporate-6&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Link href="/" className="flex items-center text-gray-600">
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </Link>
          <h1 className="font-bold text-gray-800">Corporate Events</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-24 px-6">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-briefcase-line text-blue-500 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Corporate Events</h2>
            <p className="text-gray-600 text-sm">
              Professional business meetings, conferences, and corporate celebrations
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="space-y-6 mb-8">
            {corporateGallery.map((item, index) => (
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
            <h3 className="font-bold text-gray-800 mb-4 text-center">Corporate Packages</h3>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Basic Corporate Package</h4>
                <p className="text-gray-600">₦300,000 - Essential business meeting setup</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Premium Corporate Package</h4>
                <p className="text-gray-600">₦400,000 - Enhanced with A/V equipment</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Luxury Corporate Package</h4>
                <p className="text-gray-600">₦600,000 - Full corporate experience</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/booking" className="block w-full bg-blue-500 text-white py-4 rounded-xl font-bold text-center hover:bg-blue-600 transition-colors">
            Book Corporate Event
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
          <Link href="/services" className="flex flex-col items-center text-blue-500">
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
