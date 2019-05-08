require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

let inputSelector = [
  "concert-this",
  "spotify-this-song",
  "movie-this",
  "do-what-it-says"
];

let selector =
  process.argv[2] === undefined
    ? process.argv[2]
    : process.argv[2].toLowerCase();

// if statement to weed out
let inputValue =
  process.argv[3] === undefined
    ? process.argv[3]
    : process.argv.splice(3).join(" ");

//Take action based upon what is input.
switch (inputSelector.indexOf(selector)) {
  case 0:
    concert(inputValue);
    break;
  case 1:
    song(inputValue);
    break;
  case 2:
    movie(inputValue);
    break;
  case 3:
    whatever(inputValue);
    break;
  case -1:
    console.log(
      "Error.  PLease use one of the following selctors: concert-this, spotify-this-song, movie-this, or do-what-it-says."
    );
    break;
}

function concert(concert) {
  console.log("looking for concert: " + concert);
}

function song(song) {
  spotify.search(
    { type: "track", query: song === undefined ? "The Sign" : song },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log(
        "Preview Link: " + data.tracks.items[0].external_urls.spotify
      );
      console.log("Album Name: " + data.tracks.items[0].album.name);
    }
  );
}

function movie(movie) {
  console.log("looking for movie: " + movie);
}

function whatever(whatever) {
  console.log("looking for whatever: " + whatever);
}
