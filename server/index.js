const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://user123:Password123Tech@cluster0.j7fql.mongodb.net/merntutorial?retryWrites=true&w=majority"
);

//In this approach, we call the exec() method on the query object returned by Model.find(). 
//This executes the query and returns a promise.
//We can then use then() and catch() to handle the result or error, respectively.
app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
