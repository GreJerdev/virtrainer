'use strict';

const config = require( "./configuration/config");
//const db = require("./providers/database/mysql_provider");
require("./utilities/logger");

const express = require('express');
const app = express();
const load_routes = require('./routes/routes'); 
const init_middleware = require('./middlewares/load-middlewares');

init_middleware(app);
load_routes(app, express);

const port = 3000;
app.listen(port);
logger.log('info', `port ${port}, server started`);