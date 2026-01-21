'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import { sendWhatsAppRequest } from '../../lib/whatsapp';

export default function TentRentalPage() {
  const [selectedTent, setSelectedTent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tentOptions = [
    {
      id: 'small',
      name: 'Small Canopy (20x20 ft)',
      price: '₦50,000',
      capacity: '50-80 guests',
      features: [
        'Weather-resistant canvas',
        'Basic lighting setup',
        'Professional installation',
        'Pickup and delivery',
        'Tables and chairs (optional)'
      ]
    },
    {
      id: 'medium',
      name: 'Medium Canopy (30x40 ft)',
      price: '₦80,000',
      capacity: '100-150 guests',
      features: [
        'Premium weather-resistant canvas',
        'Enhanced lighting system',
        'Professional installation',
        'Pickup and delivery',
        'Tables, chairs, and decor',
        'Side panels (optional)'
      ]
    },
    {
      id: 'large',
      name: 'Large Canopy (40x60 ft)',
      price: '₦120,000',
      capacity: '200-300 guests',
      features: [
        'Heavy-duty weather protection',
        'Full lighting production',
        'Professional setup team',
        'Pickup and delivery',
        'Complete furniture package',
        'Decorative elements included',
        'Sound system setup'
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = new URLSearchParams();
    
    for (const [key, value] of formData.entries()) {
      data.append(key, value.toString());
    }

    try {
      const response = await fetch('https://readdy.ai/api/form/tent-rental-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });

      if (response.ok) {
        // Send WhatsApp message to admin
        const tentSize = formData.get('tent_size') as string;
        const tentPrices = {
          '20ft': '20ft Tent - ₦25,000',
          '30ft': '30ft Tent - ₦35,000',
          '40ft': '40ft Tent - ₦45,000'
        };

        const requestData = {
          serviceName: 'Canopy Tent Rental',
          category: 'Canopy Tent',
          option: tentPrices[tentSize as keyof typeof tentPrices] || tentSize,
          date: formData.get('event_date') as string,
          duration: formData.get('rental_duration') as string,
          location: formData.get('event_location') as string,
          customerName: formData.get('full_name') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
          notes: `Event Type: ${formData.get('event_type')}. Guest Count: ${formData.get('guest_count')}. Special Requirements: ${formData.get('special_requirements')}`
        };

        sendWhatsAppRequest(requestData);

        setShowSuccess(true);
        form.reset();
        setSelectedTent('');
        setTimeout(() => setShowSuccess(false), 8000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Canopy Tent Rental
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Premium outdoor event solutions
            </p>
            <p className="text-lg text-gray-500">
              Weather-resistant canopy tents for any outdoor celebration
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src="https://readdy.ai/api/search-image?query=Beautiful%20outdoor%20wedding%20setup%20with%20large%20white%20canopy%20tent%2C%20elegant%20tent%20rental%20with%20string%20lights%2C%20professional%20outdoor%20event%20tent%20installation%2C%20garden%20party%20tent%20with%20decorative%20draping%2C%20luxury%20outdoor%20event%20venue%20setup&width=800&height=400&seq=tent-rental-hero&orientation=landscape"
              alt="Canopy Tent Rental"
              className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
            />
          </div>

          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-check-line text-green-600"></i>
                </div>
                <p className="text-green-800 font-medium">
                  Tent rental request submitted successfully! We'll contact you within 24 hours to confirm details and schedule delivery.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} data-readdy-form id="tent-rental-form" className="space-y-8">
            {/* Tent Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-tent-line text-green-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Tent Size</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tentOptions.map((tent) => (
                  <label key={tent.id} className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedTent === tent.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="tent_size"
                      value={tent.id}
                      checked={selectedTent === tent.id}
                      onChange={() => setSelectedTent(tent.id)}
                      required
                      className="opacity-0 absolute"
                    />
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tent.name}</h3>
                      <div className="text-2xl font-bold text-green-500 mb-2">{tent.price}</div>
                      <div className="text-sm text-blue-600 font-medium">{tent.capacity}</div>
                    </div>
                    <ul className="space-y-2">
                      {tent.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-4 h-4 flex items-center justify-center mr-2 mt-0.5">
                            <i className="ri-check-line text-green-500 text-xs"></i>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-calendar-line text-green-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="event_type"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="graduation">Graduation Party</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Guests *
                  </label>
                  <select
                    name="guest_count"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select guest count</option>
                    <option value="1-50">1-50 guests</option>
                    <option value="51-100">51-100 guests</option>
                    <option value="101-200">101-200 guests</option>
                    <option value="201-300">201-300 guests</option>
                    <option value="300+">300+ guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Duration *
                  </label>
                  <select
                    name="rental_duration"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="1-day">1 Day</option>
                    <option value="2-days">2 Days</option>
                    <option value="3-days">3 Days</option>
                    <option value="weekend">Weekend (2-3 days)</option>
                    <option value="custom">Custom Duration</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location & Setup */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-map-pin-line text-green-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Location & Setup</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Address *
                  </label>
                  <textarea
                    name="event_address"
                    rows={3}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Enter the complete address where the tent should be set up..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Setup Time Preference
                    </label>
                    <select
                      name="setup_time"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select preferred time</option>
                      <option value="early-morning">Early Morning (6-8 AM)</option>
                      <option value="morning">Morning (8-10 AM)</option>
                      <option value="late-morning">Late Morning (10-12 PM)</option>
                      <option value="afternoon">Afternoon (12-3 PM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ground Surface
                    </label>
                    <select
                      name="ground_surface"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select surface type</option>
                      <option value="grass">Grass</option>
                      <option value="concrete">Concrete</option>
                      <option value="sand">Sand</option>
                      <option value="mixed">Mixed Surface</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-user-line text-green-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Contact
                  </label>
                  <input
                    type="tel"
                    name="backup_contact"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Alternative phone number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements or Notes
                </label>
                <textarea
                  name="special_requirements"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Any special setup requirements, decorations needed, accessibility considerations, or other important details..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white py-4 px-12 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing Request...
                  </span>
                ) : (
                  'Request Tent Rental'
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                We'll contact you within 24 hours to confirm availability and arrange delivery.
              </p>
            </div>
          </form>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Rental Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Professional setup and takedown
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Weather-resistant tent material
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Basic lighting installation
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Delivery and pickup service
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    24/7 emergency support
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Setup requires 4-6 hours advance notice
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    50% deposit required to confirm booking
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Weather protection guaranteed
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Additional furniture available for rent
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Free consultation for large events
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}