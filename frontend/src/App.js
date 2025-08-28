import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AdPanel from "./components/AdPanel";
import './index.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="app-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videosaurora.mp4" type="video/mp4" />
      </video>

      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar za mobilne */}
      <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />

      {/* Overlay za zatvaranje sidebar-a na mobilnim */}
      {sidebarVisible && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className="main-layout">
        <MainContent />
        <AdPanel />
      </div>
    </div>
  );
}

export default App;