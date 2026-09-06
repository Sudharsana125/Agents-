import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

export default function ComplaintChart() {
  const { complaintsTrend } = useData();
  const [range, setRange] = useState('Last 30 Days');

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div className="card-title">
            <TrendingUp size={16} color="#F59E0B" />
            <span>Complaints Trend</span>
          </div>
          <div className="card-subtitle">Total reported issues over time</div>
        </div>

        <select
          value={range}
          onChange={e => setRange(e.target.value)}
          style={{
            background: '#0D1117',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            color: '#F8FAFC',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 8,
            padding: '5px 10px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 190 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={complaintsTrend} margin={{ top: 15, right: 10, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'rgba(245, 158, 11, 0.15)' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'rgba(245, 158, 11, 0.15)' }}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{
                      background: '#0D1117',
                      border: '1px solid #F59E0B',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B' }}>
                        {payload[0].value} complaints
                      </div>
                      <div style={{ fontSize: '9px', color: '#94A3B8' }}>{label}</div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="complaints"
              stroke="#F59E0B"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#goldGradient)"
              activeDot={{ r: 6, fill: '#FCD34D', stroke: '#000', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginTop: 10,
        paddingTop: 8,
        borderTop: '1px solid rgba(245, 158, 11, 0.1)',
        fontSize: 10,
        fontWeight: 600,
        color: '#94A3B8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
          <span>Total</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399' }} />
          <span>Resolved</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}
