const { Schema, model, Types } = require(`mongoose`);
const Time = require("./Time");

const TutorSessionSchema = new Schema({
    tutor_id: {
        type: Number,
        unique: true,
        required: true
    },

    course_id: {
        type: Number,
        unique: true,
        required: true
    },

    time: {
        type: Time,
        required: true
    },

    location: {
        type: String,
        required: true
    }
});

const TutorSession = mongoose.model('TutorSession', TutorSessionSchema);
module.exports = TutorSession;