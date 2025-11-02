import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const del:Route = ['/posts/:post_id/comments/:comment_id', 'DELETE', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const comment = await global.models.Comment.findOne({ _id: req.params.comment_id }).exec();
    if (!comment) {
        res.status(404).send();
        return;
    }

    // @ts-ignore
    if (comment.author_id != req.auth.userID) {
        res.status(403).send();
        return;
    }

    comment.deleted = true;
    comment.deleted_by = 'author';
    comment.author_id = 'Deleted';
    comment.body = 'Deleted';

    await comment.save()

    res.status(200).send();
}];


export default [
    del
];