"use strict";

let ERROR = require('../utilities/errors');
let provider_factory = require('./provider/datebase-provider-factory');
let UserModel = require('../models/user');

module.exports = class UserDBService {

    constructor() {
        this.db_connection = new provider_factory('users')
    }

    async create(user, conn = null) {
        let log_path = 'UserDBService/create -';
        let is_external_connection = true;
        try {
            let result = await this.db_connection.create(user);
            logger.verbose(`${log_path} db result - ${result}`);
            user = new UserModel(result);
            return Promise.resolve(user);
        } catch (err) {
            if (is_external_connection === false) {

            }
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getByOAuth(oAuth_type, oAuth_id, conn = null) {
        let log_path = 'getByOAuth/getByOAuth';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - oAuth_type ${oAuth_type} oAuth_id - ${oAuth_id}`);

            let user = await this.db_connection.getByOAuth(oAuth_type, oAuth_id, conn);
            if (user) {
                user = new UserModel(user);
            }
            logger.info(`${log_path} - end`);
            return Promise.resolve(user);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getById(user_id, conn) {
        let log_path = 'UserProvider/getUserById -';
        let training = new UserModel();

        try {
            let result = await this.db_connection.getById(user_id);
            if (result) {
                let user = new UserModel(result);
                return Promise.resolve(user);
            } else {
                logger.error(`${log_path} error - ${user_id} not found`);
                return Promise.resolve(null);
            }
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }
}