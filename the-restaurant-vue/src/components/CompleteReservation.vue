<script setup lang="ts">

</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-header text-center">
            <h4 class="mb-0">Your Information</h4>
            <p class="text-muted mb-0">Please provide your details to complete the reservation</p>
          </div>

          <div class="card-body">
            <form>
              <!-- First Name -->
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    required
                >
              </div>

              <!-- Last Name -->
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    required
                >
              </div>

              <!-- Email -->
              <div class="mb-4">
                <label for="email" class="form-label">Email Address</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter your email address"
                    required
                >
              </div>

              <!-- Submit Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-danger btn-lg">
                  Complete Reservation
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

<style scoped>

</style>