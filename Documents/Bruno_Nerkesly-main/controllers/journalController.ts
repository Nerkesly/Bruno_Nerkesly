import { Response } from 'express';
import { prisma } from '../lib/prisma';

// 1. ACTION DE CRÉATION (Sauvegarder l'état du jour)
export const createEntry = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // Récupéré de façon sécurisée depuis le jeton JWT décodé
    const { humeur, energie, sommeil, anxiete, evenements } = req.body;

    // Ajout de la note en base de données
    const newEntry = await prisma.journalEntry.create({
      data: {
        userId,
        humeur: Number(humeur),
        energie: Number(energie),
        sommeil: Number(sommeil),
        anxiete: Number(anxiete),
        evenements
      }
    });

    res.status(201).json(newEntry);
  } catch (error: any) {
    // Si la contrainte @@unique bloque parce qu'il y a déjà une entrée ce jour-là
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Une entrée existe déjà pour aujourd'hui." });
    }
    res.status(500).json({ error: "Erreur lors de la sauvegarde de la note." });
  }
};

// 2. ACTION DE STATISTIQUES (Calculer les tendances de santé)
export const getStats = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    // Utilisation obligatoire des agrégats Prisma (_avg) exigée par le sujet d'examen
    const stats = await prisma.journalEntry.aggregate({
      where: { userId },
      _avg: {
        humeur: true,
        energie: true,
        sommeil: true,
        anxiete: true
      }
    });

    // Envoi des calculs au front-end pour afficher les graphiques
    res.status(200).json({
      MoyenneHumeur: stats._avg.humeur || 0,
      MoyenneEnergie: stats._avg.energie || 0,
      MoyenneSommeil: stats._avg.sommeil || 0,
      MoyenneAnxiete: stats._avg.anxiete || 0
    });
  } catch (error) {
    res.status(500).json({ error: "Impossible de calculer l'analyse des tendances." });
  }
};
