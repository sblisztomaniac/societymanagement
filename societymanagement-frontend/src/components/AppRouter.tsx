import React from 'react';
import { useApp } from '@/context/AppContext';
import { RoleSelector } from '@/components/RoleSelector';
import { ResidentSelector } from '@/components/resident/ResidentSelector';
import { ResidentDashboard } from '@/components/resident/ResidentDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const AppRouter: React.FC = () => {
  const { currentRole, currentResident } = useApp();

  if (!currentRole) {
    return <RoleSelector />;
  }

  if (currentRole === 'resident') {
    if (!currentResident) {
      return <ResidentSelector />;
    }
    return <ResidentDashboard />;
  }

  if (currentRole === 'admin') {
    return <AdminDashboard />;
  }

  return <RoleSelector />;
};