import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import { get_community, get_post, get_user } from "../../util/cache.js";
import sanitize from "../../util/sanitizer.js";

const leave:Route = ['/communities/:community_id/leave', 'PUT', 'required', async (req: Request, res: Response) => {

    const community = await get_community(req.params.post_id);
    //const post = await global.models.Comment.findById(req.params.post_id).exec();
    if (!community) {
        res.status(404).send({error:"Community doesn\'t exist"});
        return;
    }

    if (community.deleted) {
        res.status(404).send({error:"Community deleted"});
        return;
    }

    // @ts-ignore
    const user = await get_user(req.auth.userID);

    const i = user.communities.indexOf(community.community_id);
    if (i == -1) {
        res.status(200).send();
        return;
    }
    user.communities.splice(i, 1);

    await user.save();
    
    await global.models.Community.findOneAndUpdate({ _id: community.community_id},{$inc: {num_members: -1}}).exec();

    res.status(200).send();
}];


export default [
    leave
];