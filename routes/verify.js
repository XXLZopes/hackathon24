const express = require(`express`);
const router = express.Router();
const {
    sendVerificationCode,
    verifyCode
} = require("../controllers/verify-controller")

router.route("/send-code/")
    .post(sendVerificationCode)

router.route("/verify-code/")
    .post(verifyCode)

module.exports = router