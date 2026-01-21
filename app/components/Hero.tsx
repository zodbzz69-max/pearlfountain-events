
'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Hero() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleReserveDate = () => {
    if (user) {
      router.push('/booking');
    } else {
      router.push('/auth?redirect=/booking');
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/main.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-sm mx-auto">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          <span className="font-['Pacifico'] text-rose-400">PearlFountain</span><br />
          Events Centre
        </h1>
        <p className="text-lg mb-8 text-gray-200">
          Where Every Celebration Becomes a Cherished Memory
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleReserveDate}
            className="bg-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-rose-600 transition-all hover:scale-105 shadow-lg"
          >
            Reserve Event Date
          </button>
          <Link 
            href="/gallery"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-rose-500 transition-all inline-block text-center"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
