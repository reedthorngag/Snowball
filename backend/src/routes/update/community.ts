import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";

const create:Route = ['/communities/:community_id', 'POST', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const community = await global.models.Community.findOne({ _id: req.params.post_id }).exec();
    if (!community) {
        res.status(404);
        return;
    }

    // @ts-ignore
    community.owner = req.auth.userID;

    let t = validate(req.body,'name', true, 3, 32);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }

    if (await global.models.Comment.findOne({ community_id: req.body.name }).exec()) {
        res.status(422).send('{"error":"A community with that name already exists"}');
        return;
    }
    community.community_id = req.body.name;

    

    res.send(JSON.stringify(await community.save()));
}];


export default [
    create
];