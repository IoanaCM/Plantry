var mongoose 	= require("mongoose");

foodSchema = mongoose.Schema({
    name: String,
    carbonFootprint: Number
});

module.exports = mongoose.model("Food", foodSchema);