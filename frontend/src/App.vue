<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue';
import Sidebar from './views/Sidebar.vue';
import axios from 'axios';
import EventBus from './EventBus.ts';
import Error from './components/Error.vue';
</script>

<template>
  
    <Error :error="error" />

    <Navbar/>

    <div class="layout">

        <content>
            <RouterView/>
        </content>

        <Sidebar/>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            loggedIn: this.loggedIn,
            currUser: this.currUser,
            error: this.error
        };
    },
    methods: {
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
