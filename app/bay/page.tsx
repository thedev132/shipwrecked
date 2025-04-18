'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function BayPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Bay!</h1>
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