var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var campground = require("../models/campground");



router.get("/", function (req, res) {
    res.redirect("/campground");
    //res.send("this is working")
}); 

// authentication routes

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campground");
        })
    })
})

//Login routes
router.get("/login", function(req, res){
    res.render("login")
})

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campground",
    failureRedirect: "/login"
}), function(req, res){

})
//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campground");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;