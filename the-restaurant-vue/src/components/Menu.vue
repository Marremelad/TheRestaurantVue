<script setup lang="ts">
import {type Ref, ref} from "vue";
import type {ApiResponse, MenuItem} from "@/types/types.ts";
import {getMenuItems} from "@/services/MenuItemService.ts";

const loading = ref(false)
const apiResponse: Ref<ApiResponse<MenuItem[]> | null> = ref(null)

const fetchMenuItems = async () => {
  loading.value = true
  apiResponse.value = await getMenuItems()
  loading.value = false;
}

fetchMenuItems()
</script>

<template>
  <div v-if="loading" class="text-center">
    <p>Loading menu...</p>
  </div>

  <div v-else-if="!apiResponse?.isSuccess" class="col-12 text-center">
    <div class="alert alert-danger" role="alert">
      <h2>Error loading menu</h2>
      <p class="mb-0">We couldn't load our menu right now. Please try again later or contact us directly.</p>
    </div>
  </div>

  <div v-else-if="apiResponse?.value.length === 0" class="col-12 text-center">
    <div class="alert alert-info" role="alert">
      <h2>Menu updating</h2>
      <p class="mb-0">Our menu is currently being updated. Contact us for current dishes and prices.</p>
    </div>
  </div>

  <div v-else class="container my-5 pb-5">
    <div class="text-center mb-5">
      <h1 class="display-4 mb-3">Our Menu</h1>
      <p class="lead text-muted">Crafted with passion, served with pride</p>
    </div>

    <div class="row">
      <div class="col-lg-8 mx-auto">
        <article v-for="menuItem in apiResponse?.value" :key="menuItem.id" class="menu-item d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom">
          <div class="menu-content flex-grow-1 me-3">
            <div class="d-flex align-items-center mb-2">
              <h2 class="menu-title mb-0 h5">{{ menuItem.name }}</h2>
              <span v-if="menuItem.isPopular" class="badge bg-danger ms-2">Popular</span>
            </div>
            <p class="menu-description text-muted mb-0">{{ menuItem.description }}</p>
          </div>
          <div class="menu-price">
            <span class="h5 text-primary mb-0">${{ menuItem.price.toFixed(2) }}</span>
          </div>
        </article>

        <div class="text-center mt-5 p-4 rounded">
          <h3 class="h4 mb-3">Ready to experience our dishes?</h3>
          <p class="text-muted mb-4">Book your table today and let us create an unforgettable dining experience for you.</p>
          <a href="#" class="btn btn-danger btn-lg">
            Make reservation
          </a>
        </div>
      </div>
    </div>
  </div>
</template>