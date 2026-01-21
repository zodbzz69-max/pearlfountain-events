'use client';

import { useState } from 'react';

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'birthdays', name: 'Birthdays' },
    { id: 'graduations', name: 'Graduations' }
  ];

  const galleryImages = [
    {
      url: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20reception%20at%20luxury%20event%20hall%2C%20beautiful%20table%20settings%20with%20white%20linens%20and%20floral%20centerpieces%2C%20romantic%20lighting%20with%20candles%2C%20sophisticated%20venue%20interior%2C%20professional%20wedding%20photography&width=180&height=120&seq=wedding-1&orientation=landscape',
      title: 'Elegant Wedding Reception',
      category: 'weddings'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Corporate%20conference%20setup%20with%20modern%20presentation%20stage%2C%20professional%20business%20meeting%20venue%2C%20elegant%20seating%20arrangement%2C%20contemporary%20event%20space%20with%20sophisticated%20lighting&width=180&height=120&seq=corporate-1&orientation=landscape',
      title: 'Corporate Conference',
      category: 'corporate'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Birthday%20celebration%20party%20setup%20with%20colorful%20decorations%2C%20festive%20balloon%20arrangements%2C%20elegant%20cake%20table%20display%2C%20joyful%20party%20venue%20with%20beautiful%20lighting&width=180&height=120&seq=birthday-1&orientation=landscape',
      title: 'Birthday Celebration',
      category: 'birthdays'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Graduation%20ceremony%20venue%20with%20elegant%20stage%20setup%2C%20formal%20academic%20celebration%2C%20sophisticated%20graduation%20party%20decoration%2C%20professional%20event%20hall%20interior&width=180&height=120&seq=graduation-1&orientation=landscape',
      title: 'Graduation Ceremony',
      category: 'graduations'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Luxury%20wedding%20ceremony%20setup%20with%20beautiful%20floral%20arch%2C%20elegant%20aisle%20decoration%2C%20romantic%20venue%20interior%2C%20sophisticated%20wedding%20venue%20photography&width=180&height=120&seq=wedding-2&orientation=landscape',
      title: 'Wedding Ceremony',
      category: 'weddings'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Corporate%20gala%20dinner%20event%20with%20elegant%20table%20settings%2C%20professional%20networking%20venue%2C%20sophisticated%20business%20celebration%2C%20luxury%20event%20hall%20interior&width=180&height=120&seq=corporate-2&orientation=landscape',
      title: 'Corporate Gala',
      category: 'corporate'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Children%20birthday%20party%20with%20colorful%20theme%20decorations%2C%20fun%20party%20setup%2C%20festive%20celebration%20venue%2C%20joyful%20kids%20party%20atmosphere%20with%20balloons%20and%20cake&width=180&height=120&seq=birthday-2&orientation=landscape',
      title: 'Kids Birthday Party',
      category: 'birthdays'
    },
    {
      url: 'https://readdy.ai/api/search-image?query=Graduation%20reception%20party%20with%20elegant%20buffet%20setup%2C%20formal%20celebration%20venue%2C%20sophisticated%20graduation%20party%20atmosphere%2C%20professional%20event%20photography&width=180&height=120&seq=graduation-2&orientation=landscape',
      title: 'Graduation Reception',
      category: 'graduations'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Photo Gallery</h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Memorable moments from our past events
        </p>

        {/* Category Filter */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-xs font-medium">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-sm w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <img 
                src={selectedImage} 
                alt="Gallery Image"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}