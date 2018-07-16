var express =	require("express"), // import Express package
    app =		express(), // store Express package in app Object
    bodyParser =	require("body-parser"), // BodyParser package for receiving user post form info
    request =		require("request"), // Request package for making HTTP requests for API calls
    mongoose =	require("mongoose"), // Mongoose package for interacting with MongoDB
    Lobby = require("./models/lobby.js"), // Dictionary of Schema for all Lobby Types
    User = require("./models/user.js"),
    Election = require("./models/election.js"),
    Nomination = require("./models/nomination.js");

mongoose.connect("mongodb://localhost/lobbies"); // connect mongoose to movie_night database

// Create Movies Lobby DB Collection
var MovieLobby = Lobby.movieLobbies;

// Create Anime Lobby DB Collection
// var AnimeLobby = Lobby.animeLobbies;

// Create TV Shows Lobby DB Collection
// var TVLobby = Lobby.tvLobbies;

// Create Food Lobby DB Collection
// var FoodLobby = Lobby.foodLobbies;

// Create General Elections Lobby DB Collection
// var GeneralLobby = Lobby.generalLobbies;

app.use(bodyParser.urlencoded({extended: true})); // Boilerplate for using BodyParser

app.use(express.static(__dirname + "/public")); // tells view files to use “public” folder as root node for linking to other files (such as stylesheets)
app.set("view engine", "ejs"); // sets .ejs extension as default view type, so you don’t have to type .ejs for all render file paths

// =========
// ROUTES
// =========

// Landing Page; Currently redirects to Movies Homepage
app.get("/", function(req, res) {
    res.redirect("/movies");
});

// Movies Routes
// Movies Home Page
app.get("/movies", function(req, res) {
    res.render("movies/landing");
});
// Index Route for Movie Lobbies
app.get("/movies/lobbies", function(req, res) {
    MovieLobby.find({}, function(err, lobbies) {
        if (err) {
            console.log("Error finding lobbies.");
            res.redirect("/");
        } else {
            res.render("movies/lobbies/index", {lobbies: lobbies});
        }
    })
});
// New Route for Movie Lobbies
app.get("/movies/lobbies/new", function(req, res) {
    res.render("movies/lobbies/new");
});
// Show Route for Movie Lobbies
app.get("/movies/lobbies/:id", function(req, res) {
    MovieLobby.find({_id: req.params.id}, function(err, lobbyFound) {
        if (err) {
            console.log("Error finding lobby.");
            res.redirect("/movies/lobbies");
        } else if (lobbyFound.length) { // if lobby with ID exists, redirect to lobby if user has permissions
            // TODO: Add validation to check if user has lobby permissions; if not, redirect to index with prompt
            res.render("movies/lobbies/show", {lobby: lobbyFound[0]});
        } else { // redirect to movie lobbies index if ID not found
            res.redirect("/movies/lobbies");
        }
    })
});
// Post Route for Movie Lobbies
app.post("/movies/lobbies", function(req, res) {
    // Store lobby's values in newLobby
    var lobbyName = req.body.lobby.name;
    var newLobby = new MovieLobby(req.body.lobby);
    var showRoute;
    
    // If Lobby name is taken, show prompt; otherwise, save newLobby to DB
    MovieLobby.find({name: lobbyName}, function(err, lobbyFound) {
        if (err) {
            console.log("Error finding lobby with lobbyName: " + lobbyName);
            res.redirect("/movies/");
        } else if (lobbyFound.length) {
            console.log("Lobby Name taken.");
            // TODO: Use session/cookie to send following prompt to user: "Lobby name is taken, please choose a new lobby name."
            res.redirect("/movies/lobbies/new");
        } else {
            newLobby.save(function(err, lobby) {
                if (err) {
                    console.log("Error when saving newLobby with name: " + lobbyName);
                    res.redirect("/movies/");
                } else {
                    console.log("Successfully added newLobby to DB with name: " + lobbyName + " and id: " + lobby._id);
                    showRoute = "/movies/lobbies/" + lobby._id;
                    // console.log(showRoute);
                    res.redirect(showRoute);
                }
            })
        }
    });
});

// Public Lobbies Route? Possibly create a second index route for Public lobbies; default shows Private lobbies user belongs to

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("What We Watching Server Running!");
}); // runs app on server with selected port and IP