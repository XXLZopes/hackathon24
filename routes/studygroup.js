const express = require(`express`);
const router = express.Router();

const {
    createStudyGroup,
    deleteStudyGroup,
    updateStudyGroup,
    getAllStudyGroups,
    getStudyGroupByID
} = require(`../controllers/studygroup-controller`);

router.route(`/`)
    .post(createStudyGroup)
    .get(getAllStudyGroups)

router.route(`/studyID/:sessionID`)
    .get(getStudyGroupByID)
    .put(updateStudyGroup)
    .delete(deleteStudyGroup)




module.exports = router;