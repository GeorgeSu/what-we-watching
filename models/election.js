var mongoose = require("mongoose");
// ELECTIONS SCHEMA - nominations, numNominations, results? (keeps track of votes for each nomination, possibly store in dictionary mapping)
var electionSchema = new mongoose.Schema({
    nominations: [  // Array of nominations for election
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nomination"
        }
        ],
    numEntries: {    // Number of entries nominated (Equal to nominations.length)
        type: Number,
        default: 0
    },
    ballots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ballot"
        }
        ]
});