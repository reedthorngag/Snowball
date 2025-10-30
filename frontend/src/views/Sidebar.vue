<script setup lang="ts">
import axios from 'axios';

</script>


<template>
    <div class="sidebar">
        <div class="sidebar-list">
            <span class="title">Communities</span>
            <p v-if="(communities.data as string | null)?.length === 0">No communities found</p>
            <a v-for="community in communities.data" :href="'/communities/'+community">
                {{community}}
            </a>
        </div>
    </div class="sidebar">
</template>

<script lang="ts">

export default {
    data() {
        return  {
            communities: {
                data: null
            }
        }
    },
    mounted: async function () {
        const data = await axios.get('/api/v1/communities');
        if (data.status != 200) {
            this.$emit('error', data.data);
            return;
        }
        this.communities.data = data.data;
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
}

.sidebar-list {
    margin-bottom: 18px;
}

.sidebar-list .title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--title-secondary);
    margin-bottom: 1.5vh;
    display: block;
}

.sidebar a {
    display: block;
    padding: 0.8vh 0.8vw;
    border-radius: var(--border-radius-small);
    text-decoration: none;
    color: var(--text-dark);
    transition: background 0.2s;
}

.sidebar a:hover {
    background: var(--foreground-hover);
    color: var(--primary-color);
}
</style>