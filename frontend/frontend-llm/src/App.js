import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Common/MainLayout";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import ToolSubmission from "./pages/ToolSubmission";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/add-tool" element={<ToolSubmission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
