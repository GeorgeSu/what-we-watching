var mongoose = require("mongoose");

var ballotSchema = new mongoose.Schema({
    ordering: [Number] // each number in the array of ballot represents index/id of nomination voted for
            // Ex. If ballot is [2, 0, 1] and nominations are ["Lorax", "Ponyo", "The Dark Knight"]
            // That means user's voting order is "The Dark Knight" > "Lorax" > "Ponyo"
            // Default is [0, 1, 2 ...]
    
})

module.exports = mongoose.model("Ballot", ballotSchema);