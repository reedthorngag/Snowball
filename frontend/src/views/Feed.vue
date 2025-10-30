<script setup lang="ts">
import Post from '@/components/Post.vue';
import axios from 'axios';
import { ref } from 'vue';

const posts = ref([]);
</script>

<template>
    <main class="feed">
        <div v-if="posts.length === 0" class="post">No posts found!</div>
        <Post v-for="post in posts" />
    </main>
</template>

<script lang="ts">
export default {
    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        }
    },

    data() {
        return {
            posts: []
        }
    },

    async mounted() {
        const feed = await axios.get('/api/v1/feed');
        if (feed.status != 200) {
            this.$emit('error', feed.data);
            return;
        }
        this.posts = feed.data;
    }
}

</script>

<style scoped>

.post {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s;

    color: #111827;

    align-items: center;
    justify-content: center;
}


</style>