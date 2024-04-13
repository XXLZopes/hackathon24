const User = require(`../model/User`);
const {ObjectId} = require(`mongoose`);

const userController = {
    loginOrRegister(req,res) {
        const email = req.body.email;
        if (email != req.session.userEmail) {
            return res.status(400).json({message: `User must validate email before loggin in.`});
        }
        User.findOne({email: email})
        .then((user) => {
            if (!user) {
                return User.create({email: email});
            }
            return user
        })
        .then((user) => {
            if (!user) {
                return res.status(500).json({message: `Something went wrong when creating a new user!`});
            }
            req.session.userId = user._id;
            return res.status(200).json(user);
        })
        .catch((err) => {
            console.error(`Something went wrong when trying to register/login a user!`);
            res.status(500).json(err)
        })
    },
    getLoggedInUser(req, res) {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(404).json({message: `Not logged in.`});
        }
        User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({message: `No user with the id ${userId} found!`});
            }
            return res.satus(200).json(user);
        })
        .catch((err) => {
            console.error(`Something went wrong when attempting to get the logged in user`);
            return res.status(500).json(err);
        })
    }
}

module.exports = userController;