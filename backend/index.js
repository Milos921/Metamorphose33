const express = require('express');
const cors = require('cors');
const path = require('path');
const { sendMail } = require('./emailService');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Povezivanje sa Postgres bazom
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Render zahteva SSL
});

// 🔹 Serve React frontend
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// 🔹 API ruta za test
app.get('/api', (req, res) => {
  res.send('✅ Backend radi!');
});

// 🔹 POST /booking - Zakazivanje krečenja
app.post('/booking', async (req, res) => {
  const { name, email, phone, date, message } = req.body;

  console.log("📩 Nouvelle demande reçue :", req.body);

  const htmlContent = `
    <h2>Nouvelle demande de rendez-vous de peinture</h2>
    <p><strong>Nom :</strong> ${name}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Téléphone :</strong> ${phone}</p>
    <p><strong>Date souhaitée :</strong> ${date}</p>
    <p><strong>Message :</strong> ${message}</p>
  `;

  try {
    await sendMail('Nouvelle demande de peinture via le site', htmlContent, email);
    res.status(200).send({ message: "Demande envoyée avec succès !" });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
    res.status(500).send({ message: "Une erreur est survenue lors de l'envoi du message." });
  }
});

// 🔹 POST /comment - Slanje komentara (u bazu)
app.post('/comment', async (req, res) => {
  const { note, commentaire } = req.body;

  const htmlContent = `
    <h2>Nouvel commentaire reçu</h2>
    <p><strong>Note :</strong> ${'★'.repeat(note)} (${note}/5)</p>
    <p><strong>Commentaire :</strong> ${commentaire}</p>
  `;

  try {
    // šalje email
    await sendMail('Nouvel avis client sur le site', htmlContent, null);

    // upisuje u bazu
    await pool.query(
      'INSERT INTO comments (note, commentaire, created_at) VALUES ($1, $2, NOW())',
      [note, commentaire]
    );

    res.status(200).send({ message: "Commentaire envoyé et sauvegardé avec succès !" });
  } catch (error) {
    console.error("❌ Erreur lors du traitement du commentaire :", error);
    res.status(500).send({ message: "Erreur lors de l'envoi du commentaire." });
  }
});

// 🔹 GET /comments - Dohvati sve komentare iz baze
app.get('/comments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Greška prilikom čitanja komentara:', error);
    res.status(500).json({ message: 'Greška prilikom učitavanja komentara.' });
  }
});

// 🔹 GET /comments/average - Prosečna ocena
app.get('/comments/average', async (req, res) => {
  try {
    const result = await pool.query('SELECT AVG(note)::numeric(10,2) as average, COUNT(*) as count FROM comments');
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Greška prilikom računanja prosečne ocene:', error);
    res.status(500).json({ message: 'Greška prilikom računanja ocene.' });
  }
});

// ⚠️ Ovo MORA biti POSLEDNJE - React frontend fallback (za React Router)
app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } catch (error) {
    res.status(500).send('❌ React build nije pronađen.');
  }
});

// 🔹 Pokreni server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server pokrenut na http://localhost:${PORT}`));
