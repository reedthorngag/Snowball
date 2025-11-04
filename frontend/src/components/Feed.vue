<script setup lang="ts">
import Post from '@/components/Post.vue';
import axios from 'axios';

</script>

<template>
    <main class="feed">
        <div v-if="posts.length === 0" class="content-container centered">No posts found!</div>
        <Post v-for="post of posts" :post="post" />
    </main>
</template>

<script lang="ts">
export default {
    props: ['community_id', 'user_id'],
    emits: ['error'],
    methods: {
    },

    data() {
        return {
            posts: [],
            error: this.error
        }
    },

    async mounted() {
        const feed = await axios.get(
            this.community_id ? `/api/v1/communities/${this.community_id}/feed` : 
            this.user_id ? `/api/v1/users/${this.user_id}/posts` :
            '/api/v1/feed');
        if (feed.status != 200) {
            this.error = feed.data;
            return;
        }
        this.posts = feed.data;
    }
}

</script>

<style scoped>

.centered {
    align-items: center;
    justify-content: center;
}


</style>