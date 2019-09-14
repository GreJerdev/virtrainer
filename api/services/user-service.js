module.exports = class UserService {

    constructor(db_provider = null) {
        this.db_provider = db_provider || new buyListDBProvider();
    }
}