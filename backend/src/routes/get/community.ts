import Route from "../../types/route.js";
import { get_community } from "../../util/cache.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/communities/:community_id', 'GET', 'none', async (req: Request, res: Response) => {

    const community = await get_community(req.params.community);
    // const community = await global.models.Community.findOne({community_id: req.params.community_id}).exec();

    if (!community) {
        res.status(404).send();
        return;
    }

    res.send(JSON.stringify(community));
}];


export default [
    get
];