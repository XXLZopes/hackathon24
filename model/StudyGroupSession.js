const { Schema, model, Types } = require(`mongoose`);
const Time = require("./Time");

const StudyGroupSessionSchema = new Schema({
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

const StudyGroupSession = mongoose.model('StudyGroupSession', StudyGroupSessionSchema);
module.exports = StudyGroupSession;