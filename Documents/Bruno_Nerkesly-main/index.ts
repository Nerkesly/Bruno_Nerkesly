import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';

// Active la lecture du fichier .env pour récupérer les variables secrètes
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Autorise le client React de votre coéquipier à appeler votre serveur
app.use(cors());

// Permet à Express de décoder le format JSON envoyé par Axios
app.use(express.json());

// Branchement de nos routes sous le préfixe exigé par le sujet
app.use('/api/v1', apiRoutes);

// Route rapide de test de santé (healthcheck)
app.get('/api/v1/health', (req, res) => {
  res.json({ status: "ok", message: "Le serveur MindHarbor tourne à merveille !" });
});

// Lancement du serveur sur le port 5000
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
