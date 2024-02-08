const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Divyaisagood$girl";


// ROUTE1 :create a user endpoint using POST "/api/auth/createuser". No login is required
router.post(
  "/createuser",
  [
    body("name", "Enter the valid Name").isLength({ min: 3 }),
    body("email", "Enter the valid Email").isEmail(),
    body("password", "length should be more than 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    //if there are errors, then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check whether the user with thisemail exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //return bad request and error

        return res
          .status(400)
          .json({success,error: "Sorry a user with this email alredy exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      //console.log(authToken);

      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
//   .then(user => res.json(user))
//   .catch(err=>{console.log(err)
//   res.json({error:"Please enter a unique value for email"})
// another way to store the data in mongo
//     const user =  User(req.body);
//     user.save();
//     res.send(req.body);
// //  res-request
// req-response

////ROUTE2 :authonticate a user for login endpoint using POST "/api/auth/login". No login is required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success,error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

////ROUTE3 :get user details endpoint using POST "/api/auth/getuser". required login is  details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
