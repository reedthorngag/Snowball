<script setup lang="ts">
import '../assets/postStyles.css';
import Feed from '@/components/Feed.vue';
import { getCurrentInstance, onMounted } from 'vue'

const appContext = getCurrentInstance()?.appContext!;
const globals = appContext.config.globalProperties;

const props = defineProps({community_id: String});

const currUser = globals.currUser   // already a ref
const error = globals.error

const community = reactive({
  member_count: 0,
  owner: '',
  birthtime: 0,
  description: ''
})

const editing = ref(false)
const editText = ref('')
const isOwner = ref(false)
const description = ref('')
const joined = ref(false)

async function init() {
    const res = await axios.get('/api/v1/communities/'+encodeURIComponent(props.community_id!));
    if (res.status != 200) {
        error.value = res.data;
        return;
    }
    Object.assign(community, res.data);
    description.value = res.data.description;

    setTimeout(() => {

        if (community.owner == {...currUser.value}?.user_id) {
            isOwner.value = true;
        }

        joined.value = {...currUser.value}?.communities?.includes(props.community_id) ?? false;
    }, 500);
}

watch(() => props.community_id, (newVal, oldVal) => {
    init();
});

onMounted(() => init());

</script>

<template>
    <div class="content-container" style="margin-bottom: 2vh;">
        <div class="body" style="position: relative;">
            <button v-if="!isOwner && currUser" class="button join-btn" @click="toggleJoinCommunity()">{{ joined ? 'leave' : 'join' }}</button>
            <div class="name">{{ community_id }}</div>
            <div v-if="community.description || isOwner" style="margin-bottom: 1vh; width: 80%;">
                <div v-if="isOwner" class="edit-actions" style="margin-bottom: 0.5vh;">
                    <button v-if="editing" class="save-btn" @click="saveEdit">Save</button>
                    <button v-if="editing" class="cancel-btn" @click="editing = false">Cancel</button>
                    <button v-if="!editing" class="button edit-btn" @click="editing = true">Edit</button>
                </div>
                <textarea 
                    v-model="community.description" 
                    :class="'description'+(editing ? ' active' : '')" rows="3" 
                    :disabled="!editing && !isOwner" 
                    :placeholder="isOwner && !community.description ? 'Add a description...' : ''" 
                    @click="() => {editing = true}">
                </textarea>
            </div>
            <div class="meta">
                <span class="community">{{ community.member_count || '0' }} members</span>
                •
                <span class="author">Owner: <RouterLink class="link" :to="'/users/'+encodeURIComponent(community.owner)" style="color: var(--text-lighter)">{{ community.owner }}</RouterLink></span>
                •
                <span class="time">Created {{ getTime(community.birthtime) }}</span>
            </div>
        </div>
    </div>
    <div class="info">
        <Button class="button" @click="$router.push('/posts/create')">Create post</Button>
    </div>
    <Feed :community_id="community_id" :key="community_id" />
</template>

<script lang="ts">
import axios from 'axios';
import { reactive, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            community: {
                member_count: 0,
                owner: '',
                birthtime: 0,
                description: ''
            },
            vote: 0,
            error: this.error,
            editing: false,
            editText: '',
            isOwner: false,
            currUser: this.currUser,
            description: '',
            joined: false
        };
    },

    emits: ['error'],
    methods: {

        async toggleJoinCommunity() {

            const res = await axios.put(`/api/v1/communities/${props.community_id}/${this.joined ? 'leave' : 'join'}`);
            if (res.status != 200) {
                this.error = res.data || String(res.status);
                return;
            }

            // @ts-ignore
            if (this.currUser?.communities)
                // @ts-ignore
                this.currUser.communities = res.data.communities;
            this.joined = !this.joined;
            this.community.member_count += this.joined ? 1 : -1
        },

        async saveEdit() {
            if (this.description == this.community.description) {
                this.editing = false;
                return;
            }
                

            const res = await axios.put(`/api/v1/communities/${encodeURIComponent(props.community_id!)}`,
                {
                    description: this.community.description
                });
            if (res.status != 200) {
                this.error = res.data || String(res.status);
                return;
            }

            this.editing = false;
            this.community.description = res.data.description;
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
}

</script>

<style scoped>

.join-btn {
    position: absolute;
    right: 0.75vw;
    border-radius: var(--border-radius);
}

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
