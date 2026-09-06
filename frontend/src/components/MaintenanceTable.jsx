import React, { useState } from 'react';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight, Eye, MoreVertical, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../data/DataLoaderContext';

export default function MaintenanceTable({ limit }) {
  const navigate = useNavigate();
  const { filteredData } = useData();
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [search, setSearch] = useState('');

  const perPage = limit || 5;

  const rows = [...filteredData]
    .filter(r => {
      if (!search) return true;
      const s = search.toLowerCase();
      return r.facility?.toLowerCase().includes(s) || r.issue?.toLowerCase().includes(s) || r.id?.toLowerCase().includes(s);
    })
    .sort((a, b) => {
      const va = a[sortField] || ''; const vb = b[sortField] || '';
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const paged = rows.slice((page - 1) * perPage, page * perPage);

  const handleSort = f => {
    if (sortField === f) setSortAsc(v => !v);
    else { setSortField(f); setSortAsc(true); }
  };

  const priBg = p => p === 'HIGH' ? 'rgba(239,68,68,0.2)' : p === 'MEDIUM' ? 'rgba(245,158,11,0.2)' : 'rgba(52,211,153,0.2)';
  const priColor = p => p === 'HIGH' ? '#EF4444' : p === 'MEDIUM' ? '#F59E0B' : '#34D399';
  const statBg = s => s === 'Pending' ? 'rgba(239,68,68,0.15)' : s === 'In Progress' ? 'rgba(56,189,248,0.15)' : 'rgba(52,211,153,0.15)';
  const statColor = s => s === 'Pending' ? '#EF4444' : s === 'In Progress' ? '#38BDF8' : '#34D399';

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 8, flexWrap: 'wrap' }}>
        <div className="card-title">
          <Wrench size={16} color="#F59E0B" />
          <span>Recent Maintenance Requests</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search table..."
              style={{
                background: '#0D1117', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 8,
                padding: '6px 8px 6px 26px', fontSize: 11, color: '#F8FAFC',
                outline: 'none', width: 140
              }}
            />
          </div>
          <button
            onClick={() => navigate('/maintenance')}
            style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            View All →
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowX: 'auto', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.15)', background: '#0D1117' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 540 }}>
          <thead>
            <tr style={{ background: '#090C10', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
              {['ID','FACILITY','ISSUE','PRIORITY','STATUS','DATE','ACTIONS'].map((h, i) => {
                const field = ['id','facility','issue','priority','status','date','actions'][i];
                const sortable = ['facility','priority','status','date'].includes(field);
                return (
                  <th
                    key={h}
                    onClick={sortable ? () => handleSort(field) : undefined}
                    style={{
                      padding: '8px 10px', fontSize: 10, fontWeight: 800, color: '#64748B',
                      textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left',
                      whiteSpace: 'nowrap', cursor: sortable ? 'pointer' : 'default'
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {h} {sortable && <ArrowUpDown size={10} color="#F59E0B" />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paged.length > 0 ? paged.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(245, 158, 11, 0.08)', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '8px 10px', fontSize: 11, color: '#94A3B8', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{r.id}</td>
                <td style={{ padding: '8px 10px', fontSize: 11, fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap' }}>{r.facility}</td>
                <td style={{ padding: '8px 10px', fontSize: 11, color: '#CBD5E1', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.issue}</td>
                <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                  <span style={{
                    padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800,
                    background: priBg(r.priority), color: priColor(r.priority),
                    border: `1px solid ${priColor(r.priority)}50`
                  }}>
                    {r.priority === 'HIGH' ? 'High' : r.priority === 'MEDIUM' ? 'Medium' : 'Low'}
                  </span>
                </td>
                <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                  <span style={{
                    padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800,
                    background: statBg(r.status), color: statColor(r.status),
                    border: `1px solid ${statColor(r.status)}50`
                  }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: '8px 10px', fontSize: 11, color: '#64748B', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{r.date}</td>
                <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}>
                      <Eye size={14} />
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}>
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#64748B', fontSize: 12 }}>
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: '#64748B' }}>
        <span>Showing {paged.length} of {rows.length} records</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            style={{
              padding: '4px 6px', borderRadius: 6, border: '1px solid rgba(245, 158, 11, 0.2)',
              background: '#0D1117', color: page === 1 ? '#64748B' : '#F8FAFC',
              cursor: page === 1 ? 'default' : 'pointer'
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <span style={{ color: '#F8FAFC', fontWeight: 700 }}>{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            style={{
              padding: '4px 6px', borderRadius: 6, border: '1px solid rgba(245, 158, 11, 0.2)',
              background: '#0D1117', color: page === totalPages ? '#64748B' : '#F8FAFC',
              cursor: page === totalPages ? 'default' : 'pointer'
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
