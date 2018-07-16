var mongoose = require("mongoose");

// USER SCHEMA - username, email, password, oath stuff?, lobbies, nominations?
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    movieLobbies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MovieLobby"
        }
        ],
    animeLobbies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AnimeLobby"
        }
        ],
    tvLobbies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TVLobby"
        }
        ],
    nominations: [ // movies/items User nominated for Election
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nomination"
        }
        ],
    ballot: [ // list of ballot objects user has casted
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ballot"
        }
        ]
});

module.exports = mongoose.model("User", userSchema);