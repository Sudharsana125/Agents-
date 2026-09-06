import React from 'react';
import { Plus, Building2, Radio, FileText, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../data/DataLoaderContext';

export default function HeroBanner() {
  const navigate = useNavigate();
  const { setReportModalOpen, setAddComplaintModalOpen } = useData();

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      border: '1px solid rgba(245, 158, 11, 0.25)',
      background: '#0D1117',
      padding: '24px 28px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      minHeight: '210px'
    }}>
      {/* Background Architectural Building Image at Night */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url('/building-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        opacity: 0.88,
        filter: 'brightness(1.05) contrast(1.2)'
      }} />

      {/* Dark gradient overlay fading on the left for maximum text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(90deg, rgba(9,12,16,0.72) 0%, rgba(9,12,16,0.4) 50%, rgba(9,12,16,0.1) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Left Content Area */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, minWidth: 0 }}>

        {/* Location Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          color: '#F59E0B',
          fontSize: '11px',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: '20px',
          marginBottom: '10px'
        }}>
          <MapPin size={13} color="#F59E0B" />
          <span>Chennai Smart Facility Campus • Tamil Nadu, India</span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          margin: '0 0 6px 0',
          lineHeight: 1.15
        }}>
          Smarter Facilities.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Brighter Tomorrow.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '13px',
          color: '#94A3B8',
          fontWeight: 500,
          margin: '0 0 20px 0',
          maxWidth: '520px'
        }}>
          AI-driven insights for efficient, safe and sustainable spaces.
        </p>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Primary Gold Button */}
          <button
            onClick={() => setAddComplaintModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: 'none',
              color: '#000000',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add Complaint</span>
          </button>

          {/* Secondary Buttons */}
          <button
            onClick={() => navigate('/facilities')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(18, 22, 31, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Building2 size={15} color="#F59E0B" />
            <span>View Facilities</span>
          </button>

          <button
            onClick={() => navigate('/iot')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(18, 22, 31, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Radio size={15} color="#F59E0B" />
            <span>Live IoT Data</span>
          </button>

          <button
            onClick={() => setReportModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(18, 22, 31, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F8FAFC',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <FileText size={15} color="#F59E0B" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Right Quote & Footer Tags */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        gap: '20px'
      }}>
        {/* Quote */}
        <div style={{
          maxWidth: '150px',
          textAlign: 'left',
          borderLeft: '2px solid #F59E0B',
          paddingLeft: '12px'
        }}>
          <p style={{
            fontSize: '11px',
            fontStyle: 'italic',
            color: '#E2E8F0',
            margin: 0,
            lineHeight: 1.5
          }}>
            "Smart buildings create brighter futures."
          </p>
        </div>

        {/* Footer Tags */}
        <div style={{
          fontSize: '9px',
          color: '#64748B',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          People • Spaces • Sustainability
        </div>
      </div>
    </div>
  );
}
