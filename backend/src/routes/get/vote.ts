import { ObjectId, ReturnDocument } from "mongodb";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/posts/:post_id/vote', 'GET', 'required', async (req: Request, res: Response) => {

    // @ts-ignore
    let vote = await global.models.Vote.findOne({ user_id: req.auth.userID , post_id: req.params.post_id }).exec();

    if (!vote) {
        res.status(404).send({error: 'No vote made yet'});
        return;
    }

    res.status(200).send({vote: vote.vote});
}];

const comment_vote:Route = ['/posts/:post_id/comments/:comment_id/vote', 'GET', 'required', async (req: Request, res: Response) => {

    // @ts-ignore
    let vote = await global.models.Vote.findOne({ user_id: req.auth.userID , post_id: req.params.post_id, comment_id: req.params.comment_id }).exec();

    if (!vote) {
        res.status(404).send({error: 'No vote made yet'});

    }

    res.status(200).send({vote: vote.vote});
}];


export default [
    get,
    comment_vote
];