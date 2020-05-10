var express = require("express");
var router = express.Router();
const validatePwd = require("../services/hash");
const User = require("../models/UserModel");
const Creden = require("../models/Credentials");
const { generateToken } = require("../services/jwt");

router
  .get("/", function(req, res, next) {
    res.send("Backend Server for Reaact Library");
  })
  .post("/login", async (req, res) => {
    try {
      const { email, pwd } = req.body;
      console.log(email, pwd);
      const user = await User.findOne({ email });
      //console.log(user);
      if (user) {
        console.log(`user found with email :${user._id}`);
        const userCred = await Creden.findOne(
          { user_id: user._id },
          "passwordHash"
        );
        if (validatePwd.comparePwd(pwd, userCred.passwordHash)) {
          const jwt = generateToken(email);
          res.json({ status: "Success", user, jwt });
        } else {
          res.send({ status: "Invalid Password" });
        }
      } else {
        console.log("no user");
        res.json({ status: "user not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(404).send({ status: "Internal  Error" });
    }
  })
  .post("/register", async (req, res) => {
    try {
      const newUser = req.body;
      console.log("newuser", newUser);
      const user = new User({
        first_name: newUser.firstName,
        DOB: newUser.dob,
        email: newUser.email,
        last_name: newUser.lastName,
        address: newUser.address,
        books: [],
        cart: []
      });
      const createUser = await user.save();
      const cred = new Creden({
        user_id: createUser._id,
        passwordHash: validatePwd.getHashPwd(newUser.password),
        password: newUser.password
      });
      const creatCred = await cred.save();
      console.log(createUser, creatCred);
      res.status(200).send({ status: "Success", createUser });
    } catch {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
