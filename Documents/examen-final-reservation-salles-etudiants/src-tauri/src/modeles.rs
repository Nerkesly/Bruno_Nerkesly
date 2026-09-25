use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Salle {
    pub id: u64,
    pub nom: String,
    pub capacite: u32,
    pub equipements: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "kebab-case")]
pub enum Periode {
    Matin,
    ApresMidi,
    Soir,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NouvelleReservation {
    pub salle_id: u64,
    pub nom_responsable: String,
    pub date: String,
    pub periode: Periode,
}

impl NouvelleReservation {
    pub fn valider(self, salles: &[Salle]) -> Result<Self, String> {
        let nom_responsable = self.nom_responsable.trim().to_string();
        let date = self.date.trim().to_string();

        if self.salle_id == 0 || !salles.iter().any(|salle| salle.id == self.salle_id) {
            return Err("Vous devez choisir une salle valide.".to_string());
        }

        if nom_responsable.is_empty() {
            return Err("Le nom du responsable est obligatoire.".to_string());
        }

        if date.is_empty() {
            return Err("La date est obligatoire.".to_string());
        }

        Ok(Self {
            salle_id: self.salle_id,
            nom_responsable,
            date,
            periode: self.periode,
        })
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Reservation {
    pub id: u64,
    pub salle_id: u64,
    pub nom_salle: String,
    pub nom_responsable: String,
    pub date: String,
    pub periode: Periode,
    pub annulee: bool,
}

impl Reservation {
    pub fn depuis_demande(
        id: u64,
        demande: NouvelleReservation,
        salle: &Salle,
    ) -> Self {
        Self {
            id,
            salle_id: salle.id,
            nom_salle: salle.nom.clone(),
            nom_responsable: demande.nom_responsable,
            date: demande.date,
            periode: demande.periode,
            annulee: false,
        }
    }

    pub fn annuler(&mut self) -> Result<(), String> {
        if self.annulee {
            return Err("Cette réservation est déjà annulée.".to_string());
        }

        self.annulee = true;
        Ok(())
    }

    pub fn reactiver(&mut self) -> Result<(), String> {
        // TODO : appliquer la règle métier de réactivation.
        if !self.annulee {
            return Err("Cette réservation est déjà active.".to_string());
        }

        self.annulee = false;
        Ok(())
    }

    pub fn entre_en_conflit(
        &self,
        salle_id: u64,
        date: &str,
        periode: &Periode,
    ) -> bool {
        !self.annulee
            && self.salle_id == salle_id
            && self.date == date
            && &self.periode == periode
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn salle_exemple() -> Salle {
        Salle {
            id: 1,
            nom: "B-204".to_string(),
            capacite: 24,
            equipements: vec!["Projecteur".to_string()],
        }
    }

    fn reservation_active() -> Reservation {
        let salle = salle_exemple();
        let demande = NouvelleReservation {
            salle_id: salle.id,
            nom_responsable: "Camille Roy".to_string(),
            date: "2026-10-20".to_string(),
            periode: Periode::Matin,
        };

        Reservation::depuis_demande(1, demande, &salle)
    }

    #[test]
    fn une_demande_valide_est_nettoyee() {
        let salles = vec![salle_exemple()];
        let demande = NouvelleReservation {
            salle_id: 1,
            nom_responsable: "  Camille Roy  ".to_string(),
            date: " 2026-10-20 ".to_string(),
            periode: Periode::Matin,
        };

        let resultat = demande
            .valider(&salles)
            .expect("la demande devrait être valide");

        assert_eq!(resultat.nom_responsable, "Camille Roy");
        assert_eq!(resultat.date, "2026-10-20");
    }

    #[test]
    fn un_responsable_vide_est_refuse() {
        let salles = vec![salle_exemple()];
        let demande = NouvelleReservation {
            salle_id: 1,
            nom_responsable: "   ".to_string(),
            date: "2026-10-20".to_string(),
            periode: Periode::Matin,
        };

        assert!(demande.valider(&salles).is_err());
    }

    #[test]
    fn une_reservation_active_peut_etre_annulee() {
        let mut reservation = reservation_active();

        assert!(reservation.annuler().is_ok());
        assert!(reservation.annulee);
    }

    #[test]
    fn une_reservation_ne_peut_pas_etre_annulee_deux_fois() {
        let mut reservation = reservation_active();

        reservation
            .annuler()
            .expect("la première annulation devrait réussir");

        assert!(reservation.annuler().is_err());
    }

    #[test]
    fn un_meme_creneau_produit_un_conflit() {
        let reservation = reservation_active();

        assert!(reservation.entre_en_conflit(1, "2026-10-20", &Periode::Matin));
    }

    #[test]
    fn une_periode_differente_ne_produit_pas_de_conflit() {
        let reservation = reservation_active();

        assert!(!reservation.entre_en_conflit(
            1,
            "2026-10-20",
            &Periode::Soir,
        ));
    }
}
