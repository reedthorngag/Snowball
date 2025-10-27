import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import fs from 'fs';
import path from "path";
import { get_community } from "../../util/cache.js";

const create:Route = ['/communities/:community_id/posts', 'POST', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const community = await get_community(req.params.community_id);

    if (!community) {
        res.status(404).send('{"error":"Community doesn\'t exist"}');
        return;
    }

    if (!community.deleted) {
        res.status(404).send('{"error":"Community deleted"}');
        return;
    }

    const post = new global.models.Post();
    // @ts-ignore
    post.author_id = req.auth.userID;
    post.community_id = req.params.community_id
 
    let t = validate(req.body, 'title', true, 1, 48);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    post.title = req.body.title

    t = validate(req.body, 'body', false, 1, 500);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    if (req.body.body)
        post.body = req.body.body

    if (req.body.image) {
        let r = /^[a-zA-Z0-9]+$/;
        if (!r.test(req.body.image)) {
            res.status(422).send('{"error":"Please provide the resource ID for the image"}');
            return;
        }
        if (!fs.existsSync('/app/file-store/'+req.body.image)) {
            res.status(422).send('{"error":"Provided resource ID doesn\'t exist"}');
            return;
        }
        post.image = req.body.image
    }

    if (req.body.video) {
        if (req.body.image) {
            res.status(422).send('{"error":"Post already has an image attached"}');
            return;
        }

        let r = /^[a-zA-Z0-9]+$/;
        if (!r.test(req.body.video)) {
            res.status(422).send('{"error":"Please provide the resource ID for the image"}');
            return;
        }

        if (!fs.existsSync('/app/file-store/'+req.body.video)) {
            res.status(422).send('{"error":"Provided resource ID doesn\'t exist"}');
            return;
        }

        post.video = req.body.video
    }

    res.send(JSON.stringify(await post.save()));
}];


export default [
    create
];