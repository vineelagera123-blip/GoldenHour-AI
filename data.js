import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function ChangeView({ center, zoom, isDispatched }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, isDispatched ? 15 : zoom);
  }, [center, zoom, map, isDispatched]);
  return null;
}

export default function LiveDashboardMap({ ambulanceCoords, hospitals, recommendedHospital, backupHospital, isDispatched, onToggleMinimize, onToggleExpand }) {
  const [routeCoords, setRouteCoords] = useState([]);
  const [currentPos, setCurrentPos] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchRoute() {
      if (recommendedHospital && ambulanceCoords) {
        try {
          const lon1 = ambulanceCoords[1], lat1 = ambulanceCoords[0];
          const lon2 = recommendedHospital.lng, lat2 = recommendedHospital.lat;
          const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`);
          const data = await response.json();
          if (data.routes && data.routes[0] && active) {
            const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
            setRouteCoords(coords);
          } else if (active) {
            setRouteCoords([ambulanceCoords, [recommendedHospital.lat, recommendedHospital.lng]]);
          }
        } catch (e) {
          if (active) setRouteCoords([ambulanceCoords, [recommendedHospital.lat, recommendedHospital.lng]]);
        }
      }
    }
    const timer = setTimeout(() => fetchRoute(), 500);
    return () => { active = false; clearTimeout(timer); };
  }, [ambulanceCoords, recommendedHospital]);

  useEffect(() => {
    if (!isDispatched) {
      setCurrentPos(ambulanceCoords);
      return;
    }
    
    if (isDispatched && routeCoords.length > 0) {
      let activeIndex = 0;
      const interval = setInterval(() => {
        activeIndex += 1; // Smooth, realistic movement speed
        if (activeIndex >= routeCoords.length) {
          setCurrentPos(routeCoords[routeCoords.length - 1]);
          clearInterval(interval);
        } else {
          setCurrentPos(routeCoords[activeIndex]);
        }
      }, 70); // 70ms per coordinate for decent driving visual
      return () => clearInterval(interval);
    }
  }, [isDispatched, routeCoords]);

  const getMarkerColor = (status, isRecommended) => {
    if (isRecommended) return '#0A58CA';
    if (status === 'Ready') return '#10B981';
    if (status === 'Limited Capacity') return '#F59E0B';
    return '#D32F2F';
  };

  const createHospitalIcon = (status, isRecommended) => {
    const color = getMarkerColor(status, isRecommended);
    const size = isRecommended ? 46 : 32;
    const ringStyle = isRecommended ? `box-shadow: 0 0 0 4px rgba(10,88,202,0.3), 0 3px 10px rgba(0,0,0,0.35);` : `box-shadow: 0 3px 8px rgba(0,0,0,0.3);`;
    return new L.DivIcon({
      className: 'custom-hospital-icon',
      html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; ${ringStyle} display: flex; align-items: center; justify-content: center; z-index: ${isRecommended ? 200 : 10}; ${isRecommended ? 'animation: pulse 2s infinite;' : ''}"><svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(size*0.45)}" height="${Math.round(size*0.45)}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/></svg></div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
  };

  const ambulanceIcon = new L.DivIcon({
    className: 'custom-ambulance-icon',
    html: `<div style="background-color: #D32F2F; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: pulse 1.5s infinite;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-9l-9-4h-3v13h3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  const LegendComponent = () => (
    <div style={{ position: 'absolute', bottom: isDispatched ? '20px' : '10px', left: isDispatched ? '20px' : '10px', zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.95)', padding: '0.75rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: '0.7rem', lineHeight: 1.8 }}>
      <strong style={{ fontSize: '0.75rem', marginBottom: '4px', display: 'block' }}>Map Legend</strong>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span> Ready</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block' }}></span> Limited Capacity</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#D32F2F', display: 'inline-block' }}></span> Overloaded</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#0A58CA', display: 'inline-block' }}></span> Best Match</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#D32F2F', display: 'inline-block', border: '2px solid white', boxShadow: '0 0 0 1px #D32F2F' }}></span> Ambulance</div>
    </div>
  );

  const mapContent = (
    <div style={{ 
      height: isDispatched ? '100vh' : '380px', 
      width: isDispatched ? '100vw' : '100%', 
      position: isDispatched ? 'fixed' : 'relative',
      top: isDispatched ? 0 : 'auto',
      left: isDispatched ? 0 : 'auto',
      right: isDispatched ? 0 : 'auto',
      bottom: isDispatched ? 0 : 'auto',
      margin: isDispatched ? 0 : 'auto',
      padding: isDispatched ? 0 : 'auto',
      borderRadius: isDispatched ? '0' : '12px', 
      overflow: 'hidden', 
      border: isDispatched ? 'none' : '1px solid #e2e8f0', 
      zIndex: isDispatched ? 999999 : 0 
    }}>
      
      {isDispatched && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'linear-gradient(135deg, #0A58CA, #084298)', color: 'white', zIndex: 10000, padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A58CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Navigating to {recommendedHospital?.hospital_name}</h2>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                ETA: {recommendedHospital?.eta_minutes} mins • {recommendedHospital?.distanceKm} km • {recommendedHospital?.trafficLabel || 'Normal'}
              </p>
            </div>
          </div>
          <button onClick={onToggleMinimize} style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>
            ✕ Minimize
          </button>
        </div>
      )}

      {!isDispatched && onToggleExpand && (
        <button 
          onClick={onToggleExpand} 
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, backgroundColor: 'white', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.4rem 0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '0.8rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          Full Screen
        </button>
      )}

      <LegendComponent />

      {currentPos && (
        <MapContainer 
          center={currentPos} 
          zoom={13} 
          scrollWheelZoom={isDispatched} 
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeView center={isDispatched ? currentPos : ambulanceCoords} zoom={isDispatched ? 16 : 13} isDispatched={isDispatched} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {hospitals.map(h => {
             const isRecommended = recommendedHospital?.hospital_id === h.hospital_id;
             const isBackup = backupHospital?.hospital_id === h.hospital_id;
             let label = isRecommended ? "🎯 BEST MATCH" : (isBackup ? "⚠️ BACKUP" : "");
             
             return (
               <Marker key={h.hospital_id} position={[h.lat, h.lng]} icon={createHospitalIcon(h.status, isRecommended)}>
                 <Popup>
                   <div style={{ minWidth: '180px' }}>
                     <strong style={{ color: getMarkerColor(h.status, isRecommended), fontSize: '0.9rem' }}>{h.hospital_name}</strong>
                     <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '6px', lineHeight: 1.6 }}>
                       <div>📊 Occupancy: <b>{h.occupancy_rate}%</b></div>
                       <div>🛏️ Trauma Beds: <b>{h.trauma_beds}</b> | ICU: <b>{h.icu_beds}</b></div>
                       <div>👨‍⚕️ {h.specialists?.slice(0,2).join(', ')}</div>
                       <div>📡 Status: <b>{h.status}</b></div>
                       {h.eta_minutes && <div>⏱ ETA: <b>{h.eta_minutes}m</b> ({h.distanceKm || '—'}km)</div>}
                     </div>
                     {label && <div style={{ marginTop: '6px', background: isRecommended ? '#dbeafe' : '#fef3c7', color: isRecommended ? '#1e40af' : '#92400e', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, textAlign: 'center' }}>{label}</div>}
                   </div>
                 </Popup>
               </Marker>
             );
          })}

          <Marker position={currentPos} icon={ambulanceIcon} zIndexOffset={1000}>
            <Popup>
              <strong>🚑 Unit 402</strong><br/>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Active Emergency Transport</span>
            </Popup>
          </Marker>

          {/* Primary Route */}
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="#0A58CA" weight={6} opacity={0.85} />
          )}

          {/* Backup Route */}
          {backupHospital && (
             <Polyline positions={[
               ambulanceCoords,
               [(ambulanceCoords[0] + backupHospital.lat)/2 - 0.003, (ambulanceCoords[1] + backupHospital.lng)/2 + 0.003],
               [backupHospital.lat, backupHospital.lng]
             ]} color="#F59E0B" weight={3} opacity={0.4} dashArray="8, 8" />
          )}
        </MapContainer>
      )}
    </div>
  );

  if (isDispatched) {
    return createPortal(mapContent, document.body);
  }

  return mapContent;
}
