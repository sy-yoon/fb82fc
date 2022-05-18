const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://dev:7ujm8ik,@192.168.140.130:5432/messenger", {
  logging: false
});

module.exports = db;
