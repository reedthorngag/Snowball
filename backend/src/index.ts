import mongoose, { Mongoose } from 'mongoose';
import Authenticator from './util/authenticator.js';

declare global {
    var authenticator:Authenticator;
}

global.authenticator = new Authenticator();

import './mongo_init.js'
import app from './server.js';
import Logger from './util/logger.js';
import router from './router.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import express from 'express';
import local_router from './local_routes.js';
import path from 'path';

const port: number = 443;

app.use(`/api/${process.env.API_VERSION}`, router);

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.resolve('./src/public/index.html'));
});

const local_app = express().use('/',local_router);

(async () => {
    
    if (process.env.ENV === 'DEV') {
        http.createServer(app).listen(port,()=>{
            Logger.info("Listening on port "+port);
            http.createServer(local_app).listen(80);
        });

    } else {
        var privateKey = fs.readFileSync('./privatekey.key' );
        var certificate = fs.readFileSync('./certificate.crt' );
        https.createServer({
            key: privateKey,
            cert: certificate
        }, app).listen(port,()=>{
            
            Logger.info(`Listening on port ${port}`);
            http.createServer(local_app).listen(80);
            
        });
    }
})();
