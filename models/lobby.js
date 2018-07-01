var mongoose = require("mongoose");

// LOBBY SCHEMA - name, password, capacity, isPublic
var lobbySchema = new mongoose.Schema({
    name: String,
    password: String,
    capacity: Number,
    isPublic: Boolean
});

module.exports = {
    movieLobbies: mongoose.model("MovieLobby", lobbySchema),
    animeLobbies: mongoose.model("AnimeLobby", lobbySchema),
    tvLobbies: mongoose.model("TVLobby", lobbySchema)
}