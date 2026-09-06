import React from 'react';
import { Building2, Wrench, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../data/DataLoaderContext';

const configs = [
  {
    title: 'Total Facilities',
    key: 'totalFacilities',
    defaultValue: 25,
    delta: '↑ 4%',
    deltaColor: '#10B981',
    icon: Building2,
    sparklineColor: '#10B981',
    gradId: 'grad1',
    pathD: 'M 0 32 Q 20 28 35 30 T 65 18 T 85 14 T 100 4',
    fillD: 'M 0 32 Q 20 28 35 30 T 65 18 T 85 14 T 100 4 L 100 40 L 0 40 Z',
    actionText: 'View All →',
    actionColor: '#10B981',
    arrowColor: '#F59E0B',
    path: '/facilities',
  },
  {
    title: 'Total Complaints',
    key: 'totalComplaints',
    defaultValue: 48,
    delta: '↑ 12%',
    deltaColor: '#EF4444',
    icon: Wrench,
    sparklineColor: '#EF4444',
    gradId: 'grad2',
    pathD: 'M 0 34 Q 25 30 40 32 T 70 20 T 88 12 T 100 5',
    fillD: 'M 0 34 Q 25 30 40 32 T 70 20 T 88 12 T 100 5 L 100 40 L 0 40 Z',
    actionText: 'View Details →',
    actionColor: '#F59E0B',
    arrowColor: '#F59E0B',
    path: '/maintenance',
  },
  {
    title: 'Pending Requests',
    key: 'pendingRequests',
    defaultValue: 12,
    delta: '↑ 8%',
    deltaColor: '#EF4444',
    icon: Clock,
    sparklineColor: '#F59E0B',
    gradId: 'grad3',
    pathD: 'M 0 30 Q 20 26 40 32 T 68 18 T 88 12 T 100 6',
    fillD: 'M 0 30 Q 20 26 40 32 T 68 18 T 88 12 T 100 6 L 100 40 L 0 40 Z',
    actionText: 'Take Action →',
    actionColor: '#F59E0B',
    arrowColor: '#F59E0B',
    path: '/maintenance',
  },
  {
    title: 'Completed Requests',
    key: 'completedRequests',
    defaultValue: 36,
    delta: '↑ 20%',
    deltaColor: '#10B981',
    icon: Check,
    sparklineColor: '#10B981',
    gradId: 'grad4',
    pathD: 'M 0 32 Q 22 28 42 30 T 66 16 T 85 20 T 100 4',
    fillD: 'M 0 32 Q 22 28 42 30 T 66 16 T 85 20 T 100 4 L 100 40 L 0 40 Z',
    actionText: 'View Reports →',
    actionColor: '#10B981',
    arrowColor: '#F59E0B',
    path: '/reports',
  },
];

export default function KpiCard() {
  const navigate = useNavigate();
  const context = useData();
  const kpis = context?.kpis || {};

  return (
    <div className="grid-4col-kpi">
      {configs.map((c, i) => {
        const Icon = c.icon;
        const val = kpis[c.key] ?? c.defaultValue;

        return (
          <div
            key={i}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              background: 'linear-gradient(135deg, rgba(16, 20, 30, 0.95) 0%, rgba(10, 13, 20, 0.98) 100%)',
              padding: '20px 22px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(245, 158, 11, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
          >
            {/* Top-left ambient gold glow tint */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '-30px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Top Row: Left Icon Box + Right Metrics (Title, Big Number, Delta) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              {/* Left Rounded Gold Glass Icon Box */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                boxShadow: 'inset 0 0 12px rgba(245, 158, 11, 0.18), 0 4px 14px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={24} color="#FCD34D" strokeWidth={2.5} />
              </div>

              {/* Right Side: Title + Metric Number & Delta */}
              <div style={{ textAlign: 'right', flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 500, color: '#CBD5E1', letterSpacing: '-0.01em' }}>
                  {c.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {val}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: c.deltaColor }}>
                    {c.delta}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Action Link on Left + Curved Sparkline with Gradient Fill on Right */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '22px' }}>
              {/* Action Link */}
              <button
                onClick={() => navigate(c.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: c.actionColor,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{c.actionText.replace(' →', '')}</span>
                <span style={{ color: c.arrowColor, fontWeight: 900 }}>→</span>
              </button>

              {/* Sparkline Wave SVG with Area Fill */}
              <div style={{ width: '95px', height: '34px' }}>
                <svg width="95" height="34" viewBox="0 0 100 40" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id={c.gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c.sparklineColor} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={c.sparklineColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Gradient Area Fill */}
                  <path d={c.fillD} fill={`url(#${c.gradId})`} />
                  {/* Wave Line */}
                  <path d={c.pathD} fill="none" stroke={c.sparklineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
