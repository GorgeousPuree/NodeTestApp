const { db } = require(".");
const { Op } = require(".").db.Sequelize;

const Vendor = db.vendors;

exports.create = async (model) => {
  const vendor = {
    name: model.name,
  };

  try {
    const result = await Vendor.findOrCreate({
      where: { name: vendor.name },
      defaults: { name: vendor.name },
    });
    const created = result[1];

    if (!created) {
      return { succeeded: true, message: "Vendor name is already taken." };
    }
    return { succeeded: true };
  } catch {
    return { succeeded: false, message: "Error occurred while creating vendor." };
  }
};

exports.findAll = async () => {
  try {
    const vendors = await Vendor.findAll();
    return { succeeded: true, model: vendors };
  } catch {
    return { succeeded: false, message: "Error occurred while retrieving vendors." };
  }
};

exports.findOne = async (id) => {
  try {
    const vendor = await Vendor.findByPk(id);
    if (!vendor) return { succeeded: true, message: `Vendor with id=${id} was not found.` };
    return { succeeded: true, model: vendor };
  } catch {
    return { succeeded: false, message: "Error occurred while retrieving vendor by id." };
  }
};

exports.update = async (id, model) => {
  try {
    const existingVendor = await Vendor.findOne({
      where: {
        id: {
          [Op.not]: id,
        },
        name: model.name,
      },
    });
    if (existingVendor) return { succeeded: true, message: "Vendor name is already taken." };

    const result = await Vendor.update(model, {
      where: { id },
    });

    if (result[0] === 1) return { succeeded: true };
    return { succeeded: true, message: `Vendor with id=${id} was not updated.` };
  } catch {
    return { succeeded: false, message: "Error occurred while updating vendor." };
  }
};

exports.delete = async (id) => {
  try {
    const result = await Vendor.destroy({
      where: { id },
    });

    if (result === 1) return { succeeded: true };
    return { succeeded: true, message: `Vendor with id=${id} was not deleted.` };
  } catch {
    return { succeeded: false, message: "Error occurred while deleting vendor." };
  }
};
