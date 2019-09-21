let db = require('../mongodb_provider');
let mongo = require('mongodb');
let user = require("../../../models/user");

module.exports = class userProvider extends db.MongoDBProvider {

    constructor() {
        super();
        this.collection_name = 'user';
    }

    async create(user, conn = null) {
        let log_path = 'user/create';
        logger.info(`${log_path} - start`);
        let is_external_connection = true;
        try {
            logger.verbose(`${log_path} - parameters - training - ${user}`);
            this.db_connection = conn || await this.getConnection();
            let training_collection = this.db_connection.collection(this.collection_name);
            user._id = this.uuid2MongoId(user.id);
            let result = await training_collection.insertOne(user);
            let item = await this.getById(result.insertedId.toString());
            logger.info(`${log_path} - end`);
            return Promise.resolve(item);
        } catch (err) {
            if (is_external_connection === false) {
            }
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async update(user, conn = null) {
        let log_path = 'user/update';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - training - ${user}`);
            let update_results = await db.MongoDBProvider.prototype.updateOne.call(this, user, Training, null, conn);
            logger.info(`${log_path} - end`);
            return Promise.resolve(update_results);
        } catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async delete(id, conn) {
        let log_path = 'user/delete';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - user_id - ${id}`);
            this.db_connection = await this.getConnection();
            var newvalues = {$set: {is_deleted: false}};
            let user = await this.deleteFromCollection(id, this.db_connection);
            logger.info(`${log_path} - end`);
            return Promise.resolve(user);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getByOAuth(oAuth_type, oAuth_id, conn) {
        let log_path = 'getByOAuth/getByOAuth';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - oAuth_type ${oAuth_type} oAuth_id - ${oAuth_id}`);
            this.db_connection = conn || await this.getConnection();
            let collection = this.db_connection.collection(this.collection_name);

            let user = await collection.findOne({
                $and: [
                    {oAuth:{'oAuth_type':oAuth_type,'oAuth_id':oAuth_id}},
                    {"is_deleted": false}
                ]
            });
            logger.info(`${log_path} - end`);
            return Promise.resolve(user);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getById(id, conn) {
        let log_path = 'user/getById';
        logger.info(`${log_path} - start`);
        try {
            logger.verbose(`${log_path} - parameters - user_id - ${id}`);
            let training = await db.MongoDBProvider.prototype.getById.call(this, id, conn);
            logger.info(`${log_path} - end`);
            return Promise.resolve(training);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getList(search_by, order_by, page_number, page_size, connection) {
        let log_path = 'user/getList';
        logger.info(`${log_path} - start`);
        try {
            search_by = search_by || '';
            logger.verbose(`${log_path} - parameters - search_by - ${search_by}, order_by - ${order_by}, page_number - ${page_number}, page_size - ${page_size}`);
            let filter = {
                "$and": [
                    {"is_deleted": false},
                    {
                        "$or": [
                            {"name": {"$regex": search_by, "$options": "i"}},
                            {"description": {"$regex": search_by, "$options": "i"}}
                        ]
                    }]
            };
            let trainings = await this.getCollectionList(filter, order_by, page_number, page_size);
            logger.info(`${log_path} - end`);
            return Promise.resolve(trainings);
        } catch (err) {
            logger.error(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

}