const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config();

const server = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to mongoDB");
});

const port = 3000;

//middleware

server.use(express.json());
server.use(helmet());
server.use(morgan("common"));

server.listen(port, () => {
  console.log(`backend server is ready to rumble @ port ${port}!`);
});
