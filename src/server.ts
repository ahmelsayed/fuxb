import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import { getTemplates } from './actions/templates';
import { getTenants, switchTenant, getToken } from './actions/user-account';
import { getConfig } from './actions/ux-config';
import { proxy } from './actions/proxy'
import {
    getBindingConfig,
    getResources,
    getRuntimeVersion,
    getRoutingVersion
} from './actions/metadata';

import { setupAuthentication, authenticate, maybeAuthenticate } from './authentication';


const app = express();

app.use(express.static(path.join(__dirname, 'public')))
    .use(logger('dev'))
    .use(session({ secret: 'keyboard cat' }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(passport.initialize())
    .use(passport.session());

setupAuthentication(app);

app.get('/api/templates', maybeAuthenticate, getTemplates);
app.get('/api/bindingconfig', maybeAuthenticate, getBindingConfig);

app.get('/api/tenants', authenticate, getTenants);
app.post('/api/tenants/switch/:tenantId', authenticate, switchTenant);
app.get('/api/token', authenticate, getToken);

app.get('/api/resources', maybeAuthenticate, getResources);
app.get('/api/latestruntime', maybeAuthenticate, getRuntimeVersion);
app.get('/api/latestrouting', maybeAuthenticate, getRoutingVersion);
app.get('/api/config', maybeAuthenticate, getConfig);
app.post('/api/proxy', maybeAuthenticate, proxy);

app.listen(9032, () => {
    console.log('Started on 9032');
});
