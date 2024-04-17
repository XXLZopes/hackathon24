const { Schema, model, Types } = require(`mongoose`);

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: { 
        type: String,
    },
    classList: {
        type: [String],
        default: []
    },
    signedUpTutorSessions: {
        type: [String],
        default: []
    },
    tutorScore: {
        type: Number,
        default: null
    }
});

const User = model('User', UserSchema);
module.exports = User;