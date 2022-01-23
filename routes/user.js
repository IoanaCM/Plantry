var express = require('express');
var router = express.Router();
var Food = require('../models/food');
const pair = require('../models/pair');
var Pair = require('../models/pair');
var Pantry = require('../models/pantry');
var Shoppinglist = require('../models/shoppinglist');
var User = require('../models/user');
var Recipe = require('../models/recipe');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  // console.log(req.cookies.user);
  // if (!req.cookies.user) {
  //   res.redirect("/register");
  // }


  // let user = await User.findOne({email: req.cookies.user});
  // console.log(user);
  // if (user) {
    res.cookie("user", "jordanhall123@googlemail.com", {maxAge: 360000});
    res.render("user", {username: "Jordan"});
  // }
  
  // res.redirect('userregister');
  // res.redirect("/");
});

/* GET users login. */
router.get('/login', function(req, res, next) {
  res.render('userlogin');
});

router.post('/login', function(req, res, next) {
  
  
  res.cookie(req.query.email, 'value', {maxAge: 360000});
});

/* GET users login. */
router.get('/register', function(req, res, next) {
  res.render('userregister');
});

router.post('/register', async function(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;

  let u = await User.findOne({email: email});
  console.log(u);
  if (u) {
    console.log("found the user!!")
    res.cookie("user", u.email, {maxAge: 360000});
    next();
  }

  console.log(username + " " + email)

  Pantry.create({food: []}, 
    function(err, p){ 
      console.log("Made new pantry");
      if (p) {
        
        Shoppinglist.create({food: []}, 
          function(err, sl){ 
            if (sl) {
              console.log("Made new shopping");
              User.create({
                name: username,
                email: email,
                pantry: p,
                shoppinglist: sl}, 
                function(err, u){ 
                  if (u) {

                    console.log("Made new user");
                    console.log(u);
                    req.cookies.user = u.email
                    // req.cookie("user", u.email, {maxAge: 360000});
                    next();
                  }
              });
            }
        });
      }
  });

  
  next();

  // res.cookie(req.query.email, 'value', {maxAge: 36000s0});
});

/* POST create food. */
router.post('/pantry', async function(req, res, next) {
  let name = req.body.name;
  let quantity = req.body.quantity;
  // console.log(name);
  let user = await User.findOne({email: "jordanhall123@googlemail.com"});
  let food = await Food.findOne({name: name});
  // console.log(food);
  // let collection = await user.pantry.findOne({food: food});
  let found = false;
  console.log(user.pantry.food);
  for (var pair of user.pantry.food) {
    console.log("Pair " + pair);
    if (pair.food.name == name) {
      pair.quantity += parseInt(quantity);
      pair.save(function () {});
      user.pantry.save(function () {});
      user.save(function () {});
      found = true;
      break;
    } 
  }
  if (!found && food) {
    // console.log("creating food with " + food + " " );
    // Pair.create({food: food, quantity: quantity});
    user.pantry.food.push(new Pair({food: food, quantity: quantity}));
    console.log(user.pantry.food);
    user.pantry.save(function () {});
    user.save(function () {});
  }
  
  res.redirect('/user/pantry');
});

/* DELETE delete food. */
router.post('/pantry/delete', async function(req, res, next) {
  console.log(req.query);
  let name = req.query.name;

  let user = await User.findOne({email: "jordanhall123@googlemail.com"});
  let food = await Food.findOne({name: name});

  // let collection = await user.pantry.findOne({food: food});
  let found = false;
  console.log(user.pantry.food);
  for (var pair in user.pantry.food) {
    console.log("Pair " + pair);
    if (user.pantry.food[pair].food.name == name) {
      
      user.pantry.food.splice(pair, 1);
      user.pantry.save(function () {});
      user.save(function () {});
      break;
    } 
  }
  
  res.redirect('/user/pantry');
});

/* GET pantry listing. */
router.get('/pantry', async function(req, res, next) {

  // let email = req.cookies.user;

  let user = await User.findOne({email: "jordanhall123@googlemail.com"});

  let foods = await Food.find({});
  var food;
  if (user == null) {
    food = [];
  } else {
    food = user.pantry.food;
  }
  if (foods == null) {
    foods = [];
  }

  // console.log(food);
  // console.log(foods);

  res.render('pantry', {pantry: food, foods:foods});
});


/* GET list listing. */
router.get('/list', async function(req, res, next) {
  let user = await User.findOne({email: "jordanhall123@googlemail.com"});

  let foods = await Food.find({});
  var food;
  if (user == null) {
    food = [];
  } else {
    food = user.shoppinglist.food;
  }
  if (foods == null) {
    foods = [];
  }

  // console.log(food);
  // console.log(foods);

  res.render('list', {list: food, foods:foods});
});

/* POST create food. */
router.post('/list', async function(req, res, next) {
  let name = req.body.name;
  let quantity = req.body.quantity;
  // console.log(quantity);
  let user = await User.findOne({email: "jordanhall123@googlemail.com"});
  let food = await Food.findOne({name: name});
  // console.log(food);
  // let collection = await user.pantry.findOne({food: food});
  let found = false;
  // console.log(user.shoppinglist.food);
  for (var pair of user.shoppinglist.food) {
    // console.log("Pair " + pair);
    if (pair.food.name == name) {
      pair.quantity += parseInt(quantity);
      pair.save(function () {});
      user.shoppinglist.save(function () {});
      user.save(function () {});
      found = true;
      break;
    } 
  }
  if (!found && food) {
    // console.log("creating food with " + food + " " );
    // Pair.create({food: food, quantity: quantity});
    user.shoppinglist.food.push(new Pair({food: food, quantity: parseInt(quantity)}));
    // console.log(user.shoppinglist.food);
    user.shoppinglist.save(function () {});
    user.save(function () {});
  }
  
  res.redirect('/user/list');
});


/* DELETE delete food. */
router.post('/list/delete', async function(req, res, next) {
  console.log(req.query);
  let name = req.query.name;

  let user = await User.findOne({email: "jordanhall123@googlemail.com"});
  let food = await Food.findOne({name: name});

  // let collection = await user.pantry.findOne({food: food});
  let found = false;
  console.log(user.shoppinglist.food);
  for (var pair in user.shoppinglist.food) {
    console.log("Pair " + pair);
    if (user.shoppinglist.food[pair].food.name == name) {
      
      user.shoppinglist.food.splice(pair, 1);
      user.shoppinglist.save(function () {});
      user.save(function () {});
      break;
    } 
  }
  
  res.redirect('/user/list');
});

router.post('/list/addrecipe', async function(req, res, next) {
  console.log(req.query);
  let name = req.query.name;

  let user = await User.findOne({email: "jordanhall123@googlemail.com"});
  let recipe = await Recipe.findOne({name: name});

  // let collection = await user.pantry.findOne({food: food});
  let found = false;
  console.log(user.shoppinglist);
  for (var it of recipe.ingredients) {
    // console.log(it);
    if (!user.shoppinglist.food.map(i=>i.food.name).includes(it.food.name)&&!user.pantry.food.map(i=>i.food.name).includes(it.food.name)){
      user.shoppinglist.food.push(it);
    } 
  }

  user.shoppinglist.save(function () {});
  user.save(function () {});
  
  res.redirect('/user/list');
});


router.post('list/getrecipes', async function(req, res, next) {
  
});

/* GET pantry listing. */
router.get('/recommendations', async function(req, res, next) {

  // let email = req.cookies.user;

  let user = await User.findOne({email: "jordanhall123@googlemail.com"});
  let allRecipes = await Recipe.find({});

  var food;
  if (user == null) {
    food = [];
  } else {
    // console.log(user.pantry.food)
    food = user.pantry.food.map(item=>item.food.name);
  }
  console.log(allRecipes);
  console.log(food);

  // checks there are ingredients in the pantry

  var recipes = [];
  for (var recipe of allRecipes) {
    for (var i of recipe.ingredients.map(it=>it.food.name)) {
      if(food.includes(i)) {
        recipes.push(recipe);
        break;
      }
    }
  }

  // var recipes = allRecipes.filter(r=>r.ingredients.some(item => food.includes(item.food.name)));

  console.log(recipes);
  // console.log(foods);

  res.render('recommendedrecipes', {recipes: recipes});
});


module.exports = router;
