import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Wrench, Radio,
  BarChart3, Bot, FileText, Database, Settings, ArrowRight, LogOut,
} from 'lucide-react';

const navItems = [
  { name: 'Enter / Login Page',path: '/enter',       icon: LogOut },
  { name: 'Dashboard',        path: '/dashboard',   icon: LayoutDashboard },
  { name: 'Facility Overview',path: '/facilities',   icon: Building2 },
  { name: 'Maintenance',      path: '/maintenance',  icon: Wrench },
  { name: 'IoT Live Data',    path: '/iot',          icon: Radio },
  { name: 'Analytics',        path: '/analytics',    icon: BarChart3 },
  { name: 'AI Assistant',     path: '/ai-assistant', icon: Bot },
  { name: 'Reports',          path: '/reports',      icon: FileText },
  { name: 'Dataset',          path: '/dataset',      icon: Database },
  { name: 'Settings',         path: '/settings',     icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      {/* Branding */}
      <div style={{
        padding: '16px 18px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            <Building2 size={20} color="#000" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
              Smart Facility
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', letterSpacing: '0.04em' }}>
              AI Hub
            </div>
          </div>
        </div>
        <div style={{ fontSize: 9, color: '#64748B', marginTop: 6, letterSpacing: '0.04em', fontWeight: 500 }}>
          Monitor • Predict • Manage
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}


        {/* System Status Widget */}
        <div style={{
          marginTop: 10,
          background: '#12161F', border: '1px solid rgba(245, 158, 11, 0.15)',
          borderRadius: 10, padding: '8px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: 9, color: '#64748B', fontWeight: 600 }}>System Status</div>
            <div style={{ fontSize: 10, color: '#34D399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} className="pulse" />
              All systems operational
            </div>
          </div>
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
            <span style={{ width: 2, height: '60%', background: '#34D399', borderRadius: 1 }} />
            <span style={{ width: 2, height: '100%', background: '#34D399', borderRadius: 1 }} />
            <span style={{ width: 2, height: '40%', background: '#34D399', borderRadius: 1 }} />
          </div>
        </div>
      </nav>

      {/* Bottom User Profile */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(245, 158, 11, 0.15)', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#12161F', border: '1px solid rgba(245, 158, 11, 0.15)',
          borderRadius: 10, padding: '8px 10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#000'
            }}>
              SK
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#F8FAFC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Sudharsana K
              </div>
              <div style={{ fontSize: 9, color: '#34D399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#34D399' }} /> Online
              </div>
            </div>
          </div>

          <button
            title="Log Out"
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', padding: 4 }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
