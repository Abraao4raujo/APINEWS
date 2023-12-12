const express = require("express");
require("dotenv").config();
const mongooseConfig = require("./mongoose");

const app = express();
const port = process.env.PORT || 3000;

const hora = new Date();

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
  // res.json({ hello: "hello" });
});

app.get("/news", async (req, res) => {
  const news = await mongooseConfig.eNews.find();
  res.send(news);
});

app.get("/news/:id", async (req, res) => {
  const news = await mongooseConfig.eNews.findById(req.params.id);
  res.send(news);
});

app.delete("/news/delete/:id", async (req, res) => {
  const newsDelete = await mongooseConfig.eNews.findByIdAndDelete(
    req.params.id
  );
  res.send(newsDelete);
});

app.post("/sendNews", async (req, res) => {
  const news = new mongooseConfig.eNews({
    title: req.body.title,
    description: req.body.description,
    img_url: req.body.img_url,
    auth: req.body.auth,
    data_posted: hora,
  });

  news.save().then(() => res.send(news));
});

app.listen(port, async () => {
  await mongooseConfig.connectToMongoDB();
  console.log("Server is running");
});
