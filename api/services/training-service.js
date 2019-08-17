const Training = require('../models/training');
const trainingDBProvider = require("../db_services/training-db-service");
const uuid = require('uuid').v4;
const ErrorCode = require("../utilities/errors");
const ExerciseService = require("./exercise-service");

module.exports = class TrainingService{

    constructor(db_provider = null) {
        this.db_provider =  new trainingDBProvider();
    }

    async createTraining(training) {
        let method_name = 'TrainingService/createTrainig';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - training - ${training}`);
            training.id = uuid();
            training.create_at = new Date().getTime();
            logger.verbose(`${method_name} - parameter - buy_list - ${training}`);
            logger.verbose(`${method_name} - calling TrainingDBProvider/createTraining`);
            let error =  await TrainingService.validateTraining(training);
            if(error){
                logger.error(`${method_name} - training not valid ${error}`);
                return Promise.reject(error);
            }
            training = await this.db_provider.create(training);
            logger.info(`${method_name} - end`);
            return Promise.resolve(training);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create training ${err}`);
            return Promise.reject(err);
        }
    }

    async updateTraining(training) {
        let method_name = 'TrainingService/updateTraining';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - Training - ${training}`);
            logger.verbose(`${method_name} - calling TrainingDBProvider/updateTraining`);
            let training_updated = await this.db_provider.update(training);
            logger.info(`${method_name} - end`);
            return Promise.resolve(training_updated);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create training ${err}`);
            return Promise.reject(err);
        }
    }

    async getById(buy_list_id) {
        let method_name = 'TrainingService/getById';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - buy_list_id - ${buy_list_id}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/getBuyListById`);
            let buy_list = await this.db_provider.getById(buy_list_id);
            logger.info(`${method_name} - end`);
            return buy_list;
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async deleteTraining() {
        let method_name = 'TrainingService/deleteBuyList';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - buy_list_id - ${buy_list_id}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/deleteBuyList`);
            let buy_list = await this.db_provider.delete(buy_list_id);
            logger.info(`${method_name} - end`);
            return buy_list;
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async getListTraining(search_by, order_by, page_number, page_size) {
        let method_name = 'TrainingService/createBuyList';
        logger.info(`${method_name} - start`);
        try {
            //logger.verbose(`${method_name} - parameter - buy_list - ${search_by, order_by, page_number, page_size}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/getListOfBuyList`);
            let buy_lists = await this.db_provider.getList(search_by, order_by, page_number, page_size);

            logger.info(`${method_name} - end`);
            return Promise.resolve(buy_lists);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async addItems(buy_list_id, items) {
        let method_name = 'TrainingService/addItems';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - calling BuyListItem/parseListFromInput`);
            let list_items = BuyListItem.parseListFromInput(items);
            logger.verbose(`${method_name} - calling BuyListService/isBuyListExist`);
            let buy_list = this.getById(buy_list_id);
            let error = this.validateItems(list_items);
            if (!buy_list || error) {
                error = !buy_list ? ERROR.ERROR_BUY_LIST_NOT_FOUND : error;
                logger.error(`${method_name} - error ${error}`);
            }
            list_items.map(item => {
                item.id = uuid();
                item.buy_list_id = buy_list_id;
                item.create_at = new Date().getTime();
                item.is_deleted = 0;
            });

            logger.verbose(`${method_name} - calling buyListDBProvider/addItems`);
            buy_list = await this.db_provider.addItems(buy_list_id, list_items);
            logger.info(`${method_name} - end`);
            return Promise.resolve(buy_list);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }


    async static validateTraining(training) {
        let method_name = 'TrainingService/validateTraining';
        logger.info(`${method_name} - start`);
        try {
            let error = null;
            if(!training.name){
                error = ErrorCode.INVALID_TRAINING_NAME;
                return Promise.resolve(error);
            }
            error = await ExerciseService.validateExercises(training.exercises);
            logger.info(`${method_name} - end ${error}`);
            return Promise.resolve(error);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }


}