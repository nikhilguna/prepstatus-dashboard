import { Patient } from '@/types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    procedureDate: new Date('2025-11-23'),
    procedureTime: '08:00 AM',
    status: 'ready',
    lastStoolQuality: 'clear',
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    symptoms: [],
    readinessPrediction: 95,
    checkIns: [
      {
        id: 'c1',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        stoolQuality: 'solid',
        symptoms: [],
      },
      {
        id: 'c2',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        stoolQuality: 'liquid',
        symptoms: ['nausea'],
      },
      {
        id: 'c3',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        stoolQuality: 'cloudy',
        symptoms: [],
      },
      {
        id: 'c4',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        stoolQuality: 'clear',
        symptoms: [],
      },
    ],
    alerts: [],
  },
  {
    id: '2',
    name: 'Michael Chen',
    procedureDate: new Date('2025-11-23'),
    procedureTime: '09:30 AM',
    status: 'progressing',
    lastStoolQuality: 'cloudy',
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
    symptoms: ['nausea'],
    readinessPrediction: 72,
    checkIns: [
      {
        id: 'c5',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        stoolQuality: 'solid',
        symptoms: [],
      },
      {
        id: 'c6',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        stoolQuality: 'liquid',
        symptoms: ['nausea'],
      },
      {
        id: 'c7',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        stoolQuality: 'cloudy',
        symptoms: ['nausea'],
      },
    ],
    alerts: [],
  },
  {
    id: '3',
    name: 'Patricia Williams',
    procedureDate: new Date('2025-11-23'),
    procedureTime: '10:00 AM',
    status: 'at-risk',
    lastStoolQuality: 'solid',
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 150), // 2.5 hours ago
    symptoms: ['vomiting', 'dizziness'],
    readinessPrediction: 35,
    checkIns: [
      {
        id: 'c8',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        stoolQuality: 'solid',
        symptoms: [],
      },
      {
        id: 'c9',
        timestamp: new Date(Date.now() - 1000 * 60 * 150),
        stoolQuality: 'solid',
        symptoms: ['vomiting', 'dizziness'],
      },
    ],
    alerts: [
      {
        id: 'a1',
        patientId: '3',
        type: 'no-checkin',
        message: 'No check-in for over 2 hours',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        severity: 'high',
      },
      {
        id: 'a2',
        patientId: '3',
        type: 'still-solid',
        message: 'Still reporting solid stool after 6 hours',
        timestamp: new Date(Date.now() - 1000 * 60 * 150),
        severity: 'high',
      },
    ],
  },
  {
    id: '4',
    name: 'James Rodriguez',
    procedureDate: new Date('2025-11-23'),
    procedureTime: '11:00 AM',
    status: 'progressing',
    lastStoolQuality: 'liquid',
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    symptoms: [],
    readinessPrediction: 68,
    checkIns: [
      {
        id: 'c10',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        stoolQuality: 'solid',
        symptoms: [],
      },
      {
        id: 'c11',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        stoolQuality: 'liquid',
        symptoms: [],
      },
      {
        id: 'c12',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        stoolQuality: 'liquid',
        symptoms: [],
      },
    ],
    alerts: [],
  },
  {
    id: '5',
    name: 'Linda Martinez',
    procedureDate: new Date('2025-11-23'),
    procedureTime: '01:30 PM',
    status: 'ready',
    lastStoolQuality: 'clear',
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 20), // 20 min ago
    symptoms: [],
    readinessPrediction: 92,
    checkIns: [
      {
        id: 'c13',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        stoolQuality: 'liquid',
        symptoms: [],
      },
      {
        id: 'c14',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        stoolQuality: 'cloudy',
        symptoms: [],
      },
      {
        id: 'c15',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        stoolQuality: 'clear',
        symptoms: [],
      },
    ],
    alerts: [],
  },
];
