import React from 'react';
import HeroBanner from '../components/HeroBanner';
import KpiCard from '../components/KpiCard';
import ComplaintChart from '../components/ComplaintChart';
import FacilityDistribution from '../components/FacilityDistribution';
import FacilityMap from '../components/FacilityMap';
import MaintenanceTable from '../components/MaintenanceTable';
import IoTSensorCard from '../components/IoTSensorCard';
import AIAssistant from '../components/AIAssistant';
import SustainabilityBanner from '../components/SustainabilityBanner';

export default function Dashboard() {
  return (
    <div className="dashboard animate-in">
      {/* Top Hero Banner */}
      <HeroBanner />

      {/* 4 KPI Metric Cards */}
      <KpiCard />

      {/* Row 1: Complaints Trend (5) | Facility Distribution (3.2) | Facility Locations (3.8) */}
      <div className="grid-3col" style={{ alignItems: 'stretch' }}>
        <ComplaintChart />
        <FacilityDistribution />
        <FacilityMap />
      </div>

      {/* Row 2: Maintenance Requests (5) | Live IoT Sensors (3.2) | AI Assistant (3.8) */}
      <div className="grid-3col" style={{ alignItems: 'stretch' }}>
        <MaintenanceTable limit={5} />
        <IoTSensorCard />
        <AIAssistant />
      </div>

      {/* Row 3: Sustainability Banner */}
      <div style={{ width: '100%' }}>
        <SustainabilityBanner />
      </div>
    </div>
  );
}
