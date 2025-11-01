<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue';
import Sidebar from './views/Sidebar.vue';
import axios from 'axios';
import EventBus from './EventBus.ts';
import Error from './components/Error.vue';
import { watch } from 'vue';

</script>

<template>
  
    <Transition name="fade">
        <Error v-if="showError" error="error" />
    </Transition>

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
            error: this.error,
            showError: false
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
    },
    watch: {
        error(newVal) {
            this.showError = true;
            setTimeout(() => {
                if (this.error != newVal) return;
                this.showError = false;
            })
        }
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
