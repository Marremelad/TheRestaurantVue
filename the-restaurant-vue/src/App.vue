<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router"
import CompleteReservation from "@/components/CompleteReservation.vue";
</script>

<template>
  <Navbar />
  <RouterView />
<!--  <CompleteReservation />-->
  <Footer />
</template>