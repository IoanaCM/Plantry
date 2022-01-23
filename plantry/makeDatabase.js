var mongoose 		= require("mongoose");
var Food 			= require("./models/food"),
    Pair = require('./models/pair'),
    Pantry 			= require("./models/pantry"),
    Shoppinglist 			= require("./models/shoppinglist"),
    User	= require("./models/user"),
    Recipe 			= require("./models/recipe");

const uri = "mongodb+srv://admin:Vj7uPoxy1gwxMMzO@cluster0.o9qgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(" Mongoose is connected")
);

console.log(Food);

function createFood(name, co2) {
    Food.create()
}