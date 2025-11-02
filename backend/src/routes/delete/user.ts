import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_user } from "../../util/cache.js";

const del:Route = ['/user', 'DELETE', 'required', async (req: Request, res: Response) => {

    // @ts-ignore
    const user = await get_user(req.authInfo.userID);

    user.deleted = true;

    const updated = await user.save();

    if (global.cache.users[user.user_id])
        global.cache.communities[user.user_id].value = updated;
    
    res.status(200).send({cookie: 'auth=; max-age=-1; path=/;'});
}];


export default [
    del
];