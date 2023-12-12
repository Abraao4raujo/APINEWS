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
    mongoose.connect(`${DATABASE_URL}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

module.exports = { eNews, connectToMongoDB };
