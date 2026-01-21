'use client';

export default function Gallery() {
  const galleryImages = [
    {
      url: 'https://readdy.ai/api/search-image?query=Beautiful%20wedding%20reception%20setup%20with%20elegant%20table%20arrangements%2C%20white%20linens%20and%20floral%20centerpieces%2C%20romantic%20lighting%20and%20candles%2C%20luxury%20event%20hall%20interior%2C%20professional%20event%20photography%20with%20warm%20ambient%20lighting&width=180&height=120&seq=gallery-1&orientation=landscape',
      title: 'Wedding Reception'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Corporate%20conference%20room%20setup%20with%20modern%20presentation%20stage%2C%20professional%20lighting%20and%20audio%20equipment%2C%20business%20meeting%20venue%20with%20elegant%20seating%20arrangement%2C%20contemporary%20event%20space%20design&width=180&height=120&seq=gallery-2&orientation=landscape',
      title: 'Corporate Event'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Birthday%20party%20decoration%20with%20colorful%20balloons%20and%20cake%20table%2C%20festive%20celebration%20setup%2C%20party%20venue%20with%20beautiful%20lighting%2C%20joyful%20birthday%20celebration%20atmosphere%2C%20professional%20event%20photography&width=180&height=120&seq=gallery-3&orientation=landscape',
      title: 'Birthday Celebration'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Graduation%20ceremony%20setup%20with%20elegant%20stage%20and%20seating%2C%20academic%20celebration%20venue%2C%20formal%20graduation%20party%20decoration%2C%20professional%20event%20hall%20with%20sophisticated%20design&width=180&height=120&seq=gallery-4&orientation=landscape',
      title: 'Graduation Ceremony'
    }
  ];

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Event Gallery</h2>
        <p className="text-center text-gray-600 mb-12 text-sm">
          Glimpses of memorable events hosted at our venue
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white text-sm font-medium">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="!rounded-button bg-rose-500 text-white px-6 py-2 text-sm font-medium hover:bg-rose-600 transition-colors">
            View More Photos
          </button>
        </div>
      </div>
    </div>
  );
}