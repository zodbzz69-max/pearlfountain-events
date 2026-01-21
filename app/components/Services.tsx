
'use client';

import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Weddings',
      description: 'Elegant wedding ceremonies and receptions',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Wedding%20rings%20and%20flowers%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=wedding-icon&orientation=squarish',
      link: '/services/weddings'
    },
    {
      title: 'Corporate Events',
      description: 'Professional business meetings and conferences',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Business%20briefcase%20and%20laptop%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=corporate-icon&orientation=squarish',
      link: '/services/corporate'
    },
    {
      title: 'Birthday Parties',
      description: 'Memorable celebrations for all ages',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Birthday%20cake%20with%20candles%20and%20balloons%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=birthday-icon&orientation=squarish',
      link: '/services/birthdays'
    },
    {
      title: 'Graduations',
      description: 'Celebrate academic achievements in style',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Graduation%20cap%20and%20diploma%20scroll%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=graduation-icon&orientation=squarish',
      link: '/services/graduations'
    },
    {
      title: 'Social Gatherings',
      description: 'Perfect venue for family and friends',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Group%20of%20people%20celebrating%20with%20party%20decorations%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=social-icon&orientation=squarish',
      link: '/services/social'
    },
    {
      title: 'Product Launches',
      description: 'Showcase your brand in premium setting',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20Rocket%20launch%20with%20stars%20and%20sparkles%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=launch-icon&orientation=squarish',
      link: '/services/launches'
    }
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Our Services</h2>
        <p className="text-center text-gray-600 mb-12 text-sm">
          We specialize in creating exceptional experiences for every occasion
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="block">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 overflow-hidden rounded-full">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-sm font-semibold text-center mb-2 text-gray-800">{service.title}</h3>
                <p className="text-xs text-center text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
