<script setup lang="ts">
import '../assets/postStyles.css';

</script>

<template>
    <div @click="$router.push('/posts/'+encodeURIComponent(post._id))">
        <div class="content-container post">
            <div class="vote">
                <button class="up" :class="vote==1 ? 'selected' : 'none'" @click="e => {upvote();e.stopPropagation()}">▲</button>
                <div class="score">{{ post.score || '0' }}</div>
                <button class="down" :class="vote==-1 ? 'selected' : 'none'" @click="e => {downvote();e.stopPropagation()}">▼</button>
            </div>
            <div class="body">
                <div class="meta">
                    <span class="community" @click="e=>e.stopPropagation()"><RouterLink class="link" :to="'/communities/'+encodeURIComponent(post.community_id)">{{ post.community_id }}</RouterLink></span>
                    •
                    <span class="author" @click="e=>e.stopPropagation()">user: <RouterLink class="link" :to="'/users/'+encodeURIComponent(post.author_id)">{{ post.author_id }}</RouterLink></span>
                    •
                    <span class="time">{{ getTime(post.created_at) }}</span>
                </div>
                <h2 class="title">{{ post.title }}</h2>
                <div v-if="post.image" class="centered">
                    <img :src="'/resources/'+post.image" />
                </div>
                <p class="text" :style="`max-height: 15vh;`">{{ post.body }}</p>
                <div class="footer">💬 {{ post.num_comments }} comments</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    props: ['post'],
    data() {
        return {
            vote: 0,
            error: this.error
        };
    },
    mounted() {
        console.log(this.post)
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },

        async upvote() {
            const res = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: this.vote==1 ? 0 : 1});
            if (res.status != 200) {
                this.error = res.data || String(res.status);
                return;
            }
            this.post.score = res.data.score || this.post.score;
            this.vote = 1;
        },
        async downvote() {
            const res = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: this.vote==-1 ? 0 : -1});
            if (res.status != 200) {
                this.error = res.data || String(res.status);
                return;
            }
            this.post.score = res.data.score || this.post.score;
            this.vote = -1;
        },

        getTime(time: string | number): string {
            time = Date.parse(time as string)
            const diff = Date.now() - time as number;
            if (diff < 1000 * 60) return 'A few seconds ago';
            if (diff < 1000 * 60 * 60) {
                const mins = Math.round(diff / (1000 * 60));
                return mins + ' minute'+((mins>1) ? 's' : '') + ' ago';
            }
            if (diff < 1000 * 60 * 60 * 24) {
                const hours = Math.round(diff / (1000 * 60 * 60));
                return hours + ' hour'+((hours>1) ? 's' : '') + ' ago';
            }
            if (diff < 1000 * 60 * 60 * 24 * 30) { // close enough
                const days = Math.round(diff / (1000 * 60 * 60 * 24));
                return days + ' day'+((days>1) ? 's' : '') + ' ago';
            }
            if (diff < 1000 * 60 * 60 * 24 * 365) {
                const months = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
                return months + ' month'+((months>1) ? 's' : '') + ' ago';
            }
            if (diff >= 1000 * 60 * 60 * 24 * 365) {
                const years = Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 365));
                return years + ' year'+((years>1) ? 's' : '') + ' ago';
            }
            return 'Unknown time';
        }
    }
}

</script>

