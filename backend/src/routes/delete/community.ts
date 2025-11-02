import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_community } from "../../util/cache.js";

const del:Route = ['/communities/:community_id', 'DELETE', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const community = await get_community(req.params.community_id);
    // const community = await global.models.Community.findOne({ _id: req.params.community_id }).exec();
    if (!community) {
        res.status(404).send();
        return;
    }

    // @ts-ignore
    if (community.owner != req.auth.userID) {
        res.status(403).send();
        return;
    }

    community.deleted = true;

    const updated = await community.save();

    if (global.cache.communities[req.params.community_id])
        global.cache.communities[req.params.community_id].value = updated;
    
    res.status(200).send();
}];


export default [
    del
];