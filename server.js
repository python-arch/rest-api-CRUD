const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const exerRouter = require("./routes/exer");
const userRouter = require("./routes/user");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection
  .once("open", () => {
    console.log("connection is ready");
  })
  .on("error", () => {
    console.log(new Error("something wrong happened"));
  });

// set the routes
app.use("/exercises", exerRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log("server is running");
});
