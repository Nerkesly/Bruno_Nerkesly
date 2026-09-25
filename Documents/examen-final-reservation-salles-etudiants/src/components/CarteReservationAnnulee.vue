<script setup lang="ts">
import type { Reservation } from "../types/reservation";

defineProps<{
  reservation: Reservation;
  desactive: boolean;
}>();

// TODO : déclarer l'événement personnalisé « reactiver ».
const emit = defineEmits<{
  reactiver: [id: number];
}>();

const libellesPeriode = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "Soir",
};
</script>

<template>
  <article class="reservation-card reservation-card--cancelled">
    <div class="reservation-card__date">
      <strong>{{ reservation.date }}</strong>
      <span>{{ libellesPeriode[reservation.periode] }}</span>
    </div>

    <div class="reservation-card__content">
      <div class="reservation-card__topline">
        <h3>{{ reservation.nomSalle }}</h3>
        <span class="status status--cancelled">Annulée</span>
      </div>
      <p>Responsable : {{ reservation.nomResponsable }}</p>
    </div>

    <button
      class="button button--success"
      type="button"
      :disabled="desactive"
      @click="emit('reactiver', reservation.id)"
    >
      Réactiver
    </button>
  </article>
</template>
