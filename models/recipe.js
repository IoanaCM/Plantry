var mongoose 	= require("mongoose");

recipeSchema = mongoose.Schema({
	name: String,
    url: String,
    ingredients: [pairSchema]
});

module.exports = mongoose.model("Recipe", recipeSchema);