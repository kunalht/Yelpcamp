var mongoose = require("mongoose");
var campground= require("./models/campground");
var Comment= require("./models/comment")
var data= [
    {
        name: "Campground 1",
        image: "http://www.cityofwashburn.org/uploads/7/0/4/7/70473445/8666847.jpg?464",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque, velit sit amet gravida tempus, sem lorem faucibus ipsum, quis sagittis libero massa sed nunc. Fusce interdum erat ut magna tincidunt dictum. Donec laoreet tristique tellus, non porttitor nibh consequat ac. Maecenas scelerisque non erat in hendrerit. Curabitur leo quam, egestas eu condimentum tincidunt, ultricies nec dui. Sed tincidunt, nibh sed posuere convallis, felis elit posuere diam, id dictum nisl risus id ex. Quisque nec sem vel quam condimentum dignissim consectetur pellentesque nibh. Nam egestas in quam ut pulvinar. Etiam eget nunc quam."
    },
    {
        name: "Cloud's rest",
        image: "https://www.princerupertrv.com/images/home5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque, velit sit amet gravida tempus, sem lorem faucibus ipsum, quis sagittis libero massa sed nunc. Fusce interdum erat ut magna tincidunt dictum. Donec laoreet tristique tellus, non porttitor nibh consequat ac. Maecenas scelerisque non erat in hendrerit. Curabitur leo quam, egestas eu condimentum tincidunt, ultricies nec dui. Sed tincidunt, nibh sed posuere convallis, felis elit posuere diam, id dictum nisl risus id ex. Quisque nec sem vel quam condimentum dignissim consectetur pellentesque nibh. Nam egestas in quam ut pulvinar. Etiam eget nunc quam."
    },
    {
        name: "Cloud's rest",
        image: "http://farm1.nzstatic.com/_proxy/imageproxy_1y/serve/beachfront-accommodation.jpg?focalpointx=50&focalpointy=50&height=440&outputformat=jpg&quality=75&source=2260804&transformationsystem=focalpointcrop&width=1280&securitytoken=AE8F48D833B80F70B78639A1FDEADD73",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque, velit sit amet gravida tempus, sem lorem faucibus ipsum, quis sagittis libero massa sed nunc. Fusce interdum erat ut magna tincidunt dictum. Donec laoreet tristique tellus, non porttitor nibh consequat ac. Maecenas scelerisque non erat in hendrerit. Curabitur leo quam, egestas eu condimentum tincidunt, ultricies nec dui. Sed tincidunt, nibh sed posuere convallis, felis elit posuere diam, id dictum nisl risus id ex. Quisque nec sem vel quam condimentum dignissim consectetur pellentesque nibh. Nam egestas in quam ut pulvinar. Etiam eget nunc quam."
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