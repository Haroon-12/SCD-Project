import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SystemMonitoring from './pages/SystemMonitoring';
import HelpDesk from './pages/HelpDesk';
import FeedbackMonitoring from './pages/FeedbackMonitoring';
import RegistrationApproval from './pages/RegistrationApproval';
//css
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/monitoring" element={<SystemMonitoring />} />
            <Route path="/helpdesk" element={<HelpDesk />} />
            <Route path="/feedback" element={<FeedbackMonitoring />} />
            <Route path="/approvals" element={<RegistrationApproval />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
