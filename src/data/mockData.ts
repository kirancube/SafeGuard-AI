import { EmergencyContact, EmergencyService, SafeRouteOption, WearableDevice, IncidentReport, EvidenceRecord, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_101',
  name: 'Priya Sharma',
  phone: '+91 98765 43210',
  email: 'priya.sharma@safeguard.org',
  bloodGroup: 'O+',
  medicalNotes: 'Mild Asthma (Inhaler in handbag)',
  allergies: 'Penicillin',
  address: '302 Lotus Apartments, MG Road, Sector 14',
  isOtpVerified: true,
  isBiometricEnabled: true,
  isFaceAuthEnabled: true,
  emergencyPin: '9988'
};

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'c1',
    name: 'Sunita Sharma (Mother)',
    phone: '+91 98111 22334',
    relation: 'Mother',
    priority: 1,
    isFamily: true,
    notifySms: true,
    notifyCall: true,
  },
  {
    id: 'c2',
    name: 'Anand Sharma (Father)',
    phone: '+91 98222 33445',
    relation: 'Father',
    priority: 1,
    isFamily: true,
    notifySms: true,
    notifyCall: true,
  },
  {
    id: 'c3',
    name: 'Rohan Verma (Brother)',
    phone: '+91 98333 44556',
    relation: 'Brother',
    priority: 2,
    isFamily: true,
    notifySms: true,
    notifyCall: false,
  },
  {
    id: 'c4',
    name: 'Women Protection Control Cell',
    phone: '1091',
    relation: 'Official Helpline',
    priority: 1,
    isFamily: false,
    notifySms: true,
    notifyCall: true,
  },
  {
    id: 'c5',
    name: 'National Emergency Response System',
    phone: '112',
    relation: 'Police / Emergency',
    priority: 1,
    isFamily: false,
    notifySms: true,
    notifyCall: true,
  },
];

export const NEARBY_EMERGENCY_SERVICES: EmergencyService[] = [
  {
    id: 's1',
    name: 'Central Women Police Station & Help Cell',
    type: 'POLICE',
    address: 'Block A, Civic Center, Sector 12',
    phone: '1091 / +91 11 2301 5555',
    distanceKm: 0.8,
    lat: 28.6139,
    lng: 77.2090,
    isOpen24x7: true,
  },
  {
    id: 's2',
    name: 'Fortis Multi-Specialty Hospital Emergency',
    type: 'HOSPITAL',
    address: '45 Expressway Hub, Sector 18',
    phone: '108 / +91 11 4000 8000',
    distanceKm: 1.4,
    lat: 28.6200,
    lng: 77.2150,
    isOpen24x7: true,
  },
  {
    id: 's3',
    name: 'SAHAS Women Protection NGO & Crisis Center',
    type: 'NGO',
    address: 'Suite 102, Integrity Complex',
    phone: '+91 98000 11223',
    distanceKm: 1.9,
    lat: 28.6080,
    lng: 77.2020,
    isOpen24x7: true,
  },
  {
    id: 's4',
    name: 'City Rapid Ambulance Command Hub',
    type: 'AMBULANCE',
    address: 'Ring Road Station 4',
    phone: '102',
    distanceKm: 1.1,
    lat: 28.6250,
    lng: 77.2050,
    isOpen24x7: true,
  },
  {
    id: 's5',
    name: '24/7 Metro Transit Safe Haven Spot',
    type: 'SAFE_HAVEN',
    address: 'Central Metro Junction Gate 2',
    phone: '112',
    distanceKm: 0.5,
    lat: 28.6160,
    lng: 77.2110,
    isOpen24x7: true,
  }
];

export const INITIAL_SAFE_ROUTES: SafeRouteOption[] = [
  {
    id: 'route_1',
    name: 'Safest Main Avenue (24/7 Police Patrol & High CCTV)',
    distanceKm: 4.8,
    durationMins: 16,
    safetyScore: 95,
    lightingQuality: 'EXCELLENT',
    cctvCoveragePercent: 92,
    policePatrolZone: true,
    crowdDensity: 'HIGH',
    waypoints: [
      [28.6139, 77.2090],
      [28.6155, 77.2120],
      [28.6180, 77.2140],
      [28.6210, 77.2170],
    ]
  },
  {
    id: 'route_2',
    name: 'Express Outer Ring (Moderately Lit, Broad Road)',
    distanceKm: 4.1,
    durationMins: 12,
    safetyScore: 78,
    lightingQuality: 'MODERATE',
    cctvCoveragePercent: 65,
    policePatrolZone: true,
    crowdDensity: 'MEDIUM',
    waypoints: [
      [28.6139, 77.2090],
      [28.6120, 77.2130],
      [28.6160, 77.2180],
      [28.6210, 77.2170],
    ]
  },
  {
    id: 'route_3',
    name: 'Shortcut Alley Way (Unsafe / Low Lighting Warning)',
    distanceKm: 3.2,
    durationMins: 9,
    safetyScore: 42,
    lightingQuality: 'POOR',
    cctvCoveragePercent: 15,
    policePatrolZone: false,
    crowdDensity: 'LOW',
    waypoints: [
      [28.6139, 77.2090],
      [28.6145, 77.2070],
      [28.6190, 77.2120],
      [28.6210, 77.2170],
    ]
  }
];

export const SAMPLE_INCIDENT_REPORTS: IncidentReport[] = [
  {
    id: 'rep_1',
    type: 'HARASSMENT',
    description: 'Two individuals on a bike passing catcalls near dark underpass.',
    lat: 28.6145,
    lng: 77.2070,
    locationName: 'Sector 11 Railway Underpass',
    timestamp: '2 hours ago',
    severity: 'HIGH',
    reportedBy: 'Anonymous User',
    verifiedByCommunity: true,
    upvotesCount: 24,
    hasPhoto: true,
  },
  {
    id: 'rep_2',
    type: 'UNSAFE_LOCATION',
    description: 'Street lights out for over 500 meters along north park perimeter.',
    lat: 28.6185,
    lng: 77.2030,
    locationName: 'North Park Perimeter Road',
    timestamp: 'Yesterday at 9:45 PM',
    severity: 'MEDIUM',
    reportedBy: 'Anita K.',
    verifiedByCommunity: true,
    upvotesCount: 42,
    hasPhoto: false,
  },
  {
    id: 'rep_3',
    type: 'STALKING',
    description: 'Suspicious black sedan following walking pedestrians slowly.',
    lat: 28.6120,
    lng: 77.2130,
    locationName: 'MG Road Lane 4',
    timestamp: '3 days ago',
    severity: 'HIGH',
    reportedBy: 'Ritu M.',
    verifiedByCommunity: true,
    upvotesCount: 56,
    hasPhoto: true,
  }
];

export const INITIAL_WEARABLES: WearableDevice[] = [
  {
    id: 'w1',
    name: 'SafeGuard SmartWatch v2',
    type: 'SMARTWATCH',
    connected: true,
    batteryLevel: 88,
    heartRateBpm: 74,
    isHeartRateAnomaly: false,
    fallDetectionActive: true,
  },
  {
    id: 'w2',
    name: 'SafeBand BLE Panic Button',
    type: 'PANIC_BUTTON_BLE',
    connected: true,
    batteryLevel: 94,
    heartRateBpm: 0,
    isHeartRateAnomaly: false,
    fallDetectionActive: false,
  }
];

export const SAMPLE_EVIDENCE_RECORDS: EvidenceRecord[] = [
  {
    id: 'ev_101',
    type: 'AUDIO',
    title: 'Emergency Audio Log - SOS Trigger #402',
    timestamp: '2026-08-01 21:14:02',
    durationSeconds: 120,
    fileSizeMb: 1.8,
    cloudBackupStatus: 'CLOUD_ENCRYPTED',
    tamperProofHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    gpsCoordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 'ev_102',
    type: 'GPS_TRACK',
    title: 'Live GPS Travel Track Log',
    timestamp: '2026-08-01 21:14:00',
    fileSizeMb: 0.4,
    cloudBackupStatus: 'CLOUD_ENCRYPTED',
    tamperProofHash: '8f4e2a1b9c3d5e7f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f',
    gpsCoordinates: { lat: 28.6139, lng: 77.2090 }
  }
];
