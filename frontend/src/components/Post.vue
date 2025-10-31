<script setup lang="ts">
import '../assets/postStyles.css';

</script>

<template>
    <div class="content-container">
        <div class="vote">
            <button class="up" :class="{selected: vote===1}">▲</button>
            <div class="score">{{ post.score }}</div>
            <button class="down" :class="{selected: vote===-1}">▼</button>
        </div>
        <RouterLink :to="'/posts/'+encodeURIComponent(post._id)">
            <div class="body">
                <div class="meta">
                    <span class="community"><RouterLink class="link" :to="'/communities/'+encodeURIComponent(post.community_id)">{{ post.community_id }}</RouterLink></span>
                    •
                    <span class="author">user: <RouterLink class="link" :to="'/users/'+encodeURIComponent(post.author_id)">{{ post.author_id }}</RouterLink></span>
                    •
                    <span class="time">{{ getTime(post.created_at) }}</span>
                </div>
                <h2 class="title">{{ post.title }}</h2>
                <p class="text" style="max-height: 15vh; text-overflow: ellipsis;">{{ post.body }}</p>
                <img :src="'/resources/'+post.image" />
                <div class="footer">💬 {{ post.num_comments }}</div>
            </div>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    props: {
        post: Object
    },
    data() {
        return {
            post: this.post!,
            vote: 0
        };
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },

        async upvote() {
            const req = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: 1});
            if (req.status != 200) {
                this.$emit('error', req.data);
                return;
            }
            this.vote = 1;
        },
        async downvote() {
            const req = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: 1});
            if (req.status != 200) {
                this.$emit('error', req.data);
                return;
            }
            this.vote = -1;
        },

        getTime(time: number): string {
            const diff = Date.now() - time;
            if (diff < 1000 * 60) return 'A few seconds ago';
            if (diff < 1000 * 60 * 60) {
                const mins = Math.round(diff / (1000 * 60));
                return mins + ' minute'+((mins>1) ? 's' : '') + 'ago';
            }
            if (diff < 1000 * 60 * 60 * 24) {
                const hours = Math.round(diff / (1000 * 60 * 60));
                return hours + ' hour'+((hours>1) ? 's' : '') + 'ago';
            }
            if (diff < 1000 * 60 * 60 * 24 * 30) { // close enough
                const days = Math.round(diff / (1000 * 60 * 60 * 24));
                return days + ' day'+((days>1) ? 's' : '') + 'ago';
            }
            if (diff < 1000 * 60 * 60 * 24 * 365) {
                const months = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
                return months + ' month'+((months>1) ? 's' : '') + 'ago';
            }
            if (diff >= 1000 * 60 * 60 * 24 * 365) {
                const years = Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 365));
                return years + ' year'+((years>1) ? 's' : '') + 'ago';
            }
            return 'Unknown time';
        }
    }
}

</script>

