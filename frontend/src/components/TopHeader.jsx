import React, { useState, useEffect } from 'react';
import { Search, Bell, Sun, Moon, Calendar } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

export default function TopHeader() {
  const { searchQuery, setSearchQuery } = useData();
  const [isDark, setIsDark] = useState(true);
  const [timeStr, setTimeStr] = useState('Fri, 13 Jun 2026 02:45 PM');

  useEffect(() => {
    const fmt = () => {
      const n = new Date();
      const d = n.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
      const t = n.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setTimeStr(`${d} ${t}`);
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="top-header">
      {/* Search Bar */}
      <div style={{ position: 'relative', flex: 1, maxWidth: '440px' }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search facilities, issues, locations, staff..."
          style={{
            width: '100%',
            background: '#12161F',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '10px',
            padding: '8px 65px 8px 36px',
            fontSize: '12px',
            color: '#F8FAFC',
            outline: 'none'
          }}
        />
        <div style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '9px',
          fontWeight: 700,
          color: '#F59E0B'
        }}>
          Ctrl K
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Notification Bell */}
        <button style={{
          position: 'relative',
          width: 36,
          height: 36,
          borderRadius: 10,
          background: '#12161F',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          color: '#F59E0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <Bell size={16} />
          <span style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#EF4444',
            color: '#FFF',
            fontSize: '9px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            3
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: '#12161F',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Date / Time Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#12161F',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: 10,
          padding: '6px 12px',
          fontSize: '11px',
          color: '#CBD5E1',
          fontWeight: 600
        }}>
          <Calendar size={14} color="#F59E0B" />
          <span>{timeStr}</span>
        </div>

        {/* User Profile Circle */}
        <div
          onClick={() => navigate('/enter')}
          title="Sign Out / Back to Enter Page"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 800,
            color: '#000',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            cursor: 'pointer'
          }}
        >
          SK
        </div>
      </div>
    </header>
  );
}
