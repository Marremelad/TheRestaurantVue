<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import MenuItemCard from "@/components/MenuItemCard.vue";
import ReservationModal from "@/components/ReservationModal.vue";

const showReservation = ref(false)

const startReservation = () => {
  showReservation.value = true
}

const closeReservation = () => {
  showReservation.value = false
}
</script>

<template>
  <ReservationModal
      :show="showReservation"
      @close="closeReservation"
  />

  <div class="container">
    <div class="row bg-white text-black py-5">
      <div class="col-12 text-center">
        <h1 class="display-4 mb-3">Welcome to The Restaurant.</h1>
        <p class="lead mb-4 text-muted">Experience culinary excellence in the heart of the city. Our passionate chefs create unforgettable dishes using the finest local ingredients, bringing you a perfect blend of traditional flavors and modern innovation.</p>
        <div class="mt-4">
          <button @click="startReservation" class="btn btn-danger btn-lg">Make Reservation</button>
        </div>
      </div>
    </div>

    <div class="row py-5">
      <div class="col-12 text-center mb-5">
        <h2 class="display-5">Our Most Popular Dishes.</h2>
        <p class="text-muted">Discover the favorites that keep our guests coming back.</p>
      </div>

      <div class="row">
        <MenuItemCard :number-of-items="3" :popular-only="true"/>
      </div>

      <div class="row bg-white py-5" id="menu">
        <div class="col-12 text-center">
          <h3 class="mb-3">Want to See More?</h3>
          <p class="mb-4">Browse our complete menu with all available dishes and beverages</p>
          <RouterLink to="/menu" class="btn btn-danger btn-lg">Full Menu</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>