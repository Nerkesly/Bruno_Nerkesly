use crate::modeles::{NouvelleReservation, Reservation, Salle};
use crate::stockage;
use tauri::AppHandle;

fn salles_disponibles() -> Vec<Salle> {
    vec![
        Salle {
            id: 1,
            nom: "B-204".to_string(),
            capacite: 24,
            equipements: vec!["Projecteur".to_string(), "Tableau blanc".to_string()],
        },
        Salle {
            id: 2,
            nom: "C-112".to_string(),
            capacite: 12,
            equipements: vec!["Écran interactif".to_string()],
        },
        Salle {
            id: 3,
            nom: "Studio Créatif".to_string(),
            capacite: 8,
            equipements: vec!["Caméra".to_string(), "Éclairage".to_string()],
        },
    ]
}

#[tauri::command]
pub fn lister_salles() -> Vec<Salle> {
    salles_disponibles()
}

#[tauri::command]
pub fn lister_reservations(app: AppHandle) -> Result<Vec<Reservation>, String> {
    stockage::charger(&app)
}

#[tauri::command]
pub fn creer_reservation(
    app: AppHandle,
    demande: NouvelleReservation,
) -> Result<Reservation, String> {
    let salles = salles_disponibles();
    let demande = demande.valider(&salles)?;

    let salle = salles
        .iter()
        .find(|salle| salle.id == demande.salle_id)
        .ok_or_else(|| "Salle introuvable.".to_string())?;

    let mut reservations = stockage::charger(&app)?;

    let conflit = reservations.iter().any(|reservation| {
        reservation.entre_en_conflit(
            demande.salle_id,
            &demande.date,
            &demande.periode,
        )
    });

    if conflit {
        return Err(
            "Cette salle est déjà réservée pour cette date et cette période.".to_string(),
        );
    }

    let prochain_id = reservations
        .iter()
        .map(|reservation| reservation.id)
        .max()
        .unwrap_or(0)
        + 1;

    let reservation = Reservation::depuis_demande(prochain_id, demande, salle);
    reservations.push(reservation.clone());
    stockage::sauvegarder(&app, &reservations)?;

    Ok(reservation)
}

#[tauri::command]
pub fn annuler_reservation(app: AppHandle, id: u64) -> Result<Reservation, String> {
    let mut reservations = stockage::charger(&app)?;

    let reservation_modifiee = {
        let reservation = reservations
            .iter_mut()
            .find(|reservation| reservation.id == id)
            .ok_or_else(|| "Réservation introuvable.".to_string())?;

        reservation.annuler()?;
        reservation.clone()
    };

    stockage::sauvegarder(&app, &reservations)?;
    Ok(reservation_modifiee)
}

#[tauri::command]
pub fn reactiver_reservation(app: AppHandle, id: u64) -> Result<Reservation, String> {
    // TODO : charger, retrouver, réactiver, sauvegarder et retourner la réservation.
   let mut reservations = stockage::charger(&app)?;

    let reservation_modifiee = {
        let reservation = reservations
            .iter_mut()
            .find(|reservation| reservation.id == id)
            .ok_or_else(|| "Réservation introuvable.".to_string())?;

        reservation.reactiver()?;
        reservation.clone()
    };

    stockage::sauvegarder(&app, &reservations)?;
    Ok(reservation_modifiee)
}