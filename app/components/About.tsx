
'use client';

export default function About() {
  return (
    <div className="py-16 px-6 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">💠 Our Story</h2>
          <div className="w-20 h-20 mx-auto mb-6 overflow-hidden rounded-full">
            <img 
              src="https://static.readdy.ai/image/457794e301a9d336c4665d399d9c3a51/8a616b4cb8c862fd1ca6e8b894ae48e2.jpeg" 
              alt="PearlFountain Events Centre Building"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
        
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed mb-8">
          <p>
            At PearlFountain Events Centre, we believe every celebration deserves a space that feels special.
            Located in the peaceful Graceland Estate, Kotopo — Abeokuta, our story began with a dream to create a hall where people could gather, laugh, and create lasting memories.
          </p>
          <p>
            Since our grand opening, we've hosted unforgettable weddings, birthdays, conferences, and intimate family occasions. Each event is a chance for us to grow, to serve better, and to make your special day truly yours.
          </p>
          <p>
            We may be a new name in the event world, but our passion runs deep. Every booking, no matter how small, is a step toward building a vibrant community of joyful moments right here in Abeokuta.
          </p>
          <p>
            At PearlFountain, we're not just renting a hall, we're offering a home for your celebrations.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500 mb-1">50+</div>
            <div className="text-xs text-gray-600">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500 mb-1">New</div>
            <div className="text-xs text-gray-600">Venue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500 mb-1">500</div>
            <div className="text-xs text-gray-600">Guest Capacity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-500 mb-1">Daily</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
        </div>
        
        <div className="text-center">
          <button className="!rounded-button bg-gray-800 text-white px-6 py-2 text-sm font-medium hover:bg-gray-900 transition-colors">
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  );
}
