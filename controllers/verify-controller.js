const nodemailer = require(`nodemailer`);
const session = require(`express-session`);

const adminEmail = `aidan1meyer1@gmail.com`;
const adminEmailPW = `kgvn bhwr vpew baay `;

// let verificationCodes = {'aidan1meyer1@gmail.com': '000000'};
let verificationCodes = {};

function setCodeLifetime(email) {
    setTimeout(() => {
        if (verificationCodes[email])
        delete verificationCodes[email];
    }, 300000);
};
const sendVerificationCode = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: `Email is required!`});
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    verificationCodes[email] = verificationCode;
    setCodeLifetime(email);

    let transporter = nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: adminEmail,
            pass: adminEmailPW,
        },
    });

    try {
        await transporter.sendMail({
            from: adminEmail,
            to: email,
            subject: `Your Verification Code`,
            text: `Your verification code is: ${verificationCode}
            Do not share this code with anyone!
            This code will expire in 5 minutes.`,
        });
        res.json({ message: `Verification code sent.` });
    } catch (err) {
        console.error(`Error sending verification code: ${err}`);
        res.status(500).json({ message: `Failed to send verification code.` });
    }
};
const verifyCode = (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: 'Both email and code are required.' });
    }

    if (verificationCodes[email] === code) {
        delete verificationCodes[email];

        req.session.userEmail = email;

        res.json({
            message: 'Email verified successfully.',
            verified: true
        });

    } else {
        res.status(400).json({
            message: 'Invalid verification code.',
            verified: false
        });
    }
};

module.exports = { sendVerificationCode, verifyCode };