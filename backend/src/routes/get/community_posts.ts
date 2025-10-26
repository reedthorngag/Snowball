import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/communities/:community_id/posts', 'GET', 'none', async (req: Request, res: Response) => {

    const posts = await global.models.Post.find({ community_id: req.params.community_id })
        .sort('-created_at').limit(30).exec();

    res.send(JSON.stringify(posts));
}];


export default [
    get
];