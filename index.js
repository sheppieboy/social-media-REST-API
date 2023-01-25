const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
//routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

const server = express();

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) console.log(err);
  console.log("Connected to mongoDB");
});

const port = 3000;

//middleware

server.use(express.json());
server.use(helmet());
server.use(morgan("common"));

server.use("/api/users", userRoute);
server.use("/api/auth", authRoute);

server.listen(port, () => {
  console.log(`backend server is ready to rumble @ port ${port}!`);
});
