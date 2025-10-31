<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue';
import Sidebar from './views/Sidebar.vue';
import axios from 'axios';
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
    data() {
        return {
            loggedIn: this.loggedIn,
            currUser: this.currUser
        };
    },
    methods: {
        onError(error: object) {

        }
    },
    async beforeCreate() {
        const req = await axios.get('/api/v1/user');
        if (req.status == 200) {
            // @ts-ignore
            this.loggedIn = true;
            this.currUser = req.data;
            console.log('User is logged in!');
            console.log(req.data);
        }
        console.log('User isn\'t logged in!');
    }
}

</script>

<style scoped>

.layout {
    display: grid;
    grid-template-columns: 1fr 18vw;
    max-width: 90vw;
    margin: 2vh auto;
    padding: 0 1.5vw;
    gap: 2vw;
}

</style>
