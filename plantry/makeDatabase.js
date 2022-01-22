var mongoose 		= require("mongoose");

const uri = "mongodb+srv://admin:Vj7uPoxy1gwxMMzO@cluster0.o9qgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(" Mongoose is connected")
);

console.log(Food);

var Food 			= require("./models/food"),
    Pantry 			= require("./models/pantry"),
    Shoppinglist 			= require("./models/shoppinglist"),
    User	= require("./models/user"),
    Recipe 			= require("./models/recipe");

let apple = new Food({
    name: "Apple", 
    carbonFootprint: 1.5
});
let orange = new Food({
    name: "Orange", 
    carbonFootprint: 1.5
});
let pear = new Food({
    name: "Pear", 
    carbonFootprint: 1.5
});

Pantry.create({food: [
    (await Food.findOne({name: "Apple"}), 3),
    (await Food.findOne({name: "Apple"}), 5) 
]})

