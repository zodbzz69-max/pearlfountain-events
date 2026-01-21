'use client';

export default function GalleryHero() {
  return (
    <div className="relative h-64 flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20event%20hall%20interior%20with%20beautiful%20lighting%2C%20luxury%20venue%20photography%2C%20sophisticated%20event%20space%20with%20modern%20design%2C%20professional%20venue%20showcase%2C%20warm%20ambient%20lighting%20and%20elegant%20decor&width=375&height=256&seq=gallery-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-sm mx-auto">
        <h1 className="text-3xl font-bold mb-3">Event Gallery</h1>
        <p className="text-gray-200 text-sm">
          Discover the magic of celebrations at PearlFountain Events Centre
        </p>
      </div>
    </div>
  );
}