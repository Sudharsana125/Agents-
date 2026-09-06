import React from 'react';
import { Wrench } from 'lucide-react';
import MaintenanceTable from '../components/MaintenanceTable';

export default function Maintenance() {
  return (
    <div className="dashboard animate-in">
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wrench size={22} color="#F59E0B" />
          <span>Maintenance & Work Orders</span>
        </h2>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
          Complete work order management, priority filtering, and technician dispatch center
        </p>
      </div>

      <MaintenanceTable limit={20} />
    </div>
  );
}
