import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/posts/:post_id', 'GET', 'none', async (req: Request, res: Response) => {

    res.send(JSON.stringify(await global.models.Post.find().sort('-created_at').limit(100).exec()));
}];


export default [
    get
];