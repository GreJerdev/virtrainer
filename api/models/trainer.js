
module.exports = class Trainer extends BaseModel {


    constructor(trainer) {
        super(trainer);
        this.id = "";
        this.name = "";
        this.passport_tokens = [];
        this.description = "";
        this.exercises = [];
        this.tags = [];
        this.trainer = [];

        if (trainer) {
            this.id = trainer.id;
            this.name = trainer.name;
            this.description = trainer.description;
            this.passport_token = trainer.passport_tokens;
            this.tags = trainer.tags || [];
            this.trainer = trainer.trainer;
            if (trainer.exercises) {
                this.exercises = trainer.exercises.map(exercise => new ExerciseModel(exercise));
            };
        }
    }

    static parseToResponse(trainer) {
        return {id :trainer.id,
            name:trainer.name,
            description:trainer.description,
            tags:trainer.tags,
            exercises: ExerciseModel.parseListToResponse(trainer.exercises)
        };
    }

    static parseFromCreateRequest(trainer) {
        if (trainer){
            trainer.id = null;
            return Trainer.parseFromUpdateRequest(trainer);
        }
    }

    static parseFromUpdateRequest(trainer) {
        let return_trainer = new Trainer();
        return_trainer.id = trainer.id;
        return_trainer.name = trainer.name;
        return_trainer.description = trainer.description;
        if (trainee.exercises) {
            return_trainer.exercises = ExerciseModel.parseExerciseInputList( trainer.exercises.map(exercises => new ExerciseModel(exercises)));
        };
        return return_trainer;
    }

};
