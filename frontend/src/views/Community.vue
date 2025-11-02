<script setup lang="ts">
import '../assets/postStyles.css';
import Feed from '@/components/Feed.vue';

</script>

<template>
    <div class="content-container" style="margin-bottom: 2vh;">
        <div class="body">
            <div class="name">{{ community_id }}</div>
            <div class="meta">
                <span class="community">{{ community.member_count || '0' }} members</span>
                •
                <span class="author">Owner: <RouterLink class="link" :to="'/users/'+encodeURIComponent(community.owner)" style="color: var(--text-lighter)">{{ community.owner }}</RouterLink></span>
                •
                <span class="time">Created {{ getTime(community.birthtime) }}</span>
            </div>
            <p class="text">{{ community.description }}</p>
        </div>
    </div>
    <Feed community />
</template>

<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    props: [
        'community_id'
    ],
    data() {
        return {
            community: {
                member_count: 0,
                owner: '',
                birthtime: 0,
                description: ''
            },
            vote: 0,
            error: this.error
        };
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
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
        const community = await axios.get('/api/v1/communities/'+encodeURIComponent(this.community_id));
        if (community.status != 200) {
            this.error = community.data;
            return;
        }
        this.community = community.data;
    }
}

</script>

<style scoped>
.name {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 2.8vh;
    margin-left: 2vw;
}

.meta span {
    margin: 0 0.3vw;
}

</style>
