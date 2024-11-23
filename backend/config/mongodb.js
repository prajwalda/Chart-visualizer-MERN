const mongoose = require("mongoose");

const connectMongoDB = async () => {
  const username = "nodejsboy";
  const password = "Hello123";
  const uri = `mongodb+srv://${username}:${password}@cluster0.kpnqw.mongodb.net/SalesData`;

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectMongoDB;
