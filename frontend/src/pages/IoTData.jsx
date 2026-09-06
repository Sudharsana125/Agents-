import React from 'react';
import { Radio } from 'lucide-react';
import IoTSensorCard from '../components/IoTSensorCard';
import { useData } from '../data/DataLoaderContext';

export default function IoTData() {
  const { data } = useData();

  return (
    <div className="dashboard animate-in">
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Radio size={22} color="#F59E0B" />
          <span>Real-Time IoT Telemetry Stream</span>
        </h2>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
          Live environmental sensor metrics, air quality, energy consumption, and thermal load across campus blocks
        </p>
      </div>

      <IoTSensorCard />

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 className="card-title">Live Sensor Feeds Grid</h3>
            <p className="card-subtitle">Real-time status stream per facility location</p>
          </div>
          <span style={{
            background: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)',
            display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: 99,
            fontSize: 10, fontWeight: 800
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', display: 'inline-block' }} className="pulse" />
            LIVE FEEDS
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Facility</th>
                <th>Temperature (°C)</th>
                <th>Energy (kWh)</th>
                <th>Occupancy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: '#FFFFFF' }}>{row.facility}</td>
                  <td style={{ color: '#CBD5E1' }}>{row.temp} °C</td>
                  <td style={{ color: '#F59E0B', fontWeight: 800 }}>{row.energy} kWh</td>
                  <td style={{ color: '#CBD5E1' }}>{row.occupancy} people</td>
                  <td>
                    <span style={{
                      background: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)',
                      padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800
                    }}>
                      Normal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
