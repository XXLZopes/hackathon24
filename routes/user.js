const express = require(`express`);
const router = express.Router();

const {
    loginOrRegister,
    getLoggedInUser,
    updateLoggedInUser,
    
} = require(`../controllers/user-controller`);

router.route(`/`)
    .get(getLoggedInUser)
    .put(updateLoggedInUser)

router.route(`/login/`)
    .post(loginOrRegister)
    

module.exports = router;