import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const create:Route = ['/posts/:post_id', 'PUT', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const post = await global.models.Post.findOne({ _id: req.params.post_id }).exec();
    if (!post) {
        res.status(404);
        return;
    }

    // @ts-ignore
    if (post.author_id != req.auth.userID) {
        res.status(403);
        return;
    }
 
    let t = validate(req.body, 'title', false, 1, 48);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    if (req.body.title)
        post.title = req.body.title

    t = validate(req.body, 'body', false, 1, 500);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    if (req.body.body)
        post.body = req.body.body

    post.edited = true;
    post.last_edit = Date.now();

    res.send(JSON.stringify(await post.save()));
}];


export default [
    create
];