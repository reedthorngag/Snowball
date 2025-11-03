<template>
    <h1>hello</h1>
    <div class="comment">

    <div>
      <textarea v-model="body" rows="3"></textarea>
      <div class="edit-actions">
        <button class="save-btn" @click="create">Create</button>
        <button class="cancel-btn" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>

  <replies>

  </replies>

</template>

<script lang="ts">
import axios from 'axios';

export default {
    props: ['post_id', 'parent', 'map'],
    emits: ['close'],
    data() {
        return {
            body: '',
            error: this.error
        }
    },
    methods: {
        async create() {
            const res = await axios.post(`/api/v1/posts/${encodeURIComponent(this.post_id)}/comments${ this.parent ? `/${encodeURIComponent(this.parent._id)}` : ''}`,
                {
                    body: this.body
                });
            if (res.status != 200) {
                this.error = res.data;
                return;
            }

            this.map[res.data._id] = res.data;
            this.parent.replies.push(res.data._id);
            this.$emit('close');
        },
    }
}
</script>

<style scoped>
.comment {
  background-color: var(--foreground);
  color: var(--text);
  border: var(--border-width) solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
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
