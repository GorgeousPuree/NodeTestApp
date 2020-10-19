module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define("vendor", {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return Vendor;
};
