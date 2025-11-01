<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/logo.bmp';
import Login from '@/views/Login.vue';
const showLogin = ref(false);
</script>

<template>
    <header>
        <div class="left">
            <img class="logo-img" :src="logo">
            <div class="logo"> Snowball</div>
        </div>
        <div class="center">
            <input type="text" class="search" placeholder="Search..." />
        </div>
        <div class="right">
            <button class="signup">Sign Up</button>
            <button class="login" @click="showLogin = true">Log In</button>
        </div>
  </header>
  <Login v-if="showLogin" @close="showLogin = false"/>
</template>

<script lang="ts">
export default {
    data() {
        return {
            showLogin: this.showLogin
        }
    },
    emits: ['error'],
    methods: {
    }
}

</script>

<style scoped>

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.5vh;
    padding: 1vh 1vw;
    background: var(--foreground);
    border-bottom: var(--border-width) solid var(--border-color);
    box-shadow: 0 0.1vh 0.1vh var(--accent-shadow-color);
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    display: inline-block;
    font-weight: 700;
    font-size: 1.4rem;
    color: var(--primary-color);
}

.logo-img {
    display: inline-block;
    height: 4vh;
}

header .center .search {
    width: 20vw;
    padding: 2.5% 4%;
    border: var(--border-width) solid var(--input-border-color);
    border-radius: var(--border-radius-smaller);
    background: var(--foreground);
}

.signup {
    background: transparent;
    color: var(--primary-color);
    border: var(--border-width) solid var(--primary-color);
    padding: 1vh 1vw;
    border-radius: var(--border-radius-smaller);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.signup:hover {
    background: var(--foreground-hover);
}

.login {
    background: var(--primary-color);
    color: var(--foreground);
    border: none;
    padding: 1vh 1.2vw;
    border-radius: var(--border-radius-smaller);
    cursor: pointer;
    transition: background 0.2s;
}

.login:hover {
    background: var(--secondary-color);
}

header .left {
    display: flex;
    align-items: center;
    gap: 0.5vw;
}

header .right button {
    margin-left: 0.8vw;
}

</style>