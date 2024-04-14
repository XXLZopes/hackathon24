const User = require(`../model/User`);
const { ObjectId } = require(`mongoose`);

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
        // const userId = new mongoose.Types.ObjectId("661b02e72370916ecfba56e3");
        if (!userId) {
            return res.status(404).json({message: `Not logged in.`});
        }
        User.findById(userId)
        .then((user) => {
            // console.log("user: ", user);
            if (!user) {
                return res.status(404).json({message: `No user with the id ${userId} found!`});
            }
            return res.status(200).json(user);
        })
        .catch((err) => {
            console.error(`Something went wrong when attempting to get the logged in user ${err}`);
            return res.status(500).json(err);
        })
    },
    getUserById(req, res) {
        const userId = req.params.userId;
        User.find({_id: userId})
        .then((user) => {
            // console.log("user: ", user);
            if (!user) {
                return res.status(404).json({message: `No user with the id ${userId} found!`});
            }
            return res.status(200).json(user);
        })
        .catch((err) => {
            console.error(`Something went wrong when attempting to get the logged in user ${err}`);
            return res.status(500).json(err);
        })
    },
    updateLoggedInUser(req,res) {
        const userID = req.session.userId;
        const updateData = req.body;

        console.log(req.session);
        console.log(req.session.sessionID)
          
        for (const key in updateData) {
            if (!(key in User.schema.paths))
                return res.status(400).json({message: `The User schema does not have the property ${key}.`});
        }
        User.findOneAndUpdate({ _id: userID}, updateData, {new: true})
        .then((updatedUser) => {
            if (!updatedUser)
                return res.status(404).json({message: `No User with the ID of ${userID} found.`});
            return res.status(200).json({
                message: `User with ID: ${userID} successfully updated.`,
                updatedUser: updatedUser
            });
        })
        .catch((err) => {
            console.log(`Something went wrong when attempting to update the user with the ID: ${userID}`);
            console.log(err)
            res.status(500).json(err);
        });
 },
 getAllUsernames(req,res) {
    User.find({})
        .select("firstName")
        .select("lastName")
        .then((users) => res.status(200).json(users))
        .catch((err) => {
            console.error("Something went wrong when trying to retrieve all the users names from the database.");
            res.status(500).json(err);
        });
 },

 patchUserClasses(req, res) {
    const userID = req.session.userId;
    const updateData = req.body;

    // First, validate that the keys in updateData are allowed in the User schema
    for (const key in updateData) {
        if (!(key in User.schema.paths)) {
            return res.status(400).json({message: `The User schema does not have the property ${key}.`});
        }
    }

    if (updateData.classList) {
        const modifications = {
            $push: { classList: { $each: updateData.classList } }
        };

        User.findOneAndUpdate({ _id: userID }, modifications, { new: true })
            .then((updatedUser) => {
                if (!updatedUser) {
                    return res.status(404).json({message: `No User with the ID of ${userID} found.`});
                }
                return res.status(200).json({
                    message: `User with ID: ${userID} successfully updated.`,
                    updatedUser: updatedUser
                });
            })
            .catch((err) => {
                console.error(`Something went wrong when attempting to update the user with the ID: ${userID}`);
                console.error(err);
                res.status(500).json(err);
            });
    } else {
        return res.status(400).json({ message: "No classListToAdd provided." });
    }
}
}

module.exports = userController;