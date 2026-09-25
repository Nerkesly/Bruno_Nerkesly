<script setup lang="ts">
import CarteReservation from "./CarteReservation.vue";
import type { Reservation } from "../types/reservation";

defineProps<{
  reservations: Reservation[];
  desactive: boolean;
}>();

defineEmits<{
  annuler: [id: number];
}>();
</script>

<template>
  <div v-if="reservations.length" class="reservation-list">
    <CarteReservation
      v-for="reservation in reservations"
      :key="reservation.id"
      :reservation="reservation"
      :desactive="desactive"
      @annuler="$emit('annuler', $event)"
    />
  </div>

  <div v-else class="empty-state">
    <span>○</span>
    <p>Aucune réservation à afficher.</p>
  </div>
</template>
