import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ma_cle_secrete_intermediaire_2026';

// 1. INSCRIPTION (Créer un compte)
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, pseudonyme } = req.body;

    // Sécurité : on cache le mot de passe en le hachant
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enregistrement dans votre base de données Neon
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        pseudonyme
      }
    });

    res.status(201).json({ message: "Utilisateur créé avec succès !", userId: newUser.id });
  } catch (error) {
    res.status(400).json({ error: "Cet email ou ce pseudonyme est déjà pris." });
  }
};

// 2. CONNEXION (Se connecter)
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // On cherche l'utilisateur par son courriel
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    // On vérifie si le mot de passe est le bon
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    // On génère le jeton de sécurité JWT (valide 2 heures)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // On renvoie le jeton au client React de votre coéquipier
    res.status(200).json({
      token,
      user: { id: user.id, pseudonyme: user.pseudonyme, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur technique lors de la connexion." });
  }
};
