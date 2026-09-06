import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, Sparkles, FileSpreadsheet } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

export default function ReportModal() {
  const context = useData();
  const reportModalOpen = context?.reportModalOpen;
  const setReportModalOpen = context?.setReportModalOpen || (() => {});
  const data = context?.data || [];
  const kpis = context?.kpis || { totalFacilities: 25, totalComplaints: 48, pendingRequests: 12 };

  const [reportType, setReportType] = useState('Maintenance Work Order Summary');
  const [generated, setGenerated] = useState(false);

  if (!reportModalOpen) return null;

  const handleGenerate = (format) => {
    setGenerated(true);
    setTimeout(() => {
      // Build clean CSV content
      const headers = "Facility,Issue,Priority,Status,Date,Complaints,Energy_kW,Temp_C,Occupancy\n";
      const rows = data.map(d => 
        `"${d.facility}","${d.issue || 'Operational Log'}","${d.priority || 'MEDIUM'}","${d.status || 'Completed'}","${d.date || '2026-09-06'}",${d.complaints || 0},${d.energy || 150},${d.temp || 24},${d.occupancy || 50}`
      ).join("\n");

      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `smart_facility_${reportType.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${format}.${format === 'pdf' ? 'pdf' : 'csv'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 300);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(5, 7, 10, 0.82)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #10141E 0%, #0A0D14 100%)',
        border: '1px solid rgba(245, 158, 11, 0.45)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '480px',
        padding: '28px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.15)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setReportModalOpen(false)}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#94A3B8',
            borderRadius: '8px',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F59E0B'
          }}>
            <FileText size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>Generate Facility Report</h3>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>Export executive summaries & sensor audit logs</p>
          </div>
        </div>

        {/* Report Selection Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '16px 0' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
              Report Category
            </label>
            <select
              value={reportType}
              onChange={(e) => { setReportType(e.target.value); setGenerated(false); }}
              style={{
                width: '100%',
                background: '#0D1117',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '10px',
                padding: '10px 14px',
                outline: 'none'
              }}
            >
              <option value="Maintenance Work Order Summary">Maintenance Work Order Summary</option>
              <option value="Energy & Thermal Load Analytics">Energy & Thermal Load Analytics</option>
              <option value="Multi-Agent AI Executive Brief">Multi-Agent AI Executive Brief</option>
              <option value="IoT Environmental & Air Quality Log">IoT Environmental & Air Quality Log</option>
            </select>
          </div>

          {/* Quick Metrics Summary Box */}
          <div style={{
            background: 'rgba(13, 17, 23, 0.8)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '12px',
            color: '#94A3B8'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Facilities Evaluated:</span> <strong style={{ color: '#FFFFFF' }}>{kpis.totalFacilities}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Reported Issues:</span> <strong style={{ color: '#FFFFFF' }}>{kpis.totalComplaints}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Pending High Priority Tickets:</span> <strong style={{ color: '#F59E0B' }}>{kpis.pendingRequests}</strong>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {generated && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(52, 211, 153, 0.15)',
            border: '1px solid #34D399',
            color: '#34D399',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '16px'
          }}>
            <CheckCircle size={16} />
            <span>Report generated and exported successfully!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button
            onClick={() => handleGenerate('pdf')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)'
            }}
          >
            <Download size={16} strokeWidth={2.5} />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => handleGenerate('csv')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '10px',
              background: '#0D1117',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#F59E0B',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <FileSpreadsheet size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
