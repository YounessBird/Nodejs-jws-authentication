const express = require("express");
const app = express();
const router = require("./routers/auth");
const mongoose = require("mongoose");
require("dotenv/config");
const Posts = require("./routers/pvposts");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", router);
app.use("/", Posts);

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose
  .connect(process.env.CONNECT_DB)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

Port = process.env.Port || 3000;
app.listen(Port, () => console.log("server up and running"));
