export interface Resident {
  id: string;
  name: string;
  flatNumber: string;
  phoneNumber: string;
  email: string;
}

export interface Flat {
  id: string;
  number: string;
  resident: Resident | null;
  maintenanceAmount: number;
  dueDate: string;
  isPaid: boolean;
}

export interface Complaint {
  id: string;
  residentId: string;
  residentName: string;
  flatNumber: string;
  category: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface AppState {
  currentRole: 'resident' | 'admin' | null;
  currentResident: Resident | null;
  flats: Flat[];
  complaints: Complaint[];
  notices: Notice[];
}