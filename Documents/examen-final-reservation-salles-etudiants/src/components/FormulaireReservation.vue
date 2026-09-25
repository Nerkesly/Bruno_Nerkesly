<script setup lang="ts">
import { computed, reactive } from "vue";
import type {
  NouvelleReservation,
  Periode,
  Salle,
} from "../types/reservation";

const props = defineProps<{
  salles: Salle[];
  desactive: boolean;
}>();

const emit = defineEmits<{
  creer: [demande: NouvelleReservation];
}>();

const formulaire = reactive({
  salleId: 0,
  nomResponsable: "",
  date: "",
  periode: "matin" as Periode,
});

const salleSelectionnee = computed(() =>
  props.salles.find((salle) => salle.id === formulaire.salleId),
);

function soumettre() {
  emit("creer", {
    salleId: formulaire.salleId,
    nomResponsable: formulaire.nomResponsable,
    date: formulaire.date,
    periode: formulaire.periode,
  });
}
</script>

<template>
  <form class="reservation-form" @submit.prevent="soumettre">
    <label>
      <span>Salle</span>
      <select v-model.number="formulaire.salleId" :disabled="desactive">
        <option :value="0">Choisir une salle</option>
        <option v-for="salle in salles" :key="salle.id" :value="salle.id">
          {{ salle.nom }} · {{ salle.capacite }} places
        </option>
      </select>
    </label>

    <div v-if="salleSelectionnee" class="room-note">
      <strong>Équipement :</strong>
      {{ salleSelectionnee.equipements.join(", ") }}
    </div>

    <label>
      <span>Responsable</span>
      <input
        v-model="formulaire.nomResponsable"
        :disabled="desactive"
        placeholder="Ex. Camille Roy"
      />
    </label>

    <div class="form-grid">
      <label>
        <span>Date</span>
        <input v-model="formulaire.date" type="date" :disabled="desactive" />
      </label>

      <label>
        <span>Période</span>
        <select v-model="formulaire.periode" :disabled="desactive">
          <option value="matin">Matin</option>
          <option value="apres-midi">Après-midi</option>
          <option value="soir">Soir</option>
        </select>
      </label>
    </div>

    <button class="button button--primary" type="submit" :disabled="desactive">
      {{ desactive ? "Traitement…" : "Créer la réservation" }}
    </button>
  </form>
</template>
