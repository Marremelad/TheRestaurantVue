<script setup lang="ts">
import { reactive } from 'vue'
import { DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const state = reactive({
  selectedDate: new Date(),
  dateString: "",
  selectedPartySize: null as number | null,
  currentStep: 1
})

const setSelectedDate = (newDate: Date) => {
  state.selectedDate = newDate
  state.dateString = newDate.toLocaleDateString('en-CA')
  console.log('Date selected:', state.dateString)
}

const selectPartySize = (size: number) => {
  state.selectedPartySize = size
  state.currentStep = 2
  console.log('Party size selected:', size)
}

const goBack = () => {
  state.currentStep = 1
}

const handleFinalSubmit = () => {
  console.log('Final selection:', {
    partySize: state.selectedPartySize,
    date: state.dateString
  })
  // Handle your final submission logic here
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow">
      <div v-if="state.currentStep === 1" class="card-body text-center">
        <h4 class="card-title mb-4">Select party size</h4>
        <div>
          <button
              v-for="n in 10"
              :key="n"
              class="btn btn-outline-success party-btn m-1"
              @click="selectPartySize(n)"
          >
            {{ n }}
          </button>
        </div>
      </div>

      <div v-else-if="state.currentStep === 2" class="card-body text-center">
        <h5 class="card-title">Select Date</h5>
        <p class="text-muted mb-3">Party size: {{ state.selectedPartySize }} people</p>
        <VDatePicker
            v-bind:model-value="state.selectedDate"
            @update:model-value="setSelectedDate"
            :columns="1"
            :min-date="new Date()"
        />
      </div>

      <div v-if="state.currentStep === 2" class="card-footer text-center border-0 bg-white">
        <button class="btn btn-outline-secondary me-2" @click="goBack">
          Back
        </button>
        <button class="btn btn-primary px-4" @click="handleFinalSubmit">
          Confirm Reservation
        </button>
      </div>
    </div>
  </div>
</template>