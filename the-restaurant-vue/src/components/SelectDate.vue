<script setup lang="ts">
import {reactive, ref} from 'vue'
import { DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const state = reactive({
  selectedDate: new Date(),
  dateString: ""
})

const setSelectedDate = (newDate: Date) => {
  state.selectedDate = newDate
  state.dateString = newDate.toLocaleDateString('en-CA')
  console.log('Date selected:', state.dateString)
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow">
      <div class="card-body text-center">
        <h5 class="card-title">Select Date</h5>
        <VDatePicker
            v-bind:model-value="state.selectedDate"
            @update:model-value="setSelectedDate"
            :columns="1"
            :min-date="new Date()"
        />
      </div>
      <div class="card-footer text-center border-0 bg-white">
        <button class="btn btn-primary px-4">Select</button>
      </div>
    </div>
  </div>
</template>