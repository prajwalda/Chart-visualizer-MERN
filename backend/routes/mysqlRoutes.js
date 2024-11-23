const express = require("express");
const { insertMySQLData, fetchMySQLData } = require("../controllers/mysqlController");

const router = express.Router();

router.post("/insert", insertMySQLData);
router.get("/", fetchMySQLData);

module.exports = router;
