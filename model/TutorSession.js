const { Schema, model } = require(`mongoose`);
const Time = require("./Time");

const tutorSessionSchema = new Schema({
    tutorId: {
        type: Number,
        required: true
    },

    courseId: {
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