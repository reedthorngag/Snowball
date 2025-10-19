import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    user_id: String,
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

const CommunitySchema = new Schema({
    community_id: String,
    owner: String,
    mods: [String],
    birthtime: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
});

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

const VoteSchema = new Schema({
    user_id: ObjectId,
    post_id: ObjectId,
    comment_id: ObjectId,
    date: {type: Date, default: Date.now, expires: 20 * 24 * 60 * 60},
    vote: Number,
});

export default {
    users: UserSchema,
    community: CommunitySchema,
    posts: PostSchema,
    comments: CommentSchema,
    votes: VoteSchema,

    UserSchema: UserSchema,
    CommunitySchema: CommunitySchema,
    PostSchema: PostSchema,
    CommentSchema: CommentSchema,
    VoteSchema: VoteSchema
}
