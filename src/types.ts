export type SosStatus = 'IDLE' | 'COUNTDOWN' | 'ACTIVE' | 'RESOLVED';

export type TriggerSource = 
  | 'ONE_TOUCH_BUTTON'
  | 'SHAKE_GESTURE'
  | 'VOICE_PHRASE'
  | 'POWER_BUTTON_MULTI'
  | 'SMARTWATCH_WEARABLE'
  | 'BLUETOOTH_PANIC_BUTTON'
  | 'FALL_DETECTION_SENSOR'
  | 'AI_ANOMALY_DETECTOR';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: 1 | 2 | 3;
  isFamily: boolean;
  notifySms: boolean;
  notifyCall: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  bloodGroup: string;
  medicalNotes: string;
  allergies: string;
  address: string;
  isOtpVerified: boolean;
  isBiometricEnabled: boolean;
  isFaceAuthEnabled: boolean;
  emergencyPin: string;
}

export interface GpsLocation {
  lat: number;
  lng: number;
  addressName: string;
  speedKmH: number;
  heading: number;
  accuracyMeters: number;
  timestamp: string;
}

export interface ThreatAnalysis {
  dangerScore: number; // 0 to 100
  threatLevel: 'SAFE' | 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  detectedAnomalies: string[];
  recommendation: string;
  nightTravelRisk: boolean;
  suspiciousRouteDeviation: boolean;
  rapidMovementRunning: boolean;
  suddenStopDetected: boolean;
  followingBehaviorDetected: boolean;
  autoSosRecommended: boolean;
}

export interface EvidenceRecord {
  id: string;
  type: 'AUDIO' | 'VIDEO' | 'GPS_TRACK' | 'INCIDENT_LOG';
  title: string;
  timestamp: string;
  durationSeconds?: number;
  fileSizeMb?: number;
  mediaUrl?: string;
  cloudBackupStatus: 'LOCAL_ONLY' | 'UPLOADING' | 'CLOUD_ENCRYPTED';
  tamperProofHash: string;
  gpsCoordinates: { lat: number; lng: number };
}

export interface FakeCallConfig {
  callerName: string;
  callerNumber: string;
  delaySeconds: number;
  ringtone: 'STANDARD' | 'CHIME' | 'VIP';
  voiceScript: 'MOM_CHECKING' | 'POLICE_OFFICER' | 'FRIEND_PICKUP' | 'CUSTOM';
  customScriptText?: string;
  isCallActive: boolean;
  isCallScheduled: boolean;
}

export interface IncidentReport {
  id: string;
  type: 'HARASSMENT' | 'THEFT' | 'ASSAULT' | 'STALKING' | 'SUSPICIOUS_PERSON' | 'UNSAFE_LOCATION';
  description: string;
  lat: number;
  lng: number;
  locationName: string;
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  reportedBy: string;
  verifiedByCommunity: boolean;
  upvotesCount: number;
  hasPhoto: boolean;
}

export interface EmergencyService {
  id: string;
  name: string;
  type: 'POLICE' | 'HOSPITAL' | 'AMBULANCE' | 'WOMEN_HELP_CENTER' | 'NGO' | 'SAFE_HAVEN';
  address: string;
  phone: string;
  distanceKm: number;
  lat: number;
  lng: number;
  isOpen24x7: boolean;
}

export interface WearableDevice {
  id: string;
  name: string;
  type: 'SMARTWATCH' | 'FITNESS_BAND' | 'SMART_RING' | 'PANIC_BUTTON_BLE';
  connected: boolean;
  batteryLevel: number;
  heartRateBpm: number;
  isHeartRateAnomaly: boolean;
  fallDetectionActive: boolean;
}

export interface SafeRouteOption {
  id: string;
  name: string;
  distanceKm: number;
  durationMins: number;
  safetyScore: number;
  lightingQuality: 'EXCELLENT' | 'MODERATE' | 'POOR';
  cctvCoveragePercent: number;
  policePatrolZone: boolean;
  crowdDensity: 'HIGH' | 'MEDIUM' | 'LOW';
  waypoints: Array<[number, number]>;
}

export interface IncidentTimelineEntry {
  id: string;
  timestamp: string;
  title: string;
  details: string;
  type: 'SOS_TRIGGERED' | 'GPS_DISPATCH' | 'AUDIO_CAPTURED' | 'SMS_SENT' | 'POLICE_NOTIFIED' | 'RESOLVED';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
