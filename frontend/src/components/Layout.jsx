import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import ReportModal from './ReportModal';
import AddComplaintModal from './AddComplaintModal';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* Right panel: header + scrollable content */}
      <div className="right-panel">
        <TopHeader />
        <main className="main-content" key={location.pathname}>
          {children}
        </main>
      </div>

      {/* Global Application Modals */}
      <ReportModal />
      <AddComplaintModal />
    </div>
  );
}
