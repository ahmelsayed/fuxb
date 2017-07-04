import { User, Token } from './types/user';
import { Request, Response, NextFunction, Application } from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
//import * as strategy from 'passport-azure-ad-oauth2';
const strategy = require('passport-azure-ad-oauth2');

export function setupAuthentication(app: Application) {
    passport.use(authStrategy());
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/.login',
        passport.authenticate('azure_ad_oauth2', { failureRedirect: '/.login/error' }),
        (_, res) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/.login/error', (_, res) => {
        res.status(500).send('There was an error in login');
    });
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/.login');
}

export function maybeAuthenticate(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/.login');
}

function authStrategy() {
    const strategyConfig = {
        callbackURL: 'http://localhost:9032/.login',
        resource: 'https://management.core.windows.net/',
        tenant: 'ahmelsayedhotmail.onmicrosoft.com'
    };
    const userReducer = (_: string, __: string, params: Token, ___: any, done: any) => {
        const user = jwt.decode(params.id_token) as User;
        user.token = params;
        done(null, user);
    };
    return new strategy(strategyConfig, userReducer);
}

function deserializeUser(user: User, done: any) {
    done(null, user);
}

function serializeUser(user: User, done: any) {
    done(null, user);
}