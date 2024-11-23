const sqlDb = require("../config/mysql");
const salesData = require("../data/salesData");

const insertMySQLData = async (req, res) => {
  try {
    const data = req.body || salesData;

    //  Product Sales
    const productQuery = "INSERT INTO product_sales (product, sales) VALUES ?";
    const productValues = data.productSales.map((item) => [item.product, item.sales]);
    await sqlDb.query(productQuery, [productValues]);

    //  Monthly Sales
    const monthlyQuery = "INSERT INTO monthly_sales (month, sales) VALUES ?";
    const monthlyValues = data.monthlySales.map((item) => [item.month, item.sales]);
    await sqlDb.query(monthlyQuery, [monthlyValues]);

    //  Regional Sales
    const regionalQuery = "INSERT INTO regional_sales (region, sales) VALUES ?";
    const regionalValues = data.regionalSales.map((item) => [item.region, item.sales]);
    await sqlDb.query(regionalQuery, [regionalValues]);

    //  Weekly Sales
    const weeklyQuery = "INSERT INTO weekly_sales (week, sales) VALUES ?";
    const weeklyValues = data.weeklySales.map((item) => [item.week, item.sales]);
    await sqlDb.query(weeklyQuery, [weeklyValues]);

    res.status(201).send({ message: "Data inserted into MySQL!" });
  } catch (error) {
    res.status(500).send({ message: "Error inserting MySQL data", error });
  }
};

const fetchMySQLData = async (req, res) => {
  try {
    const [productSales] = await sqlDb.query("SELECT * FROM product_sales");
    const [monthlySales] = await sqlDb.query("SELECT * FROM monthly_sales");
    const [regionalSales] = await sqlDb.query("SELECT * FROM regional_sales");
    const [weeklySales] = await sqlDb.query("SELECT * FROM weekly_sales");

    res.status(200).json({
      productSales,
      monthlySales,
      regionalSales,
      weeklySales,
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching MySQL data", error });
  }
};

module.exports = { insertMySQLData, fetchMySQLData };
