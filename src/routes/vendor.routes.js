const express = require("express");
const vendors = require("../controllers/vendor.controller.js");

const router = express.Router();

// Create a new vendor
router.post("/", vendors.create);

// Retrieve all vendors
router.get("/", vendors.findAll);

// Retrieve a single vendor by id
router.get("/:id", vendors.findOne);

// Update a vendor by id
router.put("/:id", vendors.update);

// Delete a vendor by id
router.delete("/:id", vendors.delete);

module.exports = router;
