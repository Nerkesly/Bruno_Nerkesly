import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ma_cle_secrete_intermediaire_2026';

// On utilise le type "any" pour ajouter facilement l'utilisateur connecté sans complexité
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupère le jeton après "Bearer "

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Veuillez vous connecter." });
  }

  try {
    // On décode et vérifie le jeton de sécurité
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // On l'attache à la requête pour que le contrôleur sache qui écrit
    next(); // Tout est beau, on passe à la suite !
  } catch (error) {
    res.status(403).json({ error: "Jeton invalide ou expiré." });
  }
};
