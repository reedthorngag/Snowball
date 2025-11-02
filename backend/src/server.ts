import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import Logger from './util/logger.js';
import initGoogleOauth2 from './google_oauth2.js';
import router from './router.js';
import multer from 'multer';
import crypto from 'crypto';

const app = express();

app.set('etag', false);

//app.use(cors());
//app.use(helmet()); temporarily disabled cos it needs configuring, this should be enabled in prod
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/${process.env.API_VERSION}`, (req:Request, res:Response, next) => {
    console.log(req.path)
    router(req, res, next)
});

app.use('/resources', express.static(path.resolve('/app/file-store'), {etag: true}));
app.use(express.static(path.resolve('/app/frontend/dist'),{ extensions: ['html'], redirect: false, etag: true }));


const storageEngine = multer.diskStorage({
    destination: '/app/file-store',
    filename: (req, file, cb) => {
        const id = crypto.randomBytes(16).toString('hex');
        cb(null, id);
    }
});
const upload = multer({ storage: storageEngine, limits: { fileSize: 5_000_000 } });

app.post('resources', (req: Request, res: Response, next) => {
    if (!global.authenticator.verify(req.cookies?.auth).valid) {
        res.status(401).send();
        return;
    }
    next();
}, upload.single('resource'), (req: Request, res: Response) => {
    global.pendingResources[req.file?.filename!] = Date.now();
    res.send({id: req.file?.filename!});
});


initGoogleOauth2(app);

export default app;
