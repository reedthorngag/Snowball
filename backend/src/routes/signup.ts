import mongoose from "mongoose";
import Route from "../types/route.js";
import logger from "../util/logger.js";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import validate from "../util/validator.js";
import sanitize from "../util/sanitizer.js";
import { get_user } from "../util/cache.js";

const create:Route = ['/signup', 'POST', 'none', async (req: Request, res: Response) => {
    
    if (!req.cookies.auth) {
        if (!req.body.username || !req.body.password) {
            res.status(422).send({error:"Missing required fields"});
            return;
        }
    }

    if (!req.is('application/json')) {
        res.status(422).send({error:"body must be json"});
        return;
    }

    let t = validate(req.body, 'username', true, 1, 32)
    if (t) {
        res.status(422).send({error: t});
        return;
    }

    if (req.body.email && req.body.email.length > 64) {
        res.status(422).send({error:"invalid email"});
        return;

    } else if (await get_user(req.body.username)) {
        res.status(422).send({error:"Username taken"});
        return;
    }

    // don't bother validating full password requirements, if the user really
    // wants to bypass them then thats up to them
    t = validate(req.body, 'password', false, 8, 64)
    if (t) {
        res.status(422).send({error: t});
        return;
    }

    const user = global.userCreation[req.cookies.auth];

    if (user) {

        if (await global.models.User.findOne({ google_id: user.google_id }).exec()) {
            res.status(422).send({error:"Account already exists"});
            return;
        }

    } else if (!req.body.password) {
        res.status(422).send({error:"invalid auth"});
        return;
    }

    if (await global.models.User.findOne({ user_id: req.body.username }).exec()) {
        res.status(422).send({error:"user already exists"});
        return;
    }

    delete global.userCreation[req.params.id];

    const a = new global.models.User({
        user_id: sanitize(req.body.username),
        google_id: user?.google_id, 
        email: sanitize(req.body.email || user.email || ''),
        password: req.body.password ? bcrypt.hashSync(req.body.password, 12) : undefined
    });

    t = validate(req.body, 'description', false, 0, 150);
    if (t) {
        res.status(422).send({error: t});
        return;
    }
    a.description = sanitize(req.body.description, true);

    await a.save();

    res.status(200).send({cookie: `auth=${global.authenticator.createToken(a.user_id, a.admin)}; max-age='+(60*60*24*5)+'; path=/; Samesite=Strict; Secure;`});
;
}];


export default [
    create
];

