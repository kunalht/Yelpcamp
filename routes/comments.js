var express = require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campground");
var Comment = require("../models/comment")

//COMMENT routes
router.get("/new",isLoggedIn, function(req, res){
    //find campground by ID 
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", { campground: campground})
        }
    })
});



router.post("/",isLoggedIn, function(req, res){
    // lookup campground using ID
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                  
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/'+ campground._id)
                }
            })
        }
    })
    
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;