"use strict";

let ERROR = require('../utilities/errors');
let provider_factory = require('./provider/datebase-provider-factory');
let BuyList = require('../models/exercise');

module.exports = class ExerciseProvider {

    constructor() {
        this.db_connection = provider_factory.getObjectDBProvider('exercise');
    }

    async createExercis(buy_list, conn) {
        let log_path = 'ExerciseProvider/createExercis -';
        let is_external_connection = true;
        try {
            let result = await this.db_connection.create(buy_list);
            logger.verbose(`${log_path} db result - ${result}`);
            buy_list = new BuyList(result);
            return Promise.resolve(buy_list);
        } catch (err) {
            if (is_external_connection === false) {

            }
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async updateExercise(exercise, conn) {
        let log_path = 'ExerciseProvider/updateExercise';
        let is_external_connection = false;
        try {
            if (!conn) {

            }
            let result = await this.db_connection.update(buy_list, conn);
            return Promise.resolve(new BuyList(result));
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async deleteExercise(id, conn = null) {
        let log_path = 'ExerciseProvider/delete_exercise';
        let is_external_connection = false;
        try {
            if (!conn) {

            }
            let result = await this.db_connection.delete(id, conn);
            return Promise.resolve(result);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getExerciseById(exercise_id, conn) {
        let log_path = 'ExerciseProvider/getExerciseById';
        let exercise = new Exercise();

        try {
            let result = await this.db_connection.getById(exercise_id);
            if (result) {
                let exercise = new Exercise(result);
                return Promise.resolve(exercise);
            } else {
                logger.error(`${log_path} error - ${buy_list_id} not found`);
                return Promise.reject(ERROR.ERROR_EXERCISE_NOT_FOUND);
            }
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getExerciseList(search_by, order_by, page_number, page_size, limit, conn) {
        let log_path = 'exercise-provider/getExerciseList';
        try {
            let result = await this.db_connection.getList(search_by, order_by, page_number, page_size, limit, conn);
            return Promise.resolve(result);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }



};