'use client';
import Link from 'next/link';
import styles from './page.module.css';
import ProgressBar from '@/components/common/ProgressBar';

export default function BayPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Bay!</h1>
      
      <div className={styles.stats}>
        <h2>Progress Bar Examples</h2>
        <p className={styles.description}>
          Below are examples of our skinnable progress bars in different states and colors:
        </p>
        <div style={{ maxWidth: '400px' }}>
          <ProgressBar 
            value={75} 
            label="Success Variant (75%)"
            variant="success"
            height={8}
          />
          <ProgressBar 
            value={30} 
            label="Warning Variant (30%)"
            variant="warning"
            height={8}
          />
          <ProgressBar 
            value={90} 
            label="Error Variant (90%)"
            variant="error"
            height={8}
          />
        </div>
      </div>

      <div>
        <Link 
          href="/bay/submit" 
          className={styles.submitButton}
        >
          Submit Your Project
        </Link>
      </div>
    </div>
  );
} 