<script setup lang="ts">
import GoogleLogin from '@/components/GoogleLogin.vue';



</script>

<template>
    <div class="overlay" @click="close()">

        <div class="container">
            <div class="title">Login</div>
            <input type="username" id="username" placeholder="Username or email">
            <input type="password" id="password" placeholder="password">
            <GoogleLogin />
        </div>
    </div>

</template>

<script lang="ts">
export default {
    data() {
        return {
            error: this.error
        }
    },
    emits: ['error', 'close'],
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>

.overlay {
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #00000040;
}
</style>
