import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_user } from "../../util/cache.js";

const create:Route = ['/user', 'PUT', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    // @ts-ignore
    const user = await get_user(req.auth.userID);
    // const user = await global.models.User.findOne({ user_id: req.auth.userID }).exec();
    if (!user) {
        res.status(404);
        return;
    }
 
    let t = validate(req.body, 'description', true, 1, 48);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    if (req.body.description)
        user.description = req.body.description;

    const updated = await user.save();

    // @ts-expect-error
    if (global.cache.users[req.auth.userID])
        // @ts-expect-error
        global.cache.users[req.auth.userID].value = updated;

    res.status(200).send();
}];


export default [
    create
];