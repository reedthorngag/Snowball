import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/search', 'GET', 'none', async (req: Request, res: Response) => {

    if (req.query.s?.length) {
        res.status(422).send('{"error":"no search term provided"}');
        return;
    }

    if (req.query.s!.length! as number > 32) {
        res.status(422).send('{"error":"search term too long"}');
        return;
    }

    const posts = await global.models.Post.find({$text: {$search: req.query.s}});

    res.send(JSON.stringify(posts));
}];


export default [
    get
];


