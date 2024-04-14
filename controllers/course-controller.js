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
        const courseCN = req.params.courseCN
        Course.find({CN: courseCN})
        .select("-__v")
        .then((courses) => res.status(200).json(courses))
        .catch((err) => {
            console.error(`Something went wrong when trying to retrieve course with CN ${courseCN}.`);
            res.status(500).json(err);
        });
    },
    deleteCourseByCN(req, res) {
        const courseCN = req.params.CN;
        Course.findOneAndDelete({ courseCN: courseCN })
        .then((deletedCourse) => {
            if (!deletedCourse) {
                return res.status(404).json({ message: `No course with the CN ${courseCN} found.` });
            }
            return res.status(200).json({ 
                message: `Course with CN ${courseCN} and name ${deletedCourse.courseName} successfully deleted.`,
                course: deletedCourse,
            });
        })
        .catch((err) => {
            console.log(
                `Something went wrong when attempting to delete the Course with the CN ${courseCN}.`
            );
            return res.status(500).json(err);
        });
    }
    // updateCourseByCN(req,res) {
    //     const courseCN = req.params.CN;
    //     const updateData = req.body;
    //     for (const key in updateData) {
    //         if (!isValidField(key))
    //         return res.status(400).json({message: `The course schema does not have the property ${key}.`});
    //     }
    //     Course.findOneAndUpdate({ courseCN: courseCN}, updateData, {new: true})
    //     .then((updatedCourse) => {
    //         if (!updatedCourse)
    //             return res.status(404).json({message: `No course with the CN of ${courseCN} found.`});
    //         return res.status(200).json({
    //             message: `Course with CN: ${courseCN} successfully updated.`,
    //             updatedCourse: updatedCourse
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(`Something went wrong when attempting to update the course with the CN: ${courseCN}`);
    //         res.status(500).json(err);
    //     });
    // }
}

module.exports = courseController;