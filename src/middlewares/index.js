const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://localhost:8081",
};

const router = express.Router();

router.use(cors(corsOptions));
router.use(bodyParser.json());

module.exports = router;
