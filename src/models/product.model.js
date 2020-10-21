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
    expiration_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["kg", "g", "pieces"]],
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    additional: {
      type: Sequelize.STRING,
    },
  }, {
    underscored: true,
  });

  return Product;
};
