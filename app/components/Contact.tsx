
'use client';

export default function Contact() {
  return (
    <div className="py-16 px-6 bg-gray-800 text-white">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-center text-gray-300 mb-12 text-sm">
          Ready to plan your perfect event? Contact us today
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex items-center justify-center bg-rose-500 rounded-full flex-shrink-0">
              <i className="ri-phone-line text-white"></i>
            </div>
            <div>
              <h3 className="font-medium mb-1">Hotlines</h3>
              <p className="text-sm text-gray-300">090 2745 9049</p>
              <p className="text-sm text-gray-300">080 6087 8866</p>
              <p className="text-sm text-gray-300">080 3821 0186</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex items-center justify-center bg-rose-500 rounded-full flex-shrink-0">
              <i className="ri-mail-line text-white"></i>
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-sm text-gray-300">pearlfountaineventscentre@gmail.com</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex items-center justify-center bg-rose-500 rounded-full flex-shrink-0">
              <i className="ri-map-pin-line text-white"></i>
            </div>
            <div>
              <h3 className="font-medium mb-1">Address</h3>
              <p className="text-sm text-gray-300">
                Graceland Estate, Kotopo,<br />
                Abeokuta, Ogun State
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex items-center justify-center bg-rose-500 rounded-full flex-shrink-0">
              <i className="ri-time-line text-white"></i>
            </div>
            <div>
              <h3 className="font-medium mb-1">Hours</h3>
              <p className="text-sm text-gray-300">Mon - Fri: 9AM - 6PM</p>
              <p className="text-sm text-gray-300">Sat - Sun: 10AM - 4PM</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm text-gray-300 mb-4">Follow us and stay connected for updates, giveaways, and more!</p>
          <div className="flex space-x-4 justify-center mb-6">
            <a 
              href="https://www.instagram.com/pearlfountain_events_centre?igsh=YzljYTk1ODg3Zg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-rose-500 transition-colors"
            >
              <i className="ri-instagram-line text-white"></i>
            </a>
            <a 
              href="https://www.tiktok.com/@pearl_fountain1?_t=ZM-8w17x6osTdl&_r=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-rose-500 transition-colors"
            >
              <i className="ri-music-2-fill text-white"></i>
            </a>
            <a 
              href="https://whatsapp.com/channel/0029VbA05SmLCoX8XJa5UP0D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-rose-500 transition-colors"
            >
              <i className="ri-whatsapp-line text-white"></i>
            </a>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>@pearlfountain_events_centre</p>
            <p>@pearl_fountain1</p>
          </div>
        </div>
        
        <div className="text-center">
          <button className="!rounded-button bg-rose-500 text-white px-8 py-3 text-sm font-medium hover:bg-rose-600 transition-colors w-full">
            Book a Consultation
          </button>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">
            © 2026 PearlFountain Events Centre. All rights reserved.
          </p>
          <p className="text-xs text-gray-300 mt-2">
            Let's make your next event truly spectacular!
          </p>
        </div>
      </div>
    </div>
  );
}
