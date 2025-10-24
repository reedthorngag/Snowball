import { Express, NextFunction, Request, Response } from 'express';
import Logger from './util/logger.js';
import passport from 'passport';
import Google from 'passport-google-oauth2';
import V from 'validator';
import getErrorPage from './util/error_pages.js';
import crypto from 'crypto';

const GoogleStrategy = Google.Strategy;

function initGoogleOauth2(app:Express) {


    // Configure the Google OAuth2 strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: process.env.AUTH_CALLBACK_URL!,
        passReqToCallback: true
    }, async (req:any, accessToken:string, refreshToken:string, profile:any, done:(any)) => {
        // Here you can handle the user profile information returned by Google
        // You can save the user information in a database or use it to authenticate the user
        
        let user = await global.models.User.findOne({ google_id: profile.id, deleted: false }).select(" user_id admin banned").exec();

        // let user = await prismaClient.loginInfo.findUnique({
        //     select: {
        //         User: {
        //             select: {
        //                 UserID: true,
        //                 IsAdmin: true,
        //                 IsBanned: true
        //             }
        //         }
        //     },
        //     where: {
        //         GoogleID: profile.id,
        //         User: {
        //             IsDeleted: false
        //         }
        //     }
        // });

        console.log(user);

        if (!user) {
            const id = crypto.randomBytes(16).toString('hex');

            global.userCreation[id] = { google_id: profile.id, email: profile.email, time: Date.now() };

            profile['noUserID'] = true;
            profile['UserID'] = id;
            return done(null, profile);
        }
        

        if (user?.banned) {
            return done(null, false);
        }
 
        profile['isAdmin'] = user.admin;
        profile['UserID'] = user.user_id;
        return done(null,profile);
    }));

    // Redirect the user to Google for authentication
    app.get(process.env.GOOGLE_AUTH_URL!, passport.authenticate('google', {
            scope: process.env.SCOPE!.split(','),
            session: false,
            prompt: 'consent'
        }));


    app.get(process.env.AUTH_CALLBACK_URL!, (req:Request,res:Response,next:NextFunction) => passport.authenticate('google', 
        {session: false},
        function(err:any,profile:any,info:any,status:any) {
            if (!profile) {
                res.redirect("/?error=user%20banned");
                return;
            }

            res.send(`
                <html>
                    <script>
                        document.cookie = 'auth=${authenticator.createToken(profile.UserID,profile.isAdmin)}; max-age='+(60*60*24*5)+'; path=/; Samesite=Strict; Secure;';
                        window.location.href = '${profile.noUserID ? '/setUserID' : '/'}';
                    </script>
                </html>
            `);
        }
    )(req,res,next));
}

export default initGoogleOauth2;
