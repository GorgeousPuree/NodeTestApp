const { db } = require(".");
const { Op } = require(".").db.Sequelize;

const Category = db.categories;
const Product = db.products;

exports.create = async (model) => {
  const category = {
    name: model.name,
  };

  try {
    const result = await Category.findOrCreate({
      where: { name: category.name },
      defaults: { name: category.name },
    });
    const created = result[1];

    if (!created) {
      return { succeeded: true, message: "Category name is already taken." };
    }
    return { succeeded: true };
  } catch {
    return { succeeded: false, message: "Error occurred while creating category." };
  }
};

exports.findAll = async () => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    return { succeeded: true, model: categories };
  } catch {
    return { succeeded: false, message: "Error occurred while retrieving categories." };
  }
};

exports.findOne = async (id) => {
  try {
    const category = await Category.findByPk(id, {
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    if (!category) return { succeeded: true, message: `Category with id=${id} was not found.` };
    return { succeeded: true, model: category };
  } catch {
    return { succeeded: false, message: "Error occurred while retrieving category by id." };
  }
};

exports.update = async (id, model) => {
  try {
    const existingCategory = await Category.findOne({
      where: {
        id: {
          [Op.not]: id,
        },
        name: model.name,
      },
    });
    if (existingCategory) return { succeeded: true, message: "Category name is already taken." };

    const result = await Category.update(model, {
      where: { id },
    });

    if (result[0] === 1) return { succeeded: true };
    return { succeeded: true, message: `Category with id=${id} was not updated.` };
  } catch {
    return { succeeded: false, message: "Error occurred while updating category." };
  }
};

exports.delete = async (id) => {
  try {
    const foundProduct = await Product.findOne({ where: { category_id: id } });
    if (foundProduct) return { succeeded: true, message: `Category with id=${id} cannot be deleted. It is in use.` };

    const result = await Category.destroy({
      where: { id },
    });

    if (result === 1) return { succeeded: true };
    return { succeeded: true, message: `Category with id=${id} was not deleted.` };
  } catch {
    return { succeeded: false, message: "Error occurred while deleting category." };
  }
};
