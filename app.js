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

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }));
seedDB();

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

//campground new route

app.get("/campground/new", function (req, res) {
    res.render("campgrounds/new")
});

//Show route

app.get("/campground/:id", function(req, res){
    campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
    
});

//COMMENT routes
app.get("/campground/:id/comments/new",isLoggedIn, function(req, res){
    //find campground by ID 
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", { campground: campground})
        }
    })
});

app.post("/campground/:id/comments",isLoggedIn, function(req, res){
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
    // Create new comments
    // connect comment to campground
    //redirect to campground show page
})



// authentication routes

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
    res.render("login")
})

app.post("/login",passport.authenticate("local",{
    successRedirect: "/campground",
    failureRedirect: "/login"
}), function(req, res){

})
//logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campground");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//error page

app.get("*", function(req, res){
    res.send("Error 404");
});

app.listen(3000, function () {
    console.log("Yelpcamp server started");
});