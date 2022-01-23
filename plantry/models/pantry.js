var mongoose 	= require("mongoose");

pantrySchema = mongoose.Schema({
    food: [pairSchema]
});

module.exports = mongoose.model("Pantry", pantrySchema);