'use strict'


module.exports = class BaseModel {

    constructor(obj) {
        if (obj) {
            this.created_at = obj.created_at;
            this.is_deleted = obj.is_deleted === true ? true : false;
            this.parent = obj.parent;
        }
    }

}