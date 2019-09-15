const express = require('express'),
    router = express.Router();
const UserService = require('../services/user-service');
const UserModel = require('../models/user');


router.get('/', async (req, res) => {
    const method_name = 'training-controller/find-list';
    try {
        logger.info(`${method_name} - start`);

        let training_service = new UserModel();
        let tags = req.param("tags");
        logger.info(`${method_name} - start`);
        let recipe = await training_service.getListTraining(tags);
        logger.info(`${method_name} - end`);
        res.done(recipe);
    } catch (err) {
        res.error(err);
    }
});