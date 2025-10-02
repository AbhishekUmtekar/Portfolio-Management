import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Ensure this matches the file name
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-52">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/experimentals" element={<div className="p-8"><h1 className="text-2xl font-bold">Experimentals</h1><p className="mt-4 text-gray-600">Coming Soon</p></div>} />
            <Route path="/slack-archives" element={<div className="p-8"><h1 className="text-2xl font-bold">Slack Archives</h1><p className="mt-4 text-gray-600">Coming Soon</p></div>} />
            <Route path="/refer" element={<div className="p-8"><h1 className="text-2xl font-bold">Refer a Friend</h1><p className="mt-4 text-gray-600">Coming Soon</p></div>} />
            <Route path="/gift" element={<div className="p-8"><h1 className="text-2xl font-bold">Gift Subscription</h1><p className="mt-4 text-gray-600">Coming Soon</p></div>} />
            <Route path="/account" element={<div className="p-8"><h1 className="text-2xl font-bold">Account Settings</h1><p className="mt-4 text-gray-600">Coming Soon</p></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;