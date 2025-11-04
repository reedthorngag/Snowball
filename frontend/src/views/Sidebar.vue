<script setup lang="ts">
import axios from 'axios';

</script>


<template>
    <div class="sidebar">
        <span class="title">Communities</span>
        <RouterLink v-if="loggedIn" to="/communities/create">
            <Button class="create-community">Create new</Button>
        </RouterLink>
        <div class="sidebar-list">
            <p v-if="(communities as string | null)?.length === 0">No communities found</p>
            <RouterLink v-for="community in communities" :to="'/communities/'+(community as any).community_id">
                {{(community as any).community_id}}
            </RouterLink>
        </div>
    </div class="sidebar">
</template>

<script lang="ts">

export default {
    data() {
        return  {
            communities: null,
            loggedIn: this.loggedIn
        }
    },
    mounted: async function () {
        const data = await axios.get('/api/v1/communities');
        if (data.status != 200) {
            // @ts-ignore
            this.error = data.data;
            return;
        }
        this.communities = data.data;
    },
    methods: {
    },

    emits: ['error']
}

</script>

<style scoped>
.sidebar {
    background: var(--foreground);
    padding: 2vh 1.5vw;
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--border-color);
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidebar .title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 1vh;
    display: block;
}

.create-community {
    background: transparent;
    color: var(--primary-color);
    border: var(--border-width) solid var(--primary-color);
    padding: 0.8vh 1vw;
    border-radius: var(--border-radius-smaller);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: none;
}

.create-community:hover {
    background: var(--foreground-hover);
}

.sidebar-list {
    margin-top: 2vh;
    margin-bottom: 2vh;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    color: var(--text);
}

.sidebar-list a {
    display: block;
    padding: 0.8vh 0.8vw;
    border-radius: var(--border-radius-small);
    text-decoration: none;
    color: var(--text-dark);
    transition: background 0.2s;
}

.sidebar-list a:hover {
    background: var(--foreground-hover);
    color: var(--primary-color);
}
</style>