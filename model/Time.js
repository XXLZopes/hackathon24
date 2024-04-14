const { Schema, model, Types } = require(`mongoose`);

const Time = new Schema ({

    day: {
        type: String,
        enum: ['M', 'T', "W", "R", "F", "S", "U", "-"],
        required: true
    },

    start_time: {
        type: String,

    },

    end_time: {
        type: String,
    }
}, {_id: false });

module.exports = Time;