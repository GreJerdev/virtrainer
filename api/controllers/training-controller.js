'use strict';

const express = require('express'),
    router = express.Router();
const trainingService = require('../services/training-service');
const TrainingModel = require('../models/training');

router.post('/', async (req, res) => {
    try {
        logger.info("training create ");
        let training_service = new trainingService();
        let training = TrainingModel.parseFromCreateRequest(req.body);
        logger.silly(training);
        training = await training_service.createTraining(training);
        res.done(TrainingModel.parseToResponse(training));
    } catch (err) {
        res.error(err);
    }
});

router.get('/:training_id', async (req, res) => {
    try {
        logger.info("training get ");
        let training_service = new trainingService();
        let training_id = req.params['training_id'];
        logger.info(training_id);
        let training = await training_service.gettrainingById(training_id);
        res.done(training);
    } catch (err) {
        res.error(err);
    }
})

router.post('/:training_id', async (req, res) => {
    try {
        console.log("training update")
        let training_service = new trainingService();
        req.body.id = req.params['training_id'];
        console.log(req.body)
        let training = await training_service.updatetraining_id(req.body);
        res.done(training);
    } catch (err) {
        res.error(err);
    }
});

router.get('/:training_id', async (req, res) => {
    try {
        console.log("training get by training id ")
        let training_service = new trainingService();
        let training_id = req.params['training_id'];
        console.log(training_id)
        let trainings = await training_service.gettrainingByTrainingId(recipe_id);
        res.done(trainings);
    } catch (err) {
        res.error(err);
    }
});

router.delete('/:training_id', async (req, res) => {
    try {
        console.log("training_id delete ")
        let training_service = new trainingService();
        let training_id = req.params['training_id'];
        console.log(training_id)
        let recipe = await training_service.deleteBytrainingId(training_id);
        res.done(recipe);
    } catch (err) {
        res.error(err);
    }
});


module.exports = router; 