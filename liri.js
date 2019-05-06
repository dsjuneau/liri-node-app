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

let selector = process.argv[2].toLowerCase();

// if statement to weed out
let inputValue = process.argv[3].toLowerCase();

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
    break;
}

function concert(concert) {
  console.log("looking for concert: " + concert);
}

function song(song) {
  console.log("looking for song: " + song);
}

function movie(movie) {
  console.log("looking for movie: " + movie);
}

function whatever(whatever) {
  console.log("looking for whatever: " + whatever);
}
