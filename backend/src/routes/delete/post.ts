import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_post } from "../../util/cache.js";

const del:Route = ['/posts/:post_id', 'DELETE', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const post = await get_post(req.params.post_id);
    // const post = await global.models.Post.findOne({ _id: req.params.post_id }).exec();
    if (!post) {
        res.status(404).send();
        return;
    }

    // @ts-ignore
    if (post.author_id != req.auth.userID) {
        res.status(403).send();
        return;
    }

    post.deleted = true;
    post.deleted_by = 'author';
    post.community_id = 'Deleted';
    post.author_id = 'Deleted';
    post.title = 'Deleted';
    post.body = 'Deleted';
    post.image = '';
    post.video = '';

    const updated = await post.save();

    if (global.cache.posts[req.params.post_id])
        global.cache.posts[req.params.post_id].value = updated;

    res.status(200).send();
}];


export default [
    del
];