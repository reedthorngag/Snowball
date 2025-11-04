import Route from "../../types/route.js";
import { get_user } from "../../util/cache.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/users/:user_id', 'GET', 'none', async (req: Request, res: Response) => {

    const user = await get_user(req.params.user_id);
    // const user = await global.models.User.findOne({user_id: req.params.user_id}).select('-google_id -email -password').exec();

    if (!user) {
        res.status(404).send();
        return;
    }

    res.send(JSON.stringify(user));
}];

const get_curr:Route = ['/user', 'GET', 'required', async (req: Request, res: Response) => {

    // @ts-ignore
    const user = await get_user(req.auth.userID)

    if (!user) {
        res.status(401).send();
        return;
    }

    res.send(user);
}];


export default [
    get,
    get_curr
];