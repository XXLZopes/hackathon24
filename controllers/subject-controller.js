const Subject = require(`../model/Subject`);
const {ObjectId} = require(`mongoose`);

const subjectController = {
    getAllSubjects(req, res) {
        Subject.find({})
        .select("-__v")
        .then((courses) => res.status(200).json(courses))
        .catch((err) => {
            console.error("Something went wrong when trying to retrieve all the subjects from the database.");
            res.status(500).json(err);
        });
    }
}

module.exports = subjectController;