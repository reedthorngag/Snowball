import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const search:Route = ['/search/communities', 'GET', 'none', async (req: Request, res: Response) => {

    if (!req.query.s?.length) {
        res.status(422).send({error:"no search term provided"});
        return;
    }

    if (req.query.s!.length! as number > 64) {
        res.status(422).send({error:"search term too long"});
        return;
    }

    const posts = await global.models.Community.find({$text: {$search: req.query.s}}, {score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(30).exec();

    res.send(JSON.stringify(posts));
}];


export default [
    search
];


