import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const create:Route = ['/posts/:post_id/comments', 'POST', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const post = await global.models.Post.findById(req.params.post_id).exec();
    if (!post) {
        res.status(404);
        return;
    }

    const comment = new global.models.Comment();
    // @ts-ignore
    comment.author_id = req.auth.userID;
    comment.post_id = req.params.post_id;

    let t = validate(req.body, 'body', false, 1, 500);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    if (req.body.body)
        comment.body = req.body.body;

    res.send(JSON.stringify(await comment.save()));
}];


export default [
    create
];