const express = require(`express`);
const router = express.Router();

const {
    createCourse,
    getAllCourses,
} = require(`../controllers/course-controller`);

router.route(`/`)
    .post(createCourse)
    .get(getAllCourses)

module.exports = router;