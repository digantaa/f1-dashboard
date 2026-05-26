import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Drivers } from './pages/Drivers';
import { Teams } from './pages/Teams';
import { Races } from './pages/Races';
import { LiveTiming } from './pages/LiveTiming';
import { Analytics } from './pages/Analytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="teams" element={<Teams />} />
          <Route path="races" element={<Races />} />
          <Route path="live" element={<LiveTiming />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
