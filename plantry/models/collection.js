var mongoose 	= require("mongoose");

collectionSchema = mongoose.Schema({
    food: foodSchema,
    quantity: Number
});

module.exports = mongoose.model("Collection", collectionSchema);