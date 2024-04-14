const express = require(`express`);
const router = express.Router();

const {
    loginOrRegister,
    getLoggedInUser,
    updateLoggedInUser,
    getAllUsernames,
    getUserById,
    patchUserClasses,
    getUserCourseNames,
    patchTutorSessions,
    deleteTutorSession,
    removeUserClass
    
} = require(`../controllers/user-controller`);

router.route(`/`)
    .get(getLoggedInUser)
    .put(updateLoggedInUser)
    .patch(patchUserClasses)

router.route(`/courses/`)
    .get(getUserCourseNames)

router.route(`/tutorSession/`)
    .patch(patchTutorSessions)
    .delete(deleteTutorSession)

router.route(`/removeClass/`)
    .patch(removeUserClass)

router.route(`/id/:userId`)
    .get(getUserById)

router.route(`/login/`)
    .post(loginOrRegister)

router.route(`/usernames/`)
    .get(getAllUsernames)
    

module.exports = router;