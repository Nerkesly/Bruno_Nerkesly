# DA1B — Examen final

## Campus Réservations : diagnostic et évolution d'une application existante

**Durée : 2 heures**  
**Total : 100 points**

---

## 1. Mise en situation

Vous recevez une nouvelle version de l'application de bureau **Campus Réservations**. L'application permet déjà de consulter, créer et annuler des réservations de salles. Les données sont sauvegardées localement dans un fichier JSON.

Votre mandat consiste à :

1. diagnostiquer et corriger deux problèmes existants;
2. ajouter un menu de navigation;
3. compléter une page consacrée aux réservations annulées;
4. compléter un composant Vue utilisant des props et un événement;
5. ajouter une fonctionnalité de réactivation dans Rust;
6. relier cette fonctionnalité à Vue avec Tauri;
7. vérifier le fonctionnement et la persistance.

Vous devez conserver l'architecture existante. Il n'est pas demandé de réécrire l'application.

## 2. Technologies utilisées

- Vue 3 avec TypeScript;
- Vue Router;
- Tauri 2;
- Rust;
- JSON pour la persistance.

## 3. À propos du CSS

Tout le CSS nécessaire est déjà fourni dans `src/style.css`.

Le CSS n'est pas évalué. Vous ne devez pas consacrer de temps à modifier l'apparence. Utilisez les classes indiquées dans l'énoncé.

Plusieurs fichiers contiennent déjà une structure et des commentaires `TODO`. Complétez ces sections sans supprimer l'architecture fournie.

## 4. Méthode recommandée

Pour chaque problème ou fonctionnalité :

```text
Observer → Localiser → Modifier → Vérifier
```

Effectuez une modification ciblée, puis vérifiez-la avant de passer à la suivante.

---

# Partie A — Préparer le projet

## 5. Installation et première vérification

À la racine du projet :

```bash
npm install
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
npm run tauri dev
```

Au début de l'examen :

- le frontend doit compiler;
- le backend doit compiler;
- certains tests Rust échouent volontairement;
- l'application doit s'ouvrir dans une fenêtre Tauri.

Ne corrigez pas les tests fournis. Ils décrivent le comportement attendu.

---

# Partie B — Diagnostiquer et corriger les problèmes — 20 points

## 6. Problème 1 — Compteur des réservations actives — 8 points

### Observation

Les données initiales contiennent trois réservations, dont une réservation annulée. Le badge de la page d'accueil indique pourtant trois réservations actives.

### Résultat attendu

Le badge doit compter uniquement les réservations dont `annulee` vaut `false`.

### Travail demandé

1. Retrouvez l'expression utilisée par le badge.
2. Corrigez uniquement le calcul du nombre de réservations actives.
3. Vérifiez le résultat avec les données initiales.
4. Annulez une réservation et confirmez que le compteur diminue.

## 7. Problème 2 — Détection des conflits — 12 points

### Observation

La réservation suivante existe déjà dans les données initiales :

```text
Salle : B-204
Date : 2026-10-20
Période : Matin
```

L'application peut accepter une nouvelle réservation pour exactement le même créneau. Deux tests Rust signalent également un problème.

### Résultat attendu

Deux réservations actives ne peuvent pas utiliser la même salle, à la même date et pendant la même période.

### Travail demandé

1. Exécutez les tests Rust.
2. Lisez le nom et le message des tests qui échouent.
3. Retrouvez la règle métier de détection des conflits.
4. Corrigez la condition fautive sans modifier les tests.
5. Exécutez les tests de nouveau.
6. Vérifiez le refus du conflit dans l'application.

---

# Partie C — Ajouter la navigation — 15 points

## 8. Menu principal

Vue Router est déjà installé et la route d'accueil existe déjà.

Dans `App.vue`, ajoutez un menu permettant de naviguer entre :

| Lien | Chemin |
|---|---|
| Accueil | `/` |
| Réservations annulées | `/annulees` |

### Exigences

- utilisez `RouterLink`;
- conservez `RouterView`;
- la navigation ne doit pas recharger la fenêtre Tauri;
- le lien de la page courante doit recevoir automatiquement le style actif;
- le menu doit être accessible depuis les deux pages.

### Classes CSS fournies

```text
site-header
site-brand
site-brand__mark
navigation
navigation__link
```

Le contenu exact du nom ou du logo textuel n'est pas évalué.

---

# Partie D — Compléter la page des réservations annulées — 20 points

## 9. Nouvelle route et nouvelle vue

Le fichier `ReservationsAnnuleesView.vue` est déjà fourni avec son balisage et les classes CSS. Sa liste calculée n'applique pas encore le bon filtre.

Ajoutez au routeur une route possédant les caractéristiques suivantes :

```text
Chemin : /annulees
Nom suggéré : reservations-annulees
Vue : ReservationsAnnuleesView.vue
```

La nouvelle page doit :

- initialiser les réservations;
- afficher uniquement les réservations dont `annulee` vaut `true`;
- afficher le nombre de réservations annulées;
- afficher un état vide lorsqu'il n'y en a aucune;
- utiliser une valeur calculée pour produire la liste filtrée.

Classes CSS utiles :

```text
page-shell
page-heading
panel
count
reservation-list
empty-state
message
message--error
```

## 10. Composant enfant obligatoire

Le composant suivant est déjà fourni :

```text
CarteReservationAnnulee.vue
```

Les props, l'affichage et le bouton sont déjà présents. Complétez le composant afin que le bouton :

- émettre un événement personnalisé nommé `reactiver`;
- transmettre l'identifiant de la réservation avec l'événement.

La vue parente doit écouter cet événement et déclencher la fonction de réactivation.

Classes CSS utiles :

```text
reservation-card
reservation-card--cancelled
reservation-card__date
reservation-card__content
reservation-card__topline
status
status--cancelled
button
button--success
```

---

# Partie E — Ajouter la réactivation dans Rust — 25 points

## 11. Règle métier

Dans le modèle `Reservation`, complétez la méthode publique déjà déclarée pour réactiver une réservation.

Signature suggérée :

```rust
pub fn reactiver(&mut self) -> Result<(), String>
```

La méthode doit respecter les règles suivantes :

- une réservation annulée peut être réactivée;
- une réservation déjà active ne peut pas être réactivée;
- une erreur claire doit être retournée lorsqu'elle est déjà active;
- une réactivation réussie place `annulee` à `false`.

## 12. Commande Tauri

Complétez la commande déjà déclarée avec la signature suivante :

```rust
#[tauri::command]
pub fn reactiver_reservation(
    app: AppHandle,
    id: u64,
) -> Result<Reservation, String>
```

La commande doit :

1. charger les réservations;
2. retrouver la réservation grâce à son identifiant;
3. retourner une erreur si elle est introuvable;
4. appeler la règle métier de réactivation;
5. sauvegarder toutes les réservations;
6. retourner la réservation modifiée.

Vous pouvez utiliser la commande d'annulation existante comme modèle.

N'oubliez pas de rendre la commande accessible à Vue.

---

# Partie F — Relier Vue et Rust — 10 points

## 13. Composable

Dans le composable, complétez la fonction asynchrone déjà déclarée :

```ts
reactiverReservation(id: number)
```

Cette fonction doit :

- activer l'état de chargement;
- effacer l'ancien message d'erreur;
- appeler la commande Rust avec `invoke()`;
- envoyer un argument dont le nom correspond à la signature Rust;
- recevoir la réservation modifiée;
- remplacer la réservation correspondante dans le tableau local;
- afficher une erreur compréhensible en cas d'échec;
- rétablir l'état de chargement dans tous les cas.

La fonction est déjà incluse dans l'objet retourné par le composable.

Le clic sur le bouton du composant enfant doit maintenant effectuer le trajet complet :

```text
bouton
→ événement reactiver
→ vue parente
→ composable
→ invoke()
→ commande Rust
→ méthode métier
→ sauvegarde JSON
→ mise à jour de Vue
```

---

# Partie G — Vérification finale — 10 points

## 14. Vérifications techniques

Exécutez :

```bash
npm run build
cargo check --manifest-path src-tauri/Cargo.toml
cargo test --manifest-path src-tauri/Cargo.toml
```

Toutes ces commandes doivent réussir à la fin de l'examen.

## 15. Scénario fonctionnel complet

Vérifiez les éléments suivants :

- [ ] Le badge compte seulement les réservations actives.
- [ ] Une réservation en conflit est refusée.
- [ ] Le menu permet d'ouvrir les deux pages.
- [ ] Le lien de la page courante est identifiable.
- [ ] La page `/annulees` affiche uniquement les réservations annulées.
- [ ] Le nombre de réservations annulées est exact.
- [ ] Le bouton « Réactiver » fonctionne.
- [ ] La réservation réactivée disparaît de la page des annulations.
- [ ] Elle apparaît comme active sur la page d'accueil.
- [ ] Après la fermeture et la réouverture de l'application, elle demeure active.
- [ ] Les erreurs sont affichées dans l'interface.

---

# Barème

| Partie | Points |
|---|---:|
| Correction du compteur | 8 |
| Correction de la règle de conflit | 12 |
| Menu de navigation | 15 |
| Route, page et composant enfant | 20 |
| Méthode et commande Rust | 25 |
| Intégration Vue–Tauri–Rust | 10 |
| Vérifications et fonctionnement global | 10 |
| **Total** | **100** |

## Consigne finale

Une fonctionnalité partiellement fonctionnelle peut recevoir des points si le code démontre une démarche cohérente. Conservez vos modifications, même si vous n'avez pas réussi à terminer une partie.
