const Sales = require("../models/mongoSales");
const salesData = require("../data/salesData");

const insertMongoData = async (req, res) => {
  try {
    const data = req.body || salesData;
    const newData = new Sales(data);
    await newData.save();
    res.status(201).send({ message: "Data inserted into MongoDB!" });
  } catch (error) {
    res.status(500).send({ message: "Error inserting MongoDB data", error });
  }
};

const fetchMongoData = async (req, res) => {
  try {
    const data = await Sales.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching MongoDB data", error });
  }
};

module.exports = { insertMongoData, fetchMongoData };
