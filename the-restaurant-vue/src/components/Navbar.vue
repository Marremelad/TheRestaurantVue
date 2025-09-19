<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand d-none d-sm-block">The Restaurant</RouterLink>

        <div class="d-sm-none w-100 mt-2">
          <div class="d-flex flex-wrap gap-2 justify-content-center">
            <RouterLink to="/menu" class="btn btn-outline-dark btn-sm">Menu</RouterLink>
          </div>
        </div>

        <div class="navbar-collapse collapse d-none d-sm-flex justify-content-between">
          <ul class="navbar-nav flex-grow-1 gap-3">
            <li class="nav-item">
              <RouterLink to="/menu" class="btn btn-outline-dark" >Menu</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>