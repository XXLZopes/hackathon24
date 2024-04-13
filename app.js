// wvCCFbpeOsvk6sPT
const mongoose = require(`mongoose`);
const express = require(`express`);
const session = require(`express-session`);
const cors = require(`cors`);

const app = express();


const port = 3500;
const uri = `mongodb+srv://root:wvCCFbpeOsvk6sPT@cluster0.vhgzsme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
const courseRouter = require('./routes/course')

app.use(`/user`, userRouter);
app.use(`/verify`, verifyRouter);
app.use('course',courseRouter);

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