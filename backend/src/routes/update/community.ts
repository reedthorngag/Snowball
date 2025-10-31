import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_community } from "../../util/cache.js";
import sanitize from "../../util/sanitizer.js";

const create:Route = ['/communities/:community_id', 'PUT', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const community = await get_community(req.params.community_id);
    // const community = await global.models.Community.findOne({ community_id: req.params.community_id }).exec();
    if (!community) {
        res.status(404);
        return;
    }

    // @ts-ignore
    if (community.owner == req.auth.userID) {
        res.status(422).send('{"error":"Only the owner can edit"}');
        return;
    }

    let t = validate(req.body,'description', true, 3, 32);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    community.description = sanitize(req.body.description, true);

    const updated = await community.save();

    if (global.cache.communities[req.params.community_id])
        global.cache.communities[req.params.community_id].value = updated;

    res.send(JSON.stringify(updated));
}];


export default [
    create
];