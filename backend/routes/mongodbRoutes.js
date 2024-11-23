const express = require("express");
const { insertMongoData, fetchMongoData } = require("../controllers/mongodbControllers");

const router = express.Router();

router.post("/insert", insertMongoData);
router.get("/", fetchMongoData);

module.exports = router;
