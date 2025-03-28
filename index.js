const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");

const app = express();

const MONGO_URL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((e) => console.log(e));

app.enable("trust proxy");
app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("hello world!!!");
});

app.use("/api/v1/posts", require("./routes/postRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

const port = process.env.PORT || 3000;

app.listen(port);
