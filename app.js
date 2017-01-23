var express = require("express");
var app = express();
var bodyParser=require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
var campgrounds = [
         
        { name: "salomon greek",image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg" },
        { name: "granite hill",image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" },
        { name: "granite nohill",image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" },
       { name: "salomon greek",image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg" },
        { name: "granite hill",image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" }
        // { name: "montain goat's rest",image: "https://www.westgatedestinations.com/images/westgate-river-ranch-resort-rodeo/Camping.jpg" }
    ];
    
    

app.get("/", function (req, res) {
    res.render("home.ejs");
});


app.get("/campground", function (req, res) {
    

    res.render("campground", {campgrounds:campgrounds});
});

app.post("/campground", function(req, res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campground")
    
})

app.get("/campground/new", function(req, res){
    res.render("new.ejs")
})

app.listen(3000, function () {
    console.log("Yelpcamp server started");
});