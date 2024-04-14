const { Schema, model } = require(`mongoose`);
const Time = require("./Time");

const tutorSessionSchema = new Schema({
    tutor_id: {
        type: String,
        required: true
    },

    course_id: {
        type: String,
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