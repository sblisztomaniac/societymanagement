import { Flat, Complaint, Notice, Resident } from '@/types';

export const mockResidents: Resident[] = [
  {
    id: '1',
    name: 'Tushar Chopde',
    flatNumber: 'A-101',
    phoneNumber: '+91-9876543210',
    email: 'tushar.chopde@email.com',
  },
  {
    id: '2',
    name: 'Shaunak Bojewar',
    flatNumber: 'A-102',
    phoneNumber: '+91-9876543211',
    email: 'shaunak.bojewar@email.com',
  },
  {
    id: '3',
    name: 'Ninad Rajurkar',
    flatNumber: 'B-201',
    phoneNumber: '+91-9876543212',
    email: 'ninad.rajurkar@email.com',
  },
  {
    id: '4',
    name: 'Gaurav Kapoor',
    flatNumber: 'B-202',
    phoneNumber: '+91-9876543213',
    email: 'gaurav.kapoor@email.com',
  },
];

export const mockFlats: Flat[] = [
  {
    id: '1',
    number: 'A-101',
    resident: mockResidents[0],
    maintenanceAmount: 2500,
    dueDate: '2024-01-15',
    isPaid: false,
  },
  {
    id: '2',
    number: 'A-102',
    resident: mockResidents[1],
    maintenanceAmount: 2500,
    dueDate: '2024-01-15',
    isPaid: true,
  },
  {
    id: '3',
    number: 'B-201',
    resident: mockResidents[2],
    maintenanceAmount: 3000,
    dueDate: '2024-01-15',
    isPaid: false,
  },
  {
    id: '4',
    number: 'B-202',
    resident: mockResidents[3],
    maintenanceAmount: 3000,
    dueDate: '2024-01-15',
    isPaid: false,
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    residentId: '1',
    residentName: 'Tushar Chopde',
    flatNumber: 'A-101',
    category: 'Plumbing',
    description: 'Kitchen sink is clogged and water is backing up. Need urgent attention.',
    status: 'in-progress',
    createdAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '2',
    residentId: '2',
    residentName: 'Shaunak Bojewar',
    flatNumber: 'A-102',
    category: 'Electrical',
    description: 'Living room light fixture is flickering intermittently.',
    status: 'open',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '3',
    residentId: '3',
    residentName: 'Ninad Rajurkar',
    flatNumber: 'B-201',
    category: 'Common Area',
    description: 'Elevator button on 2nd floor is not working properly.',
    status: 'resolved',
    createdAt: '2024-01-08T11:15:00Z',
    updatedAt: '2024-01-11T10:30:00Z',
  },
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Monthly Maintenance Due',
    content: 'Please note that the monthly maintenance for January 2024 is due by 15th January. Late payment charges will apply after the due date.',
    priority: 'high',
    createdAt: '2024-01-05T10:00:00Z',
  },
  {
    id: '2',
    title: 'Water Tank Cleaning Schedule',
    content: 'The society water tanks will be cleaned on January 20th, 2024, from 10 AM to 4 PM. Water supply may be interrupted during this time.',
    priority: 'medium',
    createdAt: '2024-01-08T14:30:00Z',
  },
  {
    id: '3',
    title: 'New Parking Guidelines',
    content: 'Effective immediately, all vehicles must display the new parking stickers. Please collect your stickers from the office.',
    priority: 'low',
    createdAt: '2024-01-10T09:00:00Z',
  },
];