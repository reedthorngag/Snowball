import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const create:Route = ['/posts/:post_id', 'DELETE', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const post = await global.models.Comment.findOne({ _id: req.params.post_id }).exec();
    if (!post) {
        res.status(404);
        return;
    }

    // @ts-ignore
    if (post.author_id != req.auth.userID) {
        res.status(403);
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

    res.status(200).send(JSON.stringify(await post.save()));
}];


export default [
    create
];