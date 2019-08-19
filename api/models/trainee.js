
module.exports = class Trainee extends BaseModel {


    constructor(trainee) {
        super(trainee);
        this.id = "";
        this.name = "";
        this.passport_tokens = [];
        this.description = "";
        this.exercises = [];
        this.tags = [];
        this.trainer = [];

        if (trainee) {
            this.id = trainee.id;
            this.name = trainee.name;
            this.description = trainee.description;
            this.passport_token = trainee.passport_tokens;
            this.tags = trainee.tags || [];
            this.trainer = trainee.trainer;
            if (trainee.exercises) {
                this.exercises = trainee.exercises.map(exercise => new ExerciseModel(exercise));
            };
        }
    }

    static parseToResponse(trainee) {
        return {id :trainee.id,
            name:trainee.name,
            description:trainee.description,
            tags:trainee.tags,
            exercises: ExerciseModel.parseListToResponse(trainee.exercises)
        };
    }

    static parseFromCreateRequest(trainee) {
        if (trainee){
            trainee.id = null;
            return Trainee.parseFromUpdateRequest(trainee);
        }
    }

    static parseFromUpdateRequest(trainee) {
        let return_trainee = new Trainee();
        return_trainee.id = trainee.id;
        return_trainee.name = trainee.name;
        return_trainee.description = trainee.description;
        if (trainee.exercises) {
            return_trainee.exercises = ExerciseModel.parseExerciseInputList( trainee.exercises.map(exercises => new ExerciseModel(exercises)));
        };
        return return_trainee;
    }

};
