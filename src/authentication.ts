import { Request, Response, NextFunction, Application } from 'express';
import * as passport from 'passport';
const strategy = require('passport-azure-ad-oauth2');

export function setupAuthentication(app: Application) {
    passport.use(authStrategy());
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/login',
        passport.authenticate('azure_ad_oauth2'));

    app.get('/.login',
        passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
        function (_, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

export function maybeAuthenticate(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

function authStrategy() {
    return new strategy({
        callbackURL: 'http://localhost:9032/.login',
        resource: 'https://management.core.windows.net/',
        tenant: 'ahmelsayedhotmail.onmicrosoft.com'
    },
        function (accessToken: any, _: any, params: any, __: any, done: any) {
            console.log("====================");
            console.log(params);
            console.log("====================");
            done(null, accessToken);
        })
}

function deserializeUser(user: any, done: any) {
    done(null, user);
}

function serializeUser(user: any, done: any) {
    done(null, user);
}