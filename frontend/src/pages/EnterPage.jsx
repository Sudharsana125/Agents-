import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Moon, ArrowRight, Play, Leaf, Settings, BarChart3,
  Users, Mail, Lock, Eye, EyeOff, ShieldCheck, Cpu, Wifi,
  Check, Activity, Send, Server, Brain, Shield, MessageSquare,
  Phone, MapPin, CheckCircle2, Zap, User, UserPlus
} from 'lucide-react';

export default function EnterPage() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('admin@smartfacility.ai');
  const [role, setRole] = useState('Facility Manager');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactType, setContactType] = useState('Commercial Building');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Scroll observer to dynamically update active header tab
  useEffect(() => {
    const sectionIds = ['home', 'features', 'solutions', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveTab(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#05070A',
      color: '#E2E8F0',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* ── Background Image Layer ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url('/enter-building.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        opacity: 0.85,
        filter: 'brightness(1.05) contrast(1.2)',
        pointerEvents: 'none'
      }} />

      {/* ── Dark Gradient & Glow Overlay Layers ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: `
          radial-gradient(circle at 75% 30%, rgba(245, 158, 11, 0.18) 0%, transparent 55%),
          radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, rgba(5,7,10,0.55) 0%, rgba(5,7,10,0.3) 40%, rgba(5,7,10,0.85) 85%, #05070A 100%),
          linear-gradient(90deg, rgba(5,7,10,0.7) 0%, rgba(5,7,10,0.3) 50%, rgba(5,7,10,0.65) 100%)
        `,
        pointerEvents: 'none'
      }} />

      {/* Content Wrapper */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* ========================================================
           1. TOP HEADER / NAVBAR (STICKY)
           ======================================================== */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 48px',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          background: 'rgba(5, 7, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.1) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
            }}>
              <Building2 size={24} color="#F59E0B" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Smart Facility <span style={{ color: '#F59E0B' }}>AI Hub</span>
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>
                Monitor • Predict • Manage
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? '#F59E0B' : '#94A3B8',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: '6px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#F59E0B',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px #F59E0B'
                    }} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <Moon size={18} />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '9px 20px',
                borderRadius: '30px',
                background: 'transparent',
                border: '1px solid #F59E0B',
                color: '#F59E0B',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.15)'
              }}
            >
              Launch Platform
            </button>
          </div>
        </header>

        {/* ========================================================
           2. SECTION: HOME (HERO & SIGN-IN)
           ======================================================== */}
        <section id="home" style={{
          scrollMarginTop: '80px',
          maxWidth: '1520px',
          width: '100%',
          margin: '0 auto',
          padding: '48px 48px 64px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Column: Hero Text + Feature Cards + Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
            
            {/* Top Category Tagline */}
            <div style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#94A3B8',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>BUILDINGS</span> <span style={{ color: 'rgba(245,158,11,0.5)' }}>|</span>
              <span>PEOPLE</span> <span style={{ color: 'rgba(245,158,11,0.5)' }}>|</span>
              <span>TECHNOLOGY</span> <span style={{ color: 'rgba(245,158,11,0.5)' }}>|</span>
              <span style={{ color: '#F59E0B' }}>A GREENER TOMORROW</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 style={{
                fontSize: '52px',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                margin: 0
              }}>
                Smarter Facilities.<br />
                <span style={{
                  background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  Brighter Tomorrows.
                </span>
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#94A3B8',
                fontWeight: 500,
                marginTop: '16px',
                maxWidth: '560px',
                lineHeight: 1.5
              }}>
                AI-powered multi-agent facility management for continuous telemetry stream ingestion, complaint sentiment classification, energy optimization, and real-time automated dispatch.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 60%, #D97706 100%)',
                  border: 'none',
                  color: '#000000',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 25px rgba(245, 158, 11, 0.45)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span>Get Started</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* 4 Quick Feature Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginTop: '12px'
            }}>
              <div style={{
                background: 'rgba(13, 17, 23, 0.65)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '14px',
                padding: '16px',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Leaf size={18} color="#F59E0B" />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>Sustainable Spaces</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.35 }}>Optimize resources for a greener future.</div>
              </div>

              <div style={{
                background: 'rgba(13, 17, 23, 0.65)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '14px',
                padding: '16px',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Settings size={18} color="#F59E0B" />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>Predictive Maintenance</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.35 }}>Prevent issues before they happen.</div>
              </div>

              <div style={{
                background: 'rgba(13, 17, 23, 0.65)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '14px',
                padding: '16px',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <BarChart3 size={18} color="#F59E0B" />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>Real-Time Monitoring</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.35 }}>Live insights from IoT sensors.</div>
              </div>

              <div style={{
                background: 'rgba(13, 17, 23, 0.65)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '14px',
                padding: '16px',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Users size={18} color="#F59E0B" />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>Happier Communities</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.35 }}>Better spaces for better lives.</div>
              </div>
            </div>

            {/* Metrics Glass Banner Container */}
            <div style={{
              background: 'rgba(13, 17, 23, 0.75)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '16px',
              padding: '20px 28px',
              backdropFilter: 'blur(16px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
            }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>10</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginTop: '2px' }}>Live Facilities Ingested</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#F59E0B', letterSpacing: '-0.02em' }}>6</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginTop: '2px' }}>Autonomous AI Agents</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>3s</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginTop: '2px' }}>Telemetry Stream Frequency</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#10B981', letterSpacing: '-0.02em' }}>99.8%</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginTop: '2px' }}>System Operational Uptime</div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Luxury Sign-In Box */}
          <div style={{
            background: 'rgba(10, 13, 20, 0.88)',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(245, 158, 11, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px'
          }}>
            {/* Auth Mode Switcher Header Tabs */}
            <div style={{
              display: 'flex',
              background: 'rgba(5, 7, 10, 0.8)',
              borderRadius: '12px',
              padding: '4px',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}>
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: authMode === 'signin' ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)' : 'transparent',
                  color: authMode === 'signin' ? '#000000' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Lock size={14} />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: authMode === 'register' ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)' : 'transparent',
                  color: authMode === 'register' ? '#000000' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <UserPlus size={14} />
                <span>Create Account</span>
              </button>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {authMode === 'signin' ? 'Welcome Back' : 'New User Registration'}
              </div>
              <h2 style={{
                fontSize: '23px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: '2px 0 6px 0'
              }}>
                {authMode === 'signin' ? 'Smart Facility AI Hub' : 'Register Facility Account'}
              </h2>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
                {authMode === 'signin' 
                  ? 'Sign in to access your multi-agent facility management dashboard.' 
                  : 'Register now to connect IoT sensors & configure autonomous facility agents.'}
              </p>
            </div>

            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Registration Specific Field: Full Name */}
              {authMode === 'register' && (
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                    color: '#94A3B8', pointerEvents: 'none'
                  }}>
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name (e.g. Sudharsana K)"
                    required={authMode === 'register'}
                    style={{
                      width: '100%', padding: '11px 14px 11px 42px', borderRadius: '12px',
                      background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF', fontSize: '13px', outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* Common Field: Email */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: '#94A3B8', pointerEvents: 'none'
                }}>
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Corporate Email Address"
                  required
                  style={{
                    width: '100%', padding: '11px 14px 11px 42px', borderRadius: '12px',
                    background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF', fontSize: '13px', outline: 'none'
                  }}
                />
              </div>

              {/* Registration Specific Field: Role Selector */}
              {authMode === 'register' && (
                <div style={{ position: 'relative' }}>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: '12px',
                      background: 'rgba(5, 7, 10, 0.95)', border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF', fontSize: '13px', outline: 'none', cursor: 'pointer'
                    }}
                  >
                    <option value="Facility Manager" style={{ background: '#0D1117' }}>Role: Facility Manager</option>
                    <option value="Building Admin" style={{ background: '#0D1117' }}>Role: Building Administrator</option>
                    <option value="IoT Telemetry Engineer" style={{ background: '#0D1117' }}>Role: IoT Telemetry Engineer</option>
                    <option value="Sustainability Director" style={{ background: '#0D1117' }}>Role: Sustainability Director</option>
                    <option value="Tenant / Occupant" style={{ background: '#0D1117' }}>Role: Tenant / Occupant</option>
                  </select>
                </div>
              )}

              {/* Common Field: Password */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: '#94A3B8', pointerEvents: 'none'
                }}>
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={{
                    width: '100%', padding: '11px 42px 11px 42px', borderRadius: '12px',
                    background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF', fontSize: '13px', outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Registration Specific Field: Confirm Password */}
              {authMode === 'register' && (
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                    color: '#94A3B8', pointerEvents: 'none'
                  }}>
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required={authMode === 'register'}
                    style={{
                      width: '100%', padding: '11px 42px 11px 42px', borderRadius: '12px',
                      background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF', fontSize: '13px', outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* Sign In Options vs Registration Terms */}
              {authMode === 'signin' ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: '#F59E0B', borderRadius: '4px' }}
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" onClick={() => navigate('/dashboard')} style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 600 }}>
                    Forgot password?
                  </a>
                </div>
              ) : (
                <div style={{ fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      style={{ accentColor: '#F59E0B', borderRadius: '4px' }}
                    />
                    <span>I agree to the <span style={{ color: '#F59E0B' }}>Terms of Service</span> & <span style={{ color: '#F59E0B' }}>Privacy Policy</span></span>
                  </label>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '13px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)',
                  border: 'none', color: '#000000', fontSize: '14px', fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)', marginTop: '4px'
                }}
              >
                <span>{authMode === 'signin' ? 'Sign In' : 'Create Account & Launch'}</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </form>

            {/* Toggle Mode Link */}
            <div style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
              {authMode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    style={{ background: 'none', border: 'none', color: '#F59E0B', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Register / Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    style={{ background: 'none', border: 'none', color: '#F59E0B', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '10px', fontWeight: 800, color: '#64748B', letterSpacing: '0.1em' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
              <span>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
            </div>

            <div>
              <button onClick={() => navigate('/dashboard')} style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '12px', borderRadius: '12px', background: 'rgba(5, 7, 10, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div style={{
              background: 'rgba(5, 7, 10, 0.75)', border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '14px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <ShieldCheck size={18} color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF' }}>Secure • Reliable • Always On</div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '1px' }}>Protected with enterprise-grade multi-agent safety rules.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
           3. SECTION: FEATURES
           ======================================================== */}
        <section id="features" style={{
          scrollMarginTop: '80px',
          padding: '80px 48px',
          background: 'rgba(5, 7, 10, 0.75)',
          borderTop: '1px solid rgba(245, 158, 11, 0.15)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ maxWidth: '1520px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{
                fontSize: '12px', fontWeight: 800, color: '#F59E0B',
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'
              }}>
                POWERFUL CAPABILITIES
              </div>
              <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                Multi-Agent AI Features
              </h2>
              <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '640px', margin: '12px auto 0', lineHeight: 1.5 }}>
                Six specialized autonomous AI agents operating continuously across your IoT infrastructure.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
              
              {/* Feature 1 */}
              <div style={{
                background: 'rgba(13, 17, 23, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Wifi size={24} color="#F59E0B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                    Live IoT Telemetry Buffer (`data_agent.py`)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Ingests live power consumption (kW), ambient temperatures (°C), HVAC load statuses, and occupant density across all facility zones every 3 seconds.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: 'auto' }}>
                  <span>3s Streaming Interval</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{
                background: 'rgba(13, 17, 23, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <MessageSquare size={24} color="#F59E0B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                    Complaint Sentiment Classifier (`complaint_severity_agent.py`)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Evaluates tenant complaint bursts using NLP sentiment scoring. Automatically flags High/Critical severity issues for rapid operational dispatch.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: 'auto' }}>
                  <span>Automated Priority Tagging</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{
                background: 'rgba(13, 17, 23, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Zap size={24} color="#F59E0B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                    Thermal & Energy Optimizer (`energy_optimization_agent.py`)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Computes dynamic thermal-occupancy efficiency scores. Recommends instant thermostat tweaks and peak-shaving load reductions.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: 'auto' }}>
                  <span>Up to 28% Energy Savings</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Feature 4 */}
              <div style={{
                background: 'rgba(13, 17, 23, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Cpu size={24} color="#F59E0B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                    Automated Control Dispatch (`decision_agent.py`)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Executes operational control decisions without manual delay—dispatching field technicians, adjusting chiller valves, and shedding excess load.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: 'auto' }}>
                  <span>Real-Time Autonomous Action</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Feature 5 */}
              <div style={{
                background: 'rgba(13, 17, 23, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Activity size={24} color="#F59E0B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                    Facility Health Index (`insight_agent.py`)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Aggregates telemetry streams into a unified 0-100 building health score, tracking KPI metrics, operational risks, and trend anomaly spikes.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: 'auto' }}>
                  <span>Live KPI Aggregation</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Feature 6 */}
              <div style={{
                background: 'rgba(13, 17, 23, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Brain size={24} color="#F59E0B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                    Contextual Rationale (`llm_explanation_agent.py`)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Generates natural language operational rationales explaining why specific actions were executed, eliminating black-box AI confusion.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: 'auto' }}>
                  <span>Transparent Plain-English Audit</span>
                  <ArrowRight size={14} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
           4. SECTION: SOLUTIONS
           ======================================================== */}
        <section id="solutions" style={{
          scrollMarginTop: '80px',
          padding: '80px 48px',
          maxWidth: '1520px',
          width: '100%',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{
              fontSize: '12px', fontWeight: 800, color: '#F59E0B',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'
            }}>
              TAILORED INDUSTRY VERTICALS
            </div>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Solutions for Modern Infrastructure
            </h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '640px', margin: '12px auto 0', lineHeight: 1.5 }}>
              Scalable multi-agent AI designed to meet the exact operational demands of diverse physical environments.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            
            {/* Solution Card 1 */}
            <div style={{
              background: 'rgba(10, 13, 20, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              gap: '24px'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid #F59E0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Building2 size={28} color="#F59E0B" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                  Commercial High-Rises & Office Towers
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  Manage multi-tenant comfort balances, dynamic office floor heating/cooling, and tenant complaint sentiment tracking across skyscraper towers.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    Tenant Sentiment NLP
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    HVAC Optimization
                  </span>
                </div>
              </div>
            </div>

            {/* Solution Card 2 */}
            <div style={{
              background: 'rgba(10, 13, 20, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              gap: '24px'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid #F59E0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Shield size={28} color="#F59E0B" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                  Hospitals & Critical Care Centers
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  Maintain precise micro-climate control for surgical theaters and ICU zones, automated emergency generator telemetry monitoring, and immediate technician alert dispatch.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    Zero-Downtime Guarantee
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    Immediate Anomaly Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Solution Card 3 */}
            <div style={{
              background: 'rgba(10, 13, 20, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              gap: '24px'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid #F59E0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Users size={28} color="#F59E0B" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                  University Campuses & Educational Complexes
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  Coordinate multi-building energy profiles across dorms, lecture halls, and laboratories with automated scheduled energy throttling and ESG reporting.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    Campus-Wide Fleet View
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    ESG & Carbon Audit
                  </span>
                </div>
              </div>
            </div>

            {/* Solution Card 4 */}
            <div style={{
              background: 'rgba(10, 13, 20, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              gap: '24px'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1px solid #F59E0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Server size={28} color="#F59E0B" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                  Industrial Parks & Manufacturing Logistics
                </h3>
                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  Real-time high-voltage load balancing, motor vibration thermal telemetry analysis, and automated equipment failure isolation.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    Load Shedding Rules
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>
                    Vibration Telemetry
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
           5. SECTION: ABOUT
           ======================================================== */}
        <section id="about" style={{
          scrollMarginTop: '80px',
          padding: '80px 48px',
          background: 'rgba(5, 7, 10, 0.85)',
          borderTop: '1px solid rgba(245, 158, 11, 0.15)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ maxWidth: '1520px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '12px', fontWeight: 800, color: '#F59E0B',
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'
                }}>
                  ABOUT THE AI PLATFORM
                </div>
                <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 20px 0', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  Bridging Physical Facility Infrastructure with Autonomous Intelligence
                </h2>
                <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 24px 0' }}>
                  Smart Facility AI Hub replaces traditional manual facility management with a multi-agent orchestration engine. By continuously digesting streaming sensor data, evaluating sentiment bursts, and executing immediate control actions, facilities run at peak efficiency with zero human delay.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                    }}>
                      <Check size={16} color="#F59E0B" />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Autonomous Closed-Loop Feedback</div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                        Agents don't just alert—they automatically adjust thermostats, rebalance power loads, and log maintenance tickets.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                    }}>
                      <Check size={16} color="#F59E0B" />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Explainable AI Audit Trail</div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                        Every single control action is accompanied by plain-English rationales generated by our LLM explanation agent.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                    }}>
                      <Check size={16} color="#F59E0B" />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Enterprise ESG Compliance</div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                        Tracks energy efficiency ratings and sustainability targets to reduce building carbon footprints.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture Visual Diagram Box */}
              <div style={{
                background: 'rgba(10, 13, 20, 0.9)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  MULTI-AGENT PIPELINE ARCHITECTURE
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>1. Telemetry Ingestion Agent</div>
                    <span style={{ fontSize: '11px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '6px' }}>data_agent.py</span>
                  </div>

                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>2. Sentiment & Severity Classifier</div>
                    <span style={{ fontSize: '11px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '6px' }}>complaint_severity_agent.py</span>
                  </div>

                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>3. Thermal & Energy Optimizer</div>
                    <span style={{ fontSize: '11px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '6px' }}>energy_optimization_agent.py</span>
                  </div>

                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>4. Automated Decision & Control</div>
                    <span style={{ fontSize: '11px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '6px' }}>decision_agent.py</span>
                  </div>

                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>5. LLM Explanation & Audit Rationale</div>
                    <span style={{ fontSize: '11px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '6px' }}>llm_explanation_agent.py</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
           6. SECTION: CONTACT
           ======================================================== */}
        <section id="contact" style={{
          scrollMarginTop: '80px',
          padding: '80px 48px 100px',
          maxWidth: '1520px',
          width: '100%',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{
              fontSize: '12px', fontWeight: 800, color: '#F59E0B',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'
            }}>
              GET IN TOUCH
            </div>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Contact Facility Experts
            </h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '640px', margin: '12px auto 0', lineHeight: 1.5 }}>
              Ready to upgrade your building infrastructure with autonomous multi-agent AI? Contact our enterprise engineering team.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Direct Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                background: 'rgba(10, 13, 20, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Mail size={20} color="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8' }}>EMAIL SUPPORT</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>support@smartfacility.ai</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(10, 13, 20, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Phone size={20} color="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8' }}>ENTERPRISE DISPATCH HOTLINE</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>+1 (800) 555-SMART-FACILITY</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(10, 13, 20, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #F59E0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <MapPin size={20} color="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8' }}>GLOBAL HEADQUARTERS</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>100 Smart Tower Plaza, Innovation Hub</div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div style={{
              background: 'rgba(10, 13, 20, 0.9)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '24px',
              padding: '36px',
              backdropFilter: 'blur(20px)'
            }}>
              {contactSent ? (
                <div style={{
                  padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '16px'
                }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <CheckCircle2 size={32} color="#10B981" />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Message Received!</h3>
                  <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
                    Thank you, {contactName}. Our facility AI engineering team will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#E2E8F0', display: 'block', marginBottom: '8px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF', fontSize: '14px', outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#E2E8F0', display: 'block', marginBottom: '8px' }}>
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="s.jenkins@enterprise.com"
                      required
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF', fontSize: '14px', outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#E2E8F0', display: 'block', marginBottom: '8px' }}>
                      Facility Type
                    </label>
                    <select
                      value={contactType}
                      onChange={(e) => setContactType(e.target.value)}
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        background: '#0B0F17', border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF', fontSize: '14px', outline: 'none'
                      }}
                    >
                      <option value="Commercial Building">Commercial Building / Office Tower</option>
                      <option value="Hospital Care Center">Hospital / Medical Center</option>
                      <option value="University Campus">University Campus</option>
                      <option value="Industrial Park">Industrial Park / Logistics Hub</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#E2E8F0', display: 'block', marginBottom: '8px' }}>
                      Inquiry Details
                    </label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your facility requirements or deployment questions..."
                      required
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        background: 'rgba(5, 7, 10, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF', fontSize: '14px', outline: 'none', resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: '14px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)',
                      border: 'none', color: '#000000', fontSize: '14px', fontWeight: 800,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    <span>Send Inquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================
           7. PAGE FOOTER
           ======================================================== */}
        <footer style={{
          padding: '24px 48px',
          background: '#030406',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#64748B'
        }}>
          <div>© 2026 Smart Facility AI Hub. All rights reserved.</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy Policy</a>
            <span>|</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms of Service</a>
            <span>|</span>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} style={{ color: '#94A3B8', textDecoration: 'none' }}>Contact Us</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94A3B8' }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}>
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
            </svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        </footer>

      </div>
    </div>
  );
}
