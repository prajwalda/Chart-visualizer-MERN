const mysql = require("mysql2/promise");

const sqlDb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hello@123", 
  database: "salesdb",  
});

const salesData = {
  monthlySales: [
    { month: "January", sales: 15000 },
    { month: "February", sales: 20000 },
    { month: "March", sales: 18000 },
    { month: "April", sales: 22000 },
    { month: "May", sales: 25000 },
    { month: "June", sales: 24000 },
    { month: "July", sales: 27000 },
    { month: "August", sales: 26000 },
    { month: "September", sales: 28000 },
    { month: "October", sales: 30000 },
    { month: "November", sales: 31000 },
    { month: "December", sales: 32000 },
  ],
  productSales: [
    { product: "Product A", sales: 50000 },
    { product: "Product B", sales: 35000 },
    { product: "Product C", sales: 40000 },
    { product: "Product D", sales: 30000 },
  ],
  regionalSales: [
    { region: "North", sales: 40000 },
    { region: "South", sales: 30000 },
    { region: "East", sales: 25000 },
    { region: "West", sales: 35000 },
  ],
  weeklySales: [
    { week: "Week 1", sales: 10000 },
    { week: "Week 2", sales: 15000 },
    { week: "Week 3", sales: 13000 },
    { week: "Week 4", sales: 17000 },
  ],
};

const insertData = async () => {
  try {
    //  Monthly Sales
    const monthlyQuery = "INSERT INTO monthly_sales (month, sales) VALUES ?";
    const monthlyValues = salesData.monthlySales.map((item) => [item.month, item.sales]);
    await sqlDb.query(monthlyQuery, [monthlyValues]);

    //  Product Sales
    const productQuery = "INSERT INTO product_sales (product, sales) VALUES ?";
    const productValues = salesData.productSales.map((item) => [item.product, item.sales]);
    await sqlDb.query(productQuery, [productValues]);

    //  Regional Sales
    const regionalQuery = "INSERT INTO regional_sales (region, sales) VALUES ?";
    const regionalValues = salesData.regionalSales.map((item) => [item.region, item.sales]);
    await sqlDb.query(regionalQuery, [regionalValues]);

    //  Weekly Sales
    const weeklyQuery = "INSERT INTO weekly_sales (week, sales) VALUES ?";
    const weeklyValues = salesData.weeklySales.map((item) => [item.week, item.sales]);
    await sqlDb.query(weeklyQuery, [weeklyValues]);

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

insertData();
