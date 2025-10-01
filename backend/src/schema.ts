import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    _id: String,
    google_id: String,
    email: String,
    password: String,
    admin: {type: Boolean, default: false},
    communities: [String],
    mod_of: [String],
    birthtime: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
});

UserSchema.index({ _id: "text" });
UserSchema.index({ google_id: 1 });
UserSchema.index({ email: 1 });

const CommunitySchema = new Schema({
    _id: String,
    owner: String,
    mods: [String],
    birthtime: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
});

CommunitySchema.index({ _id: "text" });

const PostSchema = new Schema({
    community_id: String,
    author_id: ObjectId,
    title: String,
    created_at: {type: Date, default: Date.now},
    image: String,
    video: String,
    body: String,
    num_comments: {type: Number, default: 0},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    edited: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false},
    deleted_by: String,
});

PostSchema.index({ community_id: 1 });
PostSchema.index({ author_id: 1 });
PostSchema.index({ title: "text" });
PostSchema.index({ created_at: -1 });

const CommentSchema = new Schema({
    post_id: ObjectId,
    author_id: ObjectId,
    body: String,
    reply_to: String,
    replies: [String],
    created_at: {type: Date, default: Date.now},
    edited: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false},
    deleted_by: String,
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
});

CommentSchema.index({ post_id: 1 });
CommentSchema.index({ author_id: 1 });

const VoteSchema = new Schema({
    user_id: ObjectId,
    post_id: ObjectId,
    comment_id: ObjectId,
    date: {type: Date, default: Date.now, expires: 20 * 24 * 60 * 60},
    vote: Number,
});

VoteSchema.index({ user_id: 1, post_id: 1, comment_id: 1 });


model("User", UserSchema);
model("Community", CommunitySchema);
model("Post", PostSchema);
model("Comment", CommentSchema);
model("Vote", VoteSchema);

