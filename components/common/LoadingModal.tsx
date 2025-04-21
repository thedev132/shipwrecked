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

  useEffect(() => {
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

    preloadImages();
  }, [onLoadComplete, imageUrls]);

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