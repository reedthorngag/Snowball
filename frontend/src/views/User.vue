<script setup lang="ts">
import '../assets/postStyles.css';
import Feed from '@/components/Feed.vue';

</script>

<template>
    <div class="content-container" style="margin-bottom: 2vh;">
        <div class="body">
            <div class="name">{{ user_id }}</div>
            <div v-if="user.description || isOwner" style="margin-bottom: 1vh; width: 80%;">
                <div v-if="isOwner" class="edit-actions" style="margin-bottom: 0.5vh;">
                    <button v-if="editing" class="save-btn" @click="saveEdit">Save</button>
                    <button v-if="editing" class="cancel-btn" @click="editing = false">Cancel</button>
                    <button v-if="!editing" class="button edit-btn" @click="editing = true">Edit</button>
                </div>
                <textarea 
                    v-model="user.description" 
                    :class="'description'+(editing ? ' active' : '')" rows="3" 
                    :disabled="!editing && !isOwner" 
                    :placeholder="isOwner && !user.description ? 'Add a description...' : ''" 
                    @click="() => {editing = true}">
                </textarea>
            </div>
            <div class="meta">
                <span class="time">Joined {{ getTime(user.birthtime) }}</span>
            </div>
        </div>
    </div>
    <div class="info">
        <Button class="button" @click="$router.push('/users/'+encodeURIComponent(user_id)+'/posts/create')">Create post</Button>
    </div>
    <Feed :user_id="user_id" :key="user_id" />
</template>

<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    props: [
        'user_id'
    ],
    data() {
        return {
            user: {
                user_id: '',
                birthtime: 0,
                description: ''
            },
            error: this.error,
            editing: false,
            isOwner: false,
            currUser: this.currUser,
            description: ''
        };
    },

    emits: ['error'],
    methods: {
        async saveEdit() {
            if (this.description == this.user.description) {
                this.editing = false;
                return;
            }
                

            const res = await axios.put(`/api/v1/users/${encodeURIComponent(this.user_id)}`,
                {
                    description: this.user.description
                });
            if (res.status != 200) {
                this.error = res.data;
                return;
            }

            this.editing = false;
            this.user.description = res.data.description;
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
        const user = await axios.get('/api/v1/users/'+encodeURIComponent(this.user_id));
        if (user.status != 200) {
            this.error = user.data;
            return;
        }
        this.user = user.data;
        this.description = user.data.description;

        setTimeout(() => {
            // @ts-ignore
            if (this.user.user_id == this.currUser!.user_id)
                this.isOwner = true;
        }, 500);
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

.info {
    display: block;
    width: 100%;
    margin-bottom: 1vh;
    margin-left: 0.75vw;
}

textarea {
    width: 100%;
    padding: 0.6rem;
    font-size: 1rem;
    margin-left: 0.8vw;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--background);
    color: var(--text);
    resize: none;
    white-space: pre;
}

.active {
    border: var(--border-width) solid var(--border-color);
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.save-btn,
.cancel-btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.save-btn {
  background-color: #2ea84e;
  color: var(--text-dark);
}

.save-btn:hover {
    background-color: #288f45;
}

.cancel-btn {
  background-color: var(--background);
  color: var(--text);
}

.cancel-btn:hover {
    background-color: var(--foreground-hover);
}

.edit-btn {
    padding: 0.5vh 0.5vw;
}

</style>
