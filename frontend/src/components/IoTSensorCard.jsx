import React from 'react';
import { Thermometer, Zap, Users, Wind, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../data/DataLoaderContext';

export default function IoTSensorCard() {
  const navigate = useNavigate();
  const { iotSensors } = useData();

  const sensors = [
    {
      title: 'Temperature',
      value: `${iotSensors.temp || 24} °C`,
      status: 'Normal',
      statusColor: '#34D399',
      icon: Thermometer,
      waveColor: '#34D399',
      points: '0,15 15,10 30,18 45,8 60,14 75,6 90,12 100,8'
    },
    {
      title: 'Energy Usage',
      value: `${iotSensors.energy || 19.8} kWh`,
      status: '↑ 5%',
      statusColor: '#EF4444',
      icon: Zap,
      waveColor: '#F59E0B',
      points: '0,18 15,22 30,12 45,20 60,10 75,16 90,8 100,14'
    },
    {
      title: 'Occupancy',
      value: `${iotSensors.occupancy || 40}`,
      status: 'Normal',
      statusColor: '#34D399',
      icon: Users,
      waveColor: '#38BDF8',
      points: '0,12 15,18 30,8 45,14 60,6 75,12 90,8 100,10'
    },
    {
      title: 'Air Quality',
      value: `AQI ${iotSensors.aqi || 42}`,
      status: 'Good',
      statusColor: '#34D399',
      icon: Wind,
      waveColor: '#34D399',
      points: '0,16 15,10 30,14 45,8 60,12 75,6 90,10 100,8'
    },
  ];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="card-title">
          <Sun size={16} color="#F59E0B" />
          <span>Live IoT Sensor Data</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)',
            borderRadius: 20, padding: '3px 10px'
          }}>
            <span className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#34D399' }}>LIVE</span>
          </div>

          <button
            onClick={() => navigate('/iot')}
            style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View All →
          </button>
        </div>
      </div>

      {/* 2×2 Grid of Sensor Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
        {sensors.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              style={{
                background: '#0D1117',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 8
              }}
            >
              {/* Top row: Icon + Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={16} color="#F59E0B" />
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 800, color: s.statusColor,
                  background: `${s.statusColor}18`, padding: '2px 7px', borderRadius: 6,
                  border: `1px solid ${s.statusColor}40`
                }}>
                  {s.status}
                </span>
              </div>

              {/* Value & Title */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8' }}>{s.title}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF', marginTop: 1 }}>{s.value}</div>
              </div>

              {/* Wave SVG & Timestamp */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                <div style={{ fontSize: 9, color: '#64748B' }}>Updated 2 min ago</div>
                <div style={{ width: 50, height: 16 }}>
                  <svg width="50" height="16" viewBox="0 0 100 25">
                    <polyline
                      fill="none"
                      stroke={s.waveColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={s.points}
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
