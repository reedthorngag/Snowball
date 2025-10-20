import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const create:Route = ['/post', 'POST', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const a = new global.models.Post({community_id: "hi", author_id: "hello", title: "test", body: "hello world"});
    res.send(JSON.stringify(await a.save()));
}];


export default [
    create
];