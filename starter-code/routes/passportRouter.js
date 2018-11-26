const express        = require("express");
const passportRouter = express.Router();
// Require user model
const User = require("../models/User")

// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const saltRounds = 7

// Add passport 
const passport = require("passport")


const ensureLogin = require("connect-ensure-login");

passportRouter.get('/signup', (req, res, next)=>{
  res.render('passport/signup')
})

passportRouter.post('/signup',(req, res, next) => {
  //register es del plugin, el modelo lo tiene porque se le agregó
  console.log(req.body)
  User.register(req.body, req.body.password)
  .then(user=>{
    res.json(user)
  })
  .catch(e => next(e))
})

passportRouter.post('/login', passport.authenticate("local"), (req, res, next)=>{
  const username = req.user.username
  res.send('Tu eres un usuario real con username: ' + username)
})

passportRouter.get('/login',(req, res, next)=>{
  res.render('passport/login')
})

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;