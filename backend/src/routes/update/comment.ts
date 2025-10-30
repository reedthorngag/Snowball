import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const create:Route = ['/posts/:post_id/comments/:comment_id', 'PUT', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const comment = await global.models.Comment.findOne({ _id: req.params.comment_id, deleted: false }).exec();
    if (!comment) {
        res.status(404);
        return;
    }

    // @ts-ignore
    if (comment.author_id != req.auth.userID) {
        res.status(403);
        return;
    }

    let t = validate(req.body,'body', true, 3, 32);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    comment.body = req.body.body;

    comment.edited = true;
    comment.last_edit = Date.now();

    res.send(JSON.stringify(await comment.save()));
}];


export default [
    create
];