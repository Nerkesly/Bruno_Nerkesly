# Campus Réservations — Examen final

Application de départ fournie pour l'examen final du cours DA1B.

## Installation

```bash
npm install
```

## Vérifications

```bash
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
```

Au début de l'examen, certains tests Rust échouent volontairement. Ne modifiez pas les tests fournis.

## Démarrage

```bash
npm run tauri dev
```

Utilisez la fenêtre Tauri. Un lancement avec seulement `npm run dev` ne donne pas accès aux commandes Rust.

## Consignes

Lisez `ENONCE-EXAMEN.md` avant de modifier le projet.

Le CSS nécessaire est déjà fourni et n'est pas évalué.

Les fichiers de la page des annulations, du composant enfant et des fonctions de réactivation contiennent des squelettes compilables marqués avec `TODO`.
