import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/posts/:post_id', 'GET', 'none', async (req: Request, res: Response) => {

    const post = await global.models.Post.findOne({post_id: req.params.post_id});

    if (!post) {
        res.status(404);
        return;
    }

    res.send(JSON.stringify(post));
}];


export default [
    get
];