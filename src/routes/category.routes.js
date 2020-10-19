const express = require("express");
const categories = require("../controllers/category.controller.js");

const router = express.Router();

// Create a new category
router.post("/", categories.create);

// Retrieve all categories
router.get("/", categories.findAll);

// Retrieve a single category by id
router.get("/:id", categories.findOne);

// Update a category by id
router.put("/:id", categories.update);

// Delete a category by id
router.delete("/:id", categories.delete);

module.exports = router;
