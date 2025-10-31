
<template>
    <div class="content-container">
        <div class="vote">
            <button class="up">▲</button>
            <div class="score">{{ post.score }}</div>
            <button class="down">▼</button>
        </div>
        <RouterLink :to="'/posts/'+post._id">
            <div class="body">
                <div class="meta">
                    <span class="community"><RouterLink class="link" :to="'/communities/'+post.community_id">{{ post.community_id }}</RouterLink></span>
                    •
                    <span class="author">user: <RouterLink class="link" :to="'/users/'+post.author_id">{{ post.author_id }}</RouterLink></span>
                    •
                    <span class="time">{{ getTime(post.created_at) }}</span>
                </div>
                <h2 class="title">{{ post.title }}</h2>
                <p class="text">Rust is the programming language equivalent of being micromanaged by an overzealous boss who doesn't trust you to do anything without five layers of bureaucracy. Every time you try to write what should be a simple function, the compiler slaps your hand like an angry schoolteacher yelling, "Lifetime annotations!" And heaven forbid you try to do something as daring as shared mutability—boom, welcome to the borrow checker’s dungeon. Yes, memory safety is important, but Rust achieves it by holding developers hostage with arcane syntax and hours of Stack Overflow searches just to move a variable. It’s like building a spaceship when you just needed a bike.</p>
                <div class="footer">💬 23 comments</div>
            </div>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    props: {
        post: Object
    },
    data() {
        return {
            post: this.post!
        };
    },

    emits: ['error'],
    methods: {
        onError(arg: object) {
            this.$emit('error', arg)
        },

        upvote() {

        },
        downvote() {

        },

        getTime(time: number) {

        }
    }
}

</script>

<style scoped>

.post:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.vote {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    color: var(--primary-color);
    width: 4%;
}

.vote .up, .vote .down {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: inherit;
}

.vote .up:hover, .vote .downvote:hover {
    color: var(--secondary-color);
}

.vote .score {
    margin: 0 0;
    font-weight: 600;
    color: var(--text);
}

.post .body {
    flex: 1;
}

.post .body .meta {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 1vh;
}

.post .body .meta a {
    text-decoration: none;
    color: var(--primary-color);
}

.post .body .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1vh;
    color: var(--text-dark);
}

.post .body .text {
    font-size: 1rem;
    color: var(--text);
    margin-bottom: 1.5vh;
}

.post .body .footer {
    font-size: 0.9rem;
    color: var(--text-lighter);
}

</style>