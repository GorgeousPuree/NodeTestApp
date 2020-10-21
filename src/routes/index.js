const express = require("express");
const { errorHandler } = require("../middlewares/error");

const vendorRoutes = require("./vendor.routes");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");

const router = express.Router();

router.use("/vendor", vendorRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use(errorHandler);

module.exports = router;
