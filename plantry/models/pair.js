var mongoose 	= require("mongoose");

pairSchema = mongoose.Schema({
    food: foodSchema,
    quantity: Number
});

module.exports = mongoose.model("Pair", pairSchema);