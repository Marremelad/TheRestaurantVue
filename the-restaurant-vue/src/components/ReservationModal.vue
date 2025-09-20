<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from "vue";
import { DatePicker as VDatePicker } from 'v-calendar'
import { getAvailableTimeSlots } from '@/services/availabilityService'
import type { AvailabilityResponse } from '@/types/types'
import 'v-calendar/dist/style.css'

const router = useRouter()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  close: []
}>()

const reservationState = reactive({
  selectedDate: new Date().toLocaleDateString('en-CA'),
  selectedPartySize: 0,
  currentStep: 1
})

const loading = ref(false)
const availabilityResponse = ref<AvailabilityResponse[] | null>(null)
const availabilityError = ref<string | null>(null)
const selectedSlot = ref<AvailabilityResponse | null>(null)
const reservationToBeHeld = ref<AvailabilityResponse | null>(null)

const cancelReservation = () => {
  console.log(availabilityError.value)
  reservationState.currentStep = 1
  reservationState.selectedPartySize = 0
  reservationState.selectedDate = new Date().toLocaleDateString('en-CA')
  // Reset availability data
  loading.value = false
  availabilityResponse.value = null
  availabilityError.value = null
  reservationToBeHeld.value = null
  emit('close')
}

const setSelectedDate = (newDate: Date) => {
  reservationState.selectedDate = newDate.toLocaleDateString('en-CA')
  console.log('Date selected:', reservationState.selectedDate)
}

const selectPartySize = (size: number) => {
  reservationState.selectedPartySize = size
  reservationState.currentStep = 2
  console.log('Party size selected:', size)
  console.log(reservationState.selectedDate)
}

const setReservationHold = (ar: AvailabilityResponse) => {
  console.log(ar)
  reservationToBeHeld.value = {
    date: ar.date,
    timeSlot: ar.timeSlot,
    displayableTimeSlot: ar.displayableTimeSlot,
    tableNumber: ar.tableNumber,
    tableCapacity: ar.tableCapacity
  }

  selectedSlot.value = ar
}

const goBack = () => {
  switch (reservationState.currentStep) {
    case 3:
      reservationToBeHeld.value = null
      selectedSlot.value = null
      break;
    case 2:
      availabilityResponse.value = null
      availabilityError.value = null
      reservationState.selectedDate = new Date().toLocaleDateString('en-CA')
      break;
  }
  reservationState.currentStep = reservationState.currentStep - 1
}

const checkAvailability = async () => {
  loading.value = true
  availabilityError.value = null

  const request = {
    partySize: reservationState.selectedPartySize,
    date: reservationState.selectedDate
  }

  const response = await getAvailableTimeSlots(request)

  if (response.isSuccess && response.value && response.value.length > 0) {
    availabilityResponse.value = response.value
    reservationState.currentStep = 3
  } else {
    availabilityError.value = response.message || "No time slots available for this date and party size."
  }

  loading.value = false
}

const isSlotSelected = (slot: AvailabilityResponse) => {
  return selectedSlot.value &&
      selectedSlot.value.timeSlot === slot.timeSlot &&
      selectedSlot.value.tableNumber === slot.tableNumber
}

const proceedToReservation = () => {
  const plainReservationHold = {
    date: reservationToBeHeld.value?.date,
    timeSlot: reservationToBeHeld.value?.timeSlot,
    displayableTimeSlot: reservationToBeHeld.value?.displayableTimeSlot,
    tableNumber: reservationToBeHeld.value?.tableNumber,
    tableCapacity: reservationToBeHeld.value?.tableCapacity

    // Test reservation hold error
    // date: "2025-09-20",
    // timeSlot: 1,
    // tableNumber: 6,
    // tableCapacity: 10
  }

  router.push({
    path: '/complete-reservation',
    state: { reservationHold: plainReservationHold }
  })
}

</script>

<template>
  <div v-if="show" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background-color: rgba(0,0,0,0.5); z-index: 1050;">
    <div class="card shadow-lg" style="max-width: 500px; width: 90%;">

      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Make Reservation</h5>
        <button type="button" class="btn-close" @click="cancelReservation"></button>
      </div>

      <div v-if="reservationState.currentStep === 1" class="card-body text-center">
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

      <div v-else-if="reservationState.currentStep === 2" class="card-body text-center">
        <h5 class="card-title">Select Date</h5>
        <p class="text-muted mb-3">Party size: {{ reservationState.selectedPartySize }} people</p>
        <VDatePicker
            v-bind:model-value="reservationState.selectedDate"
            @update:model-value="setSelectedDate"
            :columns="1"
            :min-date="new Date()"
        />
      </div>

      <div v-else-if="reservationState.currentStep === 3" class="card-body">
        <h5 class="card-title text-center mb-4">Available Times</h5>
        <p class="text-center text-muted mb-3">
          {{ reservationState.selectedPartySize }} people on {{ reservationState.selectedDate }}
        </p>

        <div v-if="availabilityResponse" class="mb-3">
          <div
              v-for="slot in availabilityResponse"
              :key="`${slot.date}-${slot.timeSlot}-${slot.tableNumber}`"
              class="border rounded p-3 mb-2 d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{{ slot.displayableTimeSlot }}</strong><br>
              <small class="text-muted">Table {{ slot.tableNumber }} (Seats {{ slot.tableCapacity }})</small>
            </div>
            <button
                @click="setReservationHold(slot)"
                :class="[
                  'btn btn-sm',
                  isSlotSelected(slot) ? 'btn-danger' : 'btn-outline-danger'
                ]"
            >
              {{ isSlotSelected(slot) ? 'Selected' : 'Select' }}
            </button>
          </div>
        </div>
      </div>

      <div class="card-footer text-center border-0 bg-white">
        <div v-if="reservationState.currentStep === 2">
          <button class="btn btn-outline-secondary me-2" @click="goBack">
            Back
          </button>
          <button
              class="btn btn-danger px-4"
              @click="checkAvailability"
              :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Checking...' : 'Check Availability' }}
          </button>
        </div>

        <div v-if="reservationState.currentStep === 3">
          <button class="btn btn-outline-secondary me-2" @click="goBack">
            Back
          </button>
          <button v-if="reservationToBeHeld" class="btn btn-danger px-4" @click="proceedToReservation">
            Proceed
          </button>
        </div>
      </div>

      <div v-if="availabilityError" class="card-footer bg-light">
        <div class="alert alert-warning mb-0">
          <small>{{ availabilityError }}</small>
        </div>
      </div>
    </div>
  </div>
</template>