import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import sanitize from "../../util/sanitizer.js";

const create:Route = ['/communities', 'POST', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const community = new global.models.Community();
    // @ts-ignore
    community.owner = req.auth.userID;

    let t = validate(req.body,'name', true, 3, 32);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }

    if (await global.models.Community.findOne({ community_id: req.body.name }).exec()) {
        res.status(422).send('{"error":"A community with that name already exists"}');
        return;
    }
    community.community_id = sanitize(req.body.name);

    t = validate(req.body, 'description', false, 1, 500);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    community.description = sanitize(req.body.description, true);

    res.send(JSON.stringify(await community.save()));
}];


export default [
    create
];