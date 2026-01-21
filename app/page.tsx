
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import BookShowcase from './components/BookShowcase';
import EventTicketing from './components/EventTicketing';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Quick Service Access */} 
      <section className="py-16 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <Link 
              href="/booking"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">Book Event Hall</h3>
                  <p className="text-white/90 text-sm">Premium venue for your special events</p>
                  <p className="text-white/80 text-xs mt-1">Starting from ₦300,000</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-building-line text-2xl"></i>
                </div>
              </div>
            </Link>

            <Link 
              href="/tent-rental"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">Rent Canopy Tent</h3>
                  <p className="text-white/90 text-sm">Perfect for outdoor celebrations</p>
                  <p className="text-white/80 text-xs mt-1">Starting from ₦50,000/day</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-tent-line text-2xl"></i>
                </div>
              </div>
            </Link>

            <Link 
              href="/truck-hire"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">Hire Truck Service</h3>
                  <p className="text-white/90 text-sm">Reliable transportation solutions</p>
                  <p className="text-white/80 text-xs mt-1">Starting from ₦15,000/day</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-truck-line text-2xl"></i>
                </div>
              </div>
            </Link>
          </div>

          {/* Experience Hub Promotion */}
          <Link 
            href="/experience-hub"
            className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mb-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-coin-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Experience Hub</h3>
              <p className="text-white/90 text-sm mb-3">Earn Weber Coins & Get Rewards</p>
              <div className="flex items-center justify-center space-x-4 text-xs">
                <span className="bg-white/20 px-2 py-1 rounded-full">Take Quiz</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">Earn Coins</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">Get Discounts</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Services />
      <Gallery />
      <EventTicketing />
      <BookShowcase />
      <About />
      <Contact />
    </main>
  );
}
