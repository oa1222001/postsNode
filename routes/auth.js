const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/auth");
const user = require("../models/user");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("please enter a valid message")
      .custom((val, { req }) => {
        return user.findOne({ email: val }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

router.post("/login", login);

module.exports = router;
