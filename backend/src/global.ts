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
    var userCreation: { [key: string]:  { google_id:string, email: string, time: number }};
    var sessions: { [user_id: string]: { feedPointer: number } } // feedPointer is the latest date time
}

global.authenticator = new Authenticator();

