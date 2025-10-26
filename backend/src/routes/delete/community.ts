import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const create:Route = ['/communities/:community_id', 'DELETE', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const community = await global.models.Community.findOne({ _id: req.params.community_id }).exec();
    if (!community) {
        res.status(404);
        return;
    }

    // @ts-ignore
    if (community.owner != req.auth.userID) {
        res.status(403);
        return;
    }

    community.deleted = true;

    res.status(200).send(JSON.stringify(await community.save()));
}];


export default [
    create
];