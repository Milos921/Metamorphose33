import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AdPanel from "./components/AdPanel";
import './index.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const videoRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pokušaj odmah autoplay
    const tryPlay = () => {
      video.play().catch(err => console.log("Autoplay blocked:", err));
    };

    tryPlay();

    // Ako ne uspije, čekaj da korisnik klikne/tapne ekran
    const handleUserInteraction = () => {
      tryPlay();
      // posle prvog klika ukloni listener
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div className="app-container">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/videosaurora.mp4" type="video/mp4" />
      </video>

      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar za mobilne */}
      <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />

      {/* Overlay za zatvaranje sidebar-a na mobilnim */}
      {sidebarVisible && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className="main-layout">
        <MainContent />
        <AdPanel className="right-ad-panel" />
      </div>
    </div>
  );
}

export default App;
