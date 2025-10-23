import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";

const create:Route = ['/post', 'POST', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const post = new global.models.Post();
    // @ts-ignore
    post.author_id = req.auth.userID;

    let v = validate(req.body,'community_id', true, 3, 32);
    if (v){
        res.status(422).send('{"error":"'+v+'"}');
        return;
    }
    post.community_id = req.body.community_id;



    {community_id: "hi", author_id: "hello", title: "test", body: "hello world"});
    res.send(JSON.stringify(await post.save()));
}];


export default [
    create
];