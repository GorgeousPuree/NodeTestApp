const { db } = require(".");
const { Sequelize } = require(".").db;

const Product = db.products;
const Vendor = db.vendors;
const Category = db.categories;

exports.create = async (model) => {
  try {
    const foundVendor = await Vendor.findOne({ where: { id: model.vendor_id } });
    if (!foundVendor) return { succeeded: true, message: `Vendor with such id=${model.vendor_id} does not exist.` };

    const foundCategory = await Category.findOne({ where: { id: model.category_id } });
    if (!foundCategory) return { succeeded: true, message: `Category with such id=${model.category_id} does not exist.` };

    await Product.create(model);
    return { succeeded: true };
  } catch (e) {
    return { succeeded: false, message: "Error occurred while creating product." };
  }
};

exports.findAll = async () => {
  try {
    const products = await Product.findAll({
      attributes: {
        include: [[Sequelize.literal("vendor.name"), "product_vendor"], [Sequelize.literal("category.name"), "product_category"]],
        exclude: ["updatedAt", "createdAt", "vendor_id", "category_id"],
      },
      include: [{ model: db.vendors, as: "vendor", attributes: [] }, { model: db.categories, as: "category", attributes: [] }],
    });
    return { succeeded: true, model: products };
  } catch (e) {
    return { succeeded: false, message: "Error occurred while retrieving products." };
  }
};

exports.findOne = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      attributes: {
        include: [[Sequelize.literal("vendor.name"), "product_vendor"], [Sequelize.literal("category.name"), "product_category"]],
        exclude: ["updatedAt", "createdAt", "vendor_id", "category_id"],
      },
      include: [{ model: db.vendors, as: "vendor", attributes: [] }, { model: db.categories, as: "category", attributes: [] }],
    });
    if (!product) return { succeeded: true, message: `Product with id=${id} was not found.` };
    return { succeeded: true, model: product };
  } catch {
    return { succeeded: false, message: "Error occurred while retrieving product by id." };
  }
};

exports.update = async (id, model) => {
  try {
    const result = await Product.update(model, { where: { id } });

    if (result[0] === 1) return { succeeded: true };
    return { succeeded: true, message: `Product with id=${id} was not updated.` };
  } catch {
    return { succeeded: false, message: "Error occurred while updating product." };
  }
};

exports.delete = async (id) => {
  try {
    const result = await Product.destroy({ where: { id } });

    if (result === 1) return { succeeded: true };
    return { succeeded: true, message: `Product with id=${id} was not deleted.` };
  } catch {
    return { succeeded: false, message: "Error occurred while deleting product." };
  }
};
