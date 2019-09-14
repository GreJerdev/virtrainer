module.exports = class User extends BaseModel {


    constructor(training) {
        super(training);
        this.id = "";
        this.name = "";
        this.description = "";
        this.exercises = [];
        this.tags = [];
        this.trainer = null;
    }
}