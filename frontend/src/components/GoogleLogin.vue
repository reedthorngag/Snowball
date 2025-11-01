<!-- Credit to chatgpt for writing this, minor modifications by me  -->

<template>
    <a href="/auth/google">
        <button class="google-btn">
            <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            class="google-logo"
            />
            <span>Sign in with Google</span>
        </button>
    </a>
</template>

<style scoped>
/* ---------- THEME VARIABLES ---------- */
:root {
  --google-btn-bg: #ffffff;
  --google-btn-text: #3c4043;
  --google-btn-border: #dadce0;
  --google-btn-hover-bg: #f8f9fa;
  --google-btn-active-bg: #e8eaed;
  --google-btn-shadow: 0 0.0625rem 0.125rem rgba(60, 64, 67, 0.3),
                       0 0.0625rem 0.1875rem 0.0625rem rgba(60, 64, 67, 0.15);
  --google-btn-shadow-hover: 0 0.0625rem 0.1875rem rgba(60, 64, 67, 0.3),
                             0 0.25rem 0.5rem 0.1875rem rgba(60, 64, 67, 0.15);
}

/* ---------- DARK MODE ---------- */
@media (prefers-color-scheme: dark) {
  :root {
    --google-btn-bg: #202124;
    --google-btn-text: #e8eaed;
    --google-btn-border: #5f6368;
    --google-btn-hover-bg: #292a2d;
    --google-btn-active-bg: #3c4043;
    --google-btn-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.4),
                         0 0.0625rem 0.1875rem 0.0625rem rgba(0, 0, 0, 0.25);
    --google-btn-shadow-hover: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.5),
                               0 0.25rem 0.5rem 0.1875rem rgba(0, 0, 0, 0.35);
  }
}

/* ---------- BUTTON STYLING ---------- */
.google-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem; /* 10px */
  padding: 0.625rem 1rem; /* 10px 16px */
  border-radius: 0.25rem; /* 4px */
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