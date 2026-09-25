<script setup lang="ts">
import type { Reservation } from "../types/reservation";

defineProps<{
  reservation: Reservation;
  desactive: boolean;
}>();

defineEmits<{
  annuler: [id: number];
}>();

const libellesPeriode = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "Soir",
};
</script>

<template>
  <article
    class="reservation-card"
    :class="{ 'reservation-card--cancelled': reservation.annulee }"
  >
    <div class="reservation-card__date">
      <strong>{{ reservation.date }}</strong>
      <span>{{ libellesPeriode[reservation.periode] }}</span>
    </div>

    <div class="reservation-card__content">
      <div class="reservation-card__topline">
        <h3>{{ reservation.nomSalle }}</h3>
        <span
          class="status"
          :class="reservation.annulee ? 'status--cancelled' : 'status--active'"
        >
          {{ reservation.annulee ? "Annulée" : "Active" }}
        </span>
      </div>
      <p>Responsable : {{ reservation.nomResponsable }}</p>
    </div>

    <button
      v-if="!reservation.annulee"
      class="button button--ghost"
      type="button"
      :disabled="desactive"
      @click="$emit('annuler', reservation.id)"
    >
      Annuler
    </button>
  </article>
</template>
