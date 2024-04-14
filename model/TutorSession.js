const { Schema, model } = require(`mongoose`);
const Time = require("./Time");

const tutorSessionSchema = new Schema({
    tutorId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String
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