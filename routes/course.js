const express = require(`express`);
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseByCN,
    deleteCourseByCN,
    getCoursesBySubject,
    getUniqueCourseNames,
    getCourseByCourseName
} = require(`../controllers/course-controller`);

router.route(`/`)
    .post(createCourse)
    .get(getAllCourses)

router.route(`/courseName/:courseName`)
    .get(getCourseByCourseName)
    
router.route(`/courseName`)
    .get(getUniqueCourseNames)

router.route(`/courseCN/:courseCN`)
    .get(getCourseByCN)
    .delete(deleteCourseByCN)

router.route(`/subject/:courseSubject`)
    .get(getCoursesBySubject)

module.exports = router;