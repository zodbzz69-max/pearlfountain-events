import GalleryHero from './GalleryHero';
import PhotoGallery from './PhotoGallery';
import VideoGallery from './VideoGallery';
import VirtualTour from './VirtualTour';

export default function GalleryPage() {
  return (
    <main className="pt-20 pb-24">
      <GalleryHero />
      <PhotoGallery />
      <VideoGallery />
      <VirtualTour />
    </main>
  );
}