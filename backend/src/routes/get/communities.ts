import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/communities', 'GET', 'none', async (req: Request, res: Response) => {

    const communities = await global.models.Community.find({deleted: false, banned: false}).sort('-member_count').exec();

    res.send(JSON.stringify(communities));
}];


export default [
    get
];