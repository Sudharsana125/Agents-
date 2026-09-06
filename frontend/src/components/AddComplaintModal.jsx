import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

export default function AddComplaintModal() {
  const context = useData();
  const addComplaintModalOpen = context?.addComplaintModalOpen;
  const setAddComplaintModalOpen = context?.setAddComplaintModalOpen || (() => {});
  const addComplaint = context?.addComplaint || (() => {});

  const [facility, setFacility] = useState('Main Block');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('HIGH');
  const [submitted, setSubmitted] = useState(false);

  if (!addComplaintModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issue.trim()) return;

    const newRecord = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      facility,
      issue,
      priority,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      complaints: priority === 'HIGH' ? 8 : 4,
      energy: 220,
      temp: 26.5,
      occupancy: 50,
      type: 'Academic'
    };

    addComplaint(newRecord);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAddComplaintModalOpen(false);
      setIssue('');
    }, 1000);
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
          onClick={() => setAddComplaintModalOpen(false)}
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
            <PlusCircle size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>Add Complaint / Work Order</h3>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>Log a new maintenance request or fault ticket</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
              Target Facility
            </label>
            <select
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
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
              <option>Main Block</option>
              <option>Library</option>
              <option>Hostel A</option>
              <option>Sports Complex</option>
              <option>Admin Block</option>
              <option>Science Lab</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
              Issue Description
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
              rows={3}
              placeholder="Describe the maintenance issue or equipment fault..."
              style={{
                width: '100%',
                background: '#0D1117',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#FFFFFF',
                fontSize: '13px',
                borderRadius: '10px',
                padding: '10px 14px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
              Priority Level
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['HIGH', 'MEDIUM', 'LOW'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: priority === p ? (p === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : p === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(52, 211, 153, 0.2)') : '#0D1117',
                    border: priority === p ? (p === 'HIGH' ? '1px solid #EF4444' : p === 'MEDIUM' ? '1px solid #F59E0B' : '1px solid #34D399') : '1px solid rgba(255, 255, 255, 0.1)',
                    color: priority === p ? (p === 'HIGH' ? '#EF4444' : p === 'MEDIUM' ? '#F59E0B' : '#34D399') : '#94A3B8'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Success Alert */}
          {submitted && (
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
              fontWeight: 700
            }}>
              <CheckCircle size={16} />
              <span>Complaint logged successfully!</span>
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: 'none',
              color: '#000000',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
              marginTop: '8px'
            }}
          >
            Submit Complaint Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
