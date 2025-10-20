import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/communities/:community_id', 'GET', 'none', async (req: Request, res: Response) => {

    const community = await global.models.Community.findOne({community_id: req.params.community_id});

    if (!community) {
        res.status(404);
        return;
    }

    res.send(JSON.stringify(community));
}];


export default [
    get
];