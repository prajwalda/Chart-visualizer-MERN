const sqlDb = require("../config/mysql");
const salesData = require("../data/salesData");

const insertMySQLData = async (req, res) => {
  try {
    const data = req.body;

    if (data.productSales) {
      const productQuery = `
        INSERT INTO product_sales (product, sales)
        VALUES ?
        ON DUPLICATE KEY UPDATE sales = VALUES(sales)
      `;
      const productValues = data.productSales.map((item) => [
        item.product,
        item.sales,
      ]);
      await sqlDb.query(productQuery, [productValues]);
    }

    if (data.monthlySales) {
      const monthlyQuery = `
        INSERT INTO monthly_sales (month, sales)
        VALUES ?
        ON DUPLICATE KEY UPDATE sales = VALUES(sales)
      `;
      const monthlyValues = data.monthlySales.map((item) => [
        item.month,
        item.sales,
      ]);
      await sqlDb.query(monthlyQuery, [monthlyValues]);
    }

    if (data.regionalSales) {
      const regionalQuery = `
        INSERT INTO regional_sales (region, sales)
        VALUES ?
        ON DUPLICATE KEY UPDATE sales = VALUES(sales)
      `;
      const regionalValues = data.regionalSales.map((item) => [
        item.region,
        item.sales,
      ]);
      await sqlDb.query(regionalQuery, [regionalValues]);
    }

    if (data.weeklySales) {
      const weeklyQuery = `
        INSERT INTO weekly_sales (week, sales)
        VALUES ?
        ON DUPLICATE KEY UPDATE sales = VALUES(sales)
      `;
      const weeklyValues = data.weeklySales.map((item) => [
        item.week,
        item.sales,
      ]);
      await sqlDb.query(weeklyQuery, [weeklyValues]);
    }

    res.status(201).send({ message: "Data inserted/updated into MySQL!" });
  } catch (error) {
    console.error("Error inserting/updating data:", error);
    res
      .status(500)
      .send({ message: "Error inserting/updating MySQL data", error });
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
