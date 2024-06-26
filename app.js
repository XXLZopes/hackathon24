require('dotenv').config();
const mongoose = require(`mongoose`);
const express = require(`express`);
const session = require(`express-session`);
const cors = require(`cors`);

const app = express();

const user = process.env.DB_USER
const password = process.env.DB_PASS


const port = 3500;
const uri = `mongodb+srv://${user}:${password}@cluster0.vhgzsme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const corsData = {
    origin: `http://127.0.0.1:5500`,
    credentials: true
};

app.use(express.json());
app.use(cors(corsData));
app.set(`trust proxy`, 1);
app.use(session({
    secret: `OooSoSecret123`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const userRouter = require(`./routes/user`);
const verifyRouter = require(`./routes/verify`);
const courseRouter = require('./routes/course');
const subjectRouter = require(`./routes/subject`);
const tutorRouter = require(`./routes/tutor`);
const studyGroupRouter = require(`./routes/studygroup`);

app.use(`/user`, userRouter);
app.use(`/verify`, verifyRouter);
app.use('/course',courseRouter);
app.use(`/subject`, subjectRouter);
app.use(`/tutor`,tutorRouter);
app.use(`/studygroup`,studyGroupRouter);


app.get('/test', (req, res) => {
    if (req.session) {
      if (!req.session.test) {
          req.session.test = 0
      }
      req.session.test = req.session.test + 1
      console.log(req.session.test)
      console.log('Session ID:', req.sessionID);
      console.log('User ID:', req.session.userId);
    }
  
    res.send('Session ID has been logged to the console.');
  });

mongoose
    .connect(
        uri,
    )
    .then(() => {
        console.log(`MongoDB has connected!`);
        app.listen(port, ()=> {
            console.log(`Server listening on port ${port}`);
            mongoose.set(`strictQuery`, true);
        });
    })
    .catch((err) => {
        console.log(`Something went wrong!`);
        console.error(err);
    });

module.exports = app;