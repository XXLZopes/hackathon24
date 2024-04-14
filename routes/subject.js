const express = require(`express`);
const router = express.Router();

const {
    getAllSubjects
} = require(`../controllers/subject-controller`);

router.route(`/`)
    .get(getAllSubjects)

module.exports = router;