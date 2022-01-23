var mongoose 	= require("mongoose");

shoppinglistSchema = mongoose.Schema({
	food: [pairSchema]
});

module.exports = mongoose.model("Shoppinglist", shoppinglistSchema);