var express = require("express");
var router = express.Router();
var campground = require("../models/campground");

router.get("/", function (req, res) {
    console.log(req.user);
    campground.find({}, function(err, allCampgrounds ){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    })

    //res.render("campground", { campgrounds: campgrounds });
});

router.post("/", function (req, res) {
    var name = req.body.name; 
    var image = req.body.image;
    var newCampground = { name: name, image: image }
    campground.create(newCampground, function(err, newlycreated){
        if(err){
            console.log(err);
        }
        else{
               res.redirect("/campground")
      
        }
    })
   
})

//campground new route

router.get("/new", function (req, res) {
    res.render("campgrounds/new")
});

//Show route

router.get("/:id", function(req, res){
    campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
    
});

 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;