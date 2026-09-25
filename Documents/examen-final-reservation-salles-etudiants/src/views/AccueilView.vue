<script setup lang="ts">
import { onMounted, computed } from "vue";
import FormulaireReservation from "../components/FormulaireReservation.vue";
import ListeReservations from "../components/ListeReservations.vue";
import { useReservations } from "../composables/useReservations";

const {
  salles,
  reservations,
  chargement,
  erreur,
  initialiser,
  creerReservation,
  annulerReservation,
} = useReservations();

onMounted(initialiser);
const reservationsActivesCount = computed(() => {
  return reservations.value.filter(r => !r.annulee).length;
});
</script>

<template>
  <div class="app-shell">
    <header class="hero">
      <div>
        <p class="eyebrow">DA1B · Examen final</p>
        <h1>Campus Réservations</h1>
        <p class="hero__description">
          Réservez une salle pour une période de la journée et consultez les
          réservations déjà enregistrées.
        </p>
      </div>

      <div class="hero__badge">
        <span>{{ reservationsActivesCount }}</span>
        réservation(s) active(s)
      </div>
    </header>

    <main class="layout">
      <section class="panel panel--form">
        <div class="section-heading">
          <p class="eyebrow">Nouvelle demande</p>
          <h2>Réserver une salle</h2>
        </div>

        <FormulaireReservation
          :salles="salles"
          :desactive="chargement"
          @creer="creerReservation"
        />
      </section>

      <section class="panel panel--list">
        <div class="section-heading section-heading--row">
          <div>
            <p class="eyebrow">Horaire</p>
            <h2>Réservations</h2>
          </div>
          <span class="count">{{ reservationsActivesCount }}</span>
        </div>

        <p v-if="erreur" class="message message--error" role="alert">
          {{ erreur }}
        </p>

        <p v-if="chargement && reservations.length === 0" class="message">
          Chargement des réservations…
        </p>

        <ListeReservations
          v-else
          :reservations="reservations"
          :desactive="chargement"
          @annuler="annulerReservation"
        />
      </section>
    </main>
  </div>
</template>
