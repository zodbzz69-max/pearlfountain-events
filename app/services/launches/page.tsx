
'use client';

import Link from 'next/link';

export default function LaunchesPage() {
  const launchGallery = [
    {
      title: 'Product Launch Stage',
      image: 'https://readdy.ai/api/search-image?query=Product%20launch%20event%20at%20PearlFountain%20Events%20Centre%20with%20modern%20stage%20setup%2C%20professional%20branding%20display%2C%20corporate%20launch%20atmosphere%2C%20elegant%20presentation%20area&width=300&height=200&seq=launch-1&orientation=landscape'
    },
    {
      title: 'Brand Showcase Area',
      image: 'https://readdy.ai/api/search-image?query=Brand%20showcase%20area%20with%20product%20display%20setup%2C%20professional%20lighting%2C%20modern%20exhibition%20space%2C%20corporate%20branding%20environment&width=300&height=200&seq=launch-2&orientation=landscape'
    },
    {
      title: 'Media Presentation Setup',
      image: 'https://readdy.ai/api/search-image?query=Media%20presentation%20setup%20for%20product%20launch%20with%20professional%20audio%20visual%20equipment%2C%20press%20conference%20arrangement%2C%20corporate%20event%20setup&width=300&height=200&seq=launch-3&orientation=landscape'
    },
    {
      title: 'VIP Reception Area',
      image: 'https://readdy.ai/api/search-image?query=VIP%20reception%20area%20for%20product%20launch%20with%20elegant%20cocktail%20setup%2C%20networking%20space%2C%20premium%20corporate%20atmosphere&width=300&height=200&seq=launch-4&orientation=landscape'
    },
    {
      title: 'Interactive Demo Zone',
      image: 'https://readdy.ai/api/search-image?query=Interactive%20product%20demonstration%20zone%20with%20modern%20display%20setup%2C%20hands-on%20experience%20area%2C%20innovative%20launch%20environment&width=300&height=200&seq=launch-5&orientation=landscape'
    },
    {
      title: 'Launch Celebration Setup',
      image: 'https://readdy.ai/api/search-image?query=Product%20launch%20celebration%20setup%20with%20elegant%20decorations%2C%20corporate%20celebration%20atmosphere%2C%20successful%20launch%20party%20environment&width=300&height=200&seq=launch-6&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Link href="/" className="flex items-center text-gray-600">
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </Link>
          <h1 className="font-bold text-gray-800">Product Launches</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-24 px-6">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-rocket-line text-orange-500 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Launches</h2>
            <p className="text-gray-600 text-sm">
              Showcase your brand in premium setting at PearlFountain Events Centre
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="space-y-6 mb-8">
            {launchGallery.map((item, index) => (
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
            <h3 className="font-bold text-gray-800 mb-4 text-center">Launch Packages</h3>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800">Basic Launch Package</h4>
                <p className="text-gray-600">₦300,000 - Essential product launch setup</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800">Premium Launch Package</h4>
                <p className="text-gray-600">₦400,000 - Enhanced with media coverage</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800">Luxury Launch Package</h4>
                <p className="text-gray-600">₦600,000 - Complete launch experience</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/booking" className="block w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-center hover:bg-orange-600 transition-colors">
            Book Product Launch
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
          <Link href="/services" className="flex flex-col items-center text-orange-500">
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
