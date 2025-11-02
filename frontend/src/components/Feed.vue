<script setup lang="ts">
import Post from '@/components/Post.vue';
import axios from 'axios';
import { ref } from 'vue';

const posts = ref([]);
</script>

<template>
    <main class="feed">
        <div v-if="posts.length === 0" class="content-container centered">No posts found!</div>
        <Post v-for="post in posts" />
    </main>
</template>

<script lang="ts">
export default {
    props: ['community', 'community_id'],
    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        }
    },

    data() {
        return {
            posts: [],
            error: this.error
        }
    },

    async mounted() {
        const feed = await axios.get(this.community ? `/api/v1/communities/${this.community_id}/feed` : '/api/v1/feed');
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