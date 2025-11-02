<script setup lang="ts">
import { ref, watch } from 'vue';
import logo from '@/assets/logo.bmp';
import Login from '@/views/Login.vue';
import SignUp from './Signup.vue';
import darkIcon from '@/assets/dark-icon.png'
import lightIcon from '@/assets/light-icon.png'

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
        <div v-if="!loggedIn" class="right">
            <RouterLink to="/signup">
                <button class="signup" @click="showSignup = true">Sign Up</button>
            </RouterLink>
            <RouterLink to="/login">
                <button class="login" @click="showLogin = true">Log In</button>
            </RouterLink>
        </div>
        <div v-else class="right">
            <button class="theme-toggle" @click="toggleTheme" :aria-label="`Activate ${isDark ? 'light' : 'dark'} mode`">
                <img v-if="!isDark" :src="darkIcon">
                <img v-else :src="lightIcon">
            </button>
            <RouterLink to="/posts/create">
                <button class="login">Create post</button>
            </RouterLink>
            <RouterLink to="/profile">
                <button class="signup">Profile</button>
            </RouterLink>
            <a href="/api/v1/logout">
                <button class="signup">Logout</button>
            </a>
        </div>
  </header>
  <Login v-if="showLogin" @close="showLogin = false" @showSignup="showLogin = false; showSignup = true"/>
  <SignUp v-if="showSignup" @close="showSignup = false" @showLogin="showSignup = false; showLogin = true"/>
</template>

<script lang="ts">
export default {
    data() {
        return {
            loggedIn: this.loggedIn,
            isDark: false,
            showLogin: false,
            showSignup: false
        }
    },
    emits: ['error'],
    methods: {
        toggleTheme() {
            this.isDark = !this.isDark;
            document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
            localStorage.setItem('data-theme', this.isDark ? "dark" : "light");
        }
    },
    mounted() {
        this.isDark = localStorage.getItem("data-theme") == "dark";

        if (window.location.pathname == '/login') {
            // @ts-ignore
            this.showLogin = true;
        }
        if (window.location.pathname == '/signup') {
            // @ts-ignore
            this.showSignup = true;
        }

        setTimeout(() => {
            if ((this.showLogin || this.showSignup) && this.loggedIn) {
                this.showLogin = false;
                this.showSignup = false;
                this.$router.push('/');
            }
        }, 500);
    },
    watch: {
        $route() {
            if (window.location.pathname == '/login') {
                // @ts-ignore
                this.showLogin = true;
            }
            if (window.location.pathname == '/signup') {
                // @ts-ignore
                this.showSignup = true;
            }

            if ((this.showLogin || this.showSignup) && this.loggedIn) {
                this.showLogin = false;
                this.showSignup = false;
                this.$router.push('/');
            }
        }
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

header .right {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

header .right button {
    margin-left: 0.8vw;
}

.theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--navbar-icon-color, #333);
    transition: transform 0.2s ease, color 0.2s ease;
    height: 4vh;
    border-radius: var(--border-radius-small);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.theme-toggle:hover {
    background-color: var(--background);
}

.theme-toggle img {
    height: 3.5vh;
}

</style>