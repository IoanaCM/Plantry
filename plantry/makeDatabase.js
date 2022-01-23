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

async function createFood(name, co2) {
    console.log("Making food: " + name);
    let f = await Food.findOne({name: name});
    if (!f) {
        Food.create({name: name, carbonFootprint: co2});
        console.log("Made " + name);
    }
}

async function createRecipe(name, url, food) {
    let r = await Recipe.findOne({name: name});
    if (!r) {
        let pairs = [];
        for (i of food) {
            f = await Food.findOne({name: i[0]});
            if (f) {
                let p = new Pair({food: f, quantity: i[1]});
                await p.save();
                pairs.push(p);
            }
        }
        
        Recipe.create({name: name, url: url, ingredients: pairs});
        console.log("Made " + name);    
    }
}
console.log("hello");

createFood("Olive Oil (tsb)", 0.1);
createFood("Onion", 0.023);
createFood("Carrot", 0.054);
createFood("Garlic Clove", 0.003);
createFood("Stock Cube", 0.031);
createFood("Black Pepperawait ", 0.0087);

createRecipe("Root Vegetable Soup", 
    "https://www.bbc.co.uk/food/recipes/root_vegetable_soup_14910",
    [
        ["Olive Oil (tsb)", 2],
        ["Onion", 2],
        ["Carrot", 8],
        ["Garlic Clove", 2],
        ["Stock Cube", 2],
        ["Black Pepper", 1]
    ]
);

createFood("Milk (100ml)", 0.4);
createFood("Butter (100g)", 0.2);
createFood("Flour (100g)", 0.01);
createFood("Pasta (100g)", 0.04);
createFood("Smoked Salmon (100g)", 0.7);

createRecipe("Salmon Pasta Bake", 
    "https://www.bbc.co.uk/food/recipes/salmon_pasta_bake_77656",
    [
        ["Milk (100ml)", 7.5],
        ["Butter (100g)", 2],
        ["Flour (100g)", 0.5],
        ["Pasta (100g)", 3],
        ["Smoked Salmon (100g)", 2.5]
    ]
);

createFood("Chicken Breast", 1);
createFood("Risotto Rice (100g)", 0.12);
createFood("White Wine (100ml)", 0.1);

createRecipe("Chicken and Mushroon Risotto", 
    "https://www.bbc.co.uk/food/recipes/chicken_and_mushroom_31559",
    [
        ["Olive Oil (tsb)", 2],
        ["Chicken Breast", 3],
        ["Butter (100g)", 1],
        ["Onion", 1],
        ["Garlic Clove", 2],
        ["Risotto Rice (100g)", 2.5],
        ["White Wine (100ml)", 1.5],
        ["Black Pepper", 1],
    ]
);

