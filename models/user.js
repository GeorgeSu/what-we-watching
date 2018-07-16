var mongoose = require("mongoose");

// USER SCHEMA - username, email, password, oath stuff?, lobbies, nominations?
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
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
    ballot: [ // ordering of votes for nominations; possibly create ballot object instead?
        Number // each number in the array of ballot represents index/id of nomination voted for
            // Ex. If ballot is [2, 0, 1] and nominations are ["Lorax", "Ponyo", "The Dark Knight"]
            // That means user's voting order is "The Dark Knight" > "Lorax" > "Ponyo"
            // Default is [0, 1, 2 ...]
        ]
});

module.exports = mongoose.model("User", userSchema);