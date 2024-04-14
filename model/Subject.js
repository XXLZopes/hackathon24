const { Schema, model, Types } = require(`mongoose`);
const Time = require("./Time");

const SubjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    }
}, {_id: false});

const Subject = model('Subject', SubjectSchema);
module.exports = Subject;