const { Schema, model, Types } = require(`mongoose`);

const Time = new Schema ({

    day: {
        type: String,
        enum: ['M', 'T', "W", "R", "F", "S", "U"],
        required: true
    },

    start_time: {
        type: String,
        required: true

    },

    end_time: {
        type: String,
        required: true
    }
}, {_id: false });

module.exports = Time;