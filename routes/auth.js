const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser) => {
    if (err){
      next(err);
      return;
    }

    if(!theUser){
      const err = new Error("Log in failed!");
      err.status = 400;
      next(err);
      return;
    }

    req.login(theUser, () => {
      // clear the password before sending (it's a security risk)
      theUser.password = undefined;
      res.json({ userInfo: theUser });
    })
  })( req, res, next);
});


authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "" || email==="") {
    const err = new Error("Username or password invalid");
    err.status = 400;
    next(err);
    return;
  }
  
  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      const err = new Error("The email already exists");
      err.status = 400;
      next(err);
      return;
    }
    
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: username
    });

    newUser.save((err) => {
      if (err) {
        next(err);
      } else {
        // if you want to login the user directly after signing up
        req.login(newUser, () => {
          // clear the password before sending, it's a security risk
          newUser.password = undefined;
          res.json({ userInfo: newUser })
        });
        // need to do differentely if you want email confirmation for instance
        // newUser.password = undefined;
        // res.json({ userInfo: newUser })
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json({ userInfo: null });
});

authRoutes.get("/checklogin", (req, res, next) => {
  if (req.user){
    req.user.password = undefined;
  }
  res.json({ userInfo: req.user });
})

module.exports = authRoutes;
