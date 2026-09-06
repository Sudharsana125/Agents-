import React, { useState } from 'react';
import { Sliders, Bell, Settings as SettingsIcon, Save, Check } from 'lucide-react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('5');
  const [confidenceThreshold, setConfidenceThreshold] = useState('85');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dashboard animate-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SettingsIcon size={22} color="#F59E0B" />
            <span>System Settings & Preferences</span>
          </h2>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
            Configure multi-agent diagnostic thresholds, telemetry polling rate, notification webhooks, and theme options
          </p>
        </div>

        <button
          onClick={handleSave}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: saved ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            border: 'none',
            borderRadius: '10px',
            color: saved ? '#FFFFFF' : '#000000',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {saved ? <Check style={{ width: '16px', height: '16px' }} /> : <Save style={{ width: '16px', height: '16px' }} />}
          <span>{saved ? 'Settings Saved!' : 'Save Configuration'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        {/* Card 1: Agent & Telemetry Settings */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <Sliders style={{ width: '18px', height: '18px', color: '#F59E0B' }} />
            <div>
              <h3 className="card-title">AI Diagnostics & Telemetry</h3>
              <p className="card-subtitle">Tune automated reasoning thresholds</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                Data Telemetry Polling Rate (Seconds)
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0D1117',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  outline: 'none'
                }}
              >
                <option value="2">2 Seconds (Real-time)</option>
                <option value="5">5 Seconds (Recommended)</option>
                <option value="15">15 Seconds</option>
                <option value="60">60 Seconds</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginBottom: '6px', fontWeight: 700 }}>
                <span>AI Confidence Threshold</span>
                <span style={{ color: '#F59E0B', fontWeight: 800 }}>{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(e.target.value)}
                style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>Auto-Dispatch Work Orders</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Automatically queue technician dispatch for high critical errors</span>
              </div>
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#F59E0B', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Notifications & Security */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <Bell style={{ width: '18px', height: '18px', color: '#F59E0B' }} />
            <div>
              <h3 className="card-title">Notifications & Security</h3>
              <p className="card-subtitle">Manage alert triggers and access control</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>Email Emergency Digest</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Send real-time alerts on critical temperature or power spikes</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#F59E0B', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                Facility Manager Profile Email
              </label>
              <input
                type="email"
                defaultValue="sudharsana.k@smartfacility.ai"
                style={{
                  width: '100%',
                  background: '#0D1117',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                Active System Role
              </label>
              <input
                type="text"
                disabled
                value="Lead Facility Operations Manager (Admin)"
                style={{
                  width: '100%',
                  background: '#07090E',
                  border: '1px solid rgba(245, 158, 11, 0.15)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#64748B',
                  fontSize: '12px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
