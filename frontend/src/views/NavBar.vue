<template>
    <header>
        <div class="left">
            <img class="logo-img" src="logo.bmp">
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
</template>

<style>

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5vh;
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
    width: 300px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
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