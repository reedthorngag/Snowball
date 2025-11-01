<script setup lang="ts">
import '../assets/postStyles.css';

</script>

<template>
    <div class="content-container">
        <div class="body">
            <div v-if="newPost">
                <input type="text" id="community" list="communities" placeholder="select community" />
                <datalist id="communities">
                    <option v-for="community in communities" :value="community" />
                </datalist>
            </div>

            <input type="text" id="title" placeholder="post title" :value="post.title"/>
            <input type="textarea" id="body" placeholder="post body" :value="post.body"/>

            <input type="hidden" name="resource" id="resource">

            <form v-if="newPost" id="resource-upload" enctype="multipart/form-data" method="post">
                <input type="file" id="resource-input" name="resource">
                <input type="button" value="upload" @click="uploadResource()">
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            post: {
                _id: 'undefined',
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
            loggedIn: this.loggedIn,
            currUser: this.currUser,
            newPost: true,
            communities: [],
            error: this.error
        };
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },

        async upvote() {
            if (!this.loaded) return;
            const req = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: 1});
            if (req.status != 200) {
                this.error = req.data;
                return;
            }
            this.vote = 1;
        },
        async downvote() {
            if (!this.loaded) return;
            const req = await axios.put('/api/v1/posts/'+encodeURIComponent(this.post._id)+'/vote', {vote: 1});
            if (req.status != 200) {
                this.error = req.data;
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
        },

        validatePost() {

        },

        async uploadResource() {

            const data = new FormData();
            // @ts-ignore
            data.append('resource', document.getElementById('resource-input')!.files[0]);

            const req = await fetch('/resources', {
                method: 'POST',
                body: data
            });

            if (req.status != 200) {
                // @ts-ignore
                this.error = req.body;
                return;
            }

            // @ts-ignore
            document.getElementById('resource').value = req.body.id;
        }
    },

    async mounted() {
        if (!this.loggedIn) {
            this.$router.push('/login');
            return;
        }
        const post = await axios.get('/api/v1/posts/'+encodeURIComponent(this.$route.path.substring(this.$route.path.lastIndexOf('/'))));
        if (post.status != 404) {

            if (post.status != 200) {
                this.error = post.data;
                return;
            }
            
            // @ts-ignore
            if (this.currUser.user_id != post.data.user_id) {
                // @ts-ignore
                this.error = 'Only the author of a post can edit it';
                return;
            }
            
            this.post = post.data;
        }

        const communities = await axios.get('/api/v1/communities');
        if (communities.status != 200) {
            this.error = communities.data;
            return;
        }

        this.communities = communities.data;
    }
}

</script>

<style scoped>

input {
    width: 20vw;
    padding: 2.5% 4%;
    border: var(--border-width) solid var(--input-border-color);
    border-radius: var(--border-radius-smaller);
    background: var(--foreground);
}
</style>

