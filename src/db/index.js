const { Client } = require("pg");

const Sequelize = require("sequelize");
const { pgConfig } = require("../config/config.js");

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: pgConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: pgConfig.pool.max,
    min: pgConfig.pool.min,
    acquire: pgConfig.pool.acquire,
    idle: pgConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require("../models/category.model")(sequelize, Sequelize);
db.vendors = require("../models/vendor.model")(sequelize, Sequelize);
db.products = require("../models/product.model")(sequelize, Sequelize);

// Though I've set allowNull: false and onDelete: 'CASCADE',
// I usually provide an additional column is_active,
// which becomes false if user wants to delete a record.
// Following this approach it is impossible to delete any record in database,
// but only switch is_active column. It depends on needs.
// But in this case I've simply left it with onDelete: 'CASCADE'.
db.vendors.hasMany(db.products, { foreignKey: { allowNull: false, name: "vendor_id" }, onDelete: "CASCADE" });
db.products.belongsTo(db.vendors, { foreignKey: { allowNull: false, name: "vendor_id" }, onDelete: "CASCADE" });

db.categories.hasMany(db.products, { foreignKey: { allowNull: false, name: "category_id" }, onDelete: "CASCADE" });
db.products.belongsTo(db.categories, { foreignKey: { allowNull: false, name: "category_id" }, onDelete: "CASCADE" });

exports.initializeDb = async () => {
  const client = new Client({
    host: process.env.host,
    port: process.env.database_port,
    user: process.env.user,
    password: process.env.password,
  });
  await client.connect();
  await client.query(`DO
        $do$
        DECLARE
            _db TEXT := '${process.env.database}';
            _user TEXT := '${process.env.user}';
            _password TEXT := '${process.env.password}';
        BEGIN
            CREATE EXTENSION IF NOT EXISTS dblink;
            IF EXISTS (SELECT 1 FROM pg_database WHERE datname = _db) THEN
                RAISE NOTICE 'Database already exists';
            ELSE
                PERFORM dblink_connect('host=localhost user=' || _user || ' password=' || _password || ' dbname=' || current_database());
                PERFORM dblink_exec('CREATE DATABASE ' || _db);
            END IF;
        END
        $do$`);
  await db.sequelize.sync();
  await client.end();
};

exports.db = db;
