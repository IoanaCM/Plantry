var mongoose 	= require("mongoose");

pantrySchema = mongoose.Schema({
    food: [collectionSchema]
});

module.exports = mongoose.model("Pantry", pantrySchema);