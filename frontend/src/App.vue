<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/views/Navbar_.vue';
import Sidebar from '@/views/Sidebar.vue';
import axios from 'axios';
import Error from '@/components/Error.vue';

</script>

<template>
  
    <Transition name="fade">
        <Error v-if="showError" :error="typeof error == 'string' ? error : {...error}" />
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
            showError: false,
            showSignup: this.showSignup,
            lastError: 0,
            googleLoginEnabled: this.googleLoginEnabled
        };
    },
    methods: {
    },
    async beforeCreate() {
        if(localStorage.getItem("data-theme")){
            document.documentElement.setAttribute("data-theme", localStorage.getItem("data-theme")!);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            localStorage.setItem("data-theme", prefersDark ? "dark" : "light");
        }

        if (this.$route.query.error) {
            // @ts-ignore
            this.error = this.$route.query.error;
        }

        let res = await axios.get('/api/v1/user');
        if (res.status == 200) {
            // @ts-ignore
            this.loggedIn = true;
            this.currUser = res.data;
            console.log('User is logged in!');
            return;
        }

        res = await axios.get('/api/v1/auth/valid');
        if (res.status == 200) {
            console.log('User has pending account creation');
            // @ts-ignore
            this.showSignup = true;
            return;
        }

        res = await axios.get('/auth/google/enabled');
        if (res.status == 200)
            // @ts-ignore
            this.googleLoginEnabled = true;

        document.cookie = 'auth=; max-age=-1; path=/;';
        console.log('User isn\'t logged in!');
    },
    watch: {
        error(newVal) {
            this.lastError = Date.now();
            this.showError = true;
            setTimeout(() => {
                if (Date.now() - this.lastError < 2450) return;
                this.showError = false;
            }, 2500);
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
