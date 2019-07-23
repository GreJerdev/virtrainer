'use strict';

const express = require('express'),
  router = express.Router();
const ExerciseService = require('../services/recipe-service')
const exerciseModel = require('../models/exercise')

router.post('/', async (req, res) => {
  try {
    logger.info("exercise create ")
    let exercise_service = new ExerciseService();
    let exercise = req.body;
    logger.silly(exercise)
    exercise = await exercise_service.createExercise(exercise);
    res.done(exercise);
  } catch (err) {
    res.error(err);
  }
});

router.get('/:exercise_id', async (req, res) => {
  try {
    logger.info("exercise get ")
    let exercise_service = new ExerciseService();
    let exercise_id = req.params['exercise_id'];
    logger.info(exercise_id)
    let exercise = await exercise_service.getExerciseById(exercise_id);
    res.done(exercise);
  } catch (err) {
    res.error(err);
  }
})

router.post('/:exercise_id', async (req, res) => {
  try {
    console.log("exercise update")
    let exercise_service = new ExerciseService();
    req.body.id = req.params['exercise_id'];
    console.log(req.body)
    let exercise = await exercise_service.updateExercise_id(req.body);
    res.done(exercise);
  } catch (err) {
    res.error(err);
  }
});

router.get('/:training_id', async (req, res) => {
  try {
    console.log("exercise get by training id ")
    let exercise_service = new ExerciseService();
    let training_id = req.params['training_id'];
    console.log(training_id)
    let exercises = await exercise_service.getExerciseByTrainingId(recipe_id);
    res.done(exercises);
  } catch (err) {
    res.error(err);
  }
});

router.delete('/:exercise_id', async (req, res) => {
  try {
    console.log("exercise_id delete ")
    let exercise_service = new ExerciseService();
    let exercise_id = req.params['exercise_id'];
    console.log(exercise_id)
    let recipe = await exercise_service.deleteByexerciseId(exercise_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
});


module.exports = router; 