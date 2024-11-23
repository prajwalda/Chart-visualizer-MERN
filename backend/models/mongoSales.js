const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  monthlySales: [{ month: String, sales: Number }],
  productSales: [{ product: String, sales: Number }],
  regionalSales: [{ region: String, sales: Number }],
  weeklySales: [{ week: String, sales: Number }],
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
