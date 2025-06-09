import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FlatsManagement } from './FlatsManagement';
import { InvoiceGeneration } from './InvoiceGeneration';
import { ComplaintsPanel } from './ComplaintsPanel';
import { NoticesPanel } from './NoticesPanel';
import styles from '../Dashboard.module.css';
import { 
  ArrowLeft, 
  Home, 
  Receipt, 
  MessageSquare, 
  Bell,
  Users,
  FileText,
  AlertCircle,
  MessageSquareWarning
} from 'lucide-react';

type TabType = 'flats' | 'invoices' | 'complaints' | 'notices';

export const AdminDashboard: React.FC = () => {
  const { setCurrentRole } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('flats');

  const renderContent = () => {
    switch (activeTab) {
      case 'flats':
        return <FlatsManagement />;
      case 'invoices':
        return <InvoiceGeneration />;
      case 'complaints':
        return <ComplaintsPanel />;
      case 'notices':
        return <NoticesPanel />;
      default:
        return <FlatsManagement />;
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardHeader}>
        <a href="#" className={styles.backButton} onClick={(e) => {
          e.preventDefault();
          setCurrentRole(null);
        }}>
          <ArrowLeft size={16} />
          Back to Role Selection
        </a>
        
        <div className={styles.dashboardTitle}>
          <h1>Admin Dashboard</h1>
          <p className={styles.dashboardSubtitle}>Kalpataru Paramount Management</p>
        </div>
        
        {/* Tabbed Navigation */}
        <div className={styles.dashboardNav}>
          <button 
            className={`${styles.navTab} ${activeTab === 'flats' ? 'active' : ''}`}
            onClick={() => setActiveTab('flats')}
          >
            <Users size={16} />
            <span>Flats & Residents</span>
          </button>
          <button 
            className={`${styles.navTab} ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            <FileText size={16} />
            <span>Generate Invoices</span>
          </button>
          <button 
            className={`${styles.navTab} ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <MessageSquareWarning size={16} />
            <span>Complaints</span>
          </button>
          <button 
            className={`${styles.navTab} ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            <Bell size={16} />
            <span>Notices</span>
          </button>
        </div>
        
        {/* Uncomment this section to use the horizontal cards navigation instead */}
        {/* <div className={styles.dashboardNavHorizontal}>
          <a 
            href="#" 
            className={`${styles.navTabHorizontal} ${activeTab === 'flats' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('flats'); }}
          >
            <Users size={24} />
            <span>Flats & Residents</span>
          </a>
          <a 
            href="#" 
            className={`${styles.navTabHorizontal} ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('invoices'); }}
          >
            <FileText size={24} />
            <span>Invoices</span>
          </a>
          <a 
            href="#" 
            className={`${styles.navTabHorizontal} ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('complaints'); }}
          >
            <MessageSquareWarning size={24} />
            <span>Complaints</span>
          </a>
          <a 
            href="#" 
            className={`${styles.navTabHorizontal} ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('notices'); }}
          >
            <Bell size={24} />
            <span>Notices</span>
          </a>
        </div> */}
      </div>
      
      <div className={styles.dashboardContent}>
        {renderContent()}
      </div>
    </div>
  );
};