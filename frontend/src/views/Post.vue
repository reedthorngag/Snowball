<script setup lang="ts">
import '../assets/postStyles.css';
import Comments from '@/views/Comments.vue';

</script>

<template>
    <div class="content-container post" v-if="loaded">
        <div class="vote">
            <button class="up" :class="vote==1 ? 'selected' : 'none'" @click="upvote()">▲</button>
            <div class="score">{{ post.score || '0' }}</div>
            <button class="down" :class="vote==-1 ? 'selected' : 'none'" @click="downvote()">▼</button>
        </div>
        <div class="body">
            <div class="meta">
                <span class="community">community: <RouterLink class="link" :to="'/communities/'+encodeURIComponent(post.community_id)">{{ post.community_id }}</RouterLink></span>
                •
                <span class="author">user: <RouterLink class="link" :to="'/users/'+encodeURIComponent(post.author_id)">{{ post.author_id }}</RouterLink></span>
                •
                <span class="time">{{ getTime(post.created_at) }}</span>
            </div>
            <h2 class="title">{{ post.title }}</h2>
            <div v-if="post.image" class="centered">
                <img :src="'/resources/'+post.image" />
            </div>
            <p class="text">{{ post.body }}</p>
        </div>
    </div>
    <Comments v-if="post._id" :post_id="post._id" :num_comments="post.num_comments" />
</template>

<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    props: [
        'post_id'
    ],
    data() {
        return {
            post: {
                _id: '',
                score: 0,
                community_id: 'loading',
                author_id: 'loading',
                created_at: 0,
                title: 'loading',
                body: 'loading',
                image: '',
                video: '',
                num_comments: 0
            },
            comments: [],
            loaded: false,
            vote: 0,
            error: this.error
        };
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },

        async upvote() {
            console.log('hi')
            if (!this.loaded) return;
            const res = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: this.vote==1 ? 0 : 1});
            if (res.status != 200) {
                this.error = res.data;
                return;
            }
            this.post.score = res.data.score ?? this.post.score;
            this.vote = this.vote==1 ? 0 : 1;
        },
        async downvote() {
            if (!this.loaded) return;
            const res = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: this.vote==-1 ? 0 : -1});
            if (res.status != 200) {
                this.error = res.data;
                return;
            }
            this.post.score = res.data.score ?? this.post.score;
            this.vote = this.vote==-1 ? 0 : -1;
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
    },

    async mounted() {
        const post = await axios.get('/api/v1/posts/'+encodeURIComponent(this.post_id));
        if (post.status != 200) {
            this.error = post.data;
            return;
        }
        this.post = post.data;
        this.loaded = true;

        const comments = await axios.get('/api/v1/posts/'+encodeURIComponent(this.post_id)+'/comments');
        if (comments.status != 200) {
            this.error = comments.data;
            return;
        }
        this.comments = comments.data;

        const vote = await axios.get('/api/v1/posts/'+encodeURIComponent(this.post_id)+'/vote');
        if (vote.status == 200) {
            this.vote = vote.data.vote;
        }
    }
}

</script>

