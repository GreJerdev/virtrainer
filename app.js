'use strict';

const config = require( "./api/configuration/config");
//const db = require("./providers/database/mysql_provider");
require("./api/utilities/logger");
require("./api/auth-providers/password");
const express = require('express');
const app = express();
const load_routes = require('./api/routes/routes');
const init_middleware = require('./api/middlewares/load-middlewares');
var passport = require("passport"); // at header app.use(passport.initialize()); // after line no.20 (express.static)
require("./config/passport");

init_middleware(app);
load_routes(app, express);
app.use(passport.initialize());

const port = 4000;
app.listen(port);
logger.log('info', `port ${port}, server started`);

/*
* const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header

// connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to mongo db");
});

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

* */
