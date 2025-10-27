<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  
  <Navbar />
  
  <div class="layout">

    <content>
      <RouterView />
    </content>

    <Sidebar />
  </div>
</template>

<style scoped>

.layout {
    display: grid;
    grid-template-columns: 1fr 12vw;
    max-width: 1400px;
    margin: 24px auto;
    padding: 0 16px;
    gap: 24px;
}

@media (min-width: 1024px) {
}
</style>
