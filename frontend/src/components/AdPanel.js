import React from 'react';
import './AdPanel.css';

function AdPanel(props) {
  return (
    <div className={`ad-panel desktop-only ${props.className || ''}`}>
      <h2>NOS AMIS</h2>
      <div className="ad-box">
        <a href="https://homeworx.lu/" target="_blank" rel="noopener noreferrer">
          <img src="/homeworkx.jpg" alt="Reklama" />
        </a>
      </div>
    </div>
  );
}

export default AdPanel;