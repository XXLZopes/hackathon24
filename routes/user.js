const express = require(`express`);
const router = express.Router();

const {
    loginOrRegister,
    getLoggedInUser,
} = require(`../controllers/user-controller`);

router.route(`/`)
    .get(getLoggedInUser)

router.route(`/login/`)
    .post(loginOrRegister)

module.exports = router;