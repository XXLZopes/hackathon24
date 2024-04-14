const Course = require('../../model/Course')

const fs = require('fs');
const jsonData = fs.readFileSync("course_data.json");
const data = JSON.parse(jsonData);

const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3500;

const uri = "mongodb+srv://root:wvCCFbpeOsvk6sPT@cluster0.vhgzsme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(
        uri,
    )
    .then(()=> {
        console.log("MongoDB has connected!");
        // Insert data into MongoDB
        Course.insertMany(data)
          .then(() => {
            console.log("Data inserted successfully!");
          })
          .catch((err) => {
            console.error("Error inserting data:", err);
          });
          
        app.listen(port, ()=> {
            console.log(`Server listening on port ${port}`);
            mongoose.set("strictQuery", true);
        });
    })
    .catch((err) => {
        console.log("Something went wrong!");
        console.log(err);
    });

module.exports = app;
