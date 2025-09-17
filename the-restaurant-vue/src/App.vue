<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router"
</script>

<template>
  <header>
    <Navbar />
  </header>
  <RouterView />
  <footer class="border-top footer text-muted">
    <div class="container">
      &copy; 2025 - The Restaurant - Fine dining experience in the city
    </div>
  </footer>
</template>