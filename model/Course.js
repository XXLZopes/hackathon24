const { Schema, model, Types } = require(`mongoose`);
const Time = require("./Time");



const CourseSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    
    className: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    times: {
        type: [Time],
        default: []
    }
});

const Course = model('Course', CourseSchema);
module.exports = Course;