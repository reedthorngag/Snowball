import Route from "../../types/route.js";
import { get_post } from "../../util/cache.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/posts/:post_id', 'GET', 'none', async (req: Request, res: Response) => {

    const post = await get_post(req.params.post_id);
    // const post = await global.models.Post.findOne({ _id: req.params.post_id }).exec();

    if (!post) {
        res.status(404);
        return;
    }

    res.send(JSON.stringify(post));
}];


export default [
    get
];