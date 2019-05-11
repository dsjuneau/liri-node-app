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

function mainProgram(selector, inputValue) {
  switch (inputSelector.indexOf(selector)) {
    case 0:
      createLog(selector + " " + inputValue + "\n");
      concert(inputValue);
      break;
    case 1:
      createLog(selector + " " + inputValue + "\n");
      song(inputValue);
      break;
    case 2:
      createLog(selector + " " + inputValue + "\n");
      movie(inputValue);
      break;
    case 3:
      createLog(selector + " " + inputValue + "\n");
      whatever();
      break;
    case -1:
      createLog(selector + " " + inputValue + "\n");
      console.log(
        "Error.  PLease use one of the following selctors: concert-this, spotify-this-song, movie-this, or do-what-it-says."
      );
      break;
  }
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
        createLog("Name of venue: " + element.venue.name + "\n");
        console.log(
          "Location: " + element.venue.city + ", " + element.venue.region
        );
        createLog(
          "Location: " + element.venue.city + ", " + element.venue.region + "\n"
        );
        console.log(
          "Date of event: " + moment(element.datetime).format("MM/DD/YYYY")
        );
        createLog(
          "Date of event: " +
            moment(element.datetime).format("MM/DD/YYYY") +
            "\n"
        );
        console.log("===========================================");
        createLog("====================================================\n");
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
      createLog("Artist: " + data.tracks.items[0].artists[0].name + "\n");
      createLog("Song Name: " + data.tracks.items[0].name + "\n");
      createLog(
        "Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n"
      );
      createLog("Album Name: " + data.tracks.items[0].album.name + "\n");
      createLog("====================================================\n");
    }
  );
}

function movie(movie) {
  const newMovie = movie === undefined ? "i=tt0485947" : "t=" + movie;

  axios
    .get(
      "http://www.omdbapi.com/?" + newMovie + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      const tomato =
        response.data.Ratings[1] === undefined
          ? "no ratings"
          : response.data.Ratings[1].Value;

      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + tomato);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);

      createLog("Title: " + response.data.Title + "\n");
      createLog("Year: " + response.data.Year + "\n");
      createLog("IMDB Rating: " + response.data.imdbRating + "\n");
      createLog("Rotten Tomatoes: " + tomato + "\n");
      createLog("Country: " + response.data.Country + "\n");
      createLog("Language: " + response.data.Language + "\n");
      createLog("Actors: " + response.data.Actors + "\n");
      createLog("Plot: " + response.data.Plot + "\n");
      createLog("====================================================\n");
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

function createLog(info) {
  fs.appendFile("log.txt", info, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

function whatever() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    mainProgram(dataArr[0], dataArr[1]);
  });
}

mainProgram(selector, inputValue);
