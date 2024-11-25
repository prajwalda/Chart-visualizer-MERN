const Sales = require("../models/mongoSales");
const salesData = require("../data/salesData");

const insertMongoData = async (req, res) => {
  try {
    const newData = req.body;

    const existingData = await Sales.findOne();

    if (existingData) {
      if (newData.monthlySales) {
        newData.monthlySales.forEach((item) => {
          const monthIndex = existingData.monthlySales.findIndex(
            (existingItem) => existingItem.month === item.month
          );
          if (monthIndex !== -1) {
            existingData.monthlySales[monthIndex].sales = item.sales;
          } else {
            existingData.monthlySales.push(item);
          }
        });
      }

      if (newData.productSales) {
        newData.productSales.forEach((item) => {
          const productIndex = existingData.productSales.findIndex(
            (existingItem) => existingItem.product === item.product
          );
          if (productIndex !== -1) {
            existingData.productSales[productIndex].sales = item.sales;
          } else {
            existingData.productSales.push(item);
          }
        });
      }

      if (newData.regionalSales) {
        newData.regionalSales.forEach((item) => {
          const regionIndex = existingData.regionalSales.findIndex(
            (existingItem) => existingItem.region === item.region
          );
          if (regionIndex !== -1) {
            existingData.regionalSales[regionIndex].sales = item.sales;
          } else {
            existingData.regionalSales.push(item);
          }
        });
      }

      if (newData.weeklySales) {
        newData.weeklySales.forEach((item) => {
          const weekIndex = existingData.weeklySales.findIndex(
            (existingItem) => existingItem.week === item.week
          );
          if (weekIndex !== -1) {
            existingData.weeklySales[weekIndex].sales = item.sales;
          } else {
            existingData.weeklySales.push(item);
          }
        });
      }

      await existingData.save();
      res.status(200).send({ message: "Data updated in MongoDB!" });
    } else {
      const sales = new Sales(newData);
      await sales.save();
      res.status(201).send({ message: "New data inserted into MongoDB!" });
    }
  } catch (error) {
    console.error("Error updating MongoDB data:", error);
    res.status(500).send({ message: "Error updating MongoDB data", error });
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
