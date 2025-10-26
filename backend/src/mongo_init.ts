import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import models from './models.js';

models.UserSchema.index({ user_id: 1 });
models.UserSchema.index({ user_id: "text" });
models.UserSchema.index({ google_id: 1 });
models.UserSchema.index({ email: 1 });

models.CommunitySchema.index({ community_id: "text" });

models.PostSchema.index({ community_id: 1 });
models.PostSchema.index({ author_id: 1 });
models.PostSchema.index({ title: "text" });
models.PostSchema.index({ created_at: -1 });

models.CommentSchema.index({ post_id: 1 });
models.CommentSchema.index({ author_id: 1 });

models.VoteSchema.index({ user_id: 1, post_id: 1, comment_id: 1 });

global.models = {
    User: mongoose.model("User", models.UserSchema),
    Comment: mongoose.model("Community", models.CommunitySchema),
    Comment: mongoose.model("Post", models.PostSchema),
    Comment: mongoose.model("Comment", models.CommentSchema),
    Vote: mongoose.model("Vote", models.VoteSchema)
}


const client = new MongoClient(process.env.DB_URI!);

(async () => {

    const db = client.db();

    // ensure the collection uses a clustered index
    await db.createCollection("post", { clusteredIndex: { key: { _id: 1}, unique: true } });

    await mongoose.connect(process.env.DB_URI!);

})();


