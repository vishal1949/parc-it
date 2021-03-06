const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//public signup
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        return res.status(400).json({email: 'A user has already registered with this email'});
      }else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, name: user.name };
                                                    // expires in 3 hours
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 10800 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
});

//public login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        // Use the validations to send the error
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload ={
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              //expires in 3 hours
              {expiresIn: 10800},
              (err, token) =>{
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            // And here:
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
        });
    });
});

// private auth route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstname: req.user.firstname,
    email: req.user.email,
    lastname: req.user.lastname
  });
});


module.exports = router;
