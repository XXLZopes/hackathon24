const { Schema, model } = require(`mongoose`);
const Time = require("./Time");

const tutorSessionSchema = new Schema({
    tutor: {
        type: Number,
        required: true
    },

    course: {
        type: Number,
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