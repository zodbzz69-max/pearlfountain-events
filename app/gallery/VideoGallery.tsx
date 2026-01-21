'use client';

import { useState } from 'react';

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      thumbnail: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20video%20thumbnail%2C%20elegant%20celebration%20in%20progress%2C%20beautiful%20venue%20interior%2C%20romantic%20lighting%2C%20professional%20event%20videography%20style&width=180&height=120&seq=video-thumb-1&orientation=landscape',
      title: 'Wedding Reception Highlights',
      description: 'Beautiful moments from Sarah & Michael\'s wedding',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://readdy.ai/api/search-image?query=Corporate%20event%20video%20thumbnail%2C%20professional%20business%20conference%2C%20modern%20presentation%20setup%2C%20elegant%20venue%20interior%2C%20business%20meeting%20atmosphere&width=180&height=120&seq=video-thumb-2&orientation=landscape',
      title: 'Corporate Event Success',
      description: 'TechCorp Annual Conference 2024',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://readdy.ai/api/search-image?query=Birthday%20party%20video%20thumbnail%2C%20colorful%20celebration%20in%20progress%2C%20festive%20decorations%2C%20joyful%20party%20atmosphere%2C%20professional%20event%20videography&width=180&height=120&seq=video-thumb-3&orientation=landscape',
      title: 'Birthday Celebration',
      description: 'Emma\'s 25th Birthday Party Memories',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://readdy.ai/api/search-image?query=Graduation%20ceremony%20video%20thumbnail%2C%20formal%20academic%20celebration%2C%20elegant%20venue%20setup%2C%20graduation%20party%20atmosphere%2C%20professional%20event%20documentation&width=180&height=120&seq=video-thumb-4&orientation=landscape',
      title: 'Graduation Ceremony',
      description: 'University of Lagos Class of 2024',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Video Gallery</h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Watch highlights from our memorable events
        </p>

        <div className="grid grid-cols-1 gap-4">
          {videos.map((video, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(video.videoUrl)}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <i className="ri-play-fill text-2xl text-rose-500 ml-1"></i>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative max-w-sm w-full">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <div className="bg-white rounded-lg overflow-hidden">
                <iframe
                  src={selectedVideo}
                  className="w-full h-64"
                  frameBorder="0"
                  allowFullScreen
                  title="Event Video"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}