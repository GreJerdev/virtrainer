'use strict';

const authentication = require('../controllers/authentication');
const ingredient = require('../controllers/ingredient');
const shop_list = require('../controllers/shop_list');
const ingredient_list = require('../controllers/ingredient_list');
const instruction = require('../controllers/instruction');
const media = require('../controllers/media');
const recipe_steps = require('../controllers/recipe_steps');
const recipe = require('../controllers/recipe');
const path = require("path");

module.exports = (app, express) => {
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.use('/api/v1/authentication', authentication);
    app.use('/api/v1/ingredient', ingredient);
    app.use('/api/v1/shop-list', shop_list);
    app.use('/api/v1/ingredient-list', ingredient_list);
    app.use('/api/v1/instruction', instruction);
    app.use('/api/v1/media', media);
    app.use('/api/v1/recipe-steps', recipe_steps);
    app.use('/api/v1/recipe', recipe);
    app.get('/', (req, res) => res.send('Hello World!'));
}