import Route from "../types/route.js";
import logger from "../util/logger.js";
import { Request, Response } from "express";

const logout:Route = ['/logout', 'GET', 'required', async (req: Request, res: Response) => {

    global.authenticator.invalidate(req.cookies.auth);

    res.send(`
        <html>
            <script>
                document.cookie = 'auth=null; max-age=-1; path=/auth/google/callback;'
                window.location.href = '/';
            </script>
        </html>
    `);
}];


export default [
    logout
];