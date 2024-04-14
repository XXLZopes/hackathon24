const express = require(`express`);
const router = express.Router();

const {
    loginOrRegister,
    getLoggedInUser,
    updateLoggedInUser,
    getAllUsernames,
    getUserById
    
} = require(`../controllers/user-controller`);

router.route(`/`)
    .get(getLoggedInUser)
    .put(updateLoggedInUser)

router.route(`/id/:userId`)
    .get(getUserById)

router.route(`/login/`)
    .post(loginOrRegister)

router.route(`/usernames/`)
    .get(getAllUsernames)
    

module.exports = router;