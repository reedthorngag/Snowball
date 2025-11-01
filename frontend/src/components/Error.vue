
<template>
    <div class="overlay">
        <div class="error">
            <span style="font-weight: 600;">Error: </span>{{ error }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ["error"]
}

</script>

<style scoped>

.overlay {
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    top: 6.5vh;
    left: 0;
    height: fit-content;
    width: 100vw;
}

.error {
    display: block;
    background-color: var(--error-color);
    border-radius: var(--border-radius-small);
    padding: 0.5vh 12vw;
    color: var(--text);
    border: var(--border-color);
    box-shadow: 0 0 0.2vmin #ff0000;
    font-size: 1.15rem;
}

</style>
