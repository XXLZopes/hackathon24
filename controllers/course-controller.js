const Course = require(`../model/Course`);
const {ObjectId} = require(`mongoose`);

const courseController = {
    createCourse({ body }, res) {
        Course.create(body)
        .then((newCourse) => {
            return res.status(200).json({
                message: `Course with id: ${body.CN} has been created and added to the database.`,
                Course: newCourse
            });
        })
        .catch((err) => {
            console.log("Something went wrong when attempting to create a new Course.");
            res.status(400).json(err)
        });
    },
    getAllCourses(req, res) {
        Course.find({})
        .select("-__v")
        .then((courses) => res.status(200).json(courses))
        .catch((err) => {
            console.error("Something went wrong when trying to retrieve all the courses from the database.");
            res.status(500).json(err);
        });
    },
    getCourseByCN(req,res) {
        const courseCN = req.params.CN
        Course.find({courseCN: courseCN})
        .select("-__v")
        .then((courses) => res.status(200).json(courses))
        .catch((err) => {
            console.error(`Something went wrong when trying to retrieve course with CN ${courseCN}.`);
            res.status(500).json(err);
        });
    }
}

module.exports = courseController;