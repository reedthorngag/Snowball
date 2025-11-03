<script setup lang="ts">
import Comment from '@/components/Comment.vue';
import CommentCreate from '@/views/CommentCreate.vue';
</script>

<template>
    <div class="info">
        <Button class="button" @click="newComment = true">Add comment</Button>
        <span>{{ num_comments || '0' }} comments</span>
    </div>
    
    <CommentCreate v-if="newComment" :map="commentMap" :post_id="post_id" @close="newComment = false" class="content-container" />

    <Comment v-for="comment of (commentMap as any)?.topLevel" :comment="comment" :map="commentMap" class="content-container" />

</template>

<script lang="ts">
import axios from 'axios';

export default {
    props: ['post_id', 'num_comments'],
    data() {
        return {
            newComment: false,
            error: this.error,
            commentMap: undefined
        }
    },
    async mounted() {
        const res = await axios.get(`/api/v1/posts/${encodeURIComponent(this.post_id)}/comments`);
        if (res.status != 200) {
            this.error = res.data;
            return;
        }

        const commentMap:{topLevel: any[], [key: string]: any} = {
            topLevel: []
        };

        for (let comment of res.data) {

            if (!comment.reply_to)
                commentMap.topLevel.push(comment);
            else
                commentMap[comment._id] = comment;
        }

    }
}

</script>

<style scoped>

.info {
    display: block;
    width: 100%;
}

.info span {
    margin-left: 1vw;
    color: var(--text-lighter);
}

</style>
