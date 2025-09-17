<script setup lang="ts">
import { ref } from "vue";

</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow">
      <div class="card-body text-center">
        <h4 class="card-title mb-4">Select party size</h4>
        <div>
          <button
              v-for="n in 10"
              :key="n"
              class="btn btn-outline-success party-btn m-1"
          >
            {{ n }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>