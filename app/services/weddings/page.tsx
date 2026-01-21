
'use client';

import Link from 'next/link';

export default function WeddingsPage() {
  const weddingGallery = [
    {
      title: 'Elegant Reception Setup',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20wedding%20reception%20at%20PearlFountain%20Events%20Centre%20with%20elegant%20purple%20and%20white%20decorations%2C%20round%20tables%20with%20gold%20charger%20plates%2C%20purple%20chair%20covers%2C%20floral%20centerpieces%2C%20romantic%20lighting%2C%20luxury%20event%20hall%20setup&width=300&height=200&seq=wedding-1&orientation=landscape'
    },
    {
      title: 'Bridal Table Arrangement',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20bridal%20table%20setup%20with%20white%20linens%2C%20gold%20accents%2C%20purple%20floral%20arrangements%2C%20elegant%20chair%20covers%2C%20romantic%20candles%2C%20luxury%20wedding%20decoration%20at%20event%20hall&width=300&height=200&seq=wedding-2&orientation=landscape'
    },
    {
      title: 'Ceremony Backdrop',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20ceremony%20backdrop%20with%20white%20and%20purple%20draping%2C%20floral%20arch%2C%20elegant%20stage%20setup%2C%20romantic%20lighting%2C%20professional%20wedding%20decoration%20at%20event%20venue&width=300&height=200&seq=wedding-3&orientation=landscape'
    },
    {
      title: 'Reception Hall Overview',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20hall%20overview%20with%20multiple%20round%20tables%2C%20purple%20and%20white%20theme%2C%20elegant%20lighting%2C%20spacious%20dance%20floor%2C%20professional%20event%20setup%20at%20PearlFountain%20venue&width=300&height=200&seq=wedding-4&orientation=landscape'
    },
    {
      title: 'Floral Centerpieces',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20table%20centerpieces%20with%20purple%20and%20white%20flowers%2C%20gold%20candelabras%2C%20elegant%20table%20setting%2C%20romantic%20wedding%20decoration%20details&width=300&height=200&seq=wedding-5&orientation=landscape'
    },
    {
      title: 'Dance Floor Setup',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20dance%20floor%20with%20romantic%20lighting%2C%20elegant%20draping%2C%20spacious%20area%20for%20celebration%2C%20professional%20event%20lighting%20setup&width=300&height=200&seq=wedding-6&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Link href="/" className="flex items-center text-gray-600">
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </Link>
          <h1 className="font-bold text-gray-800">Wedding Gallery</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-24 px-6">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-line text-rose-500 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Wedding Celebrations</h2>
            <p className="text-gray-600 text-sm">
              Elegant wedding ceremonies and receptions at PearlFountain Events Centre
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="space-y-6 mb-8">
            {weddingGallery.map((item, index) => (
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
            <h3 className="font-bold text-gray-800 mb-4 text-center">Wedding Packages</h3>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-semibold text-gray-800">Basic Wedding Package</h4>
                <p className="text-gray-600">₦300,000 - Perfect for intimate ceremonies</p>
              </div>
              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-semibold text-gray-800">Premium Wedding Package</h4>
                <p className="text-gray-600">₦400,000 - Enhanced with professional lighting</p>
              </div>
              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="font-semibold text-gray-800">Luxury Wedding Package</h4>
                <p className="text-gray-600">₦600,000 - Complete wedding experience</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/booking" className="block w-full bg-rose-500 text-white py-4 rounded-xl font-bold text-center hover:bg-rose-600 transition-colors">
            Book Your Wedding
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
          <Link href="/services" className="flex flex-col items-center text-rose-500">
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
