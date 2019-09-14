let db = require('../mongodb_provider');
let mongo = require('mongodb');
let user = require("../../../models/user");

module.exports = class userProvider extends db.MongoDBProvider {

    constructor() {
        super();
        this.collection_name = 'user';
    }
}