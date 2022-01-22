var express = require('express');
var router = express.Router();
var Food = require('../models/food');
var Collection = require('../models/collection');
var Pantry = require('../models/pantry');
var Shoppinglist = require('../models/shoppinglist');
var User = require('../models/user');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log(req.cookies.user);
  if (!req.cookies.user) {
    res.redirect("/user/register");
  }


  let user = await User.findOne({email: req.cookies.user});
  console.log(user);
  if (user) {
    res.cookie("user", user.email, {maxAge: 360000});
    res.render("user", {username: user.name});
  }
  
  // res.render('userregister');

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
    res.redirect("/user");
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
                    res.cookie("user", u.email, {maxAge: 360000});
                    res.redirect("/");
                  }
              });
            }
        });
      }
  });

  console.log("Redirecting");
  res.render("userregister");


  // res.cookie(req.query.email, 'value', {maxAge: 36000s0});
});

/* GET list listing. */
router.get('/list', async function(req, res, next) {
  let email = req.cookies.user;

  let user = await User.findOne({email: email});
  let foods = await Food.find({});
  var food;
  if (user === null) {
    food = [];
  } else {
    food = user.pantry.food;
  }
  if (foods === null) {
    foods = [];
  }

  res.render('list', {pantry: food, foods:foods});
});

/* POST create food. */
router.post('/pantry', function(req, res, next) {
  console.log(req.body);
  res.redirect('/user/pantry');
});

/* DELETE delete food. */
router.delete('/pantry', function(req, res, next) {
  res.render();
});

/* GET pantry listing. */
router.get('/pantry', async function(req, res, next) {

  let email = req.cookies.user;

  let user = await User.findOne({email: email});
  let foods = await Food.find({});
  var food;
  if (user === null) {
    food = [];
  } else {
    food = user.pantry.food;
  }
  if (foods === null) {
    foods = [];
  }

  res.render('pantry', {pantry: food, foods:foods});
});

/* POST create food. */
router.post('/list/food', function(req, res, next) {
  res.render();
});

/* PUT update food. */
router.put('/list/food', function(req, res, next) {
  res.render();
});

/* DELETE delete food. */
router.delete('/list/food', function(req, res, next) {
  res.render();
});



module.exports = router;
