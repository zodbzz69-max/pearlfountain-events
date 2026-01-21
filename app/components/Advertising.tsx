
'use client';

export default function Advertising() {
  const featuredBusinesses = [
    {
      name: 'Pearlfountain Photostat Services',
      description: 'Professional printing and photocopying services for all your event documentation needs',
      services: ['Document Printing', 'Event Programs', 'Invitations', 'Banners'],
      contact: '090 2745 9049',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Printer%20with%20documents%20and%20papers%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=photostat-icon&orientation=squarish'
    }
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Business Partners</h2>
        <p className="text-center text-gray-600 mb-12 text-sm">
          Trusted partners supporting our community events
        </p>
        
        {/* Featured Business Section */}
        <div className="mb-12">
          {featuredBusinesses.map((business, index) => (
            <div key={index} className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 overflow-hidden rounded-full flex-shrink-0 bg-white/20">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-2">{business.name}</h4>
                  <p className="text-sm text-white/90 mb-3">{business.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {business.services.map((service, idx) => (
                      <span key={idx} className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-phone-line text-white"></i>
                    </div>
                    <span className="text-sm font-medium">{business.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-800 rounded-xl p-6 text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Why Partner With PearlFountain?</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold text-rose-400 mb-1">500+</div>
              <div className="text-xs text-gray-300">Monthly Visitors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-400 mb-1">50+</div>
              <div className="text-xs text-gray-300">Events Monthly</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-400 mb-1">1000+</div>
              <div className="text-xs text-gray-300">Social Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-400 mb-1">95%</div>
              <div className="text-xs text-gray-300">Client Satisfaction</div>
            </div>
          </div>
          <a href="/advertising-packages" className="inline-block bg-rose-500 text-white px-8 py-3 text-sm font-medium hover:bg-rose-600 transition-colors w-full rounded-lg">
            View Advertising Packages
          </a>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-4">
            Custom advertising solutions available. Contact us for personalized packages.
          </p>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 text-sm font-medium hover:bg-gray-50 transition-colors rounded-lg">
            Request Custom Quote
          </button>
        </div>
      </div>
    </div>
  );
}
