<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createReservationHold } from "@/services/reservationHoldService.ts";
import { createReservation } from "@/services/reservationService.ts";
import type {ApiResponse, AvailabilityResponse, PersonalInfo, ReservationCreate, Unit } from '@/types/types'

const router = useRouter()
const reservationToBeHeld = ref<AvailabilityResponse | null>(null)
const heldReservation = ref<ApiResponse<number> | null>(null)
const personalInfo = ref<PersonalInfo>({
  firstName: "",
  lastName: "",
  email: ""
})
const loading = ref(true)
const reservationCreateResponse = ref<ApiResponse<Unit> | null>(null)
const submitting = ref(false)

const goBackToHome = () => {
  router.push('/')
}

onBeforeMount(async () => {
  reservationToBeHeld.value = history.state.reservationHold

  if (!reservationToBeHeld.value) {
    console.warn('No reservation data found')
    await router.push('/')
    return
  }

  heldReservation.value = await createReservationHold(reservationToBeHeld.value)
  loading.value = false
})

const completeReservation = async () => {
  submitting.value = true

  const data: ReservationCreate = {
    reservationHoldId: heldReservation.value!.value!,
    personalInfo: personalInfo.value,
  }

  reservationCreateResponse.value = await createReservation(data)
  submitting.value = false
}
</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">

        <div v-if="loading" class="card shadow">
          <div class="card-body text-center">
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 mb-0">Securing your reservation...</p>
          </div>
        </div>

        <div v-else-if="heldReservation && !heldReservation.isSuccess" class="card shadow">
          <div class="card-body text-center">
            <div class="alert alert-danger">
              <h5 class="alert-heading">Reservation Hold Failed</h5>
              <p class="mb-3">{{ heldReservation.message }}</p>
              <button class="btn btn-danger" @click="goBackToHome">
                Return to Home
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="reservationCreateResponse && !reservationCreateResponse.isSuccess" class="card shadow">
          <div class="card-body text-center">
            <div class="alert alert-danger">
              <h5 class="alert-heading">Reservation Creation Failed</h5>
              <p class="mb-3">{{ reservationCreateResponse.message }}</p>
              <button class="btn btn-danger" @click="goBackToHome">
                Return to Home
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="reservationCreateResponse && reservationCreateResponse.isSuccess" class="card shadow">
          <div class="card-body text-center">
            <div class="alert alert-success">
              <h5 class="alert-heading">Reservation Confirmed!</h5>
              <p class="mb-3">Your reservation has been successfully created.</p>

              <div class="border-top pt-3 mt-3">
                <h6 class="text-success mb-3">Reservation Details</h6>
                <div class="text-start" style="max-width: 300px; margin: 0 auto;">
                  <div class="mb-2">
                    <strong>Name:</strong> {{ personalInfo.firstName }} {{ personalInfo.lastName }}
                  </div>
                  <div class="mb-2">
                    <strong>Email:</strong> {{ personalInfo.email }}
                  </div>
                  <div class="mb-2">
                    <strong>Date:</strong> {{ reservationToBeHeld?.date }}
                  </div>
                  <div class="mb-2">
                    <strong>Time:</strong> {{ reservationToBeHeld?.displayableTimeSlot }}
                  </div>
                  <div class="mb-2">
                    <strong>Table:</strong> {{ reservationToBeHeld?.tableNumber }} ({{ reservationToBeHeld?.tableCapacity }} seats)
                  </div>
                </div>
              </div>

              <button class="btn btn-success mt-3" @click="goBackToHome">
                Return to Home
              </button>
            </div>
          </div>
        </div>

        <div v-else class="card shadow">
          <div class="card-header text-center">
            <h4 class="mb-0">Your Information</h4>
            <p class="text-muted mb-0">Please provide your details to complete the reservation</p>
          </div>

          <div v-if="reservationToBeHeld" class="card-body border-bottom bg-light">
            <h6 class="text-muted mb-2">Reservation Summary</h6>
            <div class="small">
              <strong>Date:</strong> {{ reservationToBeHeld.date }}<br>
              <strong>Time Slot:</strong> {{ reservationToBeHeld.displayableTimeSlot }}<br>
              <strong>Table:</strong> {{ reservationToBeHeld.tableNumber }} ({{ reservationToBeHeld.tableCapacity }} seats)
            </div>
          </div>

          <div class="card-body">
            <form @submit.prevent="completeReservation">
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    v-model="personalInfo.firstName"
                    placeholder="Enter your first name"
                    required
                >
              </div>

              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    v-model="personalInfo.lastName"
                    placeholder="Enter your last name"
                    required
                >
              </div>

              <div class="mb-4">
                <label for="email" class="form-label">Email Address</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="personalInfo.email"
                    placeholder="Enter your email address"
                    required
                >
              </div>

              <div class="d-grid">
                <button
                    type="submit"
                    class="btn btn-danger btn-lg"
                    :disabled="!heldReservation?.isSuccess || submitting"
                >
                  <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ submitting ? 'Creating Reservation...' : 'Complete Reservation' }}
                </button>
              </div>
            </form>
          </div>

          <div class="card-footer text-center text-muted">
            <small>Your information is secure and will only be used for your reservation</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>