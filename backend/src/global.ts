import mongoose, { Types } from 'mongoose';
import Authenticator from './util/authenticator.js';
declare global {
    var authenticator:Authenticator;
    var models: {
        User: any,
        Community: any,
        Post: any,
        Comment: any,
        Vote: any
    };
}

global.authenticator = new Authenticator();