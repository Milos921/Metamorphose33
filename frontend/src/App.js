import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AdPanel from "./components/AdPanel";
import './index.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const videoRef = useRef(null); // dodat ref za video

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pokušaj odmah autoplay
    video.play().catch(err => console.log("Autoplay blocked, will retry:", err));

    const handleScroll = () => {
      const rect = video.getBoundingClientRect();
      // Ako je video u viewport-u, pokušaj ponovo
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        video.play().catch(err => console.log("Retry autoplay blocked:", err));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <video
        ref={videoRef} // dodan ref
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

