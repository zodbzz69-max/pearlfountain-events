
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Ticket } from 'lucide-react';

export default function EventTicketing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Ogun Business Summit 2025',
      date: '2026-03-15',
      time: '9:00 AM',
      venue: 'PearlFountain Events Centre',
      organizer: 'Business Network Ogun',
      price: '₦20,000',
      capacity: 200,
      sold: 85,
      description: 'Join industry leaders for networking and business insights',
      flyer: 'https://readdy.ai/api/search-image?query=Professional%20business%20summit%20event%20flyer%20design%20with%20modern%20corporate%20layout%2C%20elegant%20typography%2C%20business%20networking%20theme%2C%20professional%20color%20scheme%20with%20blue%20and%20gold%20accents%2C%20conference%20hall%20background%2C%20clean%20minimalist%20design%2C%20high-quality%20event%20poster&width=300&height=400&seq=business-summit-2025&orientation=portrait',
      category: 'Business'
    },
    {
      id: 2,
      title: 'Book Launch: "Just a Pound of Flesh"',
      date: '2026-04-22',
      time: '3:00 PM',
      venue: 'PearlFountain Events Centre',
      organizer: 'Daniel Sokari-Pedro,psc (+),(mni.)',
      price: '₦3,000',
      capacity: 100,
      sold: 45,
      description: 'Meet the author and discover this inspiring life story',
      flyer: 'https://readdy.ai/api/search-image?query=Elegant%20book%20launch%20event%20flyer%20design%20with%20literary%20theme%2C%20book%20cover%20mockup%20featuring%20Just%20a%20Pound%20of%20Flesh%20title%2C%20author%20name%20Daniel%20Sokari-Pedro%20prominently%20displayed%2C%20sophisticated%20typography%2C%20warm%20golden%20and%20deep%20blue%20color%20scheme%2C%20open%20book%20illustration%2C%20reading%20glasses%20and%20pen%20elements%2C%20professional%20author%20event%20poster%20design%2C%20inspiring%20and%20intellectual%20atmosphere&width=300&height=400&seq=book-launch-2025&orientation=portrait',
      category: 'Literature'
    },
    {
      id: 3,
      title: 'Zod Inc. Tech Showcase 2025',
      date: '2025-12-10',
      time: '10:00 AM',
      venue: 'PearlFountain Events Centre',
      organizer: 'Zod Inc.',
      price: '₦20,000',
      capacity: 150,
      sold: 65,
      description: 'Discover cutting-edge website designs and development solutions',
      flyer: 'https://readdy.ai/api/search-image?query=Modern%20tech%20company%20showcase%20event%20flyer%20with%20sleek%20digital%20design%2C%20Zod%20Inc.%20branding%2C%20website%20development%20theme%2C%20coding%20elements%2C%20modern%20typography%2C%20gradient%20blue%20and%20purple%20colors%2C%20laptop%20and%20mobile%20mockups%2C%20professional%20tech%20conference%20poster%2C%20innovation%20and%20digital%20solutions%20aesthetic%2C%20clean%20corporate%20design&width=300&height=400&seq=zod-tech-showcase-2025&orientation=portrait',
      category: 'Technology'
    },
    {
      id: 4,
      title: 'Fashion Week Ogun 2026',
      date: '2025-06-12',
      time: '6:00 PM',
      venue: 'PearlFountain Events Centre',
      organizer: 'Ogun Fashion Council',
      price: '₦20,000',
      capacity: 250,
      sold: 180,
      description: 'Runway shows featuring top Nigerian fashion designers',
      flyer: 'https://readdy.ai/api/search-image?query=Stylish%20fashion%20week%20event%20flyer%20with%20haute%20couture%20theme%2C%20elegant%20black%20and%20gold%20design%2C%20fashion%20model%20silhouette%2C%20luxury%20fashion%20elements%2C%20sophisticated%20typography%2C%20runway%20fashion%20poster%20design&width=300&height=400&seq=fashion-week-2025&orientation=portrait',
      category: 'Fashion'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [upcomingEvents.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getAvailabilityColor = (sold: number, capacity: number) => {
    const percentage = (sold / capacity) * 100;
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Upcoming Events</h2>
        <p className="text-center text-gray-600 mb-12 text-sm">
          Discover and book tickets for exciting events at our venue
        </p>

        {/* Event Slideshow */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {upcomingEvents.map((event, index) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={event.flyer} 
                      alt={event.title}
                      className="w-full h-80 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                            {event.category}
                          </span>
                          <span className={`text-xs font-medium ${getAvailabilityColor(event.sold, event.capacity)}`}>
                            {event.capacity - event.sold} tickets left
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                        <p className="text-sm text-white/90 mb-2">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="flex items-center space-x-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(event.date)} • {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-purple-300">{event.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {upcomingEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Event Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {upcomingEvents[currentSlide].title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                by {upcomingEvents[currentSlide].organizer}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-500">
                {upcomingEvents[currentSlide].price}
              </div>
              <div className="text-xs text-gray-500">per ticket</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700">
                {formatDate(upcomingEvents[currentSlide].date)} at {upcomingEvents[currentSlide].time}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700">{upcomingEvents[currentSlide].venue}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700">
                {upcomingEvents[currentSlide].sold} / {upcomingEvents[currentSlide].capacity} tickets sold
              </span>
            </div>
          </div>

          {/* Ticket Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Tickets Sold</span>
              <span>{Math.round((upcomingEvents[currentSlide].sold / upcomingEvents[currentSlide].capacity) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(upcomingEvents[currentSlide].sold / upcomingEvents[currentSlide].capacity) * 100}%` }}
              ></div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center space-x-2">
            <Ticket className="w-4 h-4" />
            <span>Buy Tickets Now</span>
          </button>
        </div>

        {/* Event Planner CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-lg font-bold mb-2">Event Planners</h3>
          <p className="text-sm text-white/90 mb-4">
            List your events and sell tickets through our platform
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xl font-bold mb-1">0%</div>
              <div className="text-xs text-white/80">Platform Fee</div>
            </div>
            <div>
              <div className="text-xl font-bold mb-1">24/7</div>
              <div className="text-xs text-white/80">Support</div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors">
            List Your Event
          </button>
        </div>
      </div>
    </div>
  );
}
