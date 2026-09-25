<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="site-shell">
    <!-- À compléter : ajouter ici le menu de navigation. -->
    <header class="site-header">
      <div class="site-brand">
        <span class="site-brand__mark">CR</span>
        Campus Réservations
      </div>
      <nav class="navigation">
        <RouterLink to="/" class="navigation__link">Accueil</RouterLink>
        <RouterLink to="/annulees" class="navigation__link">Réservations annulées</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>