"use strict";

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import items from "./routes/items.js";
import users from "./routes/users.js";

const app = express();
app.use(express.json());

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.use("/api/items", items);
app.use("/api/users", users);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 5000, function () {
  console.log("Server started at port 5000");
});
