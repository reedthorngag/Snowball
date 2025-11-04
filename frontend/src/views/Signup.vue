<script setup lang="ts">
import GoogleLogin from '@/components/GoogleLogin.vue';
import axios from 'axios';
import { ref } from 'vue';

</script>

<template>
    <transition name="fade">
        <div class="overlay" @click="googleLogin || close()">

            <div class="container" @click="e => e.stopPropagation()">
                <div class="title">Sign up</div>
                <GoogleLogin v-if="!googleLogin" style="margin: 1vh 0;" text="Sign up with Google" />
                <hr v-if="!googleLogin" style="border-top: var(--border-width) solid var(--text-light); width: 80%; margin: 1vh 0;"></hr>
                <form @submit.prevent="signup()">
                    <input type="username" id="username" v-model="username" placeholder="Username" required>
                    <input v-if="!googleLogin" type="email" v-model="email" placeholder="Email" required>
                    <input v-if="!googleLogin" type="password" v-model="password" placeholder="password" required>
                    <input v-if="!googleLogin" type="password" v-model="passwordConfirm" placeholder="confirm password" required>
                    <div style="width: 100%; display: flex; flex-direction: column; justify-content: center;">
                        <Button type="Submit" class="login-btn">Sign up</Button>
                    </div>
                </form>
                <RouterLink v-if="!googleLogin" to="/login" class="signup" @click="$emit('showLogin')">log in</RouterLink>
                
            </div>
        </div>
    </transition>

</template>

<script lang="ts">

export default {
    data() {
        return {
            error: this.error,
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            loggedIn: this.loggedIn,
            googleLogin: false,
            showLogin: this.showLogin
        }
    },
    emits: ['error', 'close', 'showLogin'],
    methods: {
        close() {
            this.$emit('close');
        },
        async signup() {
            if (this.loggedIn) {
                // @ts-ignore
                this.error = 'already logged in!';
                return;
            }

            if (this.password != this.passwordConfirm) {
                // @ts-ignore
                this.error = "Passwords don't match!";
                return;
            }

            const res = await axios.post('/api/v1/signup', {
                username: this.username,
                email: this.email ? this.email : undefined,
                password: this.password ? this.password : undefined
            });
            
            this.password = '';
            this.passwordConfirm = '';
            if (res.status != 200) {
                console.log(res.data.error);
                if (res.status == 422 && res.data.error == 'invalid auth') {
                    document.cookie = 'auth=; max-age=-1; path=/';
                    this.username = '';
                    this.googleLogin = false;
                    // @ts-ignore
                    this.error = 'Auth token expired!';
                }

                this.error = res.data || String(res.status);
                return; 
            }
            this.username = '';
            this.email = '';

            document.cookie = res.data.cookie;
            window.location.href = '/';
        }
    },
    created() {
        console.log('hello')
        if (!this.loggedIn && document.cookie.includes('auth=')) {
            this.googleLogin = true;
            console.log('hello')
        }
    }
    
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
    padding: 2rem 4rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
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
