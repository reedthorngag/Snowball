<script setup lang="ts">


</script>

<template>
    <div class="overlay" @click="close()">

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
