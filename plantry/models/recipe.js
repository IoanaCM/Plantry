var mongoose 	= require("mongoose");

recipeSchema = mongoose.Schema({
	name: String,
    url: String,
    ingredients: [collectionSchema]
});

module.exports = mongoose.model("Recipe", recipeSchema);