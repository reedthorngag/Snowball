import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import validate from "../../util/validator.js";

const create:Route = ['/users', 'POST', 'none', async (req: Request, res: Response) => {
    
    if (!req.query.id) {
        res.status(422).send('{"error":"missing id"}');
        return;
    }

    if (!req.is('application/json')) {
        res.status(422).send('{"error":"body must be json"}');
        return;
    }

    if (!req.body.name || req.body.name.length > 32) {
        res.status(422).send('{"error":"invalid name"}');
        return;
    }

    if (req.body.email && req.body.email.length > 64) {
        res.status(422).send('{"error":"invalid email"}');
        return;

    } else if (global.models.User.findOne({ user_id: req.body.name }).exec()) {
        res.status(422).send('{"error":"email already in use"}');
        return;
    }

    // don't bother validating full password requirements, if the user really
    // wants to bypass them then thats up to them
    if (req.body.password && (req.body.password.length < 8 || req.body.password.length > 32)) {
        res.status(422).send('{"error":"invalid password"}');
        return;
    }

    const user = global.userCreation[req.params.id];

    if (!user) {
        res.status(422).send('{"error":"invalid id"}');
        return;
    }

    if (global.models.User.findOne({ google_id: user.google_id }).exec()) {
        res.status(422).send('{"error":"account already exists"}');
        return;
    }

    if (global.models.User.findOne({ user_id: req.body.name }).exec()) {
        res.status(422).send('{"error":"user already exists"}');
        return;
    }

    delete global.userCreation[req.params.id];

    const a = new global.models.User({
        user_id: req.body.name, 
        google_id: user.google_id, 
        email: req.body.email || user.email,
        password: req.body.password ? bcrypt.hashSync(req.body.password, 12) : undefined
    });

    let t = validate(req.body, 'description', false, 0, 150);
    if (t) {
        res.status(422).send('{"error":"'+t+'"}');
        return;
    }
    a.description = req.body.description;

    res.send(JSON.stringify(await a.save()));
}];


export default [
    create
];

