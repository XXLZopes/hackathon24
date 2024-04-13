// wvCCFbpeOsvk6sPT
const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();
app.use(express.json());
const port = 3500;

const uri = `mongodb+srv://root:wvCCFbpeOsvk6sPT@cluster0.vhgzsme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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