import Route from "../types/route.js";
import logger from "../util/logger.js";
import { Request, Response } from "express";

const logout:Route = ['/logout', 'GET', 'required', async (req: Request, res: Response) => {

    global.authenticator.invalidate(req.cookies.auth);

    res.redirect('/');
}];


export default [
    logout
];