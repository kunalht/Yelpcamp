var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
campground   = require("./models/campground"),
passport     = require("passport"),
LocalStrategy= require("passport-local"),
Comment      = require("./models/comment"),
User         = require("./models/user"),
    seedDB   = require("./seeds")

var commentRoutes= require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index")


//passport configuration
app.use(require("express-session")({
    secret: "This is secret text",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }));
seedDB();

app.use(indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments", commentRoutes);


//error page

app.get("*", function(req, res){
    res.send("Error 404");
});

app.listen(3000, function () {
    console.log("Yelpcamp server started");
});