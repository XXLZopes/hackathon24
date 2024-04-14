const { Schema, model } = require('mongoose');

const Time = require("./Time");

const studygroupSessionSchema = new Schema({
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

const StudyGroupSession = model('StudyGroupSession', studygroupSessionSchema);
module.exports = StudyGroupSession;