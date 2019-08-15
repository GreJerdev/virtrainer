'use strict';

const BaseModel = require('./base_model');

module.exports = class Exercise extends BaseModel {


    constructor(exercise) {
        super(exercise);
        this.id = "";
        this.name = "";
        this.description = "";
        this.youtupe_link = "";
        this.exercise_duration = 0;
        this.number_of_repetitions = 0;

        if (exercise) {
            this.id = exercise.id;
            this.name = exercise.name;
            this.description = exercise.description;
            this.youtupe_link = exercise.youtupe_link;
            this.exercise_duration = exercise.exercise_duration;
            this.number_of_repetitions = exercise.number_of_repetitions;
        }
    }

    parseToResponse(exercise){
        return exercise;
    }

    static parseFromCreateRequest(exercise) {
        if (exercise){
            exercise.id = null;

        }
        return Exercise.parseFromUpdateRequest(exercise);
    }

    static parseFromUpdateRequest(exercise) {
        let return_exercise = new Exercise();
        return_exercise.id = exercise.id;
        return_exercise.name = exercise.name;
        return_exercise.description = exercise.description;
        return_exercise.youtupe_link = exercise.youtupe_link;
        return_exercise.exercise_duration = exercise.exercise_duration;
        return_exercise.number_of_repetitions = exercise.number_of_repetitions;
        return return_exercise
    }

    static parseExerciseInputList(exerciseList){
       if (exerciseList && Array.isArray(exerciseList)){
           return exerciseList.map(exercise=> Exercise.parseFromUpdateRequest(exercise));
       }
       return [];
    }
}