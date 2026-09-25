import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "accueil",
      component: () => import("../views/AccueilView.vue"),
    },
    // À compléter : ajouter la route des réservations annulées.
    {
      path: "/annulees",
      name: "reservations-annulees",
      component: () => import("../views/ReservationsAnnuleesView.vue"),
    }
  ],
});

export default router;
