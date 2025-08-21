import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <h1 className="animated-title">METAMORPHOSE 33</h1>
    </header>
  );
};

export default Header;
