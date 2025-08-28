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

    const tryPlay = () => {
      video.play().catch(err => console.log("Autoplay blocked:", err));
    };

    // odmah pri mount-u
    tryPlay();

    // retry par puta na početku
    const retries = [500, 1500, 3000];
    const timers = retries.map(delay => setTimeout(tryPlay, delay));

    // fallback – ako ništa ne uspije, čekaj klik/tap
    const handleUserInteraction = () => {
      tryPlay();
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    return () => {
      timers.forEach(t => clearTimeout(t));
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
