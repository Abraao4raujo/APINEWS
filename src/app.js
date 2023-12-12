const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const hora = new Date();

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const eNews = mongoose.model("eNews", {
  title: String,
  description: String,
  img_url: String,
  auth: String,
  data_posted: Date,
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
  // res.json({ hello: "hello" });
});

app.get("/news", async (req, res) => {
  const news = await eNews.find();
  res.send(news);
});

app.get("/news/:id", async (req, res) => {
  const news = await eNews.findById(req.params.id);
  res.send(news);
});

app.delete("/news/delete/:id", async (req, res) => {
  const newsDelete = await eNews.findByIdAndDelete(req.params.id);
  res.send(newsDelete);
});

app.post("/sendNews", async (req, res) => {
  const news = new eNews({
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
    auth: req.body.auth,
    data_posted: hora,
  });

  news.save().then(() => res.send(news));
});

app.listen(process.env.PORT, () => {
  mongoose.connect(
    `mongodb+srv://abraao:${process.env.SECRET_KEY}@enews.32kfydx.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log("Server is running")
});
