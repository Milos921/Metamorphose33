import React from 'react';
import './MainContent.css';

function AddressLink({ address }) {
  const mapsUrl = `https://www.google.com/maps?q=49.09186252440633,6.180387061219499`;
  return (
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
      {address}
    </a>
  );
}

function MainContent() {
  const address1 = "2 Place du Souvenir Français, 57950 Montigny-lès-Metz";

  return (
    <div className="main-content">
      <img src="/logo1921.png" alt="Logo" className="main-logo" />
      <section className="intro-section fade-in">
        <h1>🌟 Qui suis-je ?</h1>
        <p>
          Dès mon arrivée en France, les circonstances de la vie m’ont amené à découvrir un nouveau type de métier, qui s’est rapidement révélé à la fois utile, passionnant et épanouissant : la rénovation et les travaux de finition dans le bâtiment.
        </p>
        <p>
          Je suis convaincu que l’espace dans lequel une personne vit ou travaille reflète une partie essentielle de sa culture et de son bien-être...
        </p>
        <p>
          Ce chemin m’a conduit à fonder <strong>MÉTAMORPHOSE 33</strong>, une entreprise à taille humaine, à l’écoute de vos besoins, et dédiée à la transformation soignée de vos espaces de vie ou de travail.
        </p>
      </section>

      <section className="services-section slide-up">
        <h2>🛠️ Nos services — MÉTAMORPHOSE 33</h2>
        <ul>
          <li>🎨 Travaux de peinture intérieure</li>
          <li>🧱 Préparation des supports : enduisage, ponçage, lissage</li>
          <li>🧽 Pose de revêtements muraux</li>
          <li>🪵 Peinture extérieure des bâtiments</li>
          <li>🧶 Pose de revêtements de sol souples</li>
          <li>🧰 Travaux de rénovation et d’aménagement</li>
        </ul>
      </section>

      <section className="certifications-section fade-in">
        <h3>🎓 Nos compétences certifiées</h3>

        <div className="modules-grid">

          <div className="module fade-in-up">
            <img src="/module1img.jpg" alt="Peinture extérieure" />
            <p>Module 1 : Peinture extérieure – finition B ou C</p>
          </div>

          <div className="module fade-in-up" style={{ animationDelay: "0.1s" }}>
            <img src="/module2img.jpg" alt="Peinture intérieure" />
            <p>Module 2 : Peinture intérieure – finition B</p>
          </div>

          <div className="module fade-in-up" style={{ animationDelay: "0.2s" }}>
            <img src="/module3img.jpg" alt="Pose de revêtements muraux simples" />
            <p>Module 3 : Pose de revêtements muraux simples</p>
          </div>

          <div className="module fade-in-up" style={{ animationDelay: "0.3s" }}>
            <img src="/module4img.jpg" alt="Pose de revêtements de sols souples" />
            <p>Module 4 : Pose de revêtements de sols souples</p>
          </div>

        </div>
      </section>

      <section className="contact-section slide-up contact-links">
        <h3>📍 Adresse</h3>
        <p>
          Adresse : <AddressLink address={address1} />
        </p>
        <p>📞 <a href="tel:+33780287560">07 80 28 75 60</a></p>
        <p>📧 <a href="mailto:bozovic.denis@gmail.com">bozovic.denis@gmail.com</a></p>
        <p>🆔 SIRET : 988 995 825 00011</p>
        <p>🔨 Avec MÉTAMORPHOSE 33, redonnez vie à vos espaces avec exigence, goût et professionnalisme.</p>
      </section>
    </div>
  );
}

export default MainContent;
