'use strict';

const BaseModel = require('./base_model');
const ErrorCode = require('../utilities/errors');
module.exports = class Exercise extends BaseModel {


    constructor(exercise) {
        super(exercise);
        this.id = "";
        this.name = "";
        this.description = "";
        this.youtupe_link = "";
        this.image_steps = {};
        this.exercise_duration = null;
        this.number_of_repetitions = null;
        this.tags = [];
        this.owner = null;

        if (exercise) {
            this.id = exercise.id;
            this.name = exercise.name;
            this.description = exercise.description;
            this.youtupe_link = exercise.youtupe_link;
            this.exercise_duration = exercise.exercise_duration;
            this.number_of_repetitions = exercise.number_of_repetitions;
            this.tags = exercise.tags || [];
            this.image_steps = exercise.image_steps || {};
            this.owner = exercise.owner;
        }
    }

    static parseFromCreateRequest(exercise) {
        if (exercise) {
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
        return_exercise.image_steps = exercise.image_steps || {};
        return return_exercise
    }

    static parseExerciseInputList(exerciseList) {
        if (exerciseList && Array.isArray(exerciseList)) {
            return exerciseList.map(exercise => Exercise.parseFromUpdateRequest(exercise));
        }
        return [];
    }

    static parseListToResponse(exercises_list) {
        return !exercises_list ? [] : exercises_list.map(exercise => Exercise.parseToResponse(exercise));
    }

    static parseToResponse(exercise) {
        return {
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            youtupe_link: exercise.youtupe_link,
            exercise_duration: exercise.exercise_duration,
            number_of_repetitions: exercise.number_of_repetitions,
            tags: exercise.tags || [],
            image_steps: exercise.image_steps || {},
        }
    }
}