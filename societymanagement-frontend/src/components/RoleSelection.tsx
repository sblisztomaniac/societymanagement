import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './RoleSelection.module.css';

export const RoleSelection: React.FC = () => {
  const { setCurrentRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<'resident' | 'admin' | null>(null);

  const handleRoleSelect = (role: 'resident' | 'admin') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setCurrentRole(selectedRole);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.welcomeText}>Welcome to</div>
        <h1 className={styles.societyName}>Kalpataru Paramount</h1>
        <p className={styles.subtitle}>Choose your role to access your personalized dashboard</p>
      </div>
      
      <div className={styles.roleSelection}>
        <div 
          className={`${styles.roleCard} ${selectedRole === 'resident' ? styles.selected : ''}`}
          onClick={() => handleRoleSelect('resident')}
        >
          <div className={`${styles.roleIcon} ${styles.residentIcon}`}>
            <svg viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className={styles.roleContent}>
            <h3 className={styles.roleTitle}>I'm a Resident</h3>
            <p className={styles.roleDescription}>
              View maintenance dues, raise complaints, and stay updated with society announcements
            </p>
          </div>
          <div className={styles.radioButton}></div>
        </div>
        
        <div 
          className={`${styles.roleCard} ${selectedRole === 'admin' ? styles.selected : ''}`}
          onClick={() => handleRoleSelect('admin')}
        >
          <div className={`${styles.roleIcon} ${styles.adminIcon}`}>
            <svg viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className={styles.roleContent}>
            <h3 className={styles.roleTitle}>I'm Committee Member</h3>
            <p className={styles.roleDescription}>
              Manage flats, generate invoices, handle complaints, and post announcements
            </p>
          </div>
          <div className={styles.radioButton}></div>
        </div>
      </div>
      
      <button 
        className={styles.continueBtn} 
        disabled={!selectedRole}
        onClick={handleContinue}
      >
        Continue to Dashboard
      </button>
      
      <div className={styles.footer}>
        <div className={styles.footerTitle}>Society Management System</div>
        <div className={styles.footerSubtitle}>Built with care for modern communities</div>
      </div>
    </div>
  );
};
