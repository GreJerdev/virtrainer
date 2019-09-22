'use strict';

const UserModel = require('../models/user');
const ErrorCode = require('../utilities/errors');
let uuid = require('uuid').v4;

let userDBProvider = require("../db_services/user-db-service");

module.exports = class UserService {

    constructor(db_provider = null) {
        this.db_provider = db_provider || new userDBProvider();
    }

    async create(user) {
        let method_name = 'UserService/create';
        logger.info(`${method_name} - start`);
        try {
            user.id = uuid();
            logger.verbose(`${method_name} - parameter - user - ${user}`);
            logger.verbose(`${method_name} - calling UserDBProvider/create`);
            let created_user = await this.db_provider.create(user, null);
            logger.verbose(`${method_name} - created_user - ${created_user}`);
            logger.info(`${method_name} - end`);
            return created_user;
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async getByOAuth(oAuth_type, oAuth_id) {
        let method_name = 'UserService/getByOAuth';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - oAuth_type - ${oAuth_type}, oAuth_id - ${oAuth_id}`);
            logger.verbose(`${method_name} - calling UserDBProvider/getById`);
            let user = await this.db_provider.getByOAuth(oAuth_type, oAuth_id, null);
            logger.info(`${method_name} - end`);
            return user;
        } catch (err) {
            logger.error(`${method_name} - error Fails to get user by oAuth data - ${err}`);
            return Promise.reject(err);
        }
    }

    async getById(id) {
        let method_name = 'UserService/getById';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - user_id - ${id}`);
            logger.verbose(`${method_name} - calling UserDBProvider/getById`);
            let user = await this.db_provider.getById(id, null);
            logger.info(`${method_name} - end`);
            return user;
        } catch (err) {
            logger.error(`${method_name} - error Fails to get user by oAuth data - ${err}`);
            return Promise.reject(err);
        }
    }
};