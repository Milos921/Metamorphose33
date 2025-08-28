import React from "react";
import "./AdPanel.css";

export default function AdPanel() {
  return (
    <div className="ad-panel">
      <h2>Publicité</h2>
      <img src="/ad1.jpg" alt="Reklama 1" />
      <img src="/ad2.jpg" alt="Reklama 2" />
      <img src="/ad3.jpg" alt="Reklama 3" />
      {/* Dodaj još reklama po potrebi */}
    </div>
  );
}