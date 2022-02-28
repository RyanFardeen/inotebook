const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");


var JWT_SECRET = "ryanisagoodb$oy";



//ROUTE 1: No Auth required for creating a user   POST : /api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if errors it will return a bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //checks for existing users, if true return error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      //hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //json web token
      const data = {
        user: { id: user.id },
      };
      var authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(jwtData)
      res.json({ authtoken });
    } catch (error) {
      console.log(error.messsage);
    }
  }
);



// ROUTE 2: For login process  POST : /api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").notEmpty(),
  ],
  async (req, res) => {
    // if errors it will return a bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //gets email and password
    const { email, password } = req.body;

    try {
      // checks for email in database, if not show error
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Your credentials did not work" });
      }

      //compares user entered with correct password, if not match return error
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Your credentials did not work" });
      }

      //generates auth token
      const data = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.messsage);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);




// ROUTE 3 : to fetch user details , Login required   POST : /api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send({error : "Please authenticate using a valid token"})

  }
});

module.exports = router;
