'use client';
import { useState } from 'react';
import Story from "@/components/launch/Story";
import { ReactLenis } from 'lenis/react';
import LoadingModal from '@/components/common/LoadingModal';

const loadingMessages = [
  "Swabbing the decks...",
  "Counting the doubloons...",
  "Polishing the cannonballs...",
  "Teaching the parrot to talk...",
  "Burying the treasure...",
  "Filling the rum barrels...",
  "Sharpening the cutlasses...",
  "Mending the sails...",
  "Cleaning the spyglass...",
  "Stocking the galley...",
  "Checking the compass...",
  "Raising the Jolly Roger...",
  "Loading the cannon...",
  "Untying the knots...",
  "Hoisting the anchor...",
  "Dusting off the treasure map...",
  "Filling the water barrels...",
  "Checking the rigging...",
  "Waxing the figurehead...",
  "Preparing the plank..."
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const imageUrls = [
    // Wave images
    ...Array.from({ length: 10 }, (_, i) => `/waves/${i + 1}.png`),
    // Other large PNG files
    '/signatures.png',
    '/Key-personel.png',
    '/shore.png',
    '/logo.png',
    '/hut.png',
    '/location-icon.png',
    '/faq.png',
    '/bottlebig.png',
    '/calendar-icon.png',
    '/bottle.png',
    '/bay.png',
    '/back-arrow.png'
  ];

  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  if (isLoading) {
    return (
      <LoadingModal 
        onLoadComplete={handleLoadComplete}
        title={randomMessage}
        imageUrls={imageUrls}
      />
    );
  }

  return (
    <ReactLenis root>
      <div>
        <main className="h-[1000vh]">
          <Story />
        </main>
      </div>
    </ReactLenis>
  );
}
