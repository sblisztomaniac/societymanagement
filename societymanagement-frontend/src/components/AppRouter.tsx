import React from 'react';
import { useApp } from '@/context/AppContext';
import { ResidentSelector } from '@/components/resident/ResidentSelector';
import { ResidentDashboard } from '@/components/resident/ResidentDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { RoleSelection } from '@/components/RoleSelection';

export const AppRouter: React.FC = () => {
  const { currentRole, currentResident } = useApp();

  // Show role selection if no role is selected
  if (!currentRole) {
    return <RoleSelection />;
  }

  // Resident flow
  if (currentRole === 'resident') {
    if (!currentResident) {
      return <ResidentSelector />;
    }
    return <ResidentDashboard />;
  }

  // Admin flow
  if (currentRole === 'admin') {
    return <AdminDashboard />;
  }

  // Fallback to role selection
  return <RoleSelection />;
};