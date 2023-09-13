const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      //save user
      user
        .save()
        .then((result) => {
          res
            .status(201)
            .json({ message: "user created successfully", result });
        })
        .catch((e) => {
          res.status(500).json({
            message: "error creating user here",
            e,
          });
        });
    })
    .catch((e) => {
      res.status(500).json({ message: "passwd not hashed successfully", e });
    });
};

//register controller function
const loginUser = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      //compare password entered with hashed password in database
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          //check if password matches
          if (!passwordCheck) {
            return res
              .status(400)
              .json({ message: "passwords do not match", e });
          }
          // create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "login successful",
            email: user.email,
            token
          })
        })
        .catch((e) => {
          res.status(400).json({ message: "passwords do not match", e });
        });
    })
    .catch((e) => {
      res.status(404).json({ message: "email not found", e });
    });
};
module.exports = {
  createUser,
  loginUser,
};
