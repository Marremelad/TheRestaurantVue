<script setup lang="ts">

</script>

<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="position-relative">
        <img src="#" class="card-img-top" alt="Menu Item" style="height: 250px; object-fit: cover;">
        <span class="badge bg-danger position-absolute top-0 end-0 m-3">Popular</span>
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">Menu Item Name</h5>
        <p class="card-text text-muted flex-grow-1">Menu item description goes here</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <span class="h4 text-primary mb-0">$0.00</span>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-danger">Delete</button>
            <a href="#" class="btn btn-outline-success">Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>