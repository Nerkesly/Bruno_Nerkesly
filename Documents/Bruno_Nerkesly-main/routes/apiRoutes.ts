import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { createEntry, getStats } from '../controllers/journalController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// --- ROUTES PUBLIQUES (Accessibles sans être connecté) ---
// Inscription : POST http://localhost:5000/api/v1/auth/register
router.post('/auth/register', register);

// Connexion : POST http://localhost:5000/api/v1/auth/login
router.post('/auth/login', login);


// --- ROUTES PROTÉGÉES (L'utilisateur doit posséder un jeton JWT valide) ---
// Ajouter une note : POST http://localhost:5000/api/v1/journal
router.post('/journal', verifyToken, createEntry);

// Voir les statistiques : GET http://localhost:5000/api/v1/journal/trends
router.get('/journal/trends', verifyToken, getStats);

export default router;
