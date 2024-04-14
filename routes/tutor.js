const express = require(`express`);
const router = express.Router();

const {
    createTutorSession,
    getAllTutorSessions,
    getTutorSessionByTutor,
    deleteTutorSessionBySessionID,
    updateTutorSessionBySessionID
} = require(`../controllers/tutor-controller`);

router.route(`/`)
   .post(createTutorSession)
   .get(getAllTutorSessions)

router.route(`/tutorID/:tutorID`)
    .get(getTutorSessionByTutor)

router.route(`/id/:sessionID`)
    .delete(deleteTutorSessionBySessionID)
    .put(updateTutorSessionBySessionID)

module.exports = router;