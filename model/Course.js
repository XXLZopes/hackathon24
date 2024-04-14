const { Schema, model, Types } = require(`mongoose`);
const Time = require("./Time");

const CourseSchema = new Schema({
    CN: {
        type: Number,
        unique: true,
        required: true
    },
    
    courseName: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    courseTimes: {
        type: [Time],
        default: []
    }
});

const Course = model('Course', CourseSchema);
module.exports = Course;