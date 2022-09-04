"use strict";
import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    // gets all item
    Item.find((err, itemList) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          items: itemList,
        });
      }
    });
  })
  .post((req, res) => {
    // add new item
    const { name, category, price, date, description, _userId } = req.body;
    const newItem = new Item({
      name,
      category,
      price,
      date,
      description,
      _userId,
    });
    newItem.save();
    res.json("successfully added an item");
  });

// manage singular item by id
router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Item.findById(id, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.json(item);
      }
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Item.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    });
  })
  .patch((req, res) => {
    const { id } = req.params;
    Item.findByIdAndUpdate(id, req.body, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    });
  });

export default router;
