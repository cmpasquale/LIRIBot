require('dotenv').config();
var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require('./key')
var moment = require ('moment')
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");
var fs = require('fs');

switch (command) {

    case "spotify":
        spotifyIt(input)
        break;
    case "movie":
        movieSearch(input)
        break;
    case "concert":
        findConcert(input)
        break;
    case "do-what-it-says":
        doIt(input)
        break;
    default:
        console.log("please enter a valid command")
}

function spotifyIt(musicSearch) {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    //  * If no song is provided then your program will default to "Same Old Blues" by Phantogram.
    if (musicSearch === undefined || null) {
        musicSearch = "Same Old Blues Phantogram";
    }
    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++) {
                var musicQuery = data.tracks.items[i];
                console.log("===============================");
                // * Artist(s)
                console.log("Artist: " + musicQuery.artists[0].name +
                    // * The song's name
                    "\nSong Name: " + musicQuery.name +
                    //* The album that the song is from
                    "\nAlbum Name: " + musicQuery.album.name +
                    "\n===============================");
            }
        };
    });
}

function movieSearch(movie) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            console.log("===============================");
            console.log("Movie name: " + response.data.Title)
            console.log("Release Year: " + response.data.Year)
            console.log("Rated: " + response.data.Rated)
            console.log("Language: " + response.data.Language)
            console.log("Country: " + response.data.Country)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors +
                "\n===============================")
        }
    );
}

function findConcert(artist) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" + "&date=upcoming";
    axios.get(queryUrl).then(

        function (response) {
            console.log("===============================");
            // Output name of venue
            console.log("Name of the Venue: ", response.data[0].venue.name)
            // Output venue's city
            console.log("Venue's City: ", response.data[0].venue.city)
            //output venue's country
            console.log("Country: ", response.data[0].venue.country)
            // Output date of event per venue
            var date = response.data[0].datetime
            var prettyDate = moment(date).format("MMM Do YYYY");   
            console.log("Date of Event: " + prettyDate)
             // Output date of event per venue
             console.log("===============================");

        })
}

function doIt() {
    
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        console.log(dataArr);
        
    });
}

  