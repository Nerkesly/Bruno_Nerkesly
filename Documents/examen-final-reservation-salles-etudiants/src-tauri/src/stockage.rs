use crate::modeles::{Periode, Reservation};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

const NOM_FICHIER: &str = "reservations.json";

fn chemin_fichier(app: &AppHandle) -> Result<PathBuf, String> {
    let dossier = app
        .path()
        .app_data_dir()
        .map_err(|erreur| format!("Dossier de données introuvable : {erreur}"))?;

    fs::create_dir_all(&dossier)
        .map_err(|erreur| format!("Impossible de créer le dossier de données : {erreur}"))?;

    Ok(dossier.join(NOM_FICHIER))
}

pub fn charger(app: &AppHandle) -> Result<Vec<Reservation>, String> {
    let chemin = chemin_fichier(app)?;

    if !chemin.exists() {
        return Ok(donnees_exemples());
    }

    let contenu = fs::read_to_string(&chemin)
        .map_err(|erreur| format!("Impossible de lire les réservations : {erreur}"))?;

    serde_json::from_str(&contenu)
        .map_err(|erreur| format!("Le fichier de réservations est invalide : {erreur}"))
}

pub fn sauvegarder(app: &AppHandle, reservations: &[Reservation]) -> Result<(), String> {
    let chemin = chemin_fichier(app)?;
    let json = serde_json::to_string_pretty(reservations)
        .map_err(|erreur| format!("Conversion JSON impossible : {erreur}"))?;

    fs::write(&chemin, json)
        .map_err(|erreur| format!("Impossible de sauvegarder les réservations : {erreur}"))
}

fn donnees_exemples() -> Vec<Reservation> {
    vec![
        Reservation {
            id: 1,
            salle_id: 1,
            nom_salle: "B-204".to_string(),
            nom_responsable: "Nora Tremblay".to_string(),
            date: "2026-10-20".to_string(),
            periode: Periode::Matin,
            annulee: false,
        },
        Reservation {
            id: 2,
            salle_id: 3,
            nom_salle: "Studio Créatif".to_string(),
            nom_responsable: "Malik Bensaïd".to_string(),
            date: "2026-10-21".to_string(),
            periode: Periode::ApresMidi,
            annulee: false,
        },
        Reservation {
            id: 3,
            salle_id: 2,
            nom_salle: "C-112".to_string(),
            nom_responsable: "Élodie Gagnon".to_string(),
            date: "2026-10-22".to_string(),
            periode: Periode::Soir,
            annulee: true,
        },
    ]
}
