import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';

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


const app = express();

app.use(express.static(path.join(__dirname, 'public')))
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

app.get('/api/templates', getTemplates);
app.get('/api/bindingconfig', getBindingConfig);

app.get('/api/tenants', getTenants);
app.post('/api/tenants/switch/:tenantId', switchTenant);
app.get('/api/token', getToken);

app.get('/api/resources', getResources);
app.get('/api/latestruntime', getRuntimeVersion);
app.get('/api/latestrouting', getRoutingVersion);
app.get('/api/config', getConfig);
app.post('/api/proxy', proxy);

app.listen(3300, () => {
    console.log('Started on 3300');
});
