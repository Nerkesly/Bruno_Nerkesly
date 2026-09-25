mod commandes;
mod modeles;
mod stockage;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commandes::lister_salles,
            commandes::lister_reservations,
            commandes::creer_reservation,
            commandes::annuler_reservation,
            commandes::reactiver_reservation,
        ])
        .run(tauri::generate_context!())
        .expect("erreur pendant l'exécution de l'application Tauri");
}
