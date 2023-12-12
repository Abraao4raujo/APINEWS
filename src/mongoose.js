const mongoose = require("mongoose");
require("dotenv").config();

const eNews = mongoose.model("eNews", {
  title: String,
  description: String,
  img_url: String,
  auth: String,
  data_posted: Date,
});

const connectToMongoDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://abraao:${process.env.SECRET_KEY}@enews.32kfydx.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

module.exports = { eNews, connectToMongoDB };
