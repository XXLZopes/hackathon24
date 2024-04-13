const express = require(`express`);
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseByCN
} = require(`../controllers/course-controller`);

router.route(`/`)
    .post(createCourse)
    .get(getAllCourses)
    
//todo add put (update) and delete
router.route(`/courseCN/:courseCN`)
    .get(getCourseByCN)

module.exports = router;