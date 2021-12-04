/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/

let cors = require("cors");
var createError = require("http-errors");
var express = require("express");

let passport = require("passport");

//Database setup
let mongoose = require("mongoose");
let dbURI = require("./db");

// Connect to the Database
mongoose.connect(dbURI.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});

// Router Imports
var usersRouter = require("../routes/users");
var apiRouter = require("../routes/api");

// Instantiate App
var app = express();

// Enables cors.
let whitelist = ["http://localhost:4200", "http://abc.com"];

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// initialize passport
app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route Middleware
app.use("/users", usersRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
