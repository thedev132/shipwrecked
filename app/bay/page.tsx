'use client';
import Link from 'next/link';
import styles from './page.module.css';
import ProgressBar from '@/components/common/ProgressBar';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import { useState } from 'react';

export default function Bay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Shipwrecked Bay</h1>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Ships</span>
            <span className={styles.statValue}>0</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Ships at Sea</span>
            <span className={styles.statValue}>0</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Ships in Port</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.modalButton}
            onClick={handleOpenModal}
          >
            Open Example Modal
          </button>
          
          <a 
            href="/bay/submit" 
            className={styles.submitLink}
          >
            Submit New Ship
          </a>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Example Modal"
        >
          <div className={styles.modalContent}>
            <p>This is an example modal with the following features:</p>
            <ul>
              <li>Centered on screen</li>
              <li>Backdrop blur effect</li>
              <li>Close button</li>
              <li>Custom title</li>
            </ul>
            <button 
              className={styles.submitButton}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Modal>

        {showToast && (
          <Toast
            message="Form submitted successfully!"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
} 