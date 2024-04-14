const { Schema, model } = require(`mongoose`);
const Time = require("./Time");

const tutorSessionSchema = new Schema({
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
        type: [Time],
        required: true
    },

    location: {
        type: String,
        required: true
    }
});

const TutorSession = model('TutorSession', tutorSessionSchema)
module.exports = TutorSession;