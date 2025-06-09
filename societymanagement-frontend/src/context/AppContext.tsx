import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Flat, Complaint, Notice, Resident } from '@/types';
import { mockFlats, mockComplaints, mockNotices } from '@/data/mockData';

interface AppContextType extends AppState {
  setCurrentRole: (role: 'resident' | 'admin' | null) => void;
  setCurrentResident: (resident: Resident | null) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status']) => void;
  addFlat: (flat: Omit<Flat, 'id'>) => void;
  updateFlat: (id: string, updates: Partial<Flat>) => void;
  generateInvoice: (flatId: string, amount: number, dueDate: string) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => void;
  markMaintenancePaid: (flatId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentRole: null,
    currentResident: null,
    flats: mockFlats,
    complaints: mockComplaints,
    notices: mockNotices,
  });

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('societyManagementState');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('societyManagementState', JSON.stringify(state));
  }, [state]);

  const setCurrentRole = (role: 'resident' | 'admin' | null) => {
    setState(prev => ({ ...prev, currentRole: role }));
  };

  const setCurrentResident = (resident: Resident | null) => {
    setState(prev => ({ ...prev, currentResident: resident }));
  };

  const addComplaint = (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
    };
    setState(prev => ({
      ...prev,
      complaints: [newComplaint, ...prev.complaints],
    }));
  };

  const updateComplaintStatus = (id: string, status: Complaint['status']) => {
    setState(prev => ({
      ...prev,
      complaints: prev.complaints.map(complaint =>
        complaint.id === id
          ? { ...complaint, status, updatedAt: new Date().toISOString() }
          : complaint
      ),
    }));
  };

  const addFlat = (flat: Omit<Flat, 'id'>) => {
    const newFlat: Flat = {
      ...flat,
      id: Date.now().toString(),
    };
    setState(prev => ({
      ...prev,
      flats: [...prev.flats, newFlat],
    }));
  };

  const updateFlat = (id: string, updates: Partial<Flat>) => {
    setState(prev => ({
      ...prev,
      flats: prev.flats.map(flat =>
        flat.id === id ? { ...flat, ...updates } : flat
      ),
    }));
  };

  const generateInvoice = (flatId: string, amount: number, dueDate: string) => {
    setState(prev => ({
      ...prev,
      flats: prev.flats.map(flat =>
        flat.id === flatId
          ? { ...flat, maintenanceAmount: amount, dueDate, isPaid: false }
          : flat
      ),
    }));
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'createdAt'>) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      notices: [newNotice, ...prev.notices],
    }));
  };

  const markMaintenancePaid = (flatId: string) => {
    setState(prev => ({
      ...prev,
      flats: prev.flats.map(flat =>
        flat.id === flatId ? { ...flat, isPaid: true } : flat
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setCurrentRole,
        setCurrentResident,
        addComplaint,
        updateComplaintStatus,
        addFlat,
        updateFlat,
        generateInvoice,
        addNotice,
        markMaintenancePaid,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};