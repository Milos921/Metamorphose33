import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ visible, toggleSidebar }) => {
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [note, setNote] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});

  // Booking forma stanja
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const [toast, setToast] = useState({ type: '', message: '', visible: false });

  const showToast = (type, message) => {
    setToast({ type, message, visible: true });
    setTimeout(() => {
      setToast({ type: '', message: '', visible: false });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

    const errors = {};

    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) errors.email = true;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) errors.phone = true;
    if (!formData.date.trim()) errors.date = true;
    if (!formData.message.trim()) errors.message = true;

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      showToast('error', '❌ Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast('success', '✅ Demande envoyée avec succès !');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          message: '',
        });
        setFieldErrors({});
      } else {
        showToast('error', '❌ Erreur: ' + result.message);
      }
    } catch (error) {
      showToast('error', "❌ Erreur lors de l'envoi: " + error.message);
    }
  };

  // Zasebna funkcija za submit komentara
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!nouveauCommentaire.trim()) {
      showToast('error', 'Le commentaire ne peut pas être vide !');
      return;
    }
    if (note === 0) {
      showToast('error', 'Veuillez attribuer une note avant de publier.');
      return;
    }

    const newComment = {
      texte: nouveauCommentaire,
      note: note,
    };

    setCommentaires([...commentaires, newComment]);
    setNouveauCommentaire('');
    setNote(0);
    showToast('success', '✅ Commentaire publié avec succès !');
  };

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      {/* Toast poruka */}
      {toast.visible && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <button className="close-btn" onClick={toggleSidebar}>×</button>

      <div className="sidebar-section">
        <h3>📞 Contact</h3>
        <p>Bozovic Denis</p>
        <p>
          Email : <a href="mailto:bozovic.denis@gmail.com">bozovic.denis@gmail.com</a>
        </p>
        <p>
          Téléphone : <a href="tel:+33780287560">+33 7 80 28 75 60</a>
        </p>
        <p>
          Adresse :{" "}
          <a
            href="https://www.google.com/maps?q=49.09186252440633,6.180387061219499"
            target="_blank"
            rel="noopener noreferrer"
          >
            2 Place du Souvenir Français, 57950 Montigny-lès-Metz
          </a>
        </p>
      </div>

      <div className="sidebar-section">
        <h3>📅 Prise de rendez-vous</h3>
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <label>Nom et prénom</label>
          <input
            type="text"
            name="name"
            placeholder="Jean Dupont"
            value={formData.name}
            onChange={handleChange}
            required
            className={fieldErrors.name ? 'input-error' : ''}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="exemple@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={fieldErrors.email ? 'input-error' : ''}
          />

          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+33 1 23 45 67 89"
            value={formData.phone}
            onChange={handleChange}
            required
            className={fieldErrors.phone ? 'input-error' : ''}
          />

          <label>Date souhaitée</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={fieldErrors.date ? 'input-error' : ''}
          />

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Détails supplémentaires..."
            value={formData.message}
            onChange={handleChange}
            required
            className={fieldErrors.message ? 'input-error' : ''}
          />

          <button type="submit">Envoyer</button>
        </form>
      </div>

      <div className="sidebar-section">
        <h3>⭐ Évaluation</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              onClick={() => setNote(i)}
              onMouseEnter={() => setHoveredStar(i)}
              onMouseLeave={() => setHoveredStar(0)}
              style={{
                cursor: 'pointer',
                color: i <= (hoveredStar || note) ? '#ffd700' : '#ccc',
                transition: 'color 0.2s',
                fontSize: '24px'
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>💬 Commentaires</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={nouveauCommentaire}
            onChange={(e) => setNouveauCommentaire(e.target.value)}
            placeholder="Laissez votre avis ici..."
            rows="3"
          />
          <button type="submit">Publier</button>
        </form>
      </div>

      <div className="sidebar-section">
        <h3>🗂️ Commentaires publiés</h3>
        {commentaires.length === 0 ? (
          <p>Aucun commentaire pour le moment.</p>
        ) : (
          <ul>
            {commentaires.map((c, index) => (
              <li key={index}>
                <div style={{ color: '#ffd700' }}>{'★'.repeat(c.note)}</div>
                <p>{c.texte}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
