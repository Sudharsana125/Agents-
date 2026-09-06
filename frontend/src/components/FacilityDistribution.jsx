import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2 } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

const COLORS = ['#38BDF8', '#34D399', '#F59E0B', '#EF4444', '#A855F7', '#64748B'];

export default function FacilityDistribution() {
  const { facilityTypes, kpis } = useData();

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 10 }}>
        <div className="card-title">
          <Building2 size={16} color="#F59E0B" />
          <span>Facility Type Distribution</span>
        </div>
        <div className="card-subtitle">Breakdown by campus category</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 16 }}>
        {/* Donut chart */}
        <div style={{ position: 'relative', height: 160, width: 160, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={facilityTypes}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
              >
                {facilityTypes.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#12161F" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0D1117',
                  border: '1px solid #F59E0B',
                  borderRadius: 8,
                  color: '#F8FAFC',
                  fontSize: 11
                }}
                formatter={(v, n, e) => [`${v} (${e.payload.percentage}%)`, n]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text label */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
              {kpis.totalFacilities || 25}
            </span>
            <span style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>
              Facilities
            </span>
          </div>
        </div>

        {/* Legend listing below */}
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '6px 16px', justifyContent: 'center' }}>
          {facilityTypes.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: COLORS[i % COLORS.length] }} />
              <span style={{ color: '#CBD5E1', whiteSpace: 'nowrap' }}>{item.name}</span>
              <span style={{ color: '#94A3B8', fontWeight: 600, fontSize: 10, flexShrink: 0 }}>
                {item.value} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
