<script setup lang="ts">
import {ref, defineProps, computed, type ComputedRef, type Ref} from "vue";
import type {ApiResponse, MenuItem} from "@/types/types.ts";
import { getMenuItems } from "@/services/menuItemService.ts"

const props = defineProps({
  numberOfItems: {
    type: Number,
    default: 0
  },
  popularOnly: {
    type: Boolean,
    default: false
  }
})

const loading = ref(false)
const apiResponse: Ref<ApiResponse<MenuItem[]> | null> = ref(null)

const filteredMenuItems: ComputedRef<MenuItem[] | null> = computed(() => {
  if (!apiResponse.value) return []

  const menuItems = apiResponse.value.value
  const filtered = props.popularOnly ? menuItems!.filter(v => v.isPopular) : menuItems
  return props.numberOfItems > 0 ? filtered!.slice(0, props.numberOfItems) : filtered
})

const fetchMenuItems = async () => {
  loading.value = true
  apiResponse.value = await getMenuItems()
  loading.value = false
}

fetchMenuItems()
</script>

<template>
  <div v-if="loading" class="text-center">
    <p>Loading menu items...</p>
  </div>

  <div v-else-if="!apiResponse?.isSuccess" class="text-center">
    <p>Something went wrong</p>
  </div>

  <div v-else-if="filteredMenuItems?.length === 0" class="col-12 text-center">
    <p>No menu items available</p>
  </div>

  <div v-else v-for="menuItem in filteredMenuItems" :key="menuItem.id" class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="position-relative">
        <img :src="menuItem.image" class="card-img-top" alt="Menu Item" style="height: 250px; object-fit: cover;">
        <span v-if="menuItem.isPopular" class="badge bg-danger position-absolute top-0 end-0 m-3">Popular</span>
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ menuItem.name }}</h5>
        <p class="card-text text-muted flex-grow-1">{{ menuItem.description }}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <span class="h4 text-primary mb-0">${{ menuItem.price.toFixed(2) }}</span>
          <div class="d-flex gap-2">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>