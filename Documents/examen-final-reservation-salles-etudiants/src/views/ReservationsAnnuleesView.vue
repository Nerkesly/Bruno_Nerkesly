<script setup lang="ts">
import { computed, onMounted } from "vue";
import CarteReservationAnnulee from "../components/CarteReservationAnnulee.vue";
import { useReservations } from "../composables/useReservations";

const { reservations, chargement, erreur, initialiser, reactiverReservation } = useReservations();

// TODO : conserver uniquement les réservations annulées.
const reservationsAnnulees = computed(() => reservations.value.filter(r => r.annulee));

onMounted(initialiser);
</script>

<template>
  <main class="page-shell">
    <header class="page-heading">
      <div>
        <p class="eyebrow">Gestion</p>
        <h1>Réservations annulées</h1>
        <p>
          Consultez les réservations annulées et réactivez celles qui doivent
          être remises à l'horaire.
        </p>
      </div>
      <span class="count">{{ reservationsAnnulees.length }}</span>
    </header>

    <section class="panel">
      <p v-if="erreur" class="message message--error" role="alert">
        {{ erreur }}
      </p>

      <p v-if="chargement && reservations.length === 0" class="message">
        Chargement des réservations…
      </p>

      <div v-else-if="reservationsAnnulees.length" class="reservation-list">
        <CarteReservationAnnulee
          v-for="reservation in reservationsAnnulees"
          :key="reservation.id"
          :reservation="reservation"
          :desactive="chargement"
          @reactiver="reactiverReservation"
        />
      </div>

      <div v-else class="empty-state">
        <span>✓</span>
        <p>Aucune réservation annulée.</p>
      </div>
    </section>
  </main>
</template>
