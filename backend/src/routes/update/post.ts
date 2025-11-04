import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_post } from "../../util/cache.js";
import sanitize from "../../util/sanitizer.js";

const create:Route = ['/posts/:post_id', 'PUT', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send({error:"body must be json"});
        return;
    }

    const post = await get_post(req.params.post_id);
    //const post = await global.models.Post.findOne({ _id: req.params.post_id }).exec();
    if (!post) {
        res.status(404).send();
        return;
    }

    // @ts-ignore
    if (post.author_id != req.auth.userID) {
        res.status(403).send();
        return;
    }
 
    let t = validate(req.body, 'title', false, 1, 48);
    if (t){
        res.status(422).send({error: t});
        return;
    }
    if (req.body.title)
        post.title = req.body.title

    t = validate(req.body, 'body', false, 1, 1500);
    if (t){
        res.status(422).send({error: t});
        return;
    }
    if (req.body.body)
        post.body = sanitize(req.body.body, true);

    post.edited = true;
    post.last_edit = Date.now();

    await post.save();

    res.status(200).send(post);
}];


export default [
    create
];