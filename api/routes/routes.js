'use strict';

const training = require('../controllers/training-controller');
const exercise = require('../controllers/exercise-controller');
const user = require('../controllers/user-controller');
const authentication = require('../controllers/authentication-controller');

const path = require("path");

module.exports = (app, express) => {
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.use('/api/v1/authentication', authentication);
    app.use('/api/v1/training', training);
    app.use('/api/v1/exercise', exercise);
    app.use('/api/v1/user', user);
    app.get('/', (req, res) => res.send('Hello World!'));
};