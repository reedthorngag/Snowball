
<template>
    <div class="overlay">
        <div class="error">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ["error"]
}

</script>

<style scoped>

</style>
