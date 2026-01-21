'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import { sendWhatsAppRequest } from '../../lib/whatsapp';

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('hall');
  const [selectedTentSize, setSelectedTentSize] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState('');

  const handleWhatsAppRequest = (serviceName: string, category: string = '', option: string = '') => {
    // For immediate WhatsApp requests without form
    const requestData = {
      serviceName,
      category: category || serviceName,
      option,
      customerName: 'Website Visitor',
      phone: 'To be provided',
      notes: 'Customer interested in this service. Please follow up for details.'
    };
    
    sendWhatsAppRequest(requestData);
  };

  const handleTentRequest = () => {
    if (!selectedTentSize) {
      alert('Please select a tent size first');
      return;
    }
    
    const tentSizes = {
      '20ft': '20ft Tent - ₦25,000 (Seats 30-40 guests)',
      '30ft': '30ft Tent - ₦35,000 (Seats 60-80 guests)', 
      '40ft': '40ft Tent - ₦45,000 (Seats 100-120 guests)'
    };
    
    handleWhatsAppRequest('Canopy Tent Rental', 'Canopy Tent', tentSizes[selectedTentSize as keyof typeof tentSizes]);
  };

  const services = [
    {
      id: 'hall',
      title: 'Event Hall Booking',
      icon: 'ri-building-line',
      description: 'Premium event venue for weddings, conferences, and celebrations',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20event%20hall%20interior%20with%20beautiful%20lighting%2C%20round%20tables%20with%20white%20linens%2C%20crystal%20chandeliers%2C%20spacious%20dance%20floor%2C%20professional%20event%20venue%20setup%2C%20luxury%20wedding%20reception%20hall%2C%20warm%20ambient%20lighting%2C%20sophisticated%20decor&width=600&height=400&seq=event-hall-interior&orientation=landscape',
      features: [
        'Capacity: 100-300 guests',
        'Professional lighting system',
        'Sound system included',
        'Air conditioning',
        'Parking available',
        'Catering kitchen access'
      ],
      pricing: 'Starting from ₦300,000',
      cta: 'Book Event Hall'
    },
    {
      id: 'tent',
      title: 'Canopy Tent Rental',
      icon: 'ri-tent-line',
      description: 'High-quality canopy tents for outdoor events and celebrations',
      image: 'https://readdy.ai/api/search-image?query=Large%20white%20canopy%20tent%20setup%20for%20outdoor%20wedding%2C%20elegant%20tent%20rental%20with%20draped%20fabric%2C%20outdoor%20event%20tent%20with%20beautiful%20lighting%2C%20professional%20tent%20installation%2C%20garden%20party%20tent%20setup%2C%20white%20canvas%20tent%20with%20decorative%20elements&width=600&height=400&seq=canopy-tent-rental&orientation=landscape',
      features: [
        'Various sizes available',
        'Weather-resistant material',
        'Professional setup included',
        'Decorative lighting options',
        'Tables and chairs available',
        'Delivery and pickup service'
      ],
      pricing: 'Starting from ₦50,000/day',
      cta: 'Rent Canopy Tent'
    },
    {
      id: 'truck',
      title: 'Cabstar Truck Hire',
      icon: 'ri-truck-line',
      description: 'Reliable truck hire service for moving and transportation needs',
      image: 'https://readdy.ai/api/search-image?query=Clean%20white%20Nissan%20Cabstar%20truck%2C%20professional%20commercial%20vehicle%20for%20hire%2C%20reliable%20delivery%20truck%2C%20moving%20truck%20service%2C%20cargo%20transportation%20vehicle%2C%20well-maintained%20truck%20for%20rental&width=600&height=400&seq=cabstar-truck-hire&orientation=landscape',
      features: [
        'Reliable Nissan Cabstar',
        'Experienced driver included',
        'Local and interstate trips',
        'Cargo loading assistance',
        'Flexible hourly/daily rates',
        'Fully insured service'
      ],
      pricing: 'Starting from ₦15,000/day',
      cta: 'Hire Truck'
    }
  ];

  const currentService = services.find(service => service.id === activeService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Complete event solutions for all your needs
            </p>
            <p className="text-lg text-gray-500">
              From venue booking to equipment rental and transportation
            </p>
          </div>

          {/* Service Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeService === service.id
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <i className={`${service.icon} text-lg`}></i>
                    <span className="hidden md:inline">{service.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Service Details */}
          {currentService && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={currentService.image} 
                    alt={currentService.title}
                    className="w-full h-80 md:h-full object-cover object-top"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                      <i className={`${currentService.icon} text-rose-500 text-2xl`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentService.title}</h2>
                      <p className="text-rose-500 font-semibold">{currentService.pricing}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{currentService.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentService.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-3">
                            <i className="ri-check-line text-green-500"></i>
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/${activeService === 'hall' ? 'booking' : activeService === 'tent' ? 'tent-rental' : 'truck-hire'}`}
                    className="bg-rose-500 text-white py-3 px-8 rounded-xl font-bold hover:bg-rose-600 transition-colors inline-block"
                  >
                    {currentService.cta}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${service.icon} text-rose-500 text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="text-xl font-bold text-rose-500 mb-4">{service.pricing}</div>
                </div>
                
                <Link 
                  href={`/${service.id === 'hall' ? 'booking' : service.id === 'tent' ? 'tent-rental' : 'truck-hire'}`}
                  className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 transition-colors block text-center"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Choose PearlFountain?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-award-line text-blue-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Service</h3>
                <p className="text-sm text-gray-600">Years of experience in event management</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-time-line text-green-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Reliable Timing</h3>
                <p className="text-sm text-gray-600">Always on time, every time</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-sm text-gray-600">Quality services at fair prices</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-customer-service-2-line text-rose-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">We're here when you need us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}