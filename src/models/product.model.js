module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      allowNull: false,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "vendors",
        key: "id",
      },
      allowNull: false,
    },
    expiration_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    additional: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
