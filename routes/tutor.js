const express = require(`express`);
const router = express.Router();

const {
    createTutorSession,
    getAllTutorSessions,
    getTutorSessionByTutor,
    deleteTutorSessionBySessionID,
    updateTutorSessionBySessionID,
    getTutorSessionById,
    getTutorSessionByCourseName
} = require(`../controllers/tutor-controller`);

router.route(`/`)
   .post(createTutorSession)
   .get(getAllTutorSessions)

router.route(`/tutorSessionId/:tutorSessionId`)
    .get(getTutorSessionById)
    
router.route(`/tutorID/:tutorID`)
    .get(getTutorSessionByTutor)

router.route(`/id/:sessionID`)
    .delete(deleteTutorSessionBySessionID)
    .put(updateTutorSessionBySessionID)

router.route('/courseName/:courseName')
    .get(getTutorSessionByCourseName)

module.exports = router;