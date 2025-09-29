console.log("web Serverni Boshlash");
const express = require("express");
const app = express();
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data);
  }
});

//MongoDB chaqirish
const db = require("./server").db();
const Mongodb = require("mongodb");

//1 Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2 Sesion code

//3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

//4 Routing code
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  console.log(req.body);
  const now = new Date().toLocaleString("en-GB", { timeZone: "Asia/Seoul" });
  // "26/09/2025, 09:55:00"

  const [date, time] = now.split(", ");
  const [day, month, year] = date.split("/");
  const [hour, minute] = time.split(":");

  const formattedTime = `${hour}:${minute}, ${day}.${month}.${year}`;
  const new_item = {
    reja: req.body.reja,
    time: formattedTime,
  };
  db.collection("plans").insertOne(new_item, (err, data) => {
    if (err) {
      console.log("Xatolik yuz berdi!", err);
      return res.status(500).json({ error: "Insert error" });
    }
    res.json(data.ops[0]);
  });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("plans").deleteOne(
    { _id: new Mongodb.ObjectId(id) },
    (err, data) => {
      res.json({ state: "success" });
    }
  );
});

app.get("/author", (req, res) => {
  res.render("author", { user: user });
});

app.get("/", function (req, res) {
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        console.log(data);
        res.render("reja", { items: data });
      }
    });
});

module.exports = app;
