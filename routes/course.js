const express = require(`express`);
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseByCN,
    deleteCourseByCN,
    // updateCourseByCN
} = require(`../controllers/course-controller`);

router.route(`/`)
    .post(createCourse)
    .get(getAllCourses)

router.route(`/courseCN/:courseCN`)
    .get(getCourseByCN)
    .delete(deleteCourseByCN)
    // .put(updateCourseByCN)

module.exports = router;