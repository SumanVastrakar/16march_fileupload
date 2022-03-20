
const express = require("express");
const app = express();

app.use(express.json())

const userController = require("./controllers/user.controllers.js");

app.use("/users",userController);


const galleryController = require("./controllers/gallery.controllers.js")
app.use("/gallery",galleryController)


module.exports = app;