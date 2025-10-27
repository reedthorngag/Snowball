<script setup lang="ts">


</script>

<template>
    <div class="overlay" @click="close()">

    </div>

</template>

<script lang="ts">
export default {
    methods: {
        close() {
            this.$emit('closeLogin');
        }
    }
}
</script>

<style scoped>

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #00000040;
}
</style>
