'use strict';

const express = require('express'),
  router = express.Router();
const RecipeService = require('../services/recipe-service')
const recipeModel = require('../models/recipe-model')
router.post('/', async (req, res) => {
  try {
    logger.info("recipe get ")
    let recipe_service = new RecipeService();
    let recipe = req.body;
    logger.silly(recipe)
    recipe = await recipe_service.create_recipe(recipe);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
});

router.get('/:recipe_id', async (req, res) => {
  try {
    logger.info("recipe get ")
    let recipe_service = new RecipeService();
    let recipe_id = req.params['recipe_id'];
    logger.info(recipe_id)
    let recipe = await recipe_service.get_recipe_by_id(recipe_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
})

router.post('/:recipe_id', async (req, res) => {
  try {
    console.log("recipe get ")
    let recipe_service = new RecipeService();
    req.body.id = req.params['recipe_id'];
    console.log(req.body)
    let recipe = await recipe_service.update_recipe(req.body);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
});

router.get('/', async (req, res) => {
  try {
    console.log("recipe get ")
    let recipe_service = new RecipeService();
    let recipe_id = req.params['recipe_id'];
    console.log(recipe_id)
    let recipe = await recipe_service.get_recipe_by_id(recipe_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
});

router.delete('/:recipe_id', async (req, res) => {
  try {
    console.log("recipe get ")
    let recipe_service = new RecipeService();
    let recipe_id = req.params['recipe_id'];
    console.log(recipe_id)
    let recipe = await recipe_service.get_recipe_by_id(recipe_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
});

router.post('/:recipe_id/addingredient', async (req, res) => {
  try {
    logger.info("recipe get ")
    let recipe_service = new RecipeService();
    let recipe_id = req.params['recipe_id'];
    logger.info(recipe_id)
    let recipe = await recipe_service.get_recipe_by_id(recipe_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
})

router.post('/:recipe_id/addinstructions', async (req, res) => {
  try {
    logger.info("recipe get ")
    let recipe_service = new RecipeService();
    let recipe_id = req.params['recipe_id'];
    logger.info(recipe_id)
    let recipe = await recipe_service.get_recipe_by_id(recipe_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
})


router.post('/:recipe_id/addsteps', async (req, res) => {
  try {
    logger.info("recipe get ")
    let recipe_service = new RecipeService();
    let recipe_id = req.params['recipe_id'];
    logger.info(recipe_id)
    let recipe = await recipe_service.get_recipe_by_id(recipe_id);
    res.done(recipe);
  } catch (err) {
    res.error(err);
  }
})


module.exports = router; 