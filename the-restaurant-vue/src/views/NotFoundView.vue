<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container">
    <div class="row bg-white text-black py-5 min-vh-100 d-flex align-items-center">
      <div class="col-12 text-center">
        <div class="mb-5">
          <h1 class="display-1 mb-3 text-danger">404</h1>
          <h2 class="display-5 mb-3">Page Not Found.</h2>
          <p class="lead mb-4 text-muted">
            We're sorry, but the page you're looking for seems to have wandered off the menu.
            Perhaps it's in the kitchen being prepared, or maybe it never existed at all.
          </p>
        </div>

        <div class="row justify-content-center mb-5">
          <div class="col-md-6">
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">
                <h3 class="h5 mb-3">What would you like to do?</h3>
                <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <RouterLink to="/" class="btn btn-danger">
                    Back to Home
                  </RouterLink>
                  <RouterLink to="/menu" class="btn btn-outline-dark">
                    View Our Menu
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>