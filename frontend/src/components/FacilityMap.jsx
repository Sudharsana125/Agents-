import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Compass, Plus, Minus, Maximize2, Minimize2, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../data/DataLoaderContext';

// Multi-City Campus Locations
const CITY_CAMPUSES = [
  { id: 'chennai', name: 'Chennai, Tamil Nadu, India', shortName: 'Chennai Campus', center: [13.0835, 80.2715] },
  { id: 'bengaluru', name: 'Bengaluru, Karnataka, India', shortName: 'Bengaluru Tech Hub', center: [12.9716, 77.5946] },
  { id: 'hyderabad', name: 'Hyderabad, Telangana, India', shortName: 'Hyderabad R&D Park', center: [17.3850, 78.4867] },
  { id: 'siliconvalley', name: 'San Jose, California, USA', shortName: 'Silicon Valley Campus', center: [37.3382, -121.8863] },
];

// Default facility campus locations with geographic latitude & longitude coordinates
const INITIAL_FACILITIES = [
  { id: '#1001', name: 'Main Block', zone: 'Zone A', lat: 13.0827, lon: 80.2707, status: 'Attention', complaints: 10, pending: 4, healthScore: 78 },
  { id: '#1002', name: 'Library', zone: 'Zone B', lat: 13.0850, lon: 80.2720, status: 'Healthy', complaints: 4, pending: 1, healthScore: 94 },
  { id: '#1003', name: 'Hostel A', zone: 'Zone C', lat: 13.0810, lon: 80.2690, status: 'Critical', complaints: 9, pending: 5, healthScore: 62 },
  { id: '#1004', name: 'Admin Block', zone: 'Zone A', lat: 13.0840, lon: 80.2710, status: 'Healthy', complaints: 6, pending: 2, healthScore: 88 },
  { id: '#1005', name: 'Sports Complex', zone: 'Zone D', lat: 13.0870, lon: 80.2750, status: 'Healthy', complaints: 2, pending: 0, healthScore: 98 },
  { id: '#1006', name: 'Science Lab', zone: 'Zone B', lat: 13.0860, lon: 80.2730, status: 'Attention', complaints: 5, pending: 3, healthScore: 75 },
  { id: '#1007', name: 'Auditorium', zone: 'Zone C', lat: 13.0835, lon: 80.2680, status: 'Critical', complaints: 8, pending: 6, healthScore: 68 },
  { id: '#1008', name: 'Cafeteria', zone: 'Zone D', lat: 13.0815, lon: 80.2740, status: 'Attention', complaints: 7, pending: 4, healthScore: 72 },
  { id: '#1009', name: 'Hostel B', zone: 'Zone C', lat: 13.0805, lon: 80.2695, status: 'Healthy', complaints: 1, pending: 0, healthScore: 96 },
  { id: '#1010', name: 'IT Center', zone: 'Zone A', lat: 13.0845, lon: 80.2725, status: 'Critical', complaints: 11, pending: 7, healthScore: 58 },
];

function getStatusColor(status, healthScore) {
  if (status === 'Critical' || healthScore < 70) return '#EF4444'; // Red
  if (status === 'Attention' || healthScore < 85) return '#F59E0B'; // Orange / Amber
  return '#10B981'; // Green (Healthy)
}

function createLeafletIcon(color, isSelected) {
  const size = isSelected ? 28 : 22;
  const pulseSize = isSelected ? 38 : 28;
  return L.divIcon({
    className: 'custom-interactive-marker',
    html: `
      <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
        <div style="
          position: absolute;
          width: ${pulseSize}px;
          height: ${pulseSize}px;
          border-radius: 50%;
          background: ${color};
          opacity: ${isSelected ? 0.5 : 0.25};
          animation: pulse 2s infinite ease-in-out;
        "></div>
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid #0D1117;
          box-shadow: 0 0 ${isSelected ? '16px' : '8px'} ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        ">
          <div style="
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #FFFFFF;
            box-shadow: 0 0 4px rgba(0,0,0,0.5);
          "></div>
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function FacilityMap() {
  const contextData = useData();
  const rawData = contextData?.data || [];
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  const [selectedCity, setSelectedCity] = useState('chennai');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState(INITIAL_FACILITIES[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentCity = useMemo(() => {
    return CITY_CAMPUSES.find(c => c.id === selectedCity) || CITY_CAMPUSES[0];
  }, [selectedCity]);

  // Map dynamic facility dataset from context or default locations
  const facilities = useMemo(() => {
    const [baseLat, baseLon] = currentCity.center;

    if (!rawData || rawData.length === 0) {
      return INITIAL_FACILITIES.map((f, idx) => ({
        ...f,
        lat: baseLat + (((idx % 3) - 1) * 0.0025),
        lon: baseLon + (Math.floor(idx / 3 - 1) * 0.003)
      }));
    }

    const grouped = {};
    rawData.forEach(row => {
      const name = row.facility || 'Facility';
      if (!grouped[name]) {
        const matchingInit = INITIAL_FACILITIES.find(f => f.name.toLowerCase() === name.toLowerCase()) || {};
        grouped[name] = {
          id: row.id || `#${Math.floor(1000 + Math.random() * 9000)}`,
          name: name,
          zone: row.type || matchingInit.zone || 'Zone A',
          lat: parseFloat(row.lat) || baseLat + (((Object.keys(grouped).length % 3) - 1) * 0.0025),
          lon: parseFloat(row.lon) || baseLon + (Math.floor(Object.keys(grouped).length / 3 - 1) * 0.003),
          status: row.status === 'Pending' ? 'Critical' : row.status === 'In Progress' ? 'Attention' : 'Healthy',
          complaints: parseInt(row.complaints || 0, 10),
          pending: row.status === 'Pending' || row.status === 'In Progress' ? 1 : 0,
          healthScore: row.status === 'Pending' ? 62 : row.status === 'In Progress' ? 78 : 95
        };
      } else {
        grouped[name].complaints += parseInt(row.complaints || 0, 10);
        if (row.status === 'Pending' || row.status === 'In Progress') {
          grouped[name].pending += 1;
        }
      }
    });

    return Object.values(grouped);
  }, [rawData, currentCity]);

  // Filter facilities based on dropdown select
  const filteredFacilities = useMemo(() => {
    if (selectedFilter === 'All') return facilities;
    return facilities.filter(f => f.zone === selectedFilter || f.name === selectedFilter || f.status === selectedFilter);
  }, [facilities, selectedFilter]);

  const [mapMode, setMapMode] = useState('satellite'); // 'satellite' | 'streets'
  const tileLayerRef = useRef(null);

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [13.0835, 80.2715],
      zoom: 16,
      zoomControl: false,
      attributionControl: true
    });

    // High-Resolution Satellite View (Esri World Imagery) - Clean Satellite without non-English overlays
    const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle map mode toggle between Satellite and Streets
  useEffect(() => {
    if (!tileLayerRef.current) return;
    if (mapMode === 'satellite') {
      tileLayerRef.current.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    } else {
      tileLayerRef.current.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}');
    }
  }, [mapMode]);

  // Update Leaflet markers when facilities or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    filteredFacilities.forEach(fac => {
      const isSelected = selectedFacility?.name === fac.name;
      const color = getStatusColor(fac.status, fac.healthScore);
      const icon = createLeafletIcon(color, isSelected);

      const marker = L.marker([fac.lat, fac.lon], { icon }).addTo(layerGroup);

      // Permanent Floating Place Name Label above marker
      const labelContent = `
        <div style="
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(7, 9, 14, 0.92);
          border: 1px solid ${isSelected ? '#F59E0B' : color};
          border-radius: 6px;
          padding: 2px 7px;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: -0.01em;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
        ">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: ${color}; flex-shrink: 0; box-shadow: 0 0 4px ${color};"></span>
          <span>${fac.name}</span>
        </div>
      `;

      marker.bindTooltip(labelContent, {
        permanent: true,
        direction: 'top',
        offset: [0, -14],
        className: 'custom-facility-label'
      });

      const popupContent = `
        <div style="min-width: 160px; font-family: 'Inter', sans-serif;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">
            <strong style="font-size: 13px; color: #FFFFFF;">${fac.name}</strong>
            <span style="font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: ${color}25; border: 1px solid ${color}; color: ${color};">${fac.status}</span>
          </div>
          <div style="font-size: 11px; color: #94A3B8; display: flex; flex-direction: column; gap: 3px;">
            <div style="display: flex; justify-content: space-between;"><span>Zone / Type:</span> <strong style="color: #E2E8F0;">${fac.zone}</strong></div>
            <div style="display: flex; justify-content: space-between;"><span>Complaints:</span> <strong style="color: #E2E8F0;">${fac.complaints}</strong></div>
            <div style="display: flex; justify-content: space-between;"><span>Pending Requests:</span> <strong style="color: #FCD34D;">${fac.pending}</strong></div>
            <div style="display: flex; justify-content: space-between; margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-weight: 700;">Health Score:</span>
              <strong style="color: ${color}; font-weight: 900;">${fac.healthScore} / 100</strong>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'dark-leaflet-popup'
      });

      marker.on('click', () => {
        setSelectedFacility(fac);
      });

      if (isSelected) {
        marker.openPopup();
      }
    });

    if (selectedFacility && selectedFacility.lat && selectedFacility.lon) {
      map.flyTo([selectedFacility.lat, selectedFacility.lon], map.getZoom() < 14 ? 15 : map.getZoom(), {
        duration: 0.8
      });
    }
  }, [filteredFacilities, selectedFacility]);

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    const val = e.target.value;
    setSelectedFilter(val);
    if (val !== 'All') {
      const match = facilities.find(f => f.name === val || f.zone === val || f.status === val);
      if (match) {
        setSelectedFacility(match);
      }
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  // Handle container resize when toggling fullscreen
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 300);
    }
  }, [isFullscreen]);

  return (
    <div
      className="card"
      style={{
        height: isFullscreen ? 'calc(100vh - 40px)' : '100%',
        display: 'flex',
        flexDirection: 'column',
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? '20px' : 'auto',
        zIndex: isFullscreen ? 9999 : 'auto',
        boxShadow: isFullscreen ? '0 0 50px rgba(0,0,0,0.9)' : undefined,
        transition: 'all 0.3s ease'
      }}
    >
      {/* Dark Leaflet Popup & Marker Styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.45); opacity: 0.15; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .leaflet-container {
          background: #07090E !important;
          font-family: 'Inter', system-ui, sans-serif !important;
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .dark-leaflet-popup .leaflet-popup-content-wrapper {
          background: rgba(13, 17, 23, 0.96) !important;
          color: #E2E8F0 !important;
          border: 1px solid rgba(245, 158, 11, 0.4) !important;
          border-radius: 10px !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8) !important;
          padding: 4px 6px !important;
          backdrop-filter: blur(12px);
        }
        .dark-leaflet-popup .leaflet-popup-tip {
          background: rgba(13, 17, 23, 0.96) !important;
          border: 1px solid rgba(245, 158, 11, 0.4) !important;
        }
        .leaflet-control-attribution {
          background: rgba(5, 7, 10, 0.85) !important;
          color: #64748B !important;
          font-size: 8px !important;
          padding: 2px 6px !important;
          border-top-left-radius: 6px !important;
          max-width: 220px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          line-height: 1.2 !important;
        }
        .leaflet-control-attribution a {
          color: #F59E0B !important;
        }
        .custom-interactive-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-facility-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-facility-label::before {
          display: none !important;
        }
      `}</style>

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Compass size={16} color="#F59E0B" />
            <span>Facility Locations</span>
          </div>

          {/* Location Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#F59E0B',
            fontSize: 10,
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: 10
          }}>
            <MapPin size={11} color="#F59E0B" />
            <span>{currentCity.name}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* City Campus Selector */}
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              const city = CITY_CAMPUSES.find(c => c.id === e.target.value);
              if (city && mapInstanceRef.current) {
                mapInstanceRef.current.flyTo(city.center, 15, { duration: 1.0 });
              }
            }}
            style={{
              background: '#0D1117',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#F59E0B',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 6,
              padding: '5px 10px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {CITY_CAMPUSES.map(c => (
              <option key={c.id} value={c.id}>📍 {c.shortName}</option>
            ))}
          </select>

          {/* Filter Dropdown Selection */}
          <select
            value={selectedFilter}
            onChange={handleDropdownChange}
            style={{
              background: '#0D1117',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F8FAFC',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 6,
              padding: '5px 10px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Locations</option>
            <optgroup label="Zones">
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
              <option value="Zone D">Zone D</option>
            </optgroup>
            <optgroup label="Facilities">
              {facilities.map(f => (
                <option key={f.id} value={f.name}>{f.name}</option>
              ))}
            </optgroup>
          </select>

          {/* Map View Toggle Button (Satellite / Dark Vector) */}
          <button
            onClick={() => setMapMode(mapMode === 'satellite' ? 'streets' : 'satellite')}
            title="Toggle Map View (Satellite / Dark Vector)"
            style={{
              background: mapMode === 'satellite' ? 'rgba(245, 158, 11, 0.2)' : '#0D1117',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#F59E0B',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 6,
              padding: '5px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            {mapMode === 'satellite' ? '🛰️ Satellite' : '🗺️ Dark Map'}
          </button>

          {/* Zoom Buttons */}
          <div style={{
            display: 'flex', gap: 2, background: '#0D1117',
            border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 6, padding: 2
          }}>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              style={{
                padding: '4px 6px', background: 'none', border: 'none',
                color: '#F59E0B', cursor: 'pointer', display: 'flex', alignItems: 'center'
              }}
            >
              <Plus size={13} />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              style={{
                padding: '4px 6px', background: 'none', border: 'none',
                color: '#F59E0B', cursor: 'pointer', display: 'flex', alignItems: 'center'
              }}
            >
              <Minus size={13} />
            </button>
          </div>

          {/* Fullscreen Control Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Map Fullscreen"}
            style={{
              background: '#0D1117',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 6,
              padding: '5px 8px',
              color: '#F59E0B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div style={{
        flex: 1,
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        minHeight: 220
      }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
      </div>

      {/* Footer Status Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '6px 12px',
        marginTop: 10,
        fontSize: 10,
        fontWeight: 600,
        color: '#94A3B8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
            <span>Healthy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }} />
            <span>Attention</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 6px #EF4444' }} />
            <span>Critical</span>
          </div>
        </div>

        <div style={{ fontSize: 9, color: '#64748B', flexShrink: 0, whiteSpace: 'nowrap' }}>
          Satellite & Telemetry Layer
        </div>
      </div>
    </div>
  );
}
