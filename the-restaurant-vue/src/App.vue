<template>
  <div>
    <h2>Available Time Slots</h2>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading available times...
    </div>

    <!-- Error State -->
    <div v-else-if="!apiResponse?.isSuccess" class="error">
      <p>{{ apiResponse?.message || 'Something went wrong' }}</p>
      <small>Status: {{ apiResponse?.statusCode }}</small>
    </div>

    <!-- Success State -->
    <div v-else-if="apiResponse?.isSuccess && apiResponse.value" class="success">
      <!-- No Results -->
      <div v-if="apiResponse.value.length === 0" class="no-results">
        No time slots available for the selected date.
      </div>

      <div v-else v-for="slot in apiResponse.value" :key="`${slot.date}-${slot.timeSlot}-${slot.tableNumber}`" class="time-slot">
        <strong>{{ slot.displayableTimeSlot }}</strong> - Table {{ slot.tableNumber }} (Capacity: {{ slot.tableCapacity }})
      </div>
    </div>

    <!-- Retry Button for Errors -->
    <button v-if="!apiResponse?.isSuccess" @click="fetchTimeSlots" class="retry-btn">
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onRenderTriggered} from 'vue'
import { getAvailableTimeSlots } from '@/services/availabilityService'
import type { ApiResponse, AvailabilityRequest, AvailabilityResponse } from '@/types/types.ts'

const loading = ref(false)
const apiResponse = ref<ApiResponse<AvailabilityResponse[]> | null>(null)

const fetchTimeSlots = async () => {
  loading.value = true
  try {
    const request: AvailabilityRequest = {
      partySize: 0,
      date: "2025-09-15"
    }

    apiResponse.value = await getAvailableTimeSlots(request)
  } catch (error) {
    console.error('Network error:', error)
    // Handle network errors separately from API errors
    apiResponse.value = {
      isSuccess: false,
      statusCode: 500,
      value: null,
      message: 'Network error. Please check your connection.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTimeSlots()
})
</script>

<style scoped>
.error {
  color: red;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 4px;
  margin: 1rem 0;
}

.success {
  color: green;
}

.loading {
  color: blue;
}

.time-slot {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
}

.no-results {
  color: #666;
  font-style: italic;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #0056b3;
}
</style>