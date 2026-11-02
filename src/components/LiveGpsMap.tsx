import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  Share2, 
  Building2, 
  Crosshair, 
  Sun, 
  Moon, 
  Layers, 
  Eye, 
  Compass,
  Check
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GpsLocation, SafeRouteOption, EmergencyService } from '../types';

interface LiveGpsMapProps {
  currentLocation: GpsLocation;
  routes: SafeRouteOption[];
  nearbyServices: EmergencyService[];
  onSelectRoute: (route: SafeRouteOption) => void;
  selectedRoute: SafeRouteOption | null;
}

export const LiveGpsMap: React.FC<LiveGpsMapProps> = ({
  currentLocation,
  routes,
  nearbyServices,
  onSelectRoute,
  selectedRoute,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const [liveShareLink, setLiveShareLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTabFilter, setActiveTabFilter] = useState<'ALL' | 'POLICE' | 'HOSPITAL' | 'SAFE_HAVEN'>('ALL');
  const [geofenceRadius, setGeofenceRadius] = useState<number>(500); // meters
  const [geofenceActive, setGeofenceActive] = useState<boolean>(true);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [currentLocation.lat, currentLocation.lng],
        zoom: 14,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap dark styled tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const layerGroup = markersRef.current;

    if (layerGroup) {
      layerGroup.clearLayers();

      // User location marker with pulsing glow
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(225, 29, 72, 0.3); animation: ping 1.5s infinite;"></div>
            <div style="width: 20px; height: 20px; border-radius: 50%; background: #e11d48; border: 3px solid #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      L.marker([currentLocation.lat, currentLocation.lng], { icon: userIcon })
        .addTo(layerGroup)
        .bindPopup(`<b>Your Real-Time Location</b><br/>${currentLocation.addressName}`);

      // Geofence Circle
      if (geofenceActive) {
        L.circle([currentLocation.lat, currentLocation.lng], {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.08,
          radius: geofenceRadius,
        }).addTo(layerGroup);
      }

      // Draw Selected Route Polyline
      const activeRoute = selectedRoute || routes[0];
      if (activeRoute && activeRoute.waypoints.length > 0) {
        const routeColor = activeRoute.safetyScore >= 80 ? '#10b981' : activeRoute.safetyScore >= 60 ? '#f59e0b' : '#ef4444';
        
        L.polyline(activeRoute.waypoints, {
          color: routeColor,
          weight: 6,
          opacity: 0.85,
          dashArray: activeRoute.safetyScore < 60 ? '10, 10' : undefined,
        }).addTo(layerGroup);
      }

      // Render Emergency Services Pins
      nearbyServices
        .filter(svc => activeTabFilter === 'ALL' || svc.type === activeTabFilter)
        .forEach(svc => {
          const isPolice = svc.type === 'POLICE';
          const isHospital = svc.type === 'HOSPITAL';
          const pinBg = isPolice ? '#3b82f6' : isHospital ? '#ef4444' : '#10b981';

          const svcIcon = L.divIcon({
            className: 'custom-svc-marker',
            html: `
              <div style="background: ${pinBg}; color: white; padding: 4px 8px; border-radius: 12px; font-weight: font-bold; font-size: 10px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap;">
                ${svc.name.split(' ')[0]}
              </div>
            `,
            iconSize: [80, 24],
            iconAnchor: [40, 12],
          });

          L.marker([svc.lat, svc.lng], { icon: svcIcon })
            .addTo(layerGroup)
            .bindPopup(`
              <div style="font-family: sans-serif; padding: 4px;">
                <b style="font-size: 12px;">${svc.name}</b><br/>
                <span style="font-size: 11px; color: #64748b;">${svc.address}</span><br/>
                <b style="color: #0f172a;">${svc.distanceKm} km away</b> • <a href="tel:${svc.phone}" style="color: #2563eb; font-weight: bold;">Call ${svc.phone}</a>
              </div>
            `);
        });
    }

    map.setView([currentLocation.lat, currentLocation.lng], 14);
  }, [currentLocation, routes, selectedRoute, nearbyServices, activeTabFilter, geofenceActive, geofenceRadius]);

  const handleCopyShareLink = () => {
    const link = `${window.location.origin}/track?uid=usr_101&lat=${currentLocation.lat}&lng=${currentLocation.lng}`;
    navigator.clipboard.writeText(link);
    setLiveShareLink(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls & Live Share */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>REAL-TIME GPS ROUTE SAFETY & GEOFENCING ENGINE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Live GPS Tracking & Safe Route Recommendations
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Calculates high-lighting streets, police patrol frequency, CCTV camera coverage, and crowd density to guide you along the safest path.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Tracking Link Copied!' : 'Share Live GPS with Family'}</span>
          </button>
        </div>
      </div>

      {/* Main Map & Route Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-4 shadow-xl">
          {/* Map Filter Controls */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <span className="text-slate-400 font-medium px-2">Filter Pins:</span>
              <button
                onClick={() => setActiveTabFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${activeTabFilter === 'ALL' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTabFilter('POLICE')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${activeTabFilter === 'POLICE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Police Stations
              </button>
              <button
                onClick={() => setActiveTabFilter('HOSPITAL')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${activeTabFilter === 'HOSPITAL' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Hospitals
              </button>
            </div>

            {/* Geofence Toggle */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="text-slate-300 font-medium">Safe Geofence ({geofenceRadius}m):</span>
              <button
                onClick={() => setGeofenceActive(!geofenceActive)}
                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase transition ${geofenceActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'}`}
              >
                {geofenceActive ? 'Active' : 'Off'}
              </button>
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[420px] rounded-xl overflow-hidden border border-slate-800 z-0"
          />

          {/* Map Overlay Key */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
              <span>Safe Route (90%+ Lighting)</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
              <span>Moderate Route</span>
            </div>
            <div className="flex items-center gap-2 text-rose-400">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-white"></span>
              <span>Unsafe / Dim Area</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span>
              <span>Police Patrol Zone</span>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Route Recommendation Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>AI Recommended Routes</span>
            </h3>

            <div className="space-y-3">
              {routes.map((route) => {
                const isSelected = (selectedRoute?.id || routes[0].id) === route.id;
                const isSafe = route.safetyScore >= 80;
                const isMod = route.safetyScore >= 60 && route.safetyScore < 80;

                return (
                  <div
                    key={route.id}
                    onClick={() => onSelectRoute(route)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500/60 shadow-lg'
                        : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        isSafe ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : isMod ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        Safety Score: {route.safetyScore}/100
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{route.durationMins} mins ({route.distanceKm} km)</span>
                    </div>

                    <h4 className="text-xs font-bold text-white mt-2">{route.name}</h4>

                    <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-300">
                      <div>Lighting: <strong className={route.lightingQuality === 'EXCELLENT' ? 'text-emerald-400' : 'text-amber-400'}>{route.lightingQuality}</strong></div>
                      <div>CCTV: <strong className="text-emerald-400">{route.cctvCoveragePercent}%</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nearby Emergency Services Quick List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Nearby Emergency Facilities</span>
            </h3>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto scrollbar-thin">
              {nearbyServices.map((svc) => (
                <div key={svc.id} className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">{svc.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{svc.distanceKm} km away • {svc.address}</div>
                  </div>
                  <a
                    href={`tel:${svc.phone}`}
                    className="p-2 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition"
                    title={`Call ${svc.phone}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
