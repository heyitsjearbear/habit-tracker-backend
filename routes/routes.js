const express = require("express");
const auth = require("../auth")
const router = express.Router();
const {deleteHabit,
  updateHabit,
  createHabit,
  getHabit,
  getHabits,} = require("../controllers/habitController")

const {createUser, loginUser} = require("../controllers/userController")

// routes for habits
router.post("/post", createHabit);

router.get("/getAll", getHabits);

router.get("/getOne/:id", getHabit);

router.patch("/update/:id", updateHabit);

router.delete("/delete/:id", deleteHabit);

//routes for users
router.post("/register", createUser);

router.post("/login", loginUser);

// free endpoint
router.get("/free-endpoint", (req, res) => {
  res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
router.get("/auth-endpoint", auth, (req, res) => {
  res.json({ message: "You are authorized to access me" });
});

module.exports = router;
