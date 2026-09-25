import { computed, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import type {
  NouvelleReservation,
  Reservation,
  Salle,
} from "../types/reservation";

const salles = ref<Salle[]>([]);
const reservations = ref<Reservation[]>([]);
const chargement = ref(false);
const erreur = ref("");

export function useReservations() {
  const reservationsTriees = computed(() =>
    [...reservations.value].sort((a, b) => {
      const parDate = a.date.localeCompare(b.date);
      return parDate !== 0 ? parDate : a.periode.localeCompare(b.periode);
    }),
  );

  async function initialiser() {
    chargement.value = true;
    erreur.value = "";

    try {
      const [sallesChargees, reservationsChargees] = await Promise.all([
        invoke<Salle[]>("lister_salles"),
        invoke<Reservation[]>("lister_reservations"),
      ]);

      salles.value = sallesChargees;
      reservations.value = reservationsChargees;
    } catch (cause) {
      erreur.value = `Initialisation impossible : ${String(cause)}`;
    } finally {
      chargement.value = false;
    }
  }

  async function creerReservation(demande: NouvelleReservation) {
    chargement.value = true;
    erreur.value = "";

    try {
      const reservation = await invoke<Reservation>("creer_reservation", {
        demande,
      });

      reservations.value.push(reservation);
    } catch (cause) {
      erreur.value = `Création impossible : ${String(cause)}`;
    } finally {
      chargement.value = false;
    }
  }

  async function annulerReservation(id: number) {
    chargement.value = true;
    erreur.value = "";

    try {
      const reservation = await invoke<Reservation>("annuler_reservation", {
        id,
      });

      const index = reservations.value.findIndex(
        (element) => element.id === reservation.id,
      );

      if (index !== -1) {
        reservations.value[index] = reservation;
      }
    } catch (cause) {
      erreur.value = `Annulation impossible : ${String(cause)}`;
    } finally {
      chargement.value = false;
    }
  }

    async function reactiverReservation(id: number) {
    // TODO : appeler la commande Rust et mettre à jour la réservation locale.
    chargement.value = true;
    erreur.value = "";

    try {
      // Appel de la commande Rust avec l'identifiant
      const reservation = await invoke<Reservation>("reactiver_reservation", {
        id,
      });

      // Trouver l'index de la réservation modifiée dans le tableau local
      const index = reservations.value.findIndex(
        (element) => element.id === reservation.id,
      );

      // Mettre à jour l'élément réactif local si trouvé
      if (index !== -1) {
        reservations.value[index] = reservation;
      }
    } catch (cause) {
      // Afficher une erreur compréhensible en cas d'échec
      erreur.value = `Réactivation impossible : ${String(cause)}`;
    } finally {
      
      chargement.value = false;
    }
  }


  return {
    salles,
    reservations: reservationsTriees,
    chargement,
    erreur,
    initialiser,
    creerReservation,
    annulerReservation,
    reactiverReservation,
  };
}
