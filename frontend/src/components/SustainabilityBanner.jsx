import React from 'react';
import { ArrowRight, Leaf, Users, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SustainabilityBanner() {
  const navigate = useNavigate();

  return (
    <div className="card" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }}>
      {/* Background Architectural Image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('/building-bg.png')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.6, filter: 'contrast(1.15) brightness(0.85)'
      }} />

      {/* Dark Gradient Backdrop */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(13,17,23,0.7) 0%, rgba(9,12,16,0.9) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Header Title & Action Circle */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, maxWidth: '170px' }}>
            Sustainable Facilities Stronger Communities
          </h3>
        </div>

        <button
          onClick={() => navigate('/analytics')}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #F59E0B',
            color: '#F59E0B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0
          }}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* 3 Pillar Metrics Footer */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center', marginBottom: 10 }}>
          <div style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '8px 4px' }}>
            <Leaf size={14} color="#34D399" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: '#FFFFFF' }}>Energy</div>
            <div style={{ fontSize: 8, color: '#94A3B8' }}>Efficient</div>
          </div>

          <div style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '8px 4px' }}>
            <Users size={14} color="#F59E0B" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: '#FFFFFF' }}>People</div>
            <div style={{ fontSize: 8, color: '#94A3B8' }}>Friendly</div>
          </div>

          <div style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '8px 4px' }}>
            <ShieldCheck size={14} color="#38BDF8" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 9, fontWeight: 800, color: '#FFFFFF' }}>Future</div>
            <div style={{ fontSize: 8, color: '#94A3B8' }}>Ready</div>
          </div>
        </div>

        <div style={{ fontSize: 9, color: '#64748B', textAlign: 'center', fontWeight: 600 }}>
          A Cleaner Planet Starts with Smarter Spaces.
        </div>
      </div>
    </div>
  );
}
