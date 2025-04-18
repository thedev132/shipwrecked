'use client';

import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;  // Current value (0-100)
  max?: number;   // Maximum value (defaults to 100)
  variant?: 'default' | 'success' | 'warning' | 'error';
  height?: number; // Height in pixels
  animated?: boolean;
  className?: string;
  barClassName?: string;
  label?: string | null;
}

export default function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  height = 4,
  animated = true,
  className = '',
  barClassName = '',
  label = null
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  // Smooth animation effect
  useEffect(() => {
    setProgress((value / max) * 100);
  }, [value, max]);

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <div className={styles.label}>{label}</div>}
      <div 
        className={styles.track} 
        style={{ height: `${height}px` }}
      >
        <div
          className={`
            ${styles.bar} 
            ${styles[variant]} 
            ${animated ? styles.animated : ''} 
            ${barClassName}
          `}
          style={{ 
            width: `${progress}%`,
            height: '100%'
          }}
        />
      </div>
    </div>
  );
} 