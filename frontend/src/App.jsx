import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { DataProvider } from './data/DataLoaderContext';
import EnterPage from './pages/EnterPage';
import Dashboard from './pages/Dashboard';
import FacilityOverview from './pages/FacilityOverview';
import Maintenance from './pages/Maintenance';
import IoTData from './pages/IoTData';
import Analytics from './pages/Analytics';
import AIAssistantPage from './pages/AIAssistantPage';
import Reports from './pages/Reports';
import Dataset from './pages/Dataset';
import Settings from './pages/Settings';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Enter / Landing / Login Page */}
          <Route path="/" element={<EnterPage />} />
          <Route path="/login" element={<EnterPage />} />
          <Route path="/enter" element={<EnterPage />} />

          {/* Main Application Shell & Dashboard Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/facilities" element={<Layout><FacilityOverview /></Layout>} />
          <Route path="/maintenance" element={<Layout><Maintenance /></Layout>} />
          <Route path="/iot" element={<Layout><IoTData /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/ai-assistant" element={<Layout><AIAssistantPage /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/dataset" element={<Layout><Dataset /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
