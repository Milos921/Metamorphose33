const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { sendMail } = require('./emailService'); // Funkcija za slanje maila

const app = express();
app.use(cors());
app.use(express.json());

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

// 🔹 POST /comment - Slanje komentara
app.post('/comment', async (req, res) => {
  const { note, commentaire } = req.body;

  const newComment = {
    note,
    commentaire,
    date: new Date().toISOString()
  };

  const htmlContent = `
    <h2>Nouvel commentaire reçu</h2>
    <p><strong>Note :</strong> ${'★'.repeat(note)} (${note}/5)</p>
    <p><strong>Commentaire :</strong> ${commentaire}</p>
  `;

  try {
    await sendMail('Nouvel avis client sur le site', htmlContent, null);

    const filePath = path.join(__dirname, 'comments.json');
    const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

    existing.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.status(200).send({ message: "Commentaire envoyé et sauvegardé avec succès !" });
  } catch (error) {
    console.error("❌ Erreur lors du traitement du commentaire :", error);
    res.status(500).send({ message: "Erreur lors de l'envoi du commentaire." });
  }
});

// 🔹 GET /comments - Dohvati sve komentare
app.get('/comments', (req, res) => {
  const filePath = path.join(__dirname, 'comments.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]); // Nema komentara još
  }

  try {
    const commentsData = fs.readFileSync(filePath);
    const comments = JSON.parse(commentsData);
    res.status(200).json(comments);
  } catch (error) {
    console.error('❌ Greška prilikom čitanja komentara:', error);
    res.status(500).json({ message: 'Greška prilikom učitavanja komentara.' });
  }
});

// 🔹 GET /comments/average - Prosečna ocena
app.get('/comments/average', (req, res) => {
  const filePath = path.join(__dirname, 'comments.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json({ average: 0, count: 0 });
  }

  try {
    const commentsData = fs.readFileSync(filePath);
    const comments = JSON.parse(commentsData);

    if (comments.length === 0) {
      return res.status(200).json({ average: 0, count: 0 });
    }

    const total = comments.reduce((sum, c) => sum + Number(c.note), 0);
    const average = total / comments.length;

    res.status(200).json({ average, count: comments.length });
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
