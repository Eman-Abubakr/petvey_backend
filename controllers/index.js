/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//User Model
let userModel = require('../models/user');
let User = userModel.User;

exports.home = function (req, res, next) {
  res.render("index", { title: "Home", page: "Home" ,
  displayName: req.user ? req.user.displayName : '' 
});
};

exports.about = function (req, res, next) {
  res.render("index", { title: "About", page: "About",
  displayName: req.user ? req.user.displayName : '' 
 });
};


module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if(!req.user)
  {
      res.render('auth/login', 
      {
         title: "Sign In",
         messages: req.flash('loginMessage'),
         displayName: req.user ? req.user.displayName : '' 
      })
  }
  else
  {
      return res.redirect('/');
  }
}

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      // server err?
      if(err)
      {
          return next(err);
      }
      // is there a user login error?
      if(!user)
      {
          req.flash('loginMessage', 'Authentication Error');
          return res.redirect('/login');
      }
      req.login(user, (err) => {
          // server error?
          if(err)
          {
              return next(err);
          }

          return res.redirect('survey/list');
      });
  })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {

  if(!req.user)
  {
      res.render('auth/register',
      {
          title: 'Sign Up',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  }
  else
  {
      return res.redirect('/');
  }
}

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
      username: req.body.username,
      //password: req.body.password
      email: req.body.email,
      displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
          console.log("Error: Inserting New User");
          if(err.name == "UserExistsError")
          {
              req.flash(
                  'registerMessage',
                  'Registration Error: User Already Exists!'
              );
              console.log('Error: User Already Exists!')
          }
          return res.render('auth/register',
          {
              title: 'Sign Up',
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : ''
          });
      }
      else
      {
          return passport.authenticate('local')(req, res, () => {
              res.redirect('survey/list')
          });
      }
  });
}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}