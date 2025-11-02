
<template>
    <div class="overlay">
        <div class="error">
            <span style="font-weight: 600;">Error: </span>{{ typeof error == 'string' ? error : (error.error || String(error)) }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ["error"],
    created() {
        console.log('error:')
        console.log(this.error)
    }
}

</script>

<style scoped>

.overlay {
    z-index: 1001;
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
    background-color: var(--background);
    border-radius: var(--border-radius-small);
    padding: 0.5vh 12vw;
    color: var(--text);
    border: var(--border-color);
    box-shadow: 0 0 0.4vmin #ff0000,
        inset 0 0 1vmin #d00000;
    font-size: 1.15rem;
}

</style>
