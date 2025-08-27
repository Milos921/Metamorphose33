import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      {isMobile && (
        <button className="menu-button" onClick={toggleSidebar}>
          Réserve!
        </button>
      )}
      <h1 className="animated-title">METAMORPHOSE 33</h1>
    </header>
  );
};

export default Header;
