'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import { sendWhatsAppRequest } from '../../lib/whatsapp';

export default function TruckHirePage() {
  const [selectedService, setSelectedService] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    {
      id: 'local-moving',
      name: 'Local Moving Service',
      price: '₦15,000',
      description: 'Moving within Abeokuta and surrounding areas',
      features: [
        'Experienced driver included',
        'Loading and unloading assistance',
        'Within 50km radius',
        'Fuel included',
        'Insurance coverage'
      ]
    },
    {
      id: 'instate',
      name: 'Instate Transportation',
      price: '₦25,000/day',
      description: 'Long-distance transportation within the state.',
      features: [
        'Professional long-distance driver',
        'Loading and unloading assistance',
        'State coverage',
        'Fuel calculation based on distance (excluded)',
        'Full insurance coverage',
        'GPS tracking'
      ]
    },
    {
      id: 'hourly',
      name: 'Hourly Hire',
      price: '₦3,000/hour',
      description: 'Flexible hourly rental for short trips',
      features: [
        'Minimum 3 hours',
        'Driver included',
        'Local area coverage',
        'Fuel (excluded; calculated based on distance)',
        'Perfect for quick deliveries'
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
      // Submit to form endpoint
      const response = await fetch('https://readdy.ai/api/form/d45qekvgaed3g6l5263', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });

      if (response.ok) {
        // Send WhatsApp message to admin
        const serviceType = formData.get('service_type') as string;
        const serviceNames = {
          'local-moving': 'Local Moving Service - ₦15,000',
          'instate': 'Instate Transportation - ₦25,000/day',
          'hourly': 'Hourly Hire - ₦3,000/hour'
        };

        const requestData = {
          serviceName: serviceNames[serviceType as keyof typeof serviceNames] || 'Truck Hire Service',
          category: 'Cabstar Truck Hire',
          option: serviceType,
          date: formData.get('pickup_date') as string,
          duration: `${formData.get('pickup_time')} pickup time`,
          location: `From: ${formData.get('pickup_address')} To: ${formData.get('destination_address')}`,
          customerName: formData.get('full_name') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
          notes: `Load Type: ${formData.get('load_type')}. Items: ${formData.get('items_description')}. Special Instructions: ${formData.get('special_instructions')}`
        };

        sendWhatsAppRequest(requestData);

        setShowSuccess(true);
        form.reset();
        setSelectedService('');
        setTimeout(() => setShowSuccess(false), 8000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cabstar Truck Hire
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Reliable transportation for all your moving needs
            </p>
            <p className="text-lg text-gray-500">
              Professional drivers and well-maintained vehicles
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src="https://readdy.ai/api/search-image?query=Clean%20white%20Nissan%20Cabstar%20truck%20parked%20professionally%2C%20reliable%20commercial%20delivery%20vehicle%2C%20well-maintained%20truck%20for%20hire%20service%2C%20professional%20transportation%20truck%2C%20cargo%20delivery%20vehicle%20with%20driver&width=800&height=400&seq=truck-hire-hero&orientation=landscape"
              alt="Cabstar Truck Hire"
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
                  Truck hire request submitted successfully! We'll contact you within 2 hours to confirm details and schedule pickup.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} data-readdy-form id="truck-hire-form" className="space-y-8">
            {/* Service Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-truck-line text-blue-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Service</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceOptions.map((service) => (
                  <label key={service.id} className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedService === service.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                    <input
                      type="radio"
                      name="service_type"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={() => setSelectedService(service.id)}
                      required
                      className="opacity-0 absolute"
                    />
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                      <div className="text-2xl font-bold text-blue-500 mb-2">{service.price}</div>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-4 h-4 flex items-center justify-center mr-2 mt-0.5">
                            <i className="ri-check-line text-blue-500 text-xs"></i>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-route-line text-blue-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Trip Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    name="pickup_date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Time *
                  </label>
                  <select
                    name="pickup_time"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select pickup time</option>
                    <option value="06:00">6:00 AM</option>
                    <option value="07:00">7:00 AM</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Address *
                </label>
                <textarea
                  name="pickup_address"
                  rows={3}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter the complete pickup address with landmarks..."
                ></textarea>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Address *
                </label>
                <textarea
                  name="destination_address"
                  rows={3}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter the complete destination address with landmarks..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Distance
                  </label>
                  <select
                    name="estimated_distance"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select distance range</option>
                    <option value="0-20km">0-20 km (Local)</option>
                    <option value="21-50km">21-50 km (Regional)</option>
                    <option value="51-100km">51-100 km (Interstate)</option>
                    <option value="100km+">100+ km (Long Distance)</option>
                    <option value="unknown">Not Sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load Type *
                  </label>
                  <select
                    name="load_type"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select load type</option>
                    <option value="household-items">Household Items</option>
                    <option value="office-equipment">Office Equipment</option>
                    <option value="construction-materials">Construction Materials</option>
                    <option value="furniture">Furniture</option>
                    <option value="appliances">Appliances</option>
                    <option value="general-cargo">General Cargo</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Load Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-box-line text-blue-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Load Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Weight
                  </label>
                  <select
                    name="estimated_weight"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select weight range</option>
                    <option value="light">Light (Under 500kg)</option>
                    <option value="medium">Medium (500kg - 1 ton)</option>
                    <option value="heavy">Heavy (1-2 tons)</option>
                    <option value="very-heavy">Very Heavy (2+ tons)</option>
                    <option value="unknown">Not Sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loading Assistance Needed
                  </label>
                  <select
                    name="loading_assistance"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select assistance level</option>
                    <option value="none">No Assistance Needed</option>
                    <option value="basic">Basic Loading Help</option>
                    <option value="full">Full Loading & Unloading</option>
                    <option value="heavy-items">Heavy Items Assistance</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items Description
                </label>
                <textarea
                  name="items_description"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the items to be transported (furniture, boxes, appliances, etc.)..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-user-line text-blue-500 text-xl"></i>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Contact
                  </label>
                  <input
                    type="tel"
                    name="alternative_contact"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Alternative phone number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions or Notes
                </label>
                <textarea
                  name="special_instructions"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any special handling requirements, access restrictions, or important notes for the driver..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white py-4 px-12 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing Request...
                  </span>
                ) : (
                  'Request Truck Hire'
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                We'll contact you within 2 hours to confirm availability and provide final quote.
              </p>
            </div>
          </form>

          {/* Pricing & Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Service Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Specifications:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-500 mr-2"></i>
                    Nissan Cabstar - Reliable & Well-Maintained
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-500 mr-2"></i>
                    Load Capacity: Up to 2 tons
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-500 mr-2"></i>
                    Cargo Space: 3.2m x 1.8m x 1.8m
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-500 mr-2"></i>
                    Professional Experienced Driver
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-500 mr-2"></i>
                    Fully Insured & Licensed
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Advance booking recommended (24 hours)
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Fuel costs included for local trips
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Interstate trips: fuel calculated separately
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Loading assistance available at extra cost
                  </li>
                  <li className="flex items-start">
                    <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                    Payment: 50% deposit, balance on completion
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