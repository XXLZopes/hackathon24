const express = require(`express`);
const router = express.Router();

const {
    loginOrRegister,
    getLoggedInUser,
    updateLoggedInUser,
    
} = require(`../controllers/user-controller`);

router.route(`/`)
    .get(getLoggedInUser)

router.route(`/login/`)
    .post(loginOrRegister)

router.route(`/update/:userID`)
    .put(updateLoggedInUser)

module.exports = router;