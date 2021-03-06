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

var routes = require("./routes/index");
var users = require("./routes/user");

//View Engine

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({
    defaultLayout: "layout"
}));
app.set("view engine", "handlebars");

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(cookieParser("secret"));
app.use(session({
    secrect: "secret",
    saveUnitialized: true,
    resave: true
}));

//Passport intit

app.use(passport.initialize());
app.use(passport.session());


//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//connect flash

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})

app.use("/", routes);
app.use("/users", users);


app.listen(port, function() {
    console.log("Server is listening on port" + port)
})
