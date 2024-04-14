const Subject = require('../src/models/Subject')

const fs = require('fs');
const jsonData = fs.readFileSync("subjects.json");
const data = JSON.parse(jsonData);

const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3500;

const uri = "mongodb+srv://root:2hrxgfMaTJA4ZWcl@cluster0.fxbbki1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(()=> {
        console.log("MongoDB has connected!");
        // Insert data into MongoDB
        Subject.insertMany(data)
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
