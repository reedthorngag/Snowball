<script setup lang="ts">
import logo from '@/assets/logo.bmp';
import Login from '@/views/Login.vue';
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
            <button class="login">Log In</button>
        </div>
  </header>
  <Login />
</template>

<style scoped>

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.5vh;
    padding: 12px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    display: inline-block;
    font-weight: 700;
    font-size: 1.4rem;
    color: #2196f3;
}

.logo-img {
    display: inline-block;
    height: 4vh;
}

header .center .search {
    width: 20vw;
    padding: 2.5% 4%;
    border: 1px solid #ccc;
    border-radius: 1vh;
}

.signup {
    background: transparent;
    color: #2196f3;
    border: 1px solid #2196f3;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.signup:hover {
    background: #e3f2fd;
}

.login {
    background: #2196f3;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
}

.login:hover {
    background: #1976d2;
}

header .left {
    display: flex;
    align-items: center;
    gap: 8px;
}

header .right button {
    margin-left: 10px;
}

</style>