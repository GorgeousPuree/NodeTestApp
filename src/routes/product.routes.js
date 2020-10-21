const express = require("express");
const { body, param } = require("express-validator");

const products = require("../controllers/product.controller.js");

const router = express.Router();

// Create a new product
router.post("/", [
  body("name").isLength({ min: 2, max: 255 }),
  body("additional").isLength({ min: 0, max: 255 }).optional({ nullable: true }),
  body("price").isInt({ gt: -1 }),
  body(["category_id", "vendor_id"]).isInt({ gt: 0 }),
  body("expiration_date").isDate(),
  body("unit").matches("^(kg|g|pieces)$"),
  body("quantity").isInt({ gt: -1 }),
], products.create);

// Retrieve all products
router.get("/", products.findAll);

// Retrieve a single product by id
router.get("/:id", [
  param("id").isInt({ gt: 0 }),
], products.findOne);

// Update a product by id
router.put("/:id", [
  param("id").isInt({ gt: 0 }),
  body("name").isLength({ min: 2, max: 255 }).optional({ nullable: true }),
  body("additional").isLength({ min: 0, max: 255 }).optional({ nullable: true }),
  body("price").isInt({ gt: -1 }).optional({ nullable: true }),
  body(["category_id", "vendor_id"]).isInt({ gt: 0 }).optional({ nullable: true }),
  body("expiration_date").isDate().optional({ nullable: true }),
  body("unit").matches("^(kg|g|pieces)$").optional({ nullable: true }),
  body("quantity").isInt({ gt: -1 }).optional({ nullable: true }),
], products.update);

// Delete a product by id
router.delete("/:id", [
  param("id").isInt({ gt: 0 }),
], products.delete);

module.exports = router;
