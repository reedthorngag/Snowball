<!-- Credit to chatgpt for writing this, minor modifications by me  -->

<template>
    <a href="/auth/google">
        <button class="google-btn">
            <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            class="google-logo"
            />
            <span v-if="!text">Sign in with Google</span>
            <span v-else>{{ text }}</span>

        </button>
    </a>
</template>

<script lang="ts">
export default {
    props: ['text']
}
</script>

<style scoped>

/* ---------- BUTTON STYLING ---------- */
.google-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem; /* 10px */
  padding: 0.62rem 1rem; /* 10px 16px */
  border-radius: 0.3rem; /* 4px */
  border: 1px solid var(--google-btn-border);
  background-color: var(--google-btn-bg);
  color: var(--google-btn-text);
  font-size: 1rem; /* 16px */
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--google-btn-shadow);
}

.google-btn:hover {
  background-color: var(--google-btn-hover-bg);
  box-shadow: var(--google-btn-shadow-hover);
}

.google-btn:active {
  background-color: var(--google-btn-active-bg);
}

.google-logo {
  width: 1.25rem; /* 20px */
  height: 1.25rem;
}
</style>