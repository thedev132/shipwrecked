'use client';
import Link from 'next/link';
import styles from './page.module.css';
import ProgressBar from '@/components/common/ProgressBar';
import Modal from '@/components/common/Modal';
import { useState } from 'react';

export default function BayPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Bay!</h1>
      
      <div className={styles.progressSection}>
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

      <div className={styles.actions}>
        <button
          className={styles.modalButton}
          onClick={() => setIsModalOpen(true)}
        >
          Open Example Modal
        </button>
        <Link href="/submit-project" className={styles.submitButton}>
          Submit Your Project
        </Link>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        okText="Got it!"
      >
        <p>This is an example modal that demonstrates the following features:</p>
        <ul className={styles.modalList}>
          <li>Custom title and button text</li>
          <li>Click outside to close</li>
          <li>Escape key to close</li>
          <li>Accessible focus management</li>
          <li>Smooth animations</li>
        </ul>
      </Modal>
    </div>
  );
} 