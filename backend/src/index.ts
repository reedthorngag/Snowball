import './global.js'
import mongoose, { Mongoose } from 'mongoose';

import './mongo_init.js'
//import app from './server.js';
import Logger from './util/logger.js';
import router from './router.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import express from 'express';
import local_router from './local_routes.js';
import path from 'path';

import app from './server.js';

const port: number = 443;


setInterval(() => {
    
    const now = Date.now();
    const timeout = 1000*60*60*24;

    for (let id of Object.keys(global.pendingResources)) {
        if (now - global.pendingResources[id] > timeout) {
            fs.rmSync('/app/file-store/'+id);
            delete global.pendingResources[id];
        }
    }

    for (let id of Object.keys(global.userCreation)) {
        if (now - global.userCreation[id].time > timeout) {
            delete global.userCreation[id];
        }
    }

}, 1000/**60*60*24*/);


app.use(`/api/${process.env.API_VERSION}`, router);

app.use((req, res, next) => {
    res.sendFile(path.resolve('/app/frontend/dist/index.html'));
});

const local_app = express().use('/',local_router);

if (process.env.ENV === 'PROD') {
    var privateKey = fs.readFileSync('./privatekey.key' );
    var certificate = fs.readFileSync('./certificate.crt' );
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(port,()=>{
        Logger.info(`Listening on port ${port} - https`);
        http.createServer(local_app).listen(80);
    });
    
} else {
    http.createServer(app).listen(port,()=>{
        Logger.info("Listening on port "+port+' - http');
        http.createServer(local_app).listen(80);
    });
}
