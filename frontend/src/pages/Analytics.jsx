import React from 'react';
import { BarChart3 } from 'lucide-react';
import ComplaintChart from '../components/ComplaintChart';
import FacilityDistribution from '../components/FacilityDistribution';

export default function Analytics() {
  return (
    <div className="dashboard animate-in">
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BarChart3 size={22} color="#F59E0B" />
          <span>Advanced Telemetry & Trend Analytics</span>
        </h2>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
          Multi-dimensional analysis of complaints, energy load, and thermal distribution across all facilities
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', alignItems: 'stretch' }}>
        <ComplaintChart />
        <FacilityDistribution />
      </div>
    </div>
  );
}
