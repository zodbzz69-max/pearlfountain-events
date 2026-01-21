'use client';

import { useState } from 'react';

export default function VirtualTour() {
  const [currentView, setCurrentView] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tourViews = [
    {
      image: 'https://readdy.ai/api/search-image?query=Luxury%20event%20hall%20main%20entrance%20interior%2C%20elegant%20reception%20area%20with%20modern%20design%2C%20sophisticated%20venue%20entrance%2C%20professional%20interior%20photography%2C%20warm%20welcoming%20atmosphere&width=375&height=250&seq=tour-entrance&orientation=landscape',
      title: 'Main Entrance',
      description: 'Welcome to our elegant reception area'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=Grand%20event%20hall%20main%20ballroom%20interior%2C%20spacious%20luxury%20venue%20with%20high%20ceilings%2C%20elegant%20lighting%20fixtures%2C%20sophisticated%20event%20space%2C%20professional%20venue%20photography&width=375&height=250&seq=tour-ballroom&orientation=landscape',
      title: 'Grand Ballroom',
      description: 'Our main event space accommodating up to 500 guests'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=Elegant%20bridal%20suite%20interior%2C%20luxury%20preparation%20room%20with%20beautiful%20lighting%2C%20sophisticated%20bridal%20changing%20area%2C%20comfortable%20seating%20and%20mirrors%2C%20professional%20venue%20photography&width=375&height=250&seq=tour-bridal&orientation=landscape',
      title: 'Bridal Suite',
      description: 'Private preparation area for the bride and bridal party'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=Professional%20catering%20kitchen%20interior%2C%20modern%20commercial%20kitchen%20equipment%2C%20clean%20and%20organized%20food%20preparation%20area%2C%20professional%20catering%20facility&width=375&height=250&seq=tour-kitchen&orientation=landscape',
      title: 'Catering Kitchen',
      description: 'State-of-the-art kitchen for exceptional catering'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=Outdoor%20garden%20terrace%20area%2C%20beautiful%20landscaped%20venue%20exterior%2C%20elegant%20outdoor%20event%20space%2C%20professional%20venue%20photography%2C%20natural%20lighting&width=375&height=250&seq=tour-garden&orientation=landscape',
      title: 'Garden Terrace',
      description: 'Beautiful outdoor space for cocktails and ceremonies'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=VIP%20lounge%20interior%2C%20luxury%20private%20room%20with%20comfortable%20seating%2C%20elegant%20VIP%20area%20design%2C%20sophisticated%20venue%20interior%2C%20professional%20photography&width=375&height=250&seq=tour-vip&orientation=landscape',
      title: 'VIP Lounge',
      description: 'Exclusive area for special guests and intimate gatherings'
    }
  ];

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % tourViews.length);
  };

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + tourViews.length) % tourViews.length);
  };

  const startFullTour = () => {
    setIsFullscreen(true);
    setCurrentView(0);
  };

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Virtual Tour</h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Explore our venue from the comfort of your home
        </p>

        {/* Tour Preview */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="relative mb-4">
            <img 
              src={tourViews[0].image} 
              alt="Virtual Tour Preview"
              className="w-full h-48 object-cover object-top rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-360-line text-2xl"></i>
                </div>
                <p className="text-sm font-medium">360° Virtual Tour</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={startFullTour}
            className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors"
          >
            Start Virtual Tour
          </button>
        </div>

        {/* Tour Features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-eye-line text-rose-500 text-xl"></i>
            </div>
            <h3 className="font-medium text-gray-800 text-sm mb-1">360° Views</h3>
            <p className="text-gray-600 text-xs">Complete venue exploration</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-map-pin-line text-rose-500 text-xl"></i>
            </div>
            <h3 className="font-medium text-gray-800 text-sm mb-1">6 Locations</h3>
            <p className="text-gray-600 text-xs">All venue areas covered</p>
          </div>
        </div>

        {/* Contact for Visit */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 rounded-xl text-center">
          <h3 className="font-bold text-lg mb-2">Schedule a Physical Visit</h3>
          <p className="text-white/90 text-sm mb-4">
            Experience our venue in person with a guided tour
          </p>
          <button className="bg-white text-rose-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Book Site Visit
          </button>
        </div>

        {/* Virtual Tour Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black/50">
              <div className="text-white">
                <h3 className="font-medium">{tourViews[currentView].title}</h3>
                <p className="text-sm text-gray-300">{currentView + 1} of {tourViews.length}</p>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="text-white hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <img 
                src={tourViews[currentView].image} 
                alt={tourViews[currentView].title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevView}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              
              <button
                onClick={nextView}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
              >
                <i className="ri-arrow-right-line text-xl"></i>
              </button>
            </div>

            {/* Bottom Info */}
            <div className="p-4 bg-black/50 text-white">
              <p className="text-sm">{tourViews[currentView].description}</p>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 p-4 bg-black/50 overflow-x-auto">
              {tourViews.map((view, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentView(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 ${
                    currentView === index ? 'border-rose-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={view.image} 
                    alt={view.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}