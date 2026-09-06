import React, { useState } from 'react';
import { Building2, Thermometer, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

const S = {
  title: { fontSize: 20, fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8 },
  sub: { fontSize: 12, color: '#94A3B8', marginTop: 3 },
};

const MetricCard = ({ icon: Icon, label, value, note, noteColor }) => (
  <div className="card" style={{ textAlign: 'center' }}>
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: 'rgba(245, 158, 11, 0.15)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'
    }}>
      <Icon size={20} color="#F59E0B" />
    </div>
    <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', margin: '6px 0 4px' }}>{value}</div>
    <div style={{ fontSize: 11, color: noteColor || '#94A3B8', fontWeight: 600 }}>{note}</div>
  </div>
);

export default function FacilityOverview() {
  const { data } = useData();
  const [selectedId, setSelectedId] = useState(data[0]?.facility || 'Main Block');

  const f = data.find(d => d.facility === selectedId) || data[0] || {
    facility: 'Main Block', complaints: 5, energy: 250, temp: 26.0, occupancy: 60
  };

  return (
    <div className="dashboard animate-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={S.title}>
            <Building2 size={22} color="#F59E0B" />
            <span>Facility Overview & Inspector</span>
          </div>
          <div style={S.sub}>Deep-dive inspect individual campus blocks and telemetry</div>
        </div>

        {/* Entity Selector */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#0D1117', border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 10, padding: '8px 14px'
        }}>
          <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, whiteSpace: 'nowrap' }}>Select Entity:</label>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            style={{
              background: '#12161F', border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#F8FAFC', fontSize: 12, fontWeight: 700, borderRadius: 8, padding: '6px 12px',
              outline: 'none', cursor: 'pointer'
            }}
          >
            {data.map((d, i) => (
              <option key={i} value={d.facility}>{d.facility} ({d.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        <MetricCard
          icon={Zap}
          label="Energy Load" value={`${f.energy} kW`}
          note={f.energy > 250 ? '⚠ Over Consumption' : '✓ Normal Load'}
          noteColor={f.energy > 250 ? '#F59E0B' : '#34D399'}
        />
        <MetricCard
          icon={Thermometer}
          label="Ambient Temperature" value={`${f.temp} °C`}
          note={`Occupancy: ${f.occupancy} people`}
        />
        <MetricCard
          icon={CheckCircle2}
          label="Health Rating" value="88 / 100"
          note="✓ Optimal Operating Parameters" noteColor="#34D399"
        />
      </div>

      {/* AI Diagnostic Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <ShieldAlert size={18} color="#F59E0B" />
          <span style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
            Multi-Agent Diagnostic Rationale & Control Override
          </span>
        </div>

        <div style={{
          background: '#0D1117', border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: 12, padding: '16px 18px', marginBottom: 18
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#F59E0B', marginBottom: 6 }}>
            🤖 AI Diagnostic Recommendation:
          </div>
          <p style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.7, fontStyle: 'italic' }}>
            "Facility <strong style={{ color: '#FFFFFF' }}>{f.facility}</strong> is operating with{' '}
            <strong style={{ color: '#F59E0B' }}>{f.complaints} active complaints</strong> and{' '}
            <strong style={{ color: '#EF4444' }}>{f.energy} kW energy load</strong>.
            Automated action: Shed non-essential lighting and lower thermostat by 2°C."
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button style={{
            padding: '10px 20px', borderRadius: 10,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            border: 'none', color: '#000000', fontSize: 12, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
          }}>
            Dispatch Emergency Maintenance
          </button>

          {['Adjust Thermostat -2°C', 'Shed Auxiliary Power Load'].map((t, i) => (
            <button key={i} style={{
              padding: '10px 18px', borderRadius: 10,
              background: '#0D1117', border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#F8FAFC', fontSize: 12, fontWeight: 700, cursor: 'pointer'
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
