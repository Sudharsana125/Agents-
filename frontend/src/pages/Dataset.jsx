import React, { useRef } from 'react';
import { Upload, CheckCircle2, Download, Database } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';
import MaintenanceTable from '../components/MaintenanceTable';

export default function Dataset() {
  const { data, handleCSVUpload } = useData();
  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleCSVUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCSVUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="dashboard animate-in">
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database size={22} color="#F59E0B" />
          <span>Dataset & CSV Control Center</span>
        </h2>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
          Upload custom CSV datasets to dynamically recalculate KPIs, line charts, thermal heatmaps, and maintenance records
        </p>
      </div>

      {/* Drag & Drop Card */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed rgba(245,158,11,0.35)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          background: 'linear-gradient(145deg, #10141E 0%, #0A0D14 100%)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />

        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F59E0B'
        }}>
          <Upload style={{ width: '26px', height: '26px' }} />
        </div>

        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Upload Custom CSV Dataset</h3>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
            Drag & drop your CSV file here, or click to browse files from your computer
          </p>
        </div>

        <button
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            border: 'none',
            color: '#000000',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            marginTop: '4px',
            boxShadow: '0 4px 14px rgba(245,158,11,0.35)'
          }}
        >
          Select File from Device
        </button>
      </div>

      {/* Dataset Status Banner */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(52,211,153,0.15)',
            border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34D399'
          }}>
            <CheckCircle2 style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Active Facility Dataset</h4>
            <p style={{ fontSize: '11px', color: '#94A3B8' }}>{data.length} Total Records • 9 Schema Fields Loaded</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            const csvContent = "data:text/csv;charset=utf-8," +
              ["ID,Facility,Issue,Priority,Status,Date,Complaints,Energy_kW,Temp_C", ...data.map(d => `${d.id},${d.facility},${d.issue},${d.priority},${d.status},${d.date},${d.complaints},${d.energy},${d.temp}`)].join("\n");
            const link = document.createElement("a");
            link.href = encodeURI(csvContent);
            link.download = "facility_dataset_export.csv";
            link.click();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '8px',
            background: '#0D1117',
            border: '1px solid rgba(52,211,153,0.3)',
            color: '#34D399',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <Download style={{ width: '14px', height: '14px' }} />
          <span>Export Active CSV</span>
        </button>
      </div>

      {/* Dataset Maintenance Table */}
      <MaintenanceTable limit={15} />
    </div>
  );
}
