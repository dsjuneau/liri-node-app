require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

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
  const url =
    "https://rest.bandsintown.com/artists/" +
    concert +
    "/events?app_id=codingbootcamp";

  axios
    .get(url)
    .then(function(response) {
      response.data.forEach(function(element) {
        console.log("Name of venue: " + element.venue.name);
        console.log(
          "Location: " + element.venue.city + ", " + element.venue.region
        );
        console.log(
          "Date of event: " + moment(element.datetime).format("MM/DD/YYYY")
        );
        console.log("===========================================");
      });
    })
    .catch(function(error) {
      if (error.response) {
        console.log("No concert found");
      } else if (error.request) {
        console.log("No concert found");
      } else {
        console.log("No concert found");
      }
    });
}

function song(song) {
  spotify.search(
    {
      type: "track",
      query: song === undefined ? "The Sign ace of base" : song
    },
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
  const newMovie = movie === undefined ? "i=tt0485947" : "t=" + movie;
  console.log(newMovie);
  axios
    .get(
      "http://www.omdbapi.com/?" + newMovie + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      const tomato =
        response.data.Ratings[1] === undefined
          ? "no ratings"
          : response.data.Ratings[1].Value;
      console.log(response.data);
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + tomato);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
      if (error.response) {
        console.log("No movie found");
      } else if (error.request) {
        console.log("No movie found");
      } else {
        console.log("No movie found");
      }
    });
}

function whatever(whatever) {
  console.log("looking for whatever: " + whatever);
}
