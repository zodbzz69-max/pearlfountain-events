
'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { sendWhatsAppRequest } from '../../lib/whatsapp';

export default function BookingPage() {
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [customEventType, setCustomEventType] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const eventTypes = [
    'Wedding Reception',
    'Conference / Seminar',
    'Birthday Party',
    'Engagement / Traditional',
    'Other'
  ];

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: '₦300,000',
      deposit: '₦50,000',
      features: [
        'Venue rental for 5 hours',
        'Tables and chairs for 100 - 150 guests',
        'Basic lighting setup',
        'Sound system',
        'Basic decoration'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '₦400,000',
      deposit: '₦100,000',
      features: [
        'Venue rental for 5 hours',
        'Cooling Support',
        'Professional lighting',
        'Tables and chairs for 100 - 150 guests',
        'Premium decoration',
        'Sound system',
        'Dedicated event coordinator'
      ]
    },
    {
      id: 'luxury',
      name: 'Luxury Package',
      price: '₦600,000',
      deposit: '₦200,000',
      features: [
        'Venue rental for 6 hours',
        'Full Cooling Support',
        'Full lighting production',
        'Tables and chairs for 200 guests',
        'VIP lounge area',
        'Premium decoration & flowers',
        'Premium AV equipment',
        'Full Events Management'
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
      const response = await fetch('https://readdy.ai/api/form/event-booking-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });

      if (response.ok) {
        // Send WhatsApp message to admin with all booking details
        const requestData = {
          serviceName: 'Event Hall Booking',
          category: 'Event Venue',
          option: `${formData.get('event_type')} - ${formData.get('guest_count')} guests`,
          date: formData.get('event_date') as string,
          duration: `${formData.get('start_time')} - ${formData.get('end_time')}`,
          location: 'PearlFountain Events Centre',
          customerName: formData.get('full_name') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
          notes: `Budget: ${formData.get('budget')}. Catering: ${formData.get('catering')}. Decorations: ${formData.get('decorations')}. Special Requirements: ${formData.get('special_requirements')}`
        };

        sendWhatsAppRequest(requestData);

        setShowSuccess(true);
        form.reset();
        setSelectedPackage('');
        setTimeout(() => setShowSuccess(false), 8000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackageDetails = packages.find(pkg => pkg.id === selectedPackage);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <Navigation />
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Book Your Event — PearlFountain Events Centre
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Make your next event unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50" suppressHydrationWarning={true}>
      <Navigation />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Event — PearlFountain Events Centre
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Make your next event unforgettable.
            </p>
            <p className="text-lg text-gray-500">
              Reserve your preferred date and package below — quick, simple, and secure.
            </p>
            <div className="mt-6 inline-block bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium">
              ✨ Ready to make your event unforgettable? Book Now — It Takes Less Than 2 Minutes!
            </div>
          </div>

          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-check-line text-green-600"></i>
                </div>
                <p className="text-green-800 font-medium">
                  Event booking submitted successfully! We'll contact you within 24 hours to confirm details.
                </p>
              </div>
            </div>
          )}

          {/* Payment Confirmation Section */}
          {showPaymentOptions && selectedPackageDetails && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-rose-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-secure-payment-line text-white text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h2>
                <p className="text-gray-600">Choose how you'd like to proceed with your {selectedPackageDetails.name}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Package:</span>
                  <span className="text-gray-900">{selectedPackageDetails.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Total Price:</span>
                  <span className="text-xl font-bold text-rose-600">{selectedPackageDetails.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Required Deposit:</span>
                  <span className="text-lg font-semibold text-green-600">{selectedPackageDetails.deposit}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-rose-500 text-white py-4 px-6 rounded-xl font-bold hover:bg-rose-600 transition-colors flex items-center justify-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <i className="ri-bank-card-line"></i>
                  </div>
                  Pay Deposit Now
                </button>
                
                <a 
                  href="https://wa.me/2349027459049?text=Hello%20PearlFountain!%20I%20just%20submitted%20a%20booking%20request%20and%20would%20like%20to%20discuss%20payment%20options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white py-4 px-6 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <i className="ri-whatsapp-line"></i>
                  </div>
                  Contact Manager
                </a>
                
                <button className="bg-blue-500 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <i className="ri-mail-send-line"></i>
                  </div>
                  Send Request
                </button>
              </div>

              <p className="text-sm text-gray-600 text-center mt-4">
                Once your booking request is received, our manager will reach out to confirm your date and payment details.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} data-readdy-form id="event-booking-form" className="space-y-8" suppressHydrationWarning={true}>
            {/* Section 1: Event Type Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-building-line text-rose-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">What type of event are you hosting?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventTypes.map((type) => (
                  <label key={type} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-rose-300 transition-colors">
                    <input
                      type="radio"
                      name="event_type"
                      value={type === 'Other' ? customEventType : type}
                      checked={selectedEventType === type}
                      onChange={() => setSelectedEventType(type)}
                      required
                      className="opacity-0 absolute"
                      suppressHydrationWarning={true}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedEventType === type ? 'border-rose-500 bg-rose-500' : 'border-gray-300'
                    }`}>
                      {selectedEventType === type && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{type}</span>
                  </label>
                ))}
              </div>

              {selectedEventType === 'Other' && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={customEventType}
                    onChange={(e) => setCustomEventType(e.target.value)}
                    placeholder="Please specify your event type"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                    suppressHydrationWarning={true}
                  />
                </div>
              )}
            </div>

            {/* Section 2: Date & Time */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-calendar-line text-rose-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Select Date and Time</h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <p className="text-blue-800 text-sm">
                    <strong>Tip:</strong> PearlFountain is available for bookings between 7 AM and 11 PM daily.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📆 Event Date *
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    suppressHydrationWarning={true}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⏰ Start Time *
                  </label>
                  <select
                    name="start_time"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    suppressHydrationWarning={true}
                  >
                    <option value="">Select start time</option>
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
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⏰ End Time *
                  </label>
                  <select
                    name="end_time"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    suppressHydrationWarning={true}
                  >
                    <option value="">Select end time</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="23:00">11:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Package Options */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-gift-line text-rose-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Choose a Booking Package</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <label key={pkg.id} className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPackage === pkg.id 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-rose-300'
                  }`}>
                    <input
                      type="radio"
                      name="package_type"
                      value={pkg.id}
                      checked={selectedPackage === pkg.id}
                      onChange={() => setSelectedPackage(pkg.id)}
                      required
                      className="opacity-0 absolute"
                      suppressHydrationWarning={true}
                    />
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-rose-500 mb-2">{pkg.price}</div>
                      <div className="text-sm text-green-600 font-medium">Deposit: {pkg.deposit}</div>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
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

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-user-line text-rose-500 text-xl"></i>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    suppressHydrationWarning={true}
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="+234 xxx xxx xxxx"
                    suppressHydrationWarning={true}
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    suppressHydrationWarning={true}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Number of Guests *
                  </label>
                  <select
                    name="guest_count"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    suppressHydrationWarning={true}
                  >
                    <option value="">Select guest count</option>
                    <option value="1-50">1-50 guests</option>
                    <option value="51-100">51-100 guests</option>
                    <option value="101-200">101-200 guests</option>
                    <option value="201-300">201-300 guests</option>
                    <option value="301-500">301-500 guests</option>
                    <option value="500+">500+ guests</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements or Additional Notes
                </label>
                <textarea
                  name="special_requirements"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or additional services you'd like..."
                  suppressHydrationWarning={true}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-rose-500 text-white py-4 px-12 rounded-xl font-bold text-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing Booking...
                  </span>
                ) : (
                  'Reserve Your Event Date'
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                We'll contact you within 24 hours to confirm availability and finalize details.
              </p>
            </div>
          </form>

          {/* Contact & Support Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-line text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need help before booking?</h2>
              <p className="text-gray-600">Our team is here to assist you with any questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="tel:+2349027459049"
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-rose-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <i className="ri-phone-line text-blue-600 text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-sm text-gray-600 text-center">090 2745 9049</p>
                <p className="text-xs text-gray-500 mt-1">Available 9AM - 6PM</p>
              </a>

              <a 
                href="https://wa.me/2349027459049?text=Hello%20PearlFountain!%20I%20need%20help%20with%20booking%20an%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <i className="ri-whatsapp-line text-green-600 text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-sm text-gray-600 text-center">Click to chat</p>
                <p className="text-xs text-gray-500 mt-1">Instant response</p>
              </a>

              <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-3">
                  <i className="ri-map-pin-line text-rose-600 text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                <p className="text-sm text-gray-600 text-center">Graceland Estate, Kotopo</p>
                <p className="text-xs text-gray-500 mt-1">Abeokuta, Ogun State</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-rose-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-information-line text-rose-600"></i>
                </div>
                <h4 className="font-medium text-rose-800">Quick Support</h4>
              </div>
              <p className="text-sm text-rose-700 text-center">
                For immediate assistance with bookings, pricing, or availability, contact us directly. 
                We respond to all inquiries within 2 hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
