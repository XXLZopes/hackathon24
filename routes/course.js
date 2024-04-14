const express = require(`express`);
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseByCN,
    deleteCourseByCN,
    getCoursesBySubject
} = require(`../controllers/course-controller`);

router.route(`/`)
    .post(createCourse)
    .get(getAllCourses)

router.route(`/courseCN/:courseCN`)
    .get(getCourseByCN)
    .delete(deleteCourseByCN)

router.route(`/subject/:courseSubject`)
    .get(getCoursesBySubject)

module.exports = router;