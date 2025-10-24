import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";

const get:Route = ['/users/:user_id', 'GET', 'none', async (req: Request, res: Response) => {

    const user = await global.models.User.findOne({user_id: req.params.user_id}).select('-google_id -email -password').exec();

    if (!user) {
        res.status(404);
        return;
    }

    res.send(JSON.stringify(user));
}];


export default [
    get
];