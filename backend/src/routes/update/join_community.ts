import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import validate from "../../util/validator.js";
import { get_community, get_post, get_user } from "../../util/cache.js";
import sanitize from "../../util/sanitizer.js";

const join:Route = ['/communities/:community_id/join', 'PUT', 'required', async (req: Request, res: Response) => {

    const community = await get_community(req.params.post_id);
    
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

    user.communities.push(community.community_id);

    await user.save();
    
    await global.models.Community.findOneAndUpdate({ _id: community.community_id},{$inc: {num_members: 1}}).exec();

    res.send();
}];


export default [
    join
];