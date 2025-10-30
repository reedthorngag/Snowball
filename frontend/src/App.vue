<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue';
import Sidebar from './views/Sidebar.vue';
</script>

<template>
  
  <Navbar @error="onError"/>
  
  <div class="layout">

    <content>
	    <RouterView @error="onError"/>
    </content>

    <Sidebar @error="onError"/>
  </div>
</template>

<script lang="ts">

export default {
    methods: {
        onError(error: object) {

        }
    }
}

</script>

<style scoped>

.layout {
    display: grid;
    grid-template-columns: 1fr 12vw;
    max-width: 90vw;
    margin: 2vh auto;
    padding: 0 1.5vw;
    gap: 2vw;
}

</style>
