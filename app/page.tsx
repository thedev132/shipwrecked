"use client";
import { useState } from "react";
import Story from "@/components/launch/Story";
import { ReactLenis } from "lenis/react";
import LoadingModal from "@/components/common/LoadingModal";
import Link from "next/link";

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
  "Preparing the plank...",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const imageUrls = [
    // Wave images
    ...Array.from({ length: 10 }, (_, i) => `/waves/${i + 1}.png`),
    // Other large files
    "/signatures.png",
    "/Key-personel.jpg",
    "/shore.jpg",
    "/logo.png",
    "/hut.jpg",
    "/location-icon.png",
    "/faq.jpg",
    "/bottlebig.png",
    "/calendar-icon.png",
    "/bottle.png",
    "/bay.jpg",
    "/back-arrow.png",
  ];

  if (isLoading) {
    return (
      <LoadingModal
        titles={loadingMessages}
        imageUrls={imageUrls}
        onLoadComplete={handleLoadComplete}
      />
    );
  }

  return (
    <ReactLenis root>
      <div>
        <main className="h-[1000vh]">
          <Link href="https://hackclub.com">
            <img
              style={{
                position: "fixed",
                top: "20px",
                left: "0",
                border: "0",
                width: "180px",
                zIndex: "999",
              }}
              src="https://assets.hackclub.com/banners/2025.svg"
              alt="Hack Club"
            />
          </Link>
          <Story />
        </main>
      </div>
    </ReactLenis>
  );
}
