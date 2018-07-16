var mongoose = require("mongoose");

// LOBBY SCHEMA - name, password, capacity, isPublic, elections, currentElection
var lobbySchema = new mongoose.Schema({
    name: String,   // Lobby Name
    password: String,   // Lobby PW
    capacity: Number,   // Max. members in lobby
    isPublic: Boolean,  // Public / Private
    members: [  // Lobby members
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        ],
    owner: {
        types: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    elections: [    // Lobby's election history
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Election"
        }
        ],
    currentElection: {  // Current Election being voted on in Lobby
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    }
});

module.exports = {
    movieLobbies: mongoose.model("MovieLobby", lobbySchema),
    animeLobbies: mongoose.model("AnimeLobby", lobbySchema),
    tvLobbies: mongoose.model("TVLobby", lobbySchema),
    foodLobbies: mongoose.model("FoodLobby", lobbySchema),
    generalLobbies: mongoose.model("GeneralLobby", lobbySchema)
}