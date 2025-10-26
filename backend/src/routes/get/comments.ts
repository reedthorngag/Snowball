import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/posts/:post_id/comments', 'GET', 'none', async (req: Request, res: Response) => {

    const comments = await global.models.Comment.find({ post_id: req.params.post_id })
        .sort('-score').exec();

    res.send(JSON.stringify(comments));
}];


export default [
    get
];