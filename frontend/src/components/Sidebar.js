import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = "https://metamorphose33-backend.onrender.com";

const Sidebar = ({ visible, toggleSidebar }) => {
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [note, setNote] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});

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
      const response = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast('success', '✅ Demande envoyée avec succès !');
        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
        setFieldErrors({});
      } else {
        showToast('error', '❌ Erreur: ' + result.message);
      }
    } catch (error) {
      showToast('error', "❌ Erreur lors de l'envoi: " + error.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/comments`);
        const data = await res.json();
        setCommentaires(data);
      } catch (err) {
        console.error('Greška pri učitavanju komentara:', err);
      }
    };
    fetchComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!nouveauCommentaire.trim()) {
      showToast('error', 'Le commentaire ne peut pas être vide !');
      return;
    }
    if (note === 0) {
      showToast('error', 'Veuillez attribuer une note avant de publier.');
      return;
    }

    const newComment = { commentaire: nouveauCommentaire, note: note };

    try {
      const res = await fetch(`${BASE_URL}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        const updated = await fetch(`${BASE_URL}/comments`);
        const data = await updated.json();
        setCommentaires(data);

        setNouveauCommentaire('');
        setNote(0);
        showToast('success', '✅ Commentaire publié avec succès !');
      } else {
        showToast('error', '❌ Erreur lors de la publication.');
      }
    } catch (err) {
      showToast('error', '❌ Erreur serveur: ' + err.message);
    }
  };

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      {toast.visible && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      <button className="close-btn" onClick={toggleSidebar}>×</button>

      {/* Kontakt */}
{/* Kontakt */}
<div className="sidebar-section">
  <h3>📞 Contact</h3>

  <p><strong>Denis Bozovic</strong></p> 

  <p>Email : 
    <a href="mailto:bozovic.denis@gmail.com" target="_blank" rel="noopener noreferrer">
      bozovic.denis@gmail.com
    </a>
  </p>

  <p>Téléphone : 
    <a href="tel:+33780287560">
      +33 7 80 28 75 60
    </a>
  </p>

  <p>Adresse : 
    <a href="https://www.google.com/maps?q=49.09186252440633,6.180387061219499" target="_blank" rel="noopener noreferrer">
      2 Place du Souvenir Français, 57950 Montigny-lès-Metz
    </a>
  </p>

  <p>Facebook : 
    <a href="https://www.facebook.com/profile.php?id=61579445481110" target="_blank" rel="noopener noreferrer">
      Métamorphose trente-trois
    </a>
  </p>
</div>



      {/* Booking */}
      <div className="sidebar-section">
        <h3>📅 Prise de rendez-vous</h3>
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} className={fieldErrors.name ? 'error' : ''} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={fieldErrors.email ? 'error' : ''} />
          <input type="tel" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} className={fieldErrors.phone ? 'error' : ''} />
          <input type="adresse" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} className={fieldErrors.adresse ? 'error' : ''}/>
            <DatePicker
              selected={formData.date ? new Date(formData.date) : null}
              onChange={(date) =>
              setFormData({ ...formData, date: date.toISOString().split("T")[0] })
            }
              dateFormat="dd/MM/yyyy"
              placeholderText="Sélectionner une date"
              className={fieldErrors.date ? "error" : ""}
              renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div style={{ margin: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
              <span style={{ margin: "0 10px", fontWeight: "bold" }}>
              {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
              </span>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{">"}</button>
              </div>
            )}
          />

          <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className={fieldErrors.message ? 'error' : ''} />
          <button type="submit">Envoyer</button>
        </form>
      </div>

      {/* Ocena */}
      <div className="sidebar-section">
        <h3>⭐ Évaluation</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} onClick={() => setNote(i)} onMouseEnter={() => setHoveredStar(i)} onMouseLeave={() => setHoveredStar(0)}
              style={{ cursor: 'pointer', color: i <= (hoveredStar || note) ? '#ffd700' : '#ccc', transition: 'color 0.2s', fontSize: '24px' }}>★</span>
          ))}
        </div>
      </div>

      {/* Forma za komentar */}
      <div className="sidebar-section">
        <h3>💬 Commentaires</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea value={nouveauCommentaire} onChange={(e) => setNouveauCommentaire(e.target.value)} placeholder="Laissez votre avis ici..." rows="3" />
          <button type="submit">Publier</button>
        </form>
      </div>

      {/* Lista komentara */}
      <div className="sidebar-section">
        <h3>🗂️ Commentaires publiés</h3>
        {commentaires.length === 0 ? (
          <p>Aucun commentaire pour le moment.</p>
        ) : (
          <ul>
            {commentaires.map((c, index) => (
              <li key={index}>
                <div style={{ color: '#ffd700' }}>{'★'.repeat(c.note)}</div>
                <p>{c.commentaire}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
