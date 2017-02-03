var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
campground   = require("./models/campground"),
    seedDB   = require("./seeds")

    seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


 /* campground.create(
    {
        name: "salomon greek",
         image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg",
         description: "This is a big campground"
    }, function name(err, campground) {
        if(err){
            console.log(err);
        } else{
            console.log("new created campground");
            console.log(campground);
        }
    }
);  
/*
var campgrounds = [

    { name: "salomon greek", image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg" },
    { name: "granite hill", image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" },
    { name: "granite nohill", image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" },
    { name: "salomon greek", image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg" },
    { name: "granite hill", image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" }
    // { name: "montain goat's rest",image: "https://www.westgatedestinations.com/images/westgate-river-ranch-resort-rodeo/Camping.jpg" }
];
*/


app.get("/", function (req, res) {
    res.redirect("/campground");
}); 


app.get("/campground", function (req, res) {
    campground.find({}, function(err, allCampgrounds ){
        if(err){
            console.log(err);
        } else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    })

    //res.render("campground", { campgrounds: campgrounds });
});

app.post("/campground", function (req, res) {
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

app.get("/campground/new", function (req, res) {
    res.render("new.ejs")
});

app.get("/campground/:id", function(req, res){
    campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("show", {campgrounds: foundCampground});
        }
    });
    
});

//COMMENT routes
app.get("/campground/:id/comments/new", function(req, res){
    res.send("Comments route")
})


app.get("*", function(req, res){
    res.send("Error 404");
});

app.listen(3000, function () {
    console.log("Yelpcamp server started");
});