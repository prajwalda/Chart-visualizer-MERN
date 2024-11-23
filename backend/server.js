const express = require("express");
const connectMongoDB = require("./config/mongodb");
const mysqlRoutes = require("./routes/mysqlRoutes");
const mongodbRoutes = require("./routes/mongodbRoutes");

const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

connectMongoDB();

app.use("/mysql", mysqlRoutes);
app.use("/mongodb", mongodbRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
