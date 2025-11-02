import Route from "../types/route.js";
import logger from "../util/logger.js";
import { Request, Response } from "express";

const verify_auth:Route = ['/auth/valid', 'GET', 'optional', async (req: Request, res: Response) => {

    // @ts-expect-error
    if (req.auth) {
        res.status(200).send();
        return;
    }

    if (req.cookies.auth && global.userCreation[req.cookies.auth]) {
        res.status(200).send();
        return;
    }
    
    res.status(404).send();
}];


export default [
    verify_auth
];