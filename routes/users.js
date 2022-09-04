"use strict";

import express from "express";
import bcrypt from "bcrypt";

import Item from "../models/Item.js";
import User from "../models/User.js";

const router = express.Router();

const saltRounds = 10; // env

// manage users
router
  .route("/")
  .get((req, res) => {
    User.find((err, userList) => {
      if (err) {
        console.log(err);
      } else {
        res.json(userList);
      }
    });
  })
  .post((req, res) => {
    const { username, password } = req.body;
    // query
    const { isRegistered } = req.query; //login
    if (isRegistered === "true") {
      User.findOne({ username: username }, (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            //authenticate
            bcrypt.compare(
              password,
              foundUser.password, // password from database
              function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.json({
                    success: result,
                    _userId: foundUser._id,
                    username: foundUser.username,
                  });
                }
              }
            );
          } else {
            res.json({ success: false, message: "User not found" });
          }
        }
      });
    } else {
      // Register
      User.findOne({ username: username }, (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            res.json({ success: false, message: "username already exists" });
          } else {
            bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
              if (err) {
                console.log(err);
                res.json({ success: false });
              } else {
                const newUser = new User({
                  username: username,
                  password: hashedPassword,
                });
                newUser.save();
                res.json({ success: true });
              }
            });
          }
        }
      });
    }
  });

router.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  User.findByIdAndDelete(userId, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json("successfuly deleted a user");
    }
  });
});

router.get("/:userId/items", (req, res) => {
  const { userId } = req.params;
  const query = req.query;
  Item.find({
    ...(Object.entries(query).length !== 0 && {
      date: {
        $gte: `${query.year}-${query.month}-1`,
        $lte: `${query.year}-${query.month}-31`,
      },
    }),
    _userId: userId,
  })
    .sort({ date: "descending" })
    .exec((err, items) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ items: items });
      }
    });
});

export default router;
