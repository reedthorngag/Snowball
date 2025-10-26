import { ObjectId } from "mongodb";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/posts/:post_id/comments/:comment_id/vote', 'PUT', 'none', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    if (!req.body.vote) {
        res.status(422).send('{"error":"missing vote field"}');
        return;
    }

    let vote_value = 0;
    switch (req.body.vote) {
        case '1':
            vote_value = 1;
            break;
        case '0':
            vote_value = 0;
            break;
        case '-1':
            vote_value = -1;
            break;
        default:
            res.status(422).send('{"error":"Invalid vote value"}');
            return;
    }

    if (!get_post)

    // @ts-ignore
    let vote = await global.models.Vote.findOne({ user_id: req.auth.userID, post_id: req.params.post_id, comment_id: req.params.comment_id }).exec();

    let effective_mod = vote_value;
    if (!vote) {
        vote = new global.models.Vote();
        // @ts-ignore
        vote.user_id = req.authInfo.userID;
        vote.post_id = req.params.post_id;
        vote.comment_id = req.params.comment_id;

    } else {
        effective_mod = vote.vote - vote_value;
    }
    
    try {
        await global.models.Comment.findOneAndUpdate({ _id: req.params.comment_id }, { $inc: {score: effective_mod} }).exec();
    } catch (e) {
        res.status(404).send('"error":"Comment doesn\'t exist"}');
    }

    await vote.save();


    res.status(200);
}];


export default [
    get
];