<script setup lang="ts">
import '../assets/postStyles.css';

</script>

<template>
    <div class="content-container create-post">
        <h2>Create a New Post</h2>

        <div class="form-group">
            <label for="community">Community</label>
            <input id="community" type="text" v-model="community" placeholder="Search communities..." @focus="showDropdown = true" @focusout="closeCommunityList()" @input="searchCommunities()"/>
            
            <ul v-if="showDropdown" class="dropdown">
                <li v-for="c in communities" @click="community = (c as any).community_id">{{ (c as any).community_id }}</li>
                <li v-if="communities.length === 0" class="no-result">No results found</li>
            </ul>
        </div>

        <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" v-model="title" placeholder="Enter a post title" required/>
        </div>

        <div class="form-group">
            <label for="body">Body</label>
            <textarea id="body" v-model="body" rows="7" placeholder="Write your post..."></textarea>
        </div>

        <div class="form-group file-upload">
            <label for="file">Upload optional image</label>
            <input id="file" type="file" name="resource" accept="image/*" @change="fileChanged"/>
            <button type="button" class="upload-btn" @click="uploadResource()">Upload file</button>
            <span>{{ uploadedStatus }}</span>
        </div>

        <button class="post-btn" @click="createPost()">Post</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    props: ['community_id'],
    data() {
        return {
            post: undefined,

            community: '',
            title: '',
            body: '',
            resource: '',
            file: undefined,
            uploadedStatus: 'No file uploaded',

            showDropdown: false,
            
            vote: 0,
            loggedIn: this.loggedIn,
            currUser: this.currUser,
            newPost: true,
            communities: [],
            error: this.error,

            lastInput: Date.now()
        };
    },

    emits: ['error'],
    methods: {
        closeCommunityList() {
            setTimeout(()=>{this.showDropdown = false},100);
        },

        async createPost() {
            if (!this.community) {
                // @ts-ignore
                this.error = 'Community required';
                return;
            }

            let res = await axios.get('/api/v1/communities/'+encodeURIComponent(this.community));
            if (res.status != 200) {
                // @ts-ignore
                this.error = 'Community doesn\'t exist!';
                return;
            }

            if (!this.title) {
                // @ts-ignore
                this.error = 'Post title required';
                return;
            }

            res = await axios.post('/api/v1/communities/'+encodeURIComponent(this.community)+'/posts', {
                title: this.title,
                body: this.body,
                image: this.resource ? this.resource : undefined
            });

            if (res.status != 200) {
                // @ts-ignore
                this.error = res.data || String(res.status);
                return;
            }

            this.$router.push('/posts/'+encodeURIComponent(res.data._id));
        },

        fileChanged(event: any) {
            // @ts-ignore
            this.file = event.target.files[0];
        },

        async uploadResource() {

            const data = new FormData();
            // @ts-ignore
            data.append('resource', this.file);

            // @ts-ignore
            this.uploadedStatus = 'Uploading '+this.file.name+'...'

            const req = await fetch('/resources', {
                method: 'POST',
                body: data
            });

            if (req.status != 200) {
                // @ts-ignore
                this.error = req.body;
                this.uploadedStatus = 'Failed!';
                return;
            }

            const body = await req.json();

            // @ts-ignore
            this.resource = body.id;
            // @ts-ignore
            this.uploadedStatus = 'Uploaded '+this.file.name
        },

        searchCommunities() {
            this.lastInput = Date.now();
            setTimeout(async () => {
                if (Date.now() - this.lastInput < 450) {
                    return;
                }
                const res = await axios.get(
                    this.community ? 
                    '/api/v1/search/communities?s='+encodeURIComponent(this.community) : 
                    '/api/v1/communities');
                if (res.status != 200) {
                    this.error = res.data || String(res.status);
                    return;
                }

                this.communities = res.data;
            }, 500);
        }
    },

    async mounted() {

        if (this.community_id)
            this.community = this.community_id;

        setTimeout(() => {
            if (!this.loggedIn) {
                this.$router.push('/login');
                return;
            }
        }, 500);
        if (window.location.pathname == '/posts/create')
            return;
        
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

.create-post {
    color: var(--text);
}

h2 {
    text-align: center;
    margin-bottom: 1.5rem;
}

.form-group {
    display: block;
    margin-bottom: 1rem;
    position: relative;
}

label {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 1rem;
}

input,
textarea {
    width: 100%;
    padding: 0.6rem;
    font-size: 1rem;
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
    background-color: var(--foreground);
    color: var(--text);
}

.dropdown {
  position: absolute;
  width: 100%;
  max-height: 10rem;
  overflow-y: auto;
  background: var(--background);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius);
  margin-top: 0.25rem;
  z-index: 10;
  list-style: none;
  padding: 0;
}

.dropdown li {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: var(--foreground-hover);
}

.no-result {
  padding: 0.5rem;
  color: var(--text-light);
}

.file-upload {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.upload-btn {
    background: transparent;
    color: var(--primary-color);
    border: var(--border-width) solid var(--primary-color);
    padding: 1vh 1vw;
    border-radius: var(--border-radius-smaller);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.upload-btn:hover {
    background-color: var(--primary-muted);
}

.file-name {
    font-size: 0.9rem;
    color: var(--text);
}

.preview {
    margin: 1rem 0;
    text-align: center;
}

.preview img {
    max-width: 100%;
    border-radius: 0.5rem;
    border: var(--border-width) solid var(--border-color);
}

.post-btn {
    display: block;
    width: 100%;
    background-color: #2ea84e;
    color: var(--text);
    font-size: 1.1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;
}

.post-btn:hover {
    background-color: #288f45;
}

</style>

