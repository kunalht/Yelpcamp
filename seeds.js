var mongoose = require("mongoose");
var campground= require("./models/campground");
var Comment= require("./models/comment")
var data= [
    {
        name: "Cloud's rest",
        image: "http://www.photosforclass.com/download/2182093741",
        description: "helkasjldfksa;fa"
    },
    {
        name: "Cloud's rest",
        image: "http://www.photosforclass.com/download/2617191414",
        description: "helkasjldfksa;fa"
    },
    {
        name: "Cloud's rest",
        image: "http://www.photosforclass.com/download/14435096036",
        description: "helkasjldfksa;fa"
    }
]

function seedDB(){
    //remove campground
    campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed campground"); 
        data.forEach(function(seed){
        campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            }else{
                console.log("added new campground");
                //add comments
                Comment.create(
                    {
                        text: "this is a sample comment. It doesnt matter",
                        author: "John Wick"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                            campground.comments.push(comment);
                            campground.save(); 
                            console.log("Created comment");
                            }
                    })
            }
        })
    })
    });

    //Add campgrounds
    
}

module.exports = seedDB;