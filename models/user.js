var mongoose 	= require("mongoose");

userSchema = mongoose.Schema({
	name: String,
    email: String,
    password: String,
    pantry: pantrySchema,
    shoppinglist: shoppinglistSchema
});

module.exports = mongoose.model("User", userSchema);