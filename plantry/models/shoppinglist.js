var mongoose 	= require("mongoose");

shoppinglistSchema = mongoose.Schema({
	food: [(foodSchema, Number)]
});

module.exports = mongoose.model("Shoppinglist", shoppinglistSchema);