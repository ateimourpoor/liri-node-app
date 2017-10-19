var keys = require("./keys");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require("request");

var fs = require("fs");

// console.log(keys.twitterKeys);


var MySpotify = function(song){

 var spotify = new Spotify({
     id: "d078f7ced74a4cccb795ec1efb629146",
     secret: "b9a55a9f1c5e4a2cab6fe39bab05aa0a"
});
    spotify
        .search({ type: 'track', query:  song})
        .then(function(data) {
            var songs = data.tracks.items;
            var artist =songs[0].artists[0].name;
            var songName =songs[0].name;
            var prevSong =songs[0].preview_url;
            var album = songs[0].album.name;
            var spotData = [];


            spotData.push({
                    "Artist Name": artist,
                    "Song Name: ": songName,
                    "Preview Song: ": prevSong,
                    "Album: ": album
                });


            console.log(spotData);


        })
        .catch(function(err) {
            console.log("there was an error: "+err);
        });
}

var MyTweets = function(){
    var client = new Twitter(keys);
    var params = { screen_name: "arashtpgt" };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        var tweetdata=[];
        if (!error) {
            for(var i=0; i< tweets.length; i++) {
                tweetdata.push({
                    "Tweet Text: ": tweets[i].text,
                    "Tweet Date: ": tweets[i].created_at,
                })
                console.log(tweetdata);

            }
        }else{
            console.log(error);
        }
    });
}

var myMovie = function(moviename){
    var movieData=[];
    var queryURL = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=40e9cece";
    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            movieData.push({
                "Title of the movie: ": JSON.parse(body).Title,
                "Year the movie came out: ":JSON.parse(body).Year,
                "IMDB Rating of the movie :":JSON.parse(body).imdbRating,
                "Rotten Tomatoes Rating of the movie: ":JSON.parse(body).tomatoURL,
                "Country where the movie was produced: ":JSON.parse(body).Country,
                "Language of the movie: ":JSON.parse(body).Language,
                "Plot of the movie: ":JSON.parse(body).Plot,
                "Actors in the movie: ":JSON.parse(body).Actors

        })
            console.log(movieData);
        }
    })
}


var do_it = function(x,y){

        if(x.includes("spotify")){
            MySpotify(y);
        }else if(x.includes("movie")){
            myMovie(y);
        }else if(x.includes("tweet")){
            MyTweets();
        }else if(x.includes("what")){
            fs.readFile("random.txt", "utf8", function(error, data) {
                var doData = data.split(",");
                do_it(doData[0],doData[1]);
        });
        }


}

do_it(process.argv[2], process.argv[3]);


