import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import AddTool from './pages/AddTool';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/add-tool" element={<AddTool />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
