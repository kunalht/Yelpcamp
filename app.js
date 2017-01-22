var express = require("express");
var app = express();
var bodyParser=require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/campground", function (req, res) {
    var campgrounds = [
         { name: "salomon greek",image: "D:\\Code\\NodeJS\\YelpCamp\\pics\\2602356334.png" },
        { name: "salomon greek",image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg" },
        { name: "granite hill",image: "http://www.verticepatagonia.com/sites/default/files/styles/full-width-preface-header-wide/public/dickson-camping-01.jpg?itok=U3vPocaJ" },
        { name: "montain goat's rest",image: "https://www.westgatedestinations.com/images/westgate-river-ranch-resort-rodeo/Camping.jpg" }
    ];

    res.render("campground", {campgrounds:campgrounds});
});

app.post("/campground", function(req, res){
    res.send("post");
})

app.get("/campground/new", function(req, res){
    res.render("new.ejs")
})

app.listen(3000, function () {
    console.log("Yelpcamp server started");
});