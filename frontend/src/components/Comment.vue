<template>
    <div :class="'comment' +comment ? ' content-container' : ''">
        <div class="comment-header">
            <span class="author">{{ comment.author_id }}</span>
            <span class="time">{{ getTime(comment.created_at) }}</span>
        </div>

        <div v-if="editing">
            <textarea v-model="editText" rows="3"></textarea>
            <div class="edit-actions">
            <button class="save-btn" @click="saveEdit">Save</button>
            <button class="cancel-btn" @click="editing = false">Cancel</button>
            </div>
        </div>
        <p v-else class="comment-body">{{ comment.body }}</p>

        <div class="comment-actions">
            <button class="action-btn reply" @click="reply = true">Reply</button>
            <button v-if="isAuthor" class="action-btn edit" @click="editText = comment.body; editing = true">Edit</button>
            <button v-if="isAuthor" class="action-btn delete" @click="deleteComment">Delete</button>
        </div>
        
        <div class="replies">
            
            <h1>{{reply}}</h1>
            <CommentCreate v-if="reply" :parent="comment" :map="map" @close="reply = false" />
            
            <Comment v-for="c of replies" :comment="c" :map="map" />
        </div>
    </div>

</template>

<script lang="ts">
import Comment from '@/components/Comment.vue';
import CommentCreate from '@/components/CommentCreate.vue';
import axios from 'axios';

export default {
    props: ['comment', 'map'],
    data() {
        return {
            editing: false,
            editText: '',
            reply: false,
            error: this.error,
            isAuthor: false,
            replies: [],
            currUser: this.currUser
        }
    },
    mounted() {

        setTimeout(() => {

            // @ts-ignore
            if (this.comment.author_id == this.currUser.user_id) {
                this.isAuthor = true;
            }

            const replies = [];

            for (let comment_id of this.comment.replies)
                replies.push(this.map[comment_id]);
            
            replies.sort((a, b): number => {
                const scoreCompare = b.score - a.score;
                if (scoreCompare != 0) return scoreCompare;

                return Date.parse(a.created_at) - Date.parse(b.created_at);
            });

            (this.replies as any) = replies;
        }, 500);
    },
    methods: {
        async saveEdit() {
            const res = await axios.put(`/api/v1/posts/${encodeURIComponent(this.comment.post_id)}/comments/${encodeURIComponent(this.comment._id)}`,
                {
                    body: this.editText
                });
            if (res.status != 200) {
                this.error = res.data;
                return;
            }

            this.editing = false;
            this.comment.body = res.data.body;
            this.comment.edited = true;
            this.comment.edited_at = res.data.edited_at;
        },

        async deleteComment() {
            const res = await axios.delete(`/api/v1/posts/${encodeURIComponent(this.comment.post_id)}/comments/${encodeURIComponent(this.comment._id)}`);
            if (res.status != 200) {
                this.error = res.data;
                return;
            }

            this.comment.author_id = res.data.author_id;
            this.comment.body = res.data.body;
            this.comment.deleted = true;
            this.comment.deleted_by = res.data.deleted_by;
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
    }
}
</script>

<style scoped>

.replies {
    display: block;
    
}

.comment {
  color: var(--text);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text--lighter);
}

.author {
  font-weight: 600;
}

.time {
  color: var(--text-light);
  font-size: 0.85rem;
}

.comment-body {
  margin: 0.5rem 0 0.75rem 0;
  white-space: pre-wrap;
}

textarea {
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--text);
  background-color: var(--background);
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.action-btn:hover {
  background-color: var(--border-color);
}

.reply {
  color: #1a73e8;
}

.edit {
  color: #f9ab00;
}

.delete {
  color: #d93025;
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
  color: var(--text);
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



</style>
