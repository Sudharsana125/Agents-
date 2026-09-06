import React from 'react';
import { FileText, Download, TrendingUp, Cpu } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

export default function Reports() {
  const { setReportModalOpen } = useData();

  return (
    <div className="dashboard animate-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={22} color="#F59E0B" />
            <span>Facility Reports & Export Center</span>
          </h2>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
            Generate executive summaries, SLA performance reports, thermal audit logs, and raw CSV dataset exports
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            border: 'none',
            borderRadius: '10px',
            color: '#000000',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
            transition: 'transform 0.15s ease'
          }}
        >
          <FileText style={{ width: '16px', height: '16px' }} />
          <span>Generate New Custom Report</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
        {/* Card 1 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              marginBottom: '12px'
            }}>
              <FileText style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 className="card-title" style={{ fontSize: '15px' }}>Maintenance Work Order Summary</h3>
            <p className="card-subtitle" style={{ fontSize: '12px', marginTop: '4px', lineHeight: 1.5 }}>
              Monthly breakdown of facility maintenance tickets, technician resolution times, SLA compliance, and equipment repair history.
            </p>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#0D1117',
              border: '1px solid rgba(245,158,11,0.25)',
              color: '#F59E0B',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '8px'
            }}
          >
            <span>Export Summary</span>
            <Download style={{ width: '14px', height: '14px' }} />
          </button>
        </div>

        {/* Card 2 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(52,211,153,0.15)',
              border: '1px solid rgba(52,211,153,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34D399',
              marginBottom: '12px'
            }}>
              <TrendingUp style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 className="card-title" style={{ fontSize: '15px' }}>Energy & Thermal Load Analytics</h3>
            <p className="card-subtitle" style={{ fontSize: '12px', marginTop: '4px', lineHeight: 1.5 }}>
              Comprehensive kWh consumption analysis, temperature efficiency metrics, HVAC load profiles, and green energy targets.
            </p>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#0D1117',
              border: '1px solid rgba(52,211,153,0.25)',
              color: '#34D399',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '8px'
            }}
          >
            <span>Export Thermal Log</span>
            <Download style={{ width: '14px', height: '14px' }} />
          </button>
        </div>

        {/* Card 3 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(56,189,248,0.15)',
              border: '1px solid rgba(56,189,248,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              marginBottom: '12px'
            }}>
              <Cpu style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 className="card-title" style={{ fontSize: '15px' }}>Multi-Agent AI Executive Brief</h3>
            <p className="card-subtitle" style={{ fontSize: '12px', marginTop: '4px', lineHeight: 1.5 }}>
              Automated multi-agent synthesis combining anomaly detector signals, predictive maintenance scoring, and risk warnings.
            </p>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#0D1117',
              border: '1px solid rgba(56,189,248,0.25)',
              color: '#38BDF8',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '8px'
            }}
          >
            <span>Export AI Diagnosis</span>
            <Download style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
