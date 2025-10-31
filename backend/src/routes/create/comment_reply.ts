import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import { get_post } from "../../util/cache.js";
import sanitize from "../../util/sanitizer.js";

const create:Route = ['/posts/:post_id/comments/:comment_id', 'POST', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    const post = await get_post(req.params.post_id);
    //const post = await global.models.Comment.findById(req.params.post_id).exec();
    if (!post) {
        res.status(404).send('{"error":"Post doesn\'t exist"}');
        return;
    }

    if (post.deleted) {
        res.status(404).send('{"error":"Post deleted"}');
        return;
    }

    const replyTo = await global.models.Comment.findById(req.params.comment_id).exec();
    if (!replyTo) {
        res.status(404);
        return;
    }

    const comment = new global.models.Comment();

    // @ts-ignore
    comment.author_id = req.auth.userID;
    comment.post_id = req.params.post_id;
    comment.reply_to = replyTo._id;

    let t = validate(req.body, 'body', false, 1, 500);
    if (t){
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    if (req.body.body)
        comment.body = sanitize(req.body.body, true);

    const reply = await comment.save();
    
    await global.models.Post.findOneAndUpdate({ _id: req.params.post_id }, { $inc: { num_comments: 1 } });

    res.send(JSON.stringify(reply));
}];


export default [
    create
];