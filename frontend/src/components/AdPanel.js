import React from 'react';
import './AdPanel.css';

function AdPanel(props) {
  return (
    <div className={`ad-panel desktop-only ${props.className || ''}`}>
      <h2>NOS AMIS</h2>
      <div className="ad-box">
        <img src="/homeworkx.jpg" alt="Reklama" />
      </div>
    </div>
  );
}

export default AdPanel;
