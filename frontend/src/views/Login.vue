<script setup lang="ts">
import GoogleLogin from '@/components/GoogleLogin.vue';
import axios from 'axios';
import { ref } from 'vue';

</script>

<template>
    <transition name="fade">
        <div class="overlay" @click="close()">

            <div class="container" @click="e => e.stopPropagation()">
                <div class="title">Login</div>
                <GoogleLogin style="margin: 1vh 0;" />
                <hr style="border-top: var(--border-width) solid var(--text-light); width: 80%; margin: 1vh 0;"></hr>
                <form @submit.prevent="login()">
                    <input type="username" id="username" v-model="username" placeholder="Username or email" required>
                    <input type="password" id="password" v-model="password" placeholder="password" required>
                    <div style="width: 100%; display: flex; flex-direction: column; justify-content: center;">
                        <Button type="Submit" class="login-btn">Login</Button>
                    </div>
                </form>
                <RouterLink to="/signup" class="signup" @click="$emit('showSignup')">sign up</RouterLink>
                
            </div>
        </div>
    </transition>

</template>

<script lang="ts">
const visible = ref(true)

export default {
    data() {
        return {
            error: this.error,
            username: '',
            password: '',
            loggedIn: this.loggedIn
        }
    },
    emits: ['error', 'close', 'showSignup'],
    methods: {
        close() {
            this.$emit('close');
            this.username = '';
            this.password = '';
        },
        async login() {
            if (this.loggedIn) {
                // @ts-ignore
                this.error = 'already logged in!';
                return;
            }

            const res = await axios.post('/api/v1/login', {username: this.username, password: this.password});
            this.password = '';
            if (res.status != 200) {
                this.error = res.data || String(res.status);
                return; 
            }
            this.username = '';

            document.cookie = res.data.cookie;
            window.location.href = '/';
        }
    },
    
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overlay {
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #00000080;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-smaller);
    animation: popup-in 0.3s ease;
}

@keyframes popup-in {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.title {
    color: var(--primary-color);
    margin-bottom: 1.5vh;
    font-size: 1.3rem;
    font-weight: 600;
}

.container input {
    display: block;
    margin: 1vh 0;
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-small);
    color: var(--text);
    background-color: var(--foreground);
    font-size: 1rem;
    padding: 0.45rem 0.5rem;
}

.login-btn {
    margin: 1vh auto;
    font-size: 1rem;
    color: var(--primary-color);
    border: var(--border-width) solid var(--primary-color);
    padding: 0.45rem 1.3rem;
    background-color: var(--foreground);
    border-radius: var(--border-radius-small);
}

.login-btn:hover {
    background-color: var(--foreground-hover);
}

.signup {
    margin-top: 1vh;
    color: var(--text-light);
}

</style>
