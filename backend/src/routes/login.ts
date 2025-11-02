import Route from "../types/route.js";
import logger from "../util/logger.js";
import { Request, Response } from "express";
import validate from "../util/validator.js";
import bcrypt from 'bcrypt';

const login:Route = ['/login', 'POST', 'required', async (req: Request, res: Response) => {

    if (!req.is('application/json')) {
        res.status(422).send({error:"Must be json"});
        return;
    }

    let t = validate(req.body, 'username', true, 0, 64);
    if (t) {
        res.status(422).send({error: t});
        return;
    }

     t = validate(req.body, 'password', true, 0, 64);
    if (t) {
        res.status(422).send({error: t});
        return;
    }

    const user = await global.models.User.find({$or: [{ user_id: req.body.username }, { email: req.body.username }]}).exec();

    if (!user) {
        res.status(401).send({error: "Incorrect username or password"});
        return;
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send({error: "Incorrect username or password"});
        return;
    }

    res.status(200).send({cookie: `auth=${global.authenticator.createToken(user.user_id, user.admin)}; max-age='+(60*60*24*5)+'; path=/; Samesite=Strict; Secure;`});
}];


export default [
    login
];