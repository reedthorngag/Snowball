import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import Logger from './util/logger.js';
import fs from 'fs';
import initGoogleOauth2 from './google_oauth2.js';
import router from './router.js';

const app = express();

app.use(`/api/${process.env.API_VERSION}`, router);

app.use(cors());
//app.use(helmet()); temporarily disabled cos it needs configuring, this should be enabled in prod
app.use(cookieParser());
app.use(express.static(path.resolve('/app/frontend/dist'),{ extensions: ['html'], redirect: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('etag', false);


initGoogleOauth2(app);

export default app;
