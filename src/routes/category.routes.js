const express = require("express");
const { body, param } = require("express-validator");

const categories = require("../controllers/category.controller.js");

const router = express.Router();

// Create a new category
router.post("/", [
  body("name").isLength({ min: 2, max: 255 }),
], categories.create);

// Retrieve all categories
router.get("/", categories.findAll);

// Retrieve a single category by id
router.get("/:id", [
  param("id").isInt({ gt: 0 }),
], categories.findOne);

// Update a category by id
router.put("/:id", [
  param("id").isInt({ gt: 0 }),
  body("name").isLength({ min: 2, max: 255 }),
], categories.update);

// Delete a category by id
router.delete("/:id", [
  param("id").isInt({ gt: 0 }),
], categories.delete);

module.exports = router;
