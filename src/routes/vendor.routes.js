const express = require("express");
const { body, param } = require("express-validator");

const vendors = require("../controllers/vendor.controller.js");

const router = express.Router();

// Create a new vendor
router.post("/", [
  body("name").isLength({ min: 2, max: 255 }),
], vendors.create);

// Retrieve all vendors
router.get("/", vendors.findAll);

// Retrieve a single vendor by id
router.get("/:id", [
  param("id").isInt({ gt: 0 }),
], vendors.findOne);

// Update a vendor by id
router.put("/:id", [
  param("id").isInt({ gt: 0 }),
  body("name").isLength({ min: 2, max: 255 }),
], vendors.update);

// Delete a vendor by id
router.delete("/:id", [
  param("id").isInt({ gt: 0 }),
], vendors.delete);

module.exports = router;
