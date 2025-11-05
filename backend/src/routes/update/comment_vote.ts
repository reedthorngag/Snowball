import { ObjectId, ReturnDocument } from "mongodb";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import comment from "./comment.js";

const get:Route = ['/posts/:post_id/comments/:comment_id/vote', 'PUT', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send({error:"body must be json"});
        return;
    }

    if (req.body.vote === undefined) {
        res.status(422).send({error:"missing vote field"});
        return;
    }

    let vote_value = req.body.vote;
    switch (req.body.vote) {
        case 1:
        case 0:
        case -1:
            break;
        default:
            res.status(422).send({error:"invalid vote value"});
            return;
    }

    // @ts-ignore
    let vote = await global.models.Vote.findOne({ user_id: req.auth.userID , post_id: req.params.post_id, comment_id: req.params.comment_id }).exec();

    if (!vote) {
        vote = new global.models.Vote();
        // @ts-ignore
        vote.user_id = req.auth.userID;
        vote.post_id = req.params.post_id;
        vote.comment_id = req.params.comment_id;
        vote.vote = vote_value;

    } else {
        if (vote.vote == vote_value) {
            res.status(200).send({});
            return;
        }
        const old_vote = vote.vote;
        vote.vote = vote_value;

        if (old_vote)
            if (!vote_value)
                vote_value = -old_vote;
            else
                vote_value += vote_value;
        
    }
    
    let updated;
    try {
        updated = await global.models.Comment.findOneAndUpdate({ _id: req.params.comment_id }, { $inc: {score: vote_value} }, {new: true}).exec();
    } catch (e) {
        res.status(404).send({"error":"comment doesn\'t exist"});
        return;
    }
    
    await vote.save();

    res.status(200).send({score: updated.score});
}];


export default [
    get
];