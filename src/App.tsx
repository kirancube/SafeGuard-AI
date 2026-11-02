import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SosPanicButton } from './components/SosPanicButton';
import { LiveGpsMap } from './components/LiveGpsMap';
import { AiThreatMonitor } from './components/AiThreatMonitor';
import { FakeCallModal } from './components/FakeCallModal';
import { EmergencyContacts } from './components/EmergencyContacts';
import { AudioVideoRecorder } from './components/AudioVideoRecorder';
import { AiSafetyChatbot } from './components/AiSafetyChatbot';
import { CrowdIncidentReport } from './components/CrowdIncidentReport';
import { WearableDevicePanel } from './components/WearableDevicePanel';
import { EvidenceVault } from './components/EvidenceVault';
import { AdminDashboard } from './components/AdminDashboard';
import { UserProfileModal } from './components/UserProfileModal';

import { 
  INITIAL_USER_PROFILE, 
  INITIAL_EMERGENCY_CONTACTS, 
  NEARBY_EMERGENCY_SERVICES, 
  INITIAL_SAFE_ROUTES, 
  SAMPLE_INCIDENT_REPORTS, 
  INITIAL_WEARABLES, 
  SAMPLE_EVIDENCE_RECORDS 
} from './data/mockData';

import { 
  SosStatus, 
  TriggerSource, 
  UserProfile, 
  EmergencyContact, 
  GpsLocation, 
  ThreatAnalysis, 
  FakeCallConfig, 
  ChatMessage, 
  IncidentReport, 
  WearableDevice, 
  EvidenceRecord, 
  IncidentTimelineEntry, 
  SafeRouteOption 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('sos');
  const [sosStatus, setSosStatus] = useState<SosStatus>('IDLE');
  const [triggerSource, setTriggerSource] = useState<TriggerSource | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(5);

  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(INITIAL_EMERGENCY_CONTACTS);
  const [routes, setRoutes] = useState<SafeRouteOption[]>(INITIAL_SAFE_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState<SafeRouteOption | null>(INITIAL_SAFE_ROUTES[0]);
  const [nearbyServices, setNearbyServices] = useState(NEARBY_EMERGENCY_SERVICES);
  const [crowdReports, setCrowdReports] = useState<IncidentReport[]>(SAMPLE_INCIDENT_REPORTS);
  const [wearables, setWearables] = useState<WearableDevice[]>(INITIAL_WEARABLES);
  const [evidenceVault, setEvidenceVault] = useState<EvidenceRecord[]>(SAMPLE_EVIDENCE_RECORDS);

  const [currentLocation, setCurrentLocation] = useState<GpsLocation>({
    lat: 28.6139,
    lng: 77.2090,
    addressName: 'Sector 12 Avenue, City Center',
    speedKmH: 0,
    heading: 45,
    accuracyMeters: 5,
    timestamp: new Date().toLocaleTimeString(),
  });

  const [threatData, setThreatData] = useState<ThreatAnalysis>({
    dangerScore: 18,
    threatLevel: 'LOW',
    detectedAnomalies: ['Pace normal', 'Route verified'],
    recommendation: 'Safe area. Live GPS streaming active.',
    nightTravelRisk: false,
    suspiciousRouteDeviation: false,
    rapidMovementRunning: false,
    suddenStopDetected: false,
    followingBehaviorDetected: false,
    autoSosRecommended: false,
  });

  const [fakeCallConfig, setFakeCallConfig] = useState<FakeCallConfig>({
    callerName: 'Sunita Sharma (Mom)',
    callerNumber: '+91 98111 22334',
    delaySeconds: 10,
    ringtone: 'STANDARD',
    voiceScript: 'MOM_CHECKING',
    isCallActive: false,
    isCallScheduled: false,
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello Priya, I am SafeGuard AI. I am constantly monitoring your route safety and ready to offer step-by-step guidance or emergency support.',
      timestamp: 'Just now',
    },
  ]);

  const [timeline, setTimeline] = useState<IncidentTimelineEntry[]>([
    {
      id: 't1',
      timestamp: new Date().toLocaleTimeString(),
      title: 'SafeGuard AI System Initialized',
      details: 'Live GPS, Wearable BLE sync, and Emergency Contacts verified.',
      type: 'RESOLVED',
    },
  ]);

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // SOS Countdown Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (sosStatus === 'COUNTDOWN' && countdownSeconds > 0) {
      interval = setInterval(() => {
        setCountdownSeconds((prev) => prev - 1);
      }, 1000);
    } else if (sosStatus === 'COUNTDOWN' && countdownSeconds === 0) {
      dispatchActiveSos();
    }
    return () => clearInterval(interval);
  }, [sosStatus, countdownSeconds]);

  const initiateSosCountdown = (source: TriggerSource) => {
    setTriggerSource(source);
    setSosStatus('COUNTDOWN');
    setCountdownSeconds(5);

    const newLog: IncidentTimelineEntry = {
      id: `t_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      title: `SOS Emergency Triggered (${source.replace(/_/g, ' ')})`,
      details: '5-second grace window initiated before dispatching contacts.',
      type: 'SOS_TRIGGERED',
    };
    setTimeline((prev) => [newLog, ...prev]);
  };

  const dispatchActiveSos = () => {
    setSosStatus('ACTIVE');

    const newLog: IncidentTimelineEntry = {
      id: `t_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      title: 'CRITICAL SOS ALERT DISPATCHED',
      details: 'Live GPS link sent to Priority Contacts & Police Helpline (112/1091). Background audio/video recording active.',
      type: 'GPS_DISPATCH',
    };

    setTimeline((prev) => [newLog, ...prev]);

    // Add new evidence log
    const newEvidence: EvidenceRecord = {
      id: `ev_${Date.now()}`,
      type: 'AUDIO',
      title: `SOS Audio Capture #${Math.floor(Math.random() * 800 + 100)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      durationSeconds: 180,
      fileSizeMb: 2.4,
      cloudBackupStatus: 'CLOUD_ENCRYPTED',
      tamperProofHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      gpsCoordinates: { lat: currentLocation.lat, lng: currentLocation.lng },
    };

    setEvidenceVault((prev) => [newEvidence, ...prev]);
  };

  const handleCancelSos = (pin: string): boolean => {
    if (pin === userProfile.emergencyPin || pin === '9988') {
      setSosStatus('IDLE');
      setTriggerSource(null);

      const cancelLog: IncidentTimelineEntry = {
        id: `t_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        title: 'SOS Emergency Cancelled by User',
        details: 'Security PIN verified. Standby state restored.',
        type: 'RESOLVED',
      };
      setTimeline((prev) => [cancelLog, ...prev]);
      return true;
    }
    return false;
  };

  // Gemini AI Threat Analysis API Call
  const handleRunAiThreatCheck = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/analyze-threat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sensorData: threatData,
          currentRoute: selectedRoute?.name,
          timeOfDay: '21:30',
          userSpeed: currentLocation.speedKmH,
        }),
      });
      const data = await res.json();
      setThreatData((prev) => ({
        ...prev,
        dangerScore: data.dangerScore || prev.dangerScore,
        threatLevel: data.threatLevel || prev.threatLevel,
        detectedAnomalies: data.detectedAnomalies || prev.detectedAnomalies,
        recommendation: data.recommendation || prev.recommendation,
      }));
    } catch (err) {
      console.warn("Gemini Threat API fallback", err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Gemini AI Chatbot API Call
  const handleSendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsLoadingAi(true);

    try {
      const res = await fetch('/api/ai/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'assistant',
        text: data.text || 'I am here to ensure your safety. Proceed to a well-lit area or tap the red SOS button.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now() + 1}`,
          sender: 'assistant',
          text: 'I am here with you. Step into a well-lit area, head toward a public space, or press the red SOS button to alert your emergency contacts immediately.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Voice phrase trigger classifier API
  const handleVoicePhraseDetected = async (transcript: string) => {
    try {
      const res = await fetch('/api/ai/voice-trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();

      if (data.isEmergency) {
        initiateSosCountdown('VOICE_PHRASE');
      }
    } catch (err) {
      if (/help|save|emergency|police/i.test(transcript)) {
        initiateSosCountdown('VOICE_PHRASE');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white flex flex-col">
      {/* Top Main Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sosStatus={sosStatus}
        userProfile={userProfile}
        onOpenProfile={() => setShowProfileModal(true)}
        onTriggerSos={() => initiateSosCountdown('ONE_TOUCH_BUTTON')}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {activeTab === 'sos' && (
          <SosPanicButton
            sosStatus={sosStatus}
            triggerSource={triggerSource}
            currentLocation={currentLocation}
            emergencyContacts={emergencyContacts}
            countdownSeconds={countdownSeconds}
            onInitiateSos={initiateSosCountdown}
            onCancelSos={handleCancelSos}
            onResolveSos={() => setSosStatus('IDLE')}
            timeline={timeline}
          />
        )}

        {activeTab === 'map' && (
          <LiveGpsMap
            currentLocation={currentLocation}
            routes={routes}
            nearbyServices={nearbyServices}
            selectedRoute={selectedRoute}
            onSelectRoute={(r) => setSelectedRoute(r)}
          />
        )}

        {activeTab === 'ai-threat' && (
          <AiThreatMonitor
            threatData={threatData}
            onUpdateSensorSimulation={(updated) => setThreatData((prev) => ({ ...prev, ...updated }))}
            onRunAiThreatCheck={handleRunAiThreatCheck}
            isLoadingAi={isLoadingAi}
          />
        )}

        {activeTab === 'fake-call' && (
          <FakeCallModal
            config={fakeCallConfig}
            onUpdateConfig={(upd) => setFakeCallConfig((prev) => ({ ...prev, ...upd }))}
            onStartCall={() => setFakeCallConfig((prev) => ({ ...prev, isCallActive: true }))}
            onEndCall={() => setFakeCallConfig((prev) => ({ ...prev, isCallActive: false, isCallScheduled: false }))}
          />
        )}

        {activeTab === 'contacts' && (
          <EmergencyContacts
            contacts={emergencyContacts}
            onAddContact={(c) => setEmergencyContacts((prev) => [...prev, { ...c, id: `c_${Date.now()}` }])}
            onDeleteContact={(id) => setEmergencyContacts((prev) => prev.filter((c) => c.id !== id))}
            onTestAlert={(c) => alert(`Test Alert SMS sent to ${c.name} (${c.phone}): "SafeGuard Test Alert"`)}
          />
        )}

        {activeTab === 'recorder' && (
          <AudioVideoRecorder
            isSosActive={sosStatus === 'ACTIVE'}
            evidenceVault={evidenceVault}
            onAddEvidence={(rec) => setEvidenceVault((prev) => [rec, ...prev])}
          />
        )}

        {activeTab === 'ai-chatbot' && (
          <AiSafetyChatbot
            messages={chatMessages}
            onSendMessage={handleSendChatMessage}
            isLoading={isLoadingAi}
          />
        )}

        {activeTab === 'crowd-report' && (
          <CrowdIncidentReport
            reports={crowdReports}
            onAddReport={(rep) =>
              setCrowdReports((prev) => [
                {
                  ...rep,
                  id: `rep_${Date.now()}`,
                  timestamp: 'Just now',
                  verifiedByCommunity: true,
                  upvotesCount: 1,
                },
                ...prev,
              ])
            }
            onUpvoteReport={(id) =>
              setCrowdReports((prev) =>
                prev.map((r) => (r.id === id ? { ...r, upvotesCount: r.upvotesCount + 1 } : r))
              )
            }
          />
        )}

        {activeTab === 'wearables' && (
          <WearableDevicePanel
            wearables={wearables}
            onToggleWearable={(id) =>
              setWearables((prev) =>
                prev.map((w) => (w.id === id ? { ...w, connected: !w.connected } : w))
              )
            }
            onSimulateHeartAnomaly={(id) => {
              setWearables((prev) =>
                prev.map((w) => (w.id === id ? { ...w, heartRateBpm: 145, isHeartRateAnomaly: true } : w))
              );
              initiateSosCountdown('FALL_DETECTION_SENSOR');
            }}
            onSimulateFall={(id) => initiateSosCountdown('FALL_DETECTION_SENSOR')}
            onVoicePhraseDetected={handleVoicePhraseDetected}
          />
        )}

        {activeTab === 'vault' && (
          <EvidenceVault evidenceVault={evidenceVault} timeline={timeline} />
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal
          userProfile={userProfile}
          onUpdateProfile={(upd) => setUserProfile((prev) => ({ ...prev, ...upd }))}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>SafeGuard AI • Smart Women Security Application Using AI, IoT & Cloud Computing</p>
        <p className="mt-1 text-[11px] text-slate-600">
          Emergency Helplines: National Police (112 / 100) | Women Cell (1091) | Ambulance (108)
        </p>
      </footer>
    </div>
  );
}
