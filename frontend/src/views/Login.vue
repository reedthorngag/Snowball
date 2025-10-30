<script setup lang="ts">


</script>

<template>
    <div class="overlay" @click="close()">

    </div>

</template>

<script lang="ts">
export default {
    emits: ['error', 'close'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },
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
