
'use client';

export default function AdvertisingPackages() {
  const adPackages = [
    {
      title: 'Event Sponsorship',
      price: '₦50,000',
      period: 'per event',
      features: [
        'Logo display at event entrance',
        'Brand mention in event materials',
        'Social media promotion',
        'Photo opportunities'
      ],
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Trophy%20with%20star%20and%20ribbon%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=sponsor-icon&orientation=squarish'
    },
    {
      title: 'Banner Advertising',
      price: '₦25,000',
      period: 'per month',
      features: [
        'Premium banner placement',
        'High visibility location',
        'Professional installation',
        'Monthly reporting'
      ],
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Billboard%20with%20arrow%20pointing%20up%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=banner-icon&orientation=squarish'
    },
    {
      title: 'Digital Promotion',
      price: '₦15,000',
      period: 'per campaign',
      features: [
        'Social media posts',
        'Website feature',
        'Email newsletter inclusion',
        'Online gallery presence'
      ],
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Smartphone%20with%20notification%20and%20heart%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=digital-icon&orientation=squarish'
    },
    {
      title: 'Premium Package',
      price: '₦100,000',
      period: 'per quarter',
      features: [
        'All advertising benefits',
        'Exclusive partnership status',
        'Custom promotional materials',
        'Priority event placement'
      ],
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Crown%20with%20gems%20and%20sparkles%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=premium-icon&orientation=squarish'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-sm mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-['Pacifico'] text-rose-500">
              PearlFountain
            </a>
            <a href="/" className="text-gray-600 hover:text-rose-500 transition-colors">
              <i className="ri-arrow-left-line text-xl"></i>
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Advertising Packages</h1>
          <p className="text-center text-gray-600 mb-12 text-sm">
            Reach your target audience through our premium event platform
          </p>
          
          <div className="space-y-6">
            {adPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 overflow-hidden rounded-full flex-shrink-0">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold text-gray-800">{pkg.title}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-rose-500">{pkg.price}</div>
                        <div className="text-xs text-gray-500">{pkg.period}</div>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs text-gray-600">
                          <div className="w-3 h-3 flex items-center justify-center mr-2">
                            <i className="ri-check-line text-rose-500 text-sm"></i>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors">
                      Choose Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white text-center">
            <h3 className="text-lg font-semibold mb-2">Why Advertise With PearlFountain?</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-white/90 mb-1">500+</div>
                <div className="text-xs text-white/80">Monthly Visitors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white/90 mb-1">50+</div>
                <div className="text-xs text-white/80">Events Monthly</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white/90 mb-1">1000+</div>
                <div className="text-xs text-white/80">Social Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white/90 mb-1">95%</div>
                <div className="text-xs text-white/80">Client Satisfaction</div>
              </div>
            </div>
            <button className="bg-white text-rose-500 px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors w-full rounded-lg">
              Start Advertising Today
            </button>
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
    </div>
  );
}
