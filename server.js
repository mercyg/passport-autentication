var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").
Strategy
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var config = require("./config");



var port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(logger("dev"));

mongoose.connect(config.database, function(err) {
    if (err) throw err;
    console.log("Successfully connected to the database");
})

app.listen(port, function() {
    console.log("Server is listening on port" + port)
})
