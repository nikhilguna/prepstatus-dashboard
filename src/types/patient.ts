export type StoolQuality = 'solid' | 'liquid' | 'cloudy' | 'clear';
export type PatientStatus = 'ready' | 'progressing' | 'at-risk';
export type Symptom = 'nausea' | 'vomiting' | 'dizziness';
export type PrepType = 'miralax-gatorade';

export interface CheckIn {
  id: string;
  timestamp: Date;
  stoolQuality: StoolQuality;
  symptoms: Symptom[];
  notes?: string;
}

export interface Alert {
  id: string;
  patientId: string;
  type: 'no-checkin' | 'still-solid' | 'severe-symptoms';
  message: string;
  timestamp: Date;
  severity: 'high' | 'medium';
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  procedureDate: Date;
  procedureTime: string;
  prepType: PrepType;
  activationCode: string;
  isActivated: boolean;
  status: PatientStatus;
  lastStoolQuality: StoolQuality;
  lastCheckIn: Date;
  symptoms: Symptom[];
  readinessPrediction: number; // 0-100
  checkIns: CheckIn[];
  alerts: Alert[];
}
