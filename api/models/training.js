'use strict';

module.exports = class Training{
    id :string  = "";
    name:string = "";
    description:string = "";
    exercises: Array<any> = null;

    constructor(training){
        this.id = training.id;
        this.name = training.id;
        this.description =training.id;
        this.exercises = training.id;
    }

    parseToResponse(training){
        return training;
    }
}