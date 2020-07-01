const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

module.exports = router;
