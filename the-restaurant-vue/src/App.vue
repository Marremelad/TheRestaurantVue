<script setup lang="ts">
import SelectPartySize from "@/components/SelectPartySize.vue";
import SelectDate from "@/components/SelectDate.vue";
import Home from "@/components/Home.vue";
import MenuItemCard from "@/components/MenuItemCard.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <Home />
  <footer class="border-top footer text-muted">
    <div class="container">
      &copy; 2025 - The Restaurant - Fine dining experience in the city
    </div>
  </footer>
</template>