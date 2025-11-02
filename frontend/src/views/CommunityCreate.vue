<script setup lang="ts">
import '../assets/postStyles.css';

</script>

<template>
    <div class="content-container create-community">
        <h2>Create a New Community</h2>

        <div class="form-group">
            <label for="title">Name</label>
            <input id="title" type="text" v-model="name" placeholder="Enter your community name" required @input="availableName"/>
            <div>{{ nameStatus }}</div>
        </div>

        <div class="form-group">
            <label for="body">Description</label>
            <textarea id="body" v-model="description" rows="5" placeholder="Add an optional description"></textarea>
        </div>

        <button class="create-btn" @click="createCommunity()">Create</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            post: undefined,

            name: '',
            description: '',

            nameStatus: '',
            
            loggedIn: this.loggedIn,
            error: this.error,

            lastInput: Date.now()
        };
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },

        async createCommunity() {
            if (!this.name) {
                // @ts-ignore
                this.error = 'Name required';
                return;
            }

            let res = await axios.get('/api/v1/communities/'+encodeURIComponent(this.name));
            if (res.status == 200) {
                // @ts-ignore
                this.error = 'Community already exists!';
                return;
            }

            res = await axios.post('/api/v1/communities/', {
                name: this.name,
                description: this.description
            });

            if (res.status != 200) {
                // @ts-ignore
                this.error = res.data;
                return;
            }

            this.$router.push('/communities/'+encodeURIComponent(res.data.community_id));
        },

        availableName() {
            this.lastInput = Date.now();
            setTimeout(async () => {
                if (Date.now() - this.lastInput < 450) {
                    return;
                }
                const res = await axios.get('/api/v1/communities/'+encodeURIComponent(this.name));
                if (res.status == 200) {
                    this.nameStatus = 'Name taken!';
                    return;
                }

                this.nameStatus = 'Name available';
            }, 500);
        }
    },

    async mounted() {
        setTimeout(() => {
            if (!this.loggedIn) {
                this.$router.push('/login');
                return;
            }
        }, 500);
    }
}

</script>

<style scoped>

.create-community {
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

.create-btn {
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

.create-btn:hover {
    background-color: #288f45;
}

</style>

