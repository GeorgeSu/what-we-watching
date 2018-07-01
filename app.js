var express =	require("express"), // import Express package
    app =		express(), // store Express package in app Object
    bodyParser =	require("body-parser"), // BodyParser package for receiving user post form info
    request =		require("request"), // Request package for making HTTP requests for API calls
    mongoose =	require("mongoose"); // Mongoose package for interacting with MongoDB

mongoose.connect("mongodb://localhost/lobbies"); // connect mongoose to movie_night database

// LOBBY SCHEMA - name, password, capacity, isPublic
var lobbySchema = new mongoose.Schema({
    name: String,
    password: String,
    capacity: Number,
    isPublic: Boolean
});

// Movies Lobby DB Collection
var MovieLobby = mongoose.model("MovieLobby", lobbySchema);

// Anime Lobby DB Collection
// var Anime = mongoose.model("AnimeLobby", lobbySchema);

// TV Shows Lobby DB Collection
// var TV = mongoose.model("TVLobby", lobbySchema);

// Dummy Seed for Testing
// MovieLobby.create({name: "Cal Dota", password: "dota4life", capacity: 20, isPublic: false}, function(err, movieLobby) {
//     if (err) {
//         console.log("Error creating movie lobby");
//     } else {
//         console.log(movieLobby);
//     }
// });

app.use(bodyParser.urlencoded({extended: true})); // Boilerplate for using BodyParser

app.use(express.static("public")); // tells view files to use “public” folder as root node for linking to other files (such as stylesheets)
app.set("view engine", "ejs"); // sets .ejs extension as default view type, so you don’t have to type .ejs for all render file paths

// Movies Homepage
app.get("/", function(req, res) {
    res.redirect("/movies");
});
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
    var lobbyName = req.body.lobbyName;
    var lobbyPassword = req.body.lobbyPassword;
    var lobbyCapacity = req.body.lobbyCapacity;
    var isPublic = req.body.isPublic;
    // Store lobby's values in newLobby
    var newLobby = new MovieLobby({
        name: lobbyName,
        password: lobbyPassword,
        capacity: lobbyCapacity,
        isPublic: isPublic
        });
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