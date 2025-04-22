'use client';
import { useEffect, useState } from 'react';
import styles from './LoadingModal.module.css';

interface LoadingModalProps {
  onLoadComplete: () => void;
  title?: string;
  imageUrls: string[];
}

const LoadingModal: React.FC<LoadingModalProps> = ({ 
  onLoadComplete, 
  title = 'Loading...',
  imageUrls 
}) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  
  const areImagesCached = async (): Promise<boolean> => {
    console.log('Checking if images are cached:', imageUrls);
    try {
      // Check each image using fetch with only-if-cached
      const cacheChecks = imageUrls.map(url => 
        fetch(url, { 
          method: 'HEAD',
          cache: 'only-if-cached',
          mode: 'same-origin'
        }).then(response => {
          console.log(`Cache check for ${url}: HIT`);
          return true;
        }).catch(() => {
          console.log(`Cache check for ${url}: MISS`);
          return false;
        })
      );

      const results = await Promise.all(cacheChecks);
      
      // Return true if all images are found in cache
      const allCached = results.every(result => result === true);
      console.log(`Cache check complete. All images cached: ${allCached}`);
      return allCached;
    } catch (error) {
      console.error('Error checking cache:', error);
      return false;
    }
  };

  const preloadImages = async () => {
    const imageCount = imageUrls.length;
    let loadedCount = 0;

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / imageCount) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / imageCount) * 100));
          resolve();
        };
        img.src = src;
      });
    };

    // Load all images
    const imagePromises = imageUrls.map(url => loadImage(url));

    try {
      await Promise.all(imagePromises);
      setTimeout(() => {
        onLoadComplete();
      }, 500);
    } catch (error) {
      console.error('Error preloading images:', error);
      setTimeout(() => {
        onLoadComplete();
      }, 1000);
    }
  };

  useEffect(() => {
    const checkCacheAndLoad = async () => {
      const cached = await areImagesCached();
      if (cached) {
        // If all images are cached, skip the loader
        onLoadComplete();
      } else {
        // If not all images are cached, show loader and preload
        setShowLoader(true);
        preloadImages();
      }
    };

    checkCacheAndLoad();
  }, [onLoadComplete, imageUrls]);

  if (!showLoader) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.spinner} />
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>
    </div>
  );
};

export default LoadingModal; 